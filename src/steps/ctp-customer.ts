import { When } from '@cucumber/cucumber';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import memory from '@qavajs/memory';
import { ClientResponse, Customer, CustomerSignInResult } from '@commercetools/platform-sdk';
import { CustomerWorker } from '../ctp-utils/ctpCustomerWorker';
import { ApiRootBuilder } from '../ctp-utils/ctpApiRootCreator';

const randomString: (length: number) => string = (length: number): string => (Math.random() + 1).toString(36).substring(length);
const INSTANCE = ApiRootBuilder.getApiRoot();

When(
  'I create new Customer with base email {string} and password {string} and save data as {string}',
  async function (baseEmail: string, password: string, customerKey: string) {
    const apiRoot: ByProjectKeyRequestBuilder = INSTANCE.apiRoot;
    const customerResponse: ClientResponse<CustomerSignInResult> = await CustomerWorker.createCustomer(apiRoot, {
      email: `${randomString(5)}_${baseEmail}`,
      password,
    });
    await memory.setValue(customerKey, customerResponse);
  },
);

When('I add address {string} to the customer {string} account', async function (address: any, customer: string) {
  const apiRoot: ByProjectKeyRequestBuilder = INSTANCE.apiRoot;
  const createdCustomer: ClientResponse<CustomerSignInResult> = await memory.getValue(customer);
  const parsedAddress = await memory.getValue(address);
  await CustomerWorker.addAddress(apiRoot, parsedAddress, createdCustomer);
});

When('I get {string} customer and save details as {string}', async function (customer: string, keyToRemember: string) {
  const apiRoot: ByProjectKeyRequestBuilder = INSTANCE.apiRoot;
  const createdCustomer: ClientResponse<CustomerSignInResult> = await memory.getValue(customer);
  const customerResponse: ClientResponse<Customer> = await CustomerWorker.getCustomerById(apiRoot, createdCustomer, {
    queryArgs: {
      version: createdCustomer.body.customer.version,
    },
  });
  await memory.setValue(keyToRemember, customerResponse);
});

When('I delete {string} customer', async function (customer: string) {
  const apiRoot: ByProjectKeyRequestBuilder = INSTANCE.apiRoot;
  const createdCustomer: ClientResponse<Customer> = await memory.getValue(customer);
  await CustomerWorker.deleteCustomer(apiRoot, createdCustomer, {
    queryArgs: {
      version: createdCustomer.body.version,
    },
  });
});
