const PriceService = require('./PriceService');

module.exports.getPrice = async (itemId, channel, currency) => {
  try {

    // console.log("GETPRICE CALLED", itemId, channel, currency);

    let priceInfo;
    let priceInfoStr;
    let priceService = new PriceService();

    if (itemId) {
      priceInfo = await priceService.getPrice(itemId, channel, currency);
      priceInfoStr = `Price for item ${priceInfo.itemId} in ${priceInfo.channel} is ${priceInfo.price}${priceInfo.currency}`;
    } else {
      priceInfo = await priceService.getPrices(channel, currency);
      priceInfoStr = `${priceInfo.itemCount} prices found in ${priceInfo.channel} for ${priceInfo.currency}`;
    }

    return {
      statusCode: 200,
      body: JSON.stringify(priceInfoStr),
    };

  } catch (e) {

    // TODO: handle the following based on error type
    // 400: bad request (invalid input)
    // 401: unauthorised
    // 404: not found
    // 500: other/unknown error

    let statusCode = 500;
    if (e.message.startsWith('Item not found')) {
      statusCode = 404;
    }

    if (statusCode !== 404) {
      console.log('ERROR', e);
    }

    return {
      statusCode: statusCode,
      body: JSON.stringify(e.message),
    };

  }
};
