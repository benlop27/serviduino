const NameService = require("../../src/application/services/NameService");

describe("NameService", () => {
  const mockRepository = { save: jest.fn() };

  it("debería guardar un nombre usando el repositorio", async () => {
    const service = new NameService(mockRepository);
    mockRepository.save.mockResolvedValue({ id: 1, value: "Juan" });

    const result = await service.saveName("Juan");

    expect(mockRepository.save).toHaveBeenCalledWith(expect.any(Object));
    expect(result.value).toBe("Juan");
  });

  it("debería lanzar un error si el nombre está vacío", async () => {
    const service = new NameService(mockRepository);

    await expect(service.saveName("")).rejects.toThrow("Name value is required");
  });
});
