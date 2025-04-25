# Setup base
curl -s "https://raw.githubusercontent.com/equinor/amplify-component-lib/main/config/config_files/check_config_workflow/base.yaml" > ".github/workflows/check_config.yaml"

# Loop through the list from check_config/list.txt
list=$(curl -s "https://raw.githubusercontent.com/equinor/amplify-component-lib/main/config/config_files/check_config_workflow/list.txt")

aclIgnorePath="./.acl-ignore"
if [ -d "client" ]
then
  aclIgnorePath="./client/.acl-ignore"
fi

while read line;
do
  read var1 var2 var3 <<< "$line"
  if grep -q $var1 $aclIgnorePath; then
    printf -- "$var1 in .acl-ignore, skipping...\n"
  else
    workingDir=$var2
    if [ ! -d "./client" ]
    then
      if [ "$var2" =~ "client/" ]
      then
        workingDir=${var2#"client/"}
      else
        workingDir=${var2#"client"}
      fi
    fi

    if [ $workingDir = "" ]
    then
      workingDir="."
    fi


    newLine="
      - name: Compare remote $var1 to local
        if: success() || failure()
        working-directory: $workingDir
        run: diff $var1 <(curl $var3)"
    echo "$newLine" >> ".github/workflows/check_config.yaml"
  fi
done < <(echo "$list")
