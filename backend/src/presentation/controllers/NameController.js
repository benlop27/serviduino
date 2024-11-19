class NameController {
    constructor(nameService) {
      this.nameService = nameService;
    }
  
    async create(req, res) {
      try {
        const { name } = req.body;
        const savedName = await this.nameService.saveName(name);
        res.status(201).json({ id: savedName.id, value: savedName.value });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  }
  
  module.exports = NameController;
  