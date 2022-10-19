#!/bin/bash

printf -- "Running frontend configuration script"
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

printf -- "Downloading nginx.conf proxy config...\n"

cd ./proxy || (mkdir proxy && cd ./proxy || return)

curl -s "https://raw.githubusercontent.com/equinor/amplify-components/main/config/config_files/nginx.conf" > nginx.conf

cd ../..

printf -- "Downloading client github action...\n"
curl -s "https://raw.githubusercontent.com/equinor/amplify-components/main/config/config_files/client.yaml" > .github/workflows/client.yaml
