const NameRepository = require("../../domain/repositories/NameRepository");
const Name = require("../db/models/Name");

class SequelizeNameRepository extends NameRepository {
  async save(nameEntity) {
    return await Name.create({ value: nameEntity.value });
  }
}

module.exports = SequelizeNameRepository;
