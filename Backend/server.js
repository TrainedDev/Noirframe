import { config } from "dotenv";
import app from "./app.js";

config();

const PORT = process.env.PORT;

app.listen(PORT, () => console.log("server is ready"));
