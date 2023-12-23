const {getInputLines} = require('../utils/input');
const {step1, step2} = require('./solutions');
const {day} = require('./config');

describe('Solutions', () => {
  const input = getInputLines(`./Day${day}/test.input.txt`);
  test('step 1', async () => {
    await expect(step1(input)).resolves.toEqual(24);
  });

  test('step 2', async () => {
    await expect(step2(input)).resolves.toEqual(93);
  });
});
