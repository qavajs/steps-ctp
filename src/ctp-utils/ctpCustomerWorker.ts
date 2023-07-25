import { _BaseAddress, ClientResponse, Customer, CustomerSignInResult, QueryParam } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

export class CustomerWorker {
  static async createCustomer(
    apiRoot: ByProjectKeyRequestBuilder,
    customerDraft: {
      email: string;
      password?: string;
    },
  ): Promise<ClientResponse<CustomerSignInResult>> {
    return apiRoot
      .customers()
      .post({
        body: customerDraft,
      })
      .execute();
  }

  static async addAddress(
    apiRoot: ByProjectKeyRequestBuilder,
    newAddress: _BaseAddress,
    customer: ClientResponse<CustomerSignInResult>,
  ): Promise<ClientResponse<Customer>> {
    return apiRoot
      .customers()
      .withId({ ID: customer.body.customer.id })
      .post({
        body: {
          version: customer.body.customer.version,
          actions: [
            {
              action: 'addAddress',
              address: newAddress,
            },
          ],
        },
      })
      .execute();
  }

  static async getCustomerById(
    apiRoot: ByProjectKeyRequestBuilder,
    customer: ClientResponse<CustomerSignInResult>,
    methodArgs: object,
  ): Promise<ClientResponse<Customer>> {
    return apiRoot.customers().withId({ ID: customer.body.customer.id }).get()
.execute();
  }

  static async deleteCustomer(
    apiRoot: ByProjectKeyRequestBuilder,
    customer: ClientResponse<Customer>,
    methodArgs: {
      queryArgs: {
        dataErasure?: boolean;
        version: number;
        expand?: string | string[];
        [key: string]: QueryParam;
      };
      headers?: {
        [key: string]: string | string[];
      };
    },
  ): Promise<ClientResponse<Customer>> {
    return apiRoot.customers().withId({ ID: customer.body.id }).delete(methodArgs)
.execute();
  }
}
