#!/bin/bash

printf "Running frontend configuration script\n\n"

currentDir=$(basename "$PWD")

if [ $currentDir != "client" ]
then
  printf "Not in ./client folder, moving to it..."
  cd ./client || exit 1
fi

printf "Downloading config files...\n\n"
wget -i https://raw.githubusercontent.com/equinor/amplify-components/main/config/config_list.txt

cd ..

printf "Downloading client github action...\n\n"
wget -P ./github/workflows https://raw.githubusercontent.com/equinor/amplify-components/main/config/client.yaml