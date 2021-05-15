const request = require("supertest");
const app = require("../server.js");

describe("API endpoints test", () => {
  it("POST mutants: should return forbidden when human", async () => {
    const dna = ["CTGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CGGCTA", "TCACTG"];
    const res = await request(app).post("/mutants").send({
      dna: dna,
    });
    expect(res.statusCode).toEqual(403);
  });
  it("POST mutants: should return 200 when mutant", async () => {
    const dna = ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CGGCTA", "TCACTG"];
    const res = await request(app).post("/mutants").send({
      dna: dna,
    });
    expect(res.statusCode).toEqual(200);
  });

  it("GET stats: should return ratio, count_mutant_dna, count_human_dna ", async () => {
    const res = await request(app).get("/stats");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("ratio");
    expect(res.body).toHaveProperty("count_mutant_dna");
    expect(res.body).toHaveProperty("count_human_dna");
  });
});
