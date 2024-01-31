#!/bin/bash

printf -- "Running frontend configuration script\n"
printf -- "-------------------------------------\n\n"

currentDir=$(basename "$PWD")

if [ $currentDir != "client" ]
then
  printf -- "Not in ./client folder, moving to it...\n"
  cd ./client || exit 1
fi

cd ..

printf -- "Downloading client github actions specific to deployment from github to radix...\n"
workflowsList=$(curl -s "https://raw.githubusercontent.com/equinor/amplify-components/main/config/github_actions_deployment_list.txt")

for line in $workflowsList
do
  fileName=$(echo $line | rev | cut -d '/' -f 1 | rev)
  curl -s $line > ".github/workflows/$fileName"
done
