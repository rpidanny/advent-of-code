const getSections = (inputs) =>
  inputs.map((input) =>
    input.split(',').map((pair) => pair.split('-').map((num) => parseInt(num))),
  );

module.exports = {
  getSections,
};
