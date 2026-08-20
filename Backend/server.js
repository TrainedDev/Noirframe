import { config } from "dotenv";
import app from "./app.js";

config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`server is ready on port ${PORT}`);
});
