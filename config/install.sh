#!/bin/bash

printf -- "Running frontend configuration script\n\n"

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
  curl $line > $fileName
done

cd ..

printf -- "Downloading client github action...\n"
curl "https://raw.githubusercontent.com/equinor/amplify-components/main/config/client.yaml" > .github/workflows/client.yaml
