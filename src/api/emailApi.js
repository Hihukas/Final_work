import HTTP from "./index";

const sendEmail = (email) => HTTP.post('/sendEmail', email);

export {
    sendEmail
};