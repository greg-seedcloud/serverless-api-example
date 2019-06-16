// noinspection JSUnusedLocalSymbols,JSUnresolvedFunction
const awsParamStore = require('aws-param-store');

// Config values set with following priority: environment variable, AWS param store value, default value
const ENVIRONMENT = setValue('STAGE', null, 'local');
const DYNAMO_TABLE_NAME = setValue('DYNAMODB_TABLE', 'dynamoTableName',
    'price');
const DEFAULT_CHANNEL = 'UK';
const DEFAULT_CURRENCY = 'GBP';

// Validate mandatory config values
requireStr(ENVIRONMENT, 'Environment');
requireStr(DYNAMO_TABLE_NAME, 'DynamoDB table name');

function setValue(env, paramStorePath, defaultValue) {
  // noinspection JSUnresolvedVariable
  if (env && process.env.hasOwnProperty(env)) {
    // noinspection JSUnresolvedVariable
    return process.env[env].toString().trim();
  } else if (paramStorePath) {
    let p = null; // awsParamStore.getParameterSync(paramStorePath);
    if (p) {
      return p;
    }
  }
  return defaultValue;
}

// Checks that a given config value is set, otherwise kills the current process
function requireStr(value, name) {
  if (!value || value === '') {
    console.error(`Required value ${name} is not set`);
    // noinspection JSUnresolvedVariable
    process.exit(2);
  }
}

module.exports = {
  ENVIRONMENT,
  DYNAMO_TABLE_NAME,
  DEFAULT_CHANNEL,
  DEFAULT_CURRENCY,
};
