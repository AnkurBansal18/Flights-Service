const express = require("express");
const { ServerConfig } = require("./config");
const apiRoutes = require("./routes");
const { log } = require("winston");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
  console.log(`🎉Server started on the port : ${ServerConfig.PORT}`);
  const { airport, City } = require("./models");

  // const chennai = await City.findByPk(3);
  // const airp = await chennai.createAirport({ name: "hubai", IATA_code: "DUB" });
  // console.log(airp);
  // console.log(chennai, 11);
  // const ddd = await airport.findByPk(1);
  // console.log(ddd);
  // await chennai.removeAirport(ddd);
  // await City.destroy({
  //   where: {
  //     id: 3,
  //   },
  // });
});
