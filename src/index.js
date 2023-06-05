const express = require("express");
const { ServerConfig } = require("./config");
const apiRoutes = require("./routes");
const app = express();
console.log("route");
app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
  console.log(`🎉Server started on the port : ${ServerConfig.PORT}`);
});
