const CrudRepository = require("./crud-repository");
const { Aeroplane } = require("../models");

class AirplaneRepository extends CrudRepository {
  constructor() {
    super(Aeroplane);
  }
}

module.exports = AirplaneRepository;
