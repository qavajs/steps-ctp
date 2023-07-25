import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { config } from 'dotenv';
import { ctpClient } from './ctpClientBuilder';

config();

const PROJECT_KEY = process.env.projectKey || 'invalid_key';

const projectKey = PROJECT_KEY;

export class ApiRootBuilder {
  // eslint-disable-next-line no-use-before-define
  private static instance: ApiRootBuilder;
  public apiRoot: ByProjectKeyRequestBuilder;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {
    this.apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey });
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getApiRoot(): ApiRootBuilder {
    if (!ApiRootBuilder.instance) {
      ApiRootBuilder.instance = new ApiRootBuilder();
    }

    return ApiRootBuilder.instance;
  }
}
