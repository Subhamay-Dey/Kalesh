import express from "express";
import "dotenv/config";
const app = express();
const PORT = process.env.PORT || 8000;
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));
app.get("/", (req, res) => {
    return res.render("emails/welcome", { name: "Subhamay Dey" });
});
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
