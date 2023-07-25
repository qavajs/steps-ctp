/* eslint-disable @typescript-eslint/no-var-requires */
require('./lib/types.js');
require('./lib/steps/ctp-products.js');
require('./lib/steps/ctp-customer.js');
const { ApiRootBuilder } = require('./lib/ctp-utils/ctpApiRootCreator.js');
const { ProductWorker } = require('./lib/ctp-utils/ctpProductsWorker.js');
const { CustomerWorker } = require('./lib/ctp-utils/ctpCustomerWorker.js');
const { randomIntFromInterval } = require('./lib/utils/utils.js');

module.exports = {
  ApiRootBuilder,
  ProductWorker,
  CustomerWorker,
  randomIntFromInterval,
};
