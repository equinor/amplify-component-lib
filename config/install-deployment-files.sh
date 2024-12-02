#!/bin/bash

printf -- "Running frontend configuration script\n"
printf -- "-------------------------------------\n\n"

if [ ! -d ".github" ]
then
  cd ..
fi

if [ ! -d ".github" ]
then
  printf -- "Couldn't found .github folder, stopping...n\n"
  exit 1
fi

printf -- "Downloading client github actions specific to deployment from github to radix...\n"
workflowsList=$(curl -s "https://raw.githubusercontent.com/equinor/amplify-component-lib/main/config/github_actions_deployment_list.txt")

for line in $workflowsList
do
  fileName=$(echo $line | rev | cut -d '/' -f 1 | rev)
  curl -s $line > ".github/workflows/$fileName"
done
