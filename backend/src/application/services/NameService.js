class NameService {
    constructor(nameRepository) {
      this.nameRepository = nameRepository;
    }
  
    async saveName(value) {
      const nameEntity = new (require("../../domain/entities/NameEntity"))(value);
      return await this.nameRepository.save(nameEntity);
    }
  }
  
  module.exports = NameService;
    