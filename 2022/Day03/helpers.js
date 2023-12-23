const getPriority = (char) => {
  let power = 0;

  if (char.charCodeAt() < 'a'.charCodeAt()) {
    power = char.charCodeAt() - 'A'.charCodeAt() + 27;
  } else {
    power = char.charCodeAt() - 'a'.charCodeAt() + 1;
  }
  return power;
};

const getCommonItemInRucksackCompartments = (rucksack) => {
  const {length} = rucksack;
  const m = length >> 1;

  const compartment1 = rucksack.substr(0, m);
  const compartment2 = rucksack.substr(m);

  for (const item of compartment1) {
    if (compartment2.indexOf(item) > -1) return item;
  }
};

const getCommonItemsInRucksacks = (r1, r2, r3) => {
  for (const item of r1) {
    if (r2.indexOf(item) > -1 && r3.indexOf(item) > -1) return item;
  }
};

module.exports = {
  getPriority,
  getCommonItemInRucksackCompartments,
  getCommonItemsInRucksacks,
};
