import { When } from '@cucumber/cucumber';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { ClientResponse, Customer, CustomerSignInResult } from '@commercetools/platform-sdk';
import { type MemoryValue } from '@qavajs/core';
import { CustomerWorker } from '../ctp-utils/ctpCustomerWorker';
import { ApiRootBuilder } from '../ctp-utils/ctpApiRootCreator';

const randomString: (length: number) => string = (length: number): string => (Math.random() + 1).toString(36).substring(length);
const INSTANCE = ApiRootBuilder.getApiRoot();

When(
  'I create new Customer with base email {value} and password {value} and save data as {value}',
  async function (mailAlias: MemoryValue, passwordAlias: MemoryValue, customerKey: MemoryValue) {
    const baseEmail = await mailAlias.value();
    const password = await passwordAlias.value();
    const apiRoot: ByProjectKeyRequestBuilder = INSTANCE.apiRoot;
    const customerResponse: ClientResponse<CustomerSignInResult> = await CustomerWorker.createCustomer(apiRoot, {
      email: `${randomString(5)}_${baseEmail}`,
      password,
    });
    customerKey.set(customerResponse);
  },
);

When('I add address {value} to the customer {value} account', async function (addressAlas: MemoryValue, customerAlias: MemoryValue) {
  const apiRoot: ByProjectKeyRequestBuilder = INSTANCE.apiRoot;
  const createdCustomer: ClientResponse<CustomerSignInResult> = await customerAlias.value();
  const parsedAddress = await addressAlas.value();
  await CustomerWorker.addAddress(apiRoot, parsedAddress, createdCustomer);
});

When('I get {value} customer and save details as {value}', async function (customer: MemoryValue, keyToRemember: MemoryValue) {
  const apiRoot: ByProjectKeyRequestBuilder = INSTANCE.apiRoot;
  const createdCustomer: ClientResponse<CustomerSignInResult> = await customer.value();
  const customerResponse: ClientResponse<Customer> = await CustomerWorker.getCustomerById(apiRoot, createdCustomer, {
    queryArgs: {
      version: createdCustomer.body.customer.version,
    },
  });
  keyToRemember.set(customerResponse);
});

When('I delete {value} customer', async function (customerAlias: MemoryValue) {
  const apiRoot: ByProjectKeyRequestBuilder = INSTANCE.apiRoot;
  const createdCustomer: ClientResponse<Customer> = await customerAlias.value();
  await CustomerWorker.deleteCustomer(apiRoot, createdCustomer, {
    queryArgs: {
      version: createdCustomer.body.version,
    },
  });
});
