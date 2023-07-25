import { When } from '@cucumber/cucumber';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import memory from '@qavajs/memory';
import { ProductWorker } from '../ctp-utils/ctpProductsWorker';

When('I save {string} products from ctp as {string}', async function (productsCount: string, keyToRemember: string) {
  const apiRoot: ByProjectKeyRequestBuilder = await memory.getValue('$ctpApiRoot');
  const productsResponse = await ProductWorker.getProductsList(apiRoot, { limit: Number.parseInt(productsCount, 10) });
  memory.setValue(keyToRemember, productsResponse);
});

When('I expect ctp products {string} contains {string}', async function (key: string, value: string) {
  const products = await memory.getValue(key);
});

When('I create new Product Type with {string} data and save it as {string}', async function (data: any, keyToRemember: string) {
  const apiRoot: ByProjectKeyRequestBuilder = await memory.getValue('$ctpApiRoot');
  const parsedData = await memory.getValue(data);
  const createdProductTypesResponse = await ProductWorker.createProductType(apiRoot, parsedData);
  memory.setValue(keyToRemember, createdProductTypesResponse);
});

When('I create new Product with {string} data and save it as {string}', async function (data: any, keyToRemember: string) {
  const apiRoot: ByProjectKeyRequestBuilder = await memory.getValue('$ctpApiRoot');
  const parsedData = await memory.getValue(data);
  const productsResponse = await ProductWorker.createProduct(apiRoot, { body: parsedData });
  memory.setValue(keyToRemember, productsResponse);
});

When('I add {string} quantity in stock for {string} product', async function (quantity: string, product: string) {
  const apiRoot: ByProjectKeyRequestBuilder = await memory.getValue('$ctpApiRoot');
  const createdProduct = await memory.getValue(product);
  await ProductWorker.addQuantity(apiRoot, {
    body: {
      sku: createdProduct.body.key,
      key: createdProduct.body.key,
      quantityOnStock: Number.parseInt(quantity, 10),
    },
  });
});

When('I unpublish {string} product', async function (product: string) {
  const apiRoot: ByProjectKeyRequestBuilder = await memory.getValue('$ctpApiRoot');
  const createdProduct = await memory.getValue(product);
  const productResponse = await ProductWorker.getProductById(apiRoot, createdProduct.body.id);
  await ProductWorker.unpublishProduct(apiRoot, createdProduct, {
    body: {
      version: productResponse.body.version,
      actions: [{ action: 'unpublish' }],
    },
  });
});

When('I delete {string} product', async function (product: string) {
  const apiRoot: ByProjectKeyRequestBuilder = await memory.getValue('$ctpApiRoot');
  const createdProduct = await memory.getValue(product);
  const productResponse = await ProductWorker.getProductById(apiRoot, createdProduct.body.id);
  await ProductWorker.deleteProduct(apiRoot, createdProduct, {
    queryArgs: {
      version: productResponse.body.version,
    },
  });
});
