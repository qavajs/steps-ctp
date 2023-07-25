import {
  ClientResponse,
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
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

export class ProductWorker {
  static async getProductsList(
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
  ): Promise<ClientResponse<ProductPagedQueryResponse>> {
    return apiRoot
      .products()
      .get({
        queryArgs,
      })
      .execute();
  }

  static async getProductById(apiRoot: ByProjectKeyRequestBuilder, ID: string): Promise<ClientResponse<Product>> {
    return apiRoot.products().withId({ ID }).get()
.execute();
  }

  static async createProductType(
    apiRoot: ByProjectKeyRequestBuilder,
    body: {
      name: string;
      description: string;
    },
  ): Promise<ClientResponse<ProductType>> {
    return apiRoot
      .productTypes()
      .post({
        body,
      })
      .execute();
  }

  static async createProduct(
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
  ): Promise<ClientResponse<Product>> {
    return apiRoot.products().post(methodArgs).execute();
  }

  static async addQuantity(
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
  ): Promise<ClientResponse<InventoryEntry>> {
    return apiRoot.inventory().post(methodArgs).execute();
  }

  static async unpublishProduct(
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
  ): Promise<ClientResponse<Product>> {
    return apiRoot.products().withId({ ID: product.body.id }).post(methodArgs)
.execute();
  }

  static async deleteProduct(
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
  ): Promise<ClientResponse<Product>> {
    return apiRoot.products().withId({ ID: product.body.id }).delete(methodArgs)
.execute();
  }
}
