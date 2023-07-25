/* eslint-disable */
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import {
  _BaseAddress,
  ClientResponse,
  Customer,
  CustomerSignInResult,
  InventoryEntry,
  InventoryEntryDraft,
  Product,
  ProductDraft,
  ProductPagedQueryResponse,
  ProductProjectionPagedQueryResponse,
  ProductType,
  ProductUpdate,
  QueryParam,
} from '@commercetools/platform-sdk';

declare class ApiRootBuilder {
  private constructor();

  apiRoot: ByProjectKeyRequestBuilder;

  static getApiRoot(): ApiRootBuilder;
}

declare class ProductWorker {
  constructor();

  static getProductsList(
    apiRoot: ByProjectKeyRequestBuilder,
    queryArgs?: {
      where?: string | string[];
      priceCurrency?: string;
      priceCountry?: string;
      priceCustomerGroup?: string;
      priceChannel?: string;
      localeProjection?: string | string[];
      expand?: string | string[];
      sort?: string | string[];
      limit?: number;
      offset?: number;
      withTotal?: boolean;
      [key: string]: QueryParam;
    },
  ): Promise<ClientResponse<ProductPagedQueryResponse>>;

  static getProductById(apiRoot: ByProjectKeyRequestBuilder, ID: string): Promise<ClientResponse<Product>>;

  static createProductType(
    apiRoot: ByProjectKeyRequestBuilder,
    body: {
      name: string;
      description: string;
    },
  ): Promise<ClientResponse<ProductType>>;

  static createProduct(
    apiRoot: ByProjectKeyRequestBuilder,
    methodArgs: {
      queryArgs?: {
        priceCurrency?: string;
        priceCountry?: string;
        priceCustomerGroup?: string;
        priceChannel?: string;
        localeProjection?: string | string[];
        expand?: string | string[];
        [key: string]: QueryParam;
      };
      body: ProductDraft;
      headers?: {
        [key: string]: string | string[];
      };
    },
  ): Promise<ClientResponse<Product>>;

  static addQuantity(
    apiRoot: ByProjectKeyRequestBuilder,
    methodArgs: {
      queryArgs?: {
        expand?: string | string[];
        [key: string]: QueryParam;
      };
      body: InventoryEntryDraft;
      headers?: {
        [key: string]: string | string[];
      };
    },
  ): Promise<ClientResponse<InventoryEntry>>;

  static unpublishProduct(
    apiRoot: ByProjectKeyRequestBuilder,
    product: ClientResponse<Product>,
    methodArgs: {
      queryArgs?: {
        priceCurrency?: string;
        priceCountry?: string;
        priceCustomerGroup?: string;
        priceChannel?: string;
        localeProjection?: string | string[];
        expand?: string | string[];
        [key: string]: QueryParam;
      };
      body: ProductUpdate;
      headers?: {
        [key: string]: string | string[];
      };
    },
  ): Promise<ClientResponse<Product>>;

  static deleteProduct(
    apiRoot: ByProjectKeyRequestBuilder,
    product: ClientResponse<Product>,
    methodArgs: {
      queryArgs: {
        priceCurrency?: string;
        priceCountry?: string;
        priceCustomerGroup?: string;
        priceChannel?: string;
        localeProjection?: string | string[];
        version: number;
        expand?: string | string[];
        [key: string]: QueryParam;
      };
      headers?: {
        [key: string]: string | string[];
      };
    },
  ): Promise<ClientResponse<Product>>;
}

declare class CustomerWorker {
  static createCustomer(
    apiRoot: ByProjectKeyRequestBuilder,
    customerDraft: {
      email: string;
      password?: string;
    },
  ): Promise<ClientResponse<CustomerSignInResult>>;

  static addAddress(
    apiRoot: ByProjectKeyRequestBuilder,
    newAddress: _BaseAddress,
    customer: ClientResponse<CustomerSignInResult>,
  ): Promise<ClientResponse<Customer>>;

  static getCustomerById(
    apiRoot: ByProjectKeyRequestBuilder,
    customer: ClientResponse<CustomerSignInResult>,
    methodArgs: {},
  ): Promise<ClientResponse<Customer>>;

  static deleteCustomer(
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
  ): Promise<ClientResponse<Customer>>;
}

declare function randomIntFromInterval(min: number, max: number): number;

declare module '@qavajs/steps-ctp' {
  export { ApiRootBuilder, ProductWorker, CustomerWorker, randomIntFromInterval };
}
