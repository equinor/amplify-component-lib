# Setup base
curl -s "https://raw.githubusercontent.com/equinor/amplify-component-lib/main/config/config_files/check_config_workflow/base.yaml" > ".github/workflows/check_config.yaml"

# Loop through the list from check_config/list.txt
list=$(curl -s "https://raw.githubusercontent.com/equinor/amplify-component-lib/main/config/config_files/check_config_workflow/list.txt")

for line in $list
do
  read -r var1 var2 var3 <<< "$line"
  printf -- "Checking $var1, $var2"
  if grep -q $var1 "./client/.acl-ignore"; then
    printf -- "$var1 in .acl-ignore, skipping...\n"
  else
    newLine="
      - name: Compare remote $var1 to local
        working-directory: $var2
        run: diff $var1 <(curl $var3)
    "
    echo "$newLine" >> ".github/workflows/check_config.yaml"
  fi
done
