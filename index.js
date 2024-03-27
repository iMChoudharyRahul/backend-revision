import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./src/db/ConnectDB.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    //Start the Server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🎁 Server started on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDb connection Failed !😒:", err));
