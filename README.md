# Serverless API Example

A very basic Price API template for building simple Lambda functions in NodeJs using the Serverless Framework.

## Setup and Installation

**AWS**
- Get AWS credentials with at least the [permissions required for Serverless deployment](https://gist.github.com/ServerlessBot/7618156b8671840a539f405dea2704c8)
- Install [AWS Cli tools](https://docs.aws.amazon.com/cli/latest/userguide/install-windows.html)
- Use aws configure to setup local credentials profile and region [guide](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)

**Node and Serverless framework**
- Guidance [here](https://serverless.com/framework/docs/providers/aws/guide/installation/)

**Setup the code**

- Clone this repo
- Launch a terminal in the root folder
- Install all dependencies:

```sh
$ yarn install
```

## Running the code

Run locally (browse to http://localhost:3000 to try the API)

```sh
$ yarn runlocal
```

Running unit tests:

```sh
$ yarn test
```

Running integration tests (requires running server; `yarn runlocal` in other window):

```sh
$ yarn itest
```

Play with offline DynamoDB: http://localhost:8001/shell/

Deploying to AWS
```sh
$ yarn deploy
```

Remote tail of lambda functions running in AWS:
```sh
$ yarn taillog <functionName>
```

Note: `serverless` in the commands above can be used interchangeably with `sls` for brevity.
