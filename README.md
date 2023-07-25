[![npm version](https://badge.fury.io/js/@qavajs%2Fsteps-ctp.svg)](https://badge.fury.io/js/@qavajs%2Fsteps-playwright)

# @qavajs/steps-ctp
Step library to work with commercetools platform SDK in qavajs framework

## Installation

`npm install @qavajs/steps-ctp`

## Configuration
```javascript
const App = require('./page_object');
module.exports = {
    default: {
        require: [
            'node_modules/@qavajs/steps-ctp/index.js'
        ],
        browser: {
            timeout: {
                present: 10000,
                visible: 20000,
                page: 10000
            },
            capabilities: {
                browserName: 'chromium'
            }
        },
        pageObject: new App()
    }
}
```

## Global variables
@qavajs/steps-ctp needed following environment variables:
         
| variable          | description                                  | obligation  |
|-------------------|----------------------------------------------|-------------|
| `projectKey`      | key of the commercetools platform project    | mandatory   |
| `scopes`          | array of the ctp key scopes                  | mandatory   |
| `host_auth`       | url of the host authentication               | mandatory   |
| `host_middleware` | url of the middleware host                   | mandatory   |
| `clientId`        | id of the ctp's client                       | mandatory   |
| `clientSecret`    | secret of the ctp's client                   | mandatory   |


