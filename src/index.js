import express from "express";
import db from "./models";
import routes from "./routes/index";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));

//CORS CONFIG

// const corsOptions ={
//   origin:'http://localhost:5173',
//   credentials:true,            //access-control-allow-credentials:true
//   optionSuccessStatus:200
// }
// app.use(cors(corsOptions));

app.use("/", routes);

// db.sequelize.sync({force: false}).then(() => {
//     app.listen(port, () => {
//         console.log(`listening on port ${port}`)
//     })
// })
