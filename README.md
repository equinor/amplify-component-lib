
<img alt="intro-logo" src="https://raw.githubusercontent.com/equinor/amplify-component-lib/main/static/amplify_logo.png" width="300px" />

This package contains components, utils, providers and hooks developed and used by the amplify team.

# Quick links
- [Storybook](https://storybook-amplify-component-lib.app.radix.equinor.com/)

# Building amplify-component-lib

Build and publish is done automatically when code is merged into `main` branch, if the package.json version number is higher.
To increase the version number use `npm run version <type>` and specify what type of [versioning](https://github.com/theogravity/version-bump#quick-start-usage).

# Using config files from amplify-component-lib

1. Navigate to your projects root folder, `~/Projects/recap` for instance

2. Copy and run the following command
```bash
wget -q -O - https://raw.githubusercontent.com/equinor/amplify-component-lib/main/config/install.sh | bash
```


This should have downloaded the `.eslintrc.cjs`, `.prettierignore`, `.prettierrc.jr`, `tsconfig.json`, `env.sh`, `Dockerfile`, `proxy/nginx.conf`, `proxy/securityheaders.conf` and github actions workflow files

# Using github action workflows related to deploying from github from amplify-component-lib

1. Navigate to your projects root folder, `~/Projects/recap` for instance

2. Copy and run the following command
```bash
wget -q -O - https://raw.githubusercontent.com/equinor/amplify-component-lib/main/config/install-deployment-files.sh | bash
```

This should have downloaded the `build_deploy_radix.yaml`, `promote.yaml`, `notify.yaml`, `push.yaml`

NOTE: These files should eventually be served from the same install script we use for getting other config files. We serve it from a different script so that applications which are not ready for the change in deployment process don't have to rush.

## Notes

This script assumes the following structure in the project
```
project
│   README.md
│
└───client
│   |   ...
│   
└───server
    │   ...
```

# Installing pre-commit hook in an application

1. Navigate to your projects root folder, `~/Projects/recap` for instance

2. Copy and run the following command
```bash
wget -q -O - https://raw.githubusercontent.com/equinor/amplify-component-lib/main/config/precommit/install.sh | bash
```

This should have downloaded a `package.json` file in the root of the project, created (if it didn't exist) the `tooling` folder.
You should also see a `.husky` folder in the root of the project with a file called `pre-commit` inside

# Latest version
[![main](https://img.shields.io/npm/v/@equinor/amplify-component-lib?color=%23c3f3d2&label=%40equinor%2Famplify-component-lib&logo=npm&)](https://www.npmjs.com/package/@equinor/amplify-component-lib)