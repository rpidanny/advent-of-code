const {getInputLines} = require('../utils/input');
const {step1, step2} = require('./solutions');
const {day} = require('./config');

describe('Solutions', () => {
  const input = getInputLines(`./Day${day}/test.input.txt`);
  const input2 = getInputLines(`./Day${day}/test2.input.txt`);

  test('step 1', async () => {
    await expect(step1(input)).resolves.toEqual(13);
  });

  describe('step 2', () => {
    test('Input 1', async () => {
      await expect(step2(input)).resolves.toEqual(1);
    });

    test('Input 2', async () => {
      await expect(step2(input2)).resolves.toEqual(36);
    });
  });
});
