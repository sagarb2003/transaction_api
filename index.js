const express = require("express");
var cors = require("cors");
const router = require("./routes/index");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
