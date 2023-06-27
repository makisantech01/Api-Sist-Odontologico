import app from "./app.js";
import sequelize from "./config/config.cjs";
import { config } from "dotenv";
config();
import cors from "cors";
import "./models/index.js";

const port = process.env.PORT || 3001;

//CORS CONFIG

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

async function main() {
  try {
    await sequelize.sync({ force: false });
    console.log("DB Connection success!");
    app.listen(port);
    console.log(`Server listening on port ${port}`);
  } catch (err) {
    console.log(process.env.DB_NAME);
    console.log("Unable to connect to the database", err);
  }
}

main();
