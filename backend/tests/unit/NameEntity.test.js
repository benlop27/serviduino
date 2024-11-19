const NameEntity = require("../../src/domain/entities/NameEntity");

describe("NameEntity", () => {
  it("debería crear una entidad válida cuando se proporciona un valor", () => {
    const name = new NameEntity("Juan");
    expect(name.value).toBe("Juan");
  });

  it("debería lanzar un error si el valor está vacío", () => {
    expect(() => new NameEntity()).toThrow("Name value is required");
  });
});
