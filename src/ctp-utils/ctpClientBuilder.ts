import fetch from 'node-fetch';
import {
  ClientBuilder,

  // Import middlewares
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';

const PROJECT_KEY = process.env.projectKey || 'invalid_key';
const SCOPES = process.env.scopes || 'invalid_scope';
const HOST_AUTH = process.env.host_auth || 'invalid_auth';
const HOST_MIDDLEWARE = process.env.host_middleware || 'invalid_host_middleware';
const CLIENT_ID = process.env.clientId || 'invalid_id';
const CLIENT_SECRET = process.env.clientSecret || 'invalid_secret';

const projectKey = PROJECT_KEY;
const scopes = JSON.parse(SCOPES);

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: HOST_AUTH,
  projectKey,
  credentials: {
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  },
  scopes,
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: HOST_MIDDLEWARE,
  fetch,
};

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build();
