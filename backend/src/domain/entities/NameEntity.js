class NameEntity {
    constructor(value) {
      if (!value) throw new Error("Name value is required");
      this.value = value;
    }
  }
  
  module.exports = NameEntity;
  