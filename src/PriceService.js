// noinspection JSUnresolvedFunction
const DynamoDB = require('aws-sdk/clients/dynamodb');
// noinspection JSUnresolvedFunction
const config = require('./config');

class PriceService {

  constructor() {
    // noinspection JSUnresolvedVariable
    const options = process.env.IS_OFFLINE ?
        {region: 'localhost', endpoint: 'http://localhost:8001'} :
        {};
    this.dynamoDb = new DynamoDB.DocumentClient(options);
  }

  async getPrices(channel, currency) {
    // TODO: validate params, mandatory, data type, range etc.
    if (!channel) {
      channel = config.DEFAULT_CHANNEL;
    }
    if (!currency) {
      currency = config.DEFAULT_CURRENCY;
    }

    const queryParams = {
      TableName: config.DYNAMO_TABLE_NAME,
    };
    const data = await this.dynamoDb.scan(queryParams).promise();

    return {
      channel: channel,
      currency: currency,
      itemCount: (data && data.Items) ? data.Items.length : 0,
    };
  }

  async getPrice(itemId, channel, currency) {
    // TODO: validate params, mandatory, data type, range etc.
    if (!channel) {
      channel = config.DEFAULT_CHANNEL;
    }
    if (!currency) {
      currency = config.DEFAULT_CURRENCY;
    }
    if (!itemId) throw new Error('Invalid input. Item id required');

    const queryParams = {
      TableName: config.DYNAMO_TABLE_NAME,
      Key: {
        id: itemId,
      },
    };

    const data = await this.dynamoDb.get(queryParams).promise();

    if (data && data.Item) {
      return {
        itemId: itemId,
        channel: channel,
        currency: currency,
        price: data.Item.price,
      };
    } else {
      throw new Error('Item not found: ' + itemId);
    }
  }
}

module.exports = PriceService;
