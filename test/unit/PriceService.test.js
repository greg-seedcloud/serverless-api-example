const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;
const sinon = require('sinon');

const PriceService = require("../../src/PriceService");
const AWS = require('aws-sdk');

describe("PriceService", function() {

  let priceService = new PriceService();

  before(()=>{
    // TODO: other test setup
  });

  afterEach(()=>{
    sinon.restore();
  });

  describe("getPrice", function() {

    it("should return the right values", async function() {
      createDynamoStub('get', { Item: { price: 2 } });
      const expected = { itemId: "1", channel: "AUS", currency: "CHF", price: 2 };
      const price = await priceService.getPrice("1", "AUS", "CHF");
      expect(price).to.deep.equal(expected);
    });

    it("should error if item not found", async function() {
      createDynamoStub('get', null);
      await expect(priceService.getPrice("1", "AUS", "CHF")).to.be.rejectedWith("Item not found");
    });

  });
  
  describe("getPrices", function() {

    it("should return the correct count of values", async function() {
      createDynamoStub('scan', { 
        Items: [ { price: '5', id: '1' },
                 { price: '10', id: '2' },
                 { price: '15', id: '3' } ],
      });

      const expected = { channel: "AUS", currency: "CHF", itemCount: 3 };
      const price = await priceService.getPrices("AUS", "CHF");
      expect(price).to.deep.equal(expected);
    });

    it("should not error if no items found", async function() {
      createDynamoStub('scan', null);
      const price = await expect(priceService.getPrices("AUS", "CHF")).to.not.be.rejected;
      expect(price.itemCount).to.equal(0);
    });

  });

  function createDynamoStub(method, returnData){
    sinon.stub(AWS.DynamoDB.DocumentClient.prototype, method).returns({
      promise: function () { return Promise.resolve(returnData); }
    });
  }

});