import { Then } from '@cucumber/cucumber';
import { expect } from 'chai';

Then('I expect {string} memory value to be equal {string}', async function (actual, expected) {
  const actualValue = await actual.value();
  const expectedValue = await expected.value();
  expect(expectedValue).to.eql(actualValue);
});

Then('I expect {string} memory value to contain {string}', async function (actual, expected) {
  const actualValue = await actual.value();
  const expectedValue = await expected.value();
  expect(actualValue).to.contain(expectedValue);
});
