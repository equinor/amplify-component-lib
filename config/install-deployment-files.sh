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

printf -- "Downloading .releaserc.cjs file...\n"
curl -s "https://raw.githubusercontent.com/equinor/amplify-components/main/config/release/.releaserc.cjs" > .releaserc.cjs

printf -- "Downloading release config folder...\n"
cd ./release || (mkdir release && cd ./release || return)
curl -s "https://raw.githubusercontent.com/equinor/amplify-components/main/config/release/groupMapping.cjs" > groupMapping.cjs

printf -- "Downloading release helper files...\n"
cd ./helpers || (mkdir helpers && cd ./helpers || return)
curl -s "https://raw.githubusercontent.com/equinor/amplify-components/main/config/release/helpers/groupedCommits.cjs" > groupedCommits.cjs

cd ..
printf -- "Downloading release template files...\n"
cd ./templates || (mkdir templates && cd ./templates || return)
curl -s "https://raw.githubusercontent.com/equinor/amplify-components/main/config/release/templates/commit-template.hbs" > commit-template.hbs
curl -s "https://raw.githubusercontent.com/equinor/amplify-components/main/config/release/templates/release-notes-template.hbs" > release-notes-template.hbs
