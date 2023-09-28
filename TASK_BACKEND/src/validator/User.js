const yup = require("yup");
const schemaUser = yup.object({
    email:yup.string().email().required(),
    password:yup.string().required(),
    name:yup.string().required(),
})
const schemaUserCredentials = yup.object({
    email:yup.string().email().required(),
    password:yup.string().required(),
})
const schemaUserUpdate = yup.object({
    email:yup.string().email().optional(),
    name:yup.string().optional(),
    password:yup.string().optional(),
    newPassword:yup.string().optional(),
})


module.exports = {schemaUser,schemaUserCredentials,schemaUserUpdate};