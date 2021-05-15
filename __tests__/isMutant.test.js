const isMutant = require("../isMutant.js");
describe("Mutants algorithm", () => {
  it("Should throw and error when the matrix is not NxN", () => {
    expect(() => isMutant(["AA", "CCCC", "CCCC", "CCCC"])).toThrow(
      "Invalid data"
    );
  });

  it("Should return true", () => {
    expect(
      isMutant(["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"])
    ).toEqual(true);
  });
  it("Should return true", () => {
    expect(
      isMutant(["CTGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"])
    ).toEqual(true);
  });
  it("Should return false", () => {
    expect(
      isMutant(["CTGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CGCCTA", "TCACTG"])
    ).toEqual(false);
  });

  it("Should not give a callstack error when recieved a 10000x10000 matrix", () => {
    let dna = [];
    const row = "TGCGA".repeat(2000);
    const row2 = "CAGTG".repeat(2000);
    for (let i = 0; i < 10000; i++) {
      if (i % 2 === 0) dna.push(row);
      else dna.push(row2);
    }
    dna[9999][0] = "A";
    dna[9999][1] = "A";
    dna[9999][2] = "A";
    dna[9999][3] = "A";

    console.log(dna.length)

    expect(isMutant(dna)).toBe(true);
  });
});
