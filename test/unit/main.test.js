const sinon = require('sinon');
const expect = require("chai").expect;
const main = require("../../src/main");
const PriceService = require("../../src/PriceService");

describe("Main", function() {

  beforeEach(()=>{
    // TODO: other test setup
  });

  afterEach(()=>{
    sinon.restore();
  });

  describe("getPrice", function() {

    it("should return HTTP 200 if item found", async function() {
      createPriceServiceStub("getPrice", { itemId: 1, channel: "UK", currency: "GBP", price: 500 });
      const price = await main.getPrice("1", "UK", "GBP");
      expect(price.statusCode).to.equal(200);
    });

    it("should return 404 if item not found", async function() {
      createPriceServiceStub("getPrice", null).throws(new Error("Item not found: 1"));
      const price = await main.getPrice("4", "UK", "GBP");
      expect(price.statusCode).to.equal(404);
    });

    // TODO: test getPrice or getPrices called based on itemId param
    // TODO: test scenarios for getPrices

  });

  function createPriceServiceStub(method, returnData){
    return sinon.stub(PriceService.prototype, method).returns({
      promise: function () { return Promise.resolve(returnData); }
    });
  }

});
