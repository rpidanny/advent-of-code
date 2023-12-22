const {getInputLines} = require('../utils/input');
const {step1, step2} = require('./solutions');
const {day} = require('./config');

describe('Solutions', () => {
  const input = getInputLines(`./Day${day}/test.input.txt`);
  test('step 1', () => {
    expect(step1(input)).toEqual(157);
  });

  test('step 2', () => {
    expect(step2(input)).toEqual(70);
  });
});
