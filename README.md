
<img alt="intro-logo" src="https://raw.githubusercontent.com/equinor/amplify-component-lib/main/static/amplify.png" width="300px" />

[![SCM Compliance](https://scm-compliance-api.radix.equinor.com/repos/equinor/amplify-component-lib/badge)](https://scm-compliance-api.radix.equinor.com/repos/equinor/amplify-component-lib/badge)

This package contains components, utils, providers and hooks developed and used by the amplify team.

# Quick links

- [Storybook](https://storybook-amplify-components.app.radix.equinor.com/)

# Building amplify-component-lib

Build and publish is done automatically when code is merged into `main` branch, if the package.json version number is higher.

# Using config files from amplify-component-lib

1. Navigate to your projects root folder, `~/Projects/recap` for instance

2. Copy and run the following command

```bash
wget -q -O - https://raw.githubusercontent.com/equinor/amplify-component-lib/main/config/install.sh | bash
```

This should have downloaded the different config files to your project root folder.

If you want to ignore certain configuration files you can create a `.acl-ignore` file in the `client` folder in your project.

For example: `acquire/client/.acl-ignore`

```text
eslint.config.mjs
CODEOWNERS
pull_request.yaml
```

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

```text
project
│   README.md
│
└───client
│   |   ...
│
└───server
    │   ...
```

# Using [pre-commit](https://pre-commit.com/)

## Download and install pre-commit

Using python's pip to download pre-commit

```bash
pip install pre-commit
```

Using brew to download pre-commit

```bash
brew install pre-commit
```

finally install pre-commit

```bash
pre-commit
```

## Add config file, .pre-commit-config.yaml

Your `.pre-commit-config.yaml` file should look something like below

```yaml
repos:
  - repo: local
    hooks:
      - id: hadolint
        name: Lint Dockerfiles
        description: Runs hadolint to lint Dockerfiles
        language: system
        types: ['dockerfile']
        entry: hadolint
      - id: trufflehog
        name: TruffleHog
        description: Detect secrets in your data with TruffleHog.
        entry: trufflehog git file://. --since-commit HEAD --only-verified --fail
        language: golang
        pass_filenames: false
      - id: prettier
        name: Prettier
        description: Runs prettier on supported files
        language: system
        entry: 'npx prettier --check'
        files: .*\.jsx?$|.*\.tsx?$|.*\.ts?$
  - repo: https://github.com/pre-commit/mirrors-eslint
    rev: v9.9.0
    hooks:
      - id: eslint
        files: \.[jt]sx?$ # *.js, *.jsx, *.ts and *.tsx
        types: [file]
        additional_dependencies:
          - eslint@8.57.0
          - eslint-config-prettier@9.1.0
          - eslint-plugin-prettier@5.1.3
          - eslint-plugin-react@7.34.0
          - eslint-plugin-react-hooks@4.6.0
          - eslint-plugin-simple-import-sort@12.0.0

```

## Install hooks

When you have your config file in place you need to install the hooks

```bash
pre-commit install
```

## Dockerfile linting

We use [hadolint](https://github.com/hadolint/hadolint) to check that our docker file is using best practice.

### Install

In order to commit changes related to a dockerfile you need to have hadolint installed

#### CLI

On OSX you can use [brew](https://brew.sh/) to install:

```bash
brew install hadolint
```

On Windows you can use [scoop](https://github.com/lukesampson/scoop) to install:

```bash
scoop install hadolint
```

In any of these do not work then you can refer to the [installation section](https://github.com/hadolint/hadolint?tab=readme-ov-file#install) in hadolint's repository

#### VS Code

If you want to shorten the feedback loop when changing your dockerfile you can optionally add the [hadolint extension](https://github.com/michaellzc/vscode-hadolint) (Extension id: `exiasr.hadolint`)

#### WebStorm

Looks like it is [not available](https://youtrack.jetbrains.com/issue/IJPL-69780/Bundle-hadolint-a-Docker-linting-tool) for WebStorm at the moment

# Latest version

[![main](https://img.shields.io/npm/v/@equinor/amplify-component-lib?color=%23c3f3d2&label=%40equinor%2Famplify-component-lib&logo=npm&)](https://www.npmjs.com/package/@equinor/amplify-component-lib)
