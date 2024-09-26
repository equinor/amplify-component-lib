#!/bin/bash

printf -- "Running frontend configuration script\n"
printf -- "-------------------------------------\n\n"

currentDir=$(basename "$PWD")

if [ $currentDir != "client" ]
then
  printf -- "Not in ./client folder, moving to it...\n"
  cd ./client || exit 1
fi

printf -- "Downloading config files...\n"

rootConfigFiles=$(curl -s "https://raw.githubusercontent.com/equinor/amplify-component-lib/main/config/config_list.txt")

for line in $rootConfigFiles
do
  fileName=$(echo $line | rev | cut -d '/' -f 1 | rev)
  if grep -q $fileName "./.acl-ignore"; then
    printf -- "$fileName in .acl-ignore, skipping...\n"
  else
    curl -s $line > $fileName
  fi
done

printf -- "Going into src folder...\n"

cd ./src || return

srcConfigFiles=$(curl -s "https://raw.githubusercontent.com/equinor/amplify-component-lib/main/config/src_config_list.txt")

for line in $srcConfigFiles
do
  fileName=$(echo $line | rev | cut -d '/' -f 1 | rev)
  if grep -q $fileName "../.acl-ignore"; then
    printf -- "$fileName in .acl-ignore, skipping...\n"
  else
    curl -s $line > $fileName
  fi
done

printf -- "Going into test-utils folder...\n"

cd ./test-utils || (mkdir test-utils && cd ./test-utils || return)

testUtilsConfigFiles=$(curl -s "https://raw.githubusercontent.com/equinor/amplify-component-lib/main/config/testutils_config_list.txt")

for line in $testUtilsConfigFiles
do
  fileName=$(echo $line | rev | cut -d '/' -f 1 | rev)
  if grep -q $fileName "../../.acl-ignore"; then
    printf -- "$fileName in .acl-ignore, skipping...\n"
  else
    curl -s $line > $fileName
  fi
done

printf -- "Going into proxy folder...\n"

cd ../..

cd ./proxy || (mkdir proxy && cd ./proxy || return)


proxyConfigFiles=$(curl -s "https://raw.githubusercontent.com/equinor/amplify-component-lib/main/config/testutils_config_list.txt")

for line in $proxyConfigFiles
do
  fileName=$(echo $line | rev | cut -d '/' -f 1 | rev)
  if grep -q $fileName "../.acl-ignore"; then
    printf -- "$fileName in .acl-ignore, skipping...\n"
  else
    curl -s $line > $fileName
  fi
done

cd ../..

printf -- "Going into root folder...\n"

printf -- "Downloading client github actions...\n"
workflowsList=$(curl -s "https://raw.githubusercontent.com/equinor/amplify-component-lib/main/config/github_actions_list.txt")

for line in $workflowsList
do
  fileName=$(echo $line | rev | cut -d '/' -f 1 | rev)
  if grep -q $fileName "./client/.acl-ignore"; then
    printf -- "$fileName in .acl-ignore, skipping...\n"
  else
    curl -s $line > ".github/workflows/$fileName"
  fi
done

printf -- "Generating .github/workflows/check_config.yaml...\n"
bash <(curl -s https://raw.githubusercontent.com/equinor/amplify-component-lib/main/config/config_files/check_config_workflow/generate_check_config.sh)

if grep -q "CODEOWNERS" "./client/.acl-ignore"; then
    printf -- "CODEOWNERS .acl-ignore, skipping...\n"
else
  printf -- "Downloading CODEOWNERS file...\n"
  curl -s "https://raw.githubusercontent.com/equinor/amplify-component-lib/main/config/config_files/CODEOWNERS" > .github/CODEOWNERS
fi

if grep -q ".pre-commit-config.yaml" "./client/.acl-ignore"; then
    printf -- ".pre-commit-config.yaml in .acl-ignore, skipping...\n"
else
  printf -- "Downloading .pre-commit-config.yaml file...\n"
  curl -s "https://raw.githubusercontent.com/equinor/amplify-component-lib/main/config/config_files/.pre-commit-config.yaml" > .pre-commit-config.yaml
fi
