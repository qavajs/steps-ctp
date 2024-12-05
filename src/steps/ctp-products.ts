import { When } from '@cucumber/cucumber';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { MemoryValue } from '@qavajs/core';
import { ProductWorker } from '../ctp-utils/ctpProductsWorker';
import { ApiRootBuilder } from '../ctp-utils/ctpApiRootCreator';

const INSTANCE = ApiRootBuilder.getApiRoot();

When('I save {string} products from ctp as {string}', async function (productsCountAlias: MemoryValue, keyToRemember: MemoryValue) {
  const productsCount = await productsCountAlias.value();
  const apiRoot: ByProjectKeyRequestBuilder = INSTANCE.apiRoot;
  const productsResponse = await ProductWorker.getProductsList(apiRoot, { limit: Number.parseInt(productsCount, 10) });
  keyToRemember.set(productsResponse);
});

When('I expect ctp products {value} contains {value}', async function (keyAlias: MemoryValue, valueAlias: MemoryValue) {
  const products = await keyAlias.value();
});

When('I create new Product Type with {value} data and save it as {value}', async function (dataAlias: MemoryValue, keyToRemember: MemoryValue) {
  const apiRoot: ByProjectKeyRequestBuilder = INSTANCE.apiRoot;
  const parsedData = await dataAlias.value();
  const createdProductTypesResponse = await ProductWorker.createProductType(apiRoot, parsedData);
  keyToRemember.set(createdProductTypesResponse);
});

When('I create new Product with {value} data and save it as {value}', async function (dataAlias: MemoryValue, keyToRemember: MemoryValue) {
  const apiRoot: ByProjectKeyRequestBuilder = INSTANCE.apiRoot;
  const parsedData = await dataAlias.value();
  const productsResponse = await ProductWorker.createProduct(apiRoot, { body: parsedData });
  keyToRemember.set(productsResponse);
});

When('I add {value} quantity in stock for {value} product', async function (quantityAlias: MemoryValue, productAlias: MemoryValue) {
  const apiRoot: ByProjectKeyRequestBuilder = INSTANCE.apiRoot;
  const quantity = await quantityAlias.value();
  const createdProduct = await productAlias.value();
  await ProductWorker.addQuantity(apiRoot, {
    body: {
      sku: createdProduct.body.key,
      key: createdProduct.body.key,
      quantityOnStock: Number.parseInt(quantity, 10),
    },
  });
});

When('I unpublish {value} product', async function (productAlias: MemoryValue) {
  const apiRoot: ByProjectKeyRequestBuilder = INSTANCE.apiRoot;
  const createdProduct = await productAlias.value();
  const productResponse = await ProductWorker.getProductById(apiRoot, createdProduct.body.id);
  await ProductWorker.unpublishProduct(apiRoot, createdProduct, {
    body: {
      version: productResponse.body.version,
      actions: [{ action: 'unpublish' }],
    },
  });
});

When('I delete {value} product', async function (productAlias: MemoryValue) {
  const apiRoot: ByProjectKeyRequestBuilder = INSTANCE.apiRoot;
  const createdProduct = await productAlias.value();
  const productResponse = await ProductWorker.getProductById(apiRoot, createdProduct.body.id);
  await ProductWorker.deleteProduct(apiRoot, createdProduct, {
    queryArgs: {
      version: productResponse.body.version,
    },
  });
});
