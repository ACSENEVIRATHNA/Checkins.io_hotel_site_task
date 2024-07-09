const mongoose = require("mongoose");
const app = require("./app");

require("dotenv").config();
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`Connected to the database & listening on port ${PORT}`);
  });
})
.catch((error)=>{
    console.log(error);
});
