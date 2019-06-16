const main = require('./main');

module.exports.getPrice = async (event, context) => {
  let itemId   = getPathParam(event, "id");
  let channel  = getQueryParam(event, "channel");
  let currency = getQueryParam(event, "currency");
  return await main.getPrice(itemId, channel, currency)
};

function getPathParam(event, name){
  return (event.pathParameters && event.pathParameters[name]) ? event.pathParameters[name] : null;
}

function getQueryParam(event, name){
  return (event.queryStringParameters && event.queryStringParameters[name]) ? event.queryStringParameters[name] : null;
}