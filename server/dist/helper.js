import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import moment from "moment";
import { MimeSupport } from "./config/fileupload.js";
export const formatError = (error) => {
    let errors = {};
    error.errors?.map((issue) => {
        errors[issue.path?.[0]] = issue.message;
    });
    return errors;
};
export const renderEmailEjs = async (fileName, payload) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const html = await ejs.renderFile(__dirname + `/views/emails/${fileName}.ejs`, payload);
    return html;
};
export const checkTimeDiff = (date) => {
    const now = moment();
    const tokenSendAt = moment(date);
    const difference = moment.duration(now.diff(tokenSendAt));
    return difference.asHours();
};
export const imageValidator = (size, mime) => {
    if (bytesToMb(size) > 4) {
        return "The image should be less than 4 mb";
    }
    else if (!MimeSupport.includes(mime)) {
        return "The image should be of type jpg, png, jpeg, gif, webp";
    }
    return null;
};
export const bytesToMb = (bytes) => {
    return bytes / (1024 * 1024);
};
