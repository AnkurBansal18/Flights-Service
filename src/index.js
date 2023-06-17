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
});
