import Memory from './memory';

const common = {
  paths: ['test-e2e/features/customer.feature'],
  require: ['test-e2e/step-definitions/*.ts', 'src/**/**.ts'],
  format: [
    '@qavajs/console-formatter',
    'junit:test-e2e/report.xml',
    '@qavajs/html-formatter:test-e2e/report.html'
  ],
  memory: new Memory(),
  parallel: 4,
  publishQuiet: true,
  retry: 0,
};

export default common;
