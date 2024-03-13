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

configList=$(curl -s "https://raw.githubusercontent.com/equinor/amplify-components/main/config/config_list.txt")

for line in $configList
do
  fileName=$(echo $line | rev | cut -d '/' -f 1 | rev)
  curl -s $line > $fileName
done

cd ./src || return

printf -- "Downloading setupLocalhost.mjs file...\n"

curl -s "https://raw.githubusercontent.com/equinor/amplify-components/main/config/config_files/setupLocalhost.mjs" > setupLocalhost.mjs

printf -- "Downloading vite.env.d.ts file...\n"

curl -s "https://raw.githubusercontent.com/equinor/amplify-components/main/config/config_files/vite-env.d.ts" > vite-env.d.ts

printf -- "Going into test-utils folder...\n"

cd ./test-utils || (mkdir test-utils && cd ./test-utils || return)

printf -- "Downloading setupTests.ts file...\n"

curl -s "https://raw.githubusercontent.com/equinor/amplify-components/main/config/config_files/test-utils/setupTests.ts" > setupTests.ts

printf -- "Downloading mockLocalStorage.ts file...\n"

curl -s "https://raw.githubusercontent.com/equinor/amplify-components/main/config/config_files/test-utils/mockLocalStorage.ts" > mockLocalStorage.ts

printf -- "Downloading utils.ts file...\n"

curl -s "https://raw.githubusercontent.com/equinor/amplify-components/main/config/config_files/test-utils/utils.ts" > utils.ts

printf -- "Downloading playwright.ts file...\n"

curl -s "https://raw.githubusercontent.com/equinor/amplify-components/main/config/config_files/test-utils/playwright.ts" > playwright.ts

printf -- "Downloading portalMock.ts file...\n"

curl -s "https://raw.githubusercontent.com/equinor/amplify-components/main/config/config_files/test-utils/portalMock.ts" > portalMock.ts

cd ../..

printf -- "Downloading nginx.conf proxy config...\n"

cd ./proxy || (mkdir proxy && cd ./proxy || return)

curl -s "https://raw.githubusercontent.com/equinor/amplify-components/main/config/config_files/nginx.conf" > nginx.conf

printf -- "Downloading securityheaders.conf proxy config...\n"

curl -s "https://raw.githubusercontent.com/equinor/amplify-components/main/config/config_files/securityheaders.conf" > securityheaders.conf

cd ../..

printf -- "Downloading client github actions...\n"
workflowsList=$(curl -s "https://raw.githubusercontent.com/equinor/amplify-components/main/config/github_actions_list.txt")

for line in $workflowsList
do
  fileName=$(echo $line | rev | cut -d '/' -f 1 | rev)
  curl -s $line > ".github/workflows/$fileName"
done

printf -- "Downloading CODEOWNERS file...\n"
curl -s "https://raw.githubusercontent.com/equinor/amplify-components/main/config/config_files/CODEOWNERS" > .github/CODEOWNERS