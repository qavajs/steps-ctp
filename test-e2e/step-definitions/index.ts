import { Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { MemoryValue } from "@qavajs/core";

Then('I expect {value} memory value to be equal {value}', async function (actual: MemoryValue, expected: MemoryValue) {
  const actualValue = await actual.value();
  const expectedValue = await expected.value();
  expect(expectedValue).to.eql(actualValue);
});

Then('I expect {value} memory value to contain {value}', async function (actual: MemoryValue, expected: MemoryValue) {
  const actualValue = await actual.value();
  const expectedValue = await expected.value();
  expect(actualValue).to.contain(expectedValue);
});
