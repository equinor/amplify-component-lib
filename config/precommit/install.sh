#!/bin/bash

printf -- ' 🔨 Running install script for frontend pre-commit\n'
printf -- '--------------------------------------------------\n\n'

if [ ! -d "client" ]
then
  printf -- "Couldn't find ./client folder, are you in the root folder of the project? 🤖\n"
  exit 1
fi

if [ ! -d "server" ]
then
  printf -- "Couldn't find ./server folder, are you in the root folder of the project? 🤖\n"
  exit 1
fi

if [ ! -d "tooling" ]
then
  mkdir tooling
fi

cd ./tooling || exit 1

printf -- "Downloading files needed to run pre-commit...\n"

configList=$(curl -s "https://raw.githubusercontent.com/equinor/amplify-components/main/config/precommit/config_list.txt")

for line in $configList
do
  fileName=$(echo $line | rev | cut -d '/' -f 1 | rev)
  curl -s $line > $fileName
done

cd ..

printf -- "Downloading root package.json file used for pre-commit...\n"

curl -s "https://raw.githubusercontent.com/equinor/amplify-components/main/config/precommit/package.json" > package.json

printf -- "Running husky setup...\n"

npm install

npm run prepare

if [ ! -d ".husky" ]
then
  printf -- "Couldn't find ./husky folder, did 'npm run prepare' run successfully? 🤖\n"
  exit 1
fi

cd ./.husky || exit 1

printf -- "Downloading pre-commit husky action...\n"

curl -s "https://raw.githubusercontent.com/equinor/amplify-components/main/config/precommit/pre-commit" > pre-commit

printf -- "Making the pre-commit file executable...\n"

chmod +x pre-commit

printf -- 'Pre-commit installed successfully! 🎉 '
