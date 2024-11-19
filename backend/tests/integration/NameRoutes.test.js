/*const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("../../src/infrastructure/config/db");
const nameRoutes = require("../../src/presentation/routes/nameRoutes");

const app = express();
app.use(bodyParser.json());
app.use("/api/names", nameRoutes);

describe("NameRoutes", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("debería guardar un nombre y devolver el nombre guardado", async () => {
    const response = await request(app)
      .post("/api/names")
      .send({ name: "Juan" })
      .expect(201);

    expect(response.body).toEqual(expect.objectContaining({ id: 1, value: "Juan" }));
  });

  it("debería devolver un error si no se proporciona un nombre", async () => {
    const response = await request(app).post("/api/names").send({}).expect(400);

    expect(response.body).toHaveProperty("error");
  });
});
*/