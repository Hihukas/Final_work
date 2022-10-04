import HTTP from "./index"

const registration = (data) => HTTP.post("/registration", data);

export {
    registration
};