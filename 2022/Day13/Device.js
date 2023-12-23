class Device {
  dividerPackers = [[[2]], [[6]]];

  constructor(rawInputs) {
    this.packetPairs = this.parseRawInputs(rawInputs);
  }

  getPacketPairs() {
    return this.packetPairs;
  }

  parseRawInputs(inputs) {
    const pairs = [];
    for (let i = 0; i < inputs.length; i += 3) {
      pairs.push([JSON.parse(inputs[i]), JSON.parse(inputs[i + 1])]);
    }
    return pairs;
  }

  compareTwoArrays(p1, p2) {
    let pointer = 0;

    while (pointer < p1.length && pointer < p2.length) {
      const res = this.arePacketsOrdered(p1[pointer], p2[pointer]);
      if (res !== undefined) return res;
      pointer++;
    }

    if (p1.length !== p2.length) return p1.length < p2.length;
  }

  // Step 1
  arePacketsOrdered(p1, p2) {
    // Case1: num and num
    if (typeof p1 === 'number' && typeof p2 === 'number') {
      if (p1 !== p2) return p1 < p2;
    }

    // Case2: array and array
    if (typeof p1 === 'object' && typeof p2 === 'object') {
      return this.compareTwoArrays(p1, p2);
    }

    // Case 3: array and number
    if (typeof p1 === 'object' && typeof p2 === 'number') {
      return this.arePacketsOrdered(p1, [p2]);
    }

    // Case 4: number and array
    if (typeof p1 === 'number' && typeof p2 === 'object') {
      return this.arePacketsOrdered([p1], p2);
    }
  }

  getValidPacketIndices() {
    const validPacketPairs = [];
    for (let i = 0; i < this.packetPairs.length; i++) {
      if (this.arePacketsOrdered(...this.packetPairs[i])) {
        validPacketPairs.push(i + 1);
      }
    }
    return validPacketPairs;
  }

  getSumOfValidPacketIndices() {
    const indices = this.getValidPacketIndices();

    return indices.reduce((acc, curr) => acc + curr, 0);
  }

  // Step 2
  sortPackets() {
    const packets = [...this.dividerPackers];

    for (const packetPairs of this.packetPairs) {
      packets.push(packetPairs[0]);
      packets.push(packetPairs[1]);
    }

    return packets.sort((a, b) => {
      const res = this.arePacketsOrdered(a, b);

      if (res === undefined) return 0;
      return res ? -1 : 1;
    });
  }

  findDividerPacketIndex(sortedPackets) {
    const indices = [];

    for (let i = 0; i < sortedPackets.length; i++) {
      const packet = sortedPackets[i];
      if (
        packet.length === 1 &&
        (packet[0] === this.dividerPackers[0][0] ||
          packet[0] === this.dividerPackers[1][0])
      ) {
        indices.push(i + 1);
      }
    }
    return indices;
  }

  calculateDecoderKey() {
    const sortedPackets = this.sortPackets();

    const indices = this.findDividerPacketIndex(sortedPackets);

    return indices.reduce((acc, curr) => acc * curr, 1);
  }
}

module.exports = {
  Device,
};
