
<img alt="intro-logo" src="https://raw.githubusercontent.com/equinor/amplify-components/main/static/amplify_logo.png" width="300px" />

This package contains components, utils, providers and hooks developed and used by the amplify team.

# Quick links
- [Storybook](https://storybook-amplify-components.app.radix.equinor.com/)

# Building amplify-components

Build and publish is done automatically when code is merged into `main` branch, if the package.json version number is higher.
To increase the version number use `yarn run version <type>` and specify what type of [versioning](https://github.com/theogravity/version-bump#quick-start-usage).

# Using config files from amplify-components

1. Navigate to your projects root folder, `~/Projects/recap` for instance

2. Copy and run the following command
```bash
wget -q -O - https://raw.githubusercontent.com/equinor/amplify-components/main/config/install.sh | bash
```


This should have downloaded the `.eslintrc.cjs`, `.prettierignore`, `.prettierrc.jr`, `tsconfig.json`, `.yarnrc.yml`, `env.sh`, `Dockerfile`, `proxy/nginx.conf`, `proxy/securityheaders.conf` and `client.yaml` files

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
wget -q -O - https://raw.githubusercontent.com/equinor/amplify-components/main/config/precommit/install.sh | bash
```

This should have downloaded a `package.json` file in the root of the project, created (if it didn't exist) the `tooling` folder.
You should also see a `.husky` folder in the root of the project with a file called `pre-commit` inside

# Latest version
[![main](https://img.shields.io/npm/v/@equinor/amplify-components?color=%23c3f3d2&label=%40equinor%2Famplify-components&logo=npm&)](https://www.npmjs.com/package/@equinor/amplify-components)