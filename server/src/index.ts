import express, {Application, Request, Response} from "express"
import "dotenv/config"
import ejs from "ejs"

const app:Application = express();

const PORT = process.env.PORT || 8000;

import path from "path"
import {fileURLToPath} from "url"
import { sendEmail } from "./config/mail.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "./views"))

app.get("/", async (req:Request, res:Response) => {
    const html = await ejs.renderFile(__dirname + `/views/emails/welcome.ejs`, {
        name: "Subhamay Dey"
    })
    // await sendEmail("gejovic245@degcos.com", "Testing SMTP", html)

    await emailQueue.add(emailQueueName, {to: "gejovic245@degcos.com", subject: "Testing SMTP", html: html})

    return res.json({msg: "Email send successfully!"})
})


import "./jobs/index.js"
import { emailQueue, emailQueueName } from "./jobs/EmailJob.js";

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));