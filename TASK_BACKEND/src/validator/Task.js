const yup = require("yup");
const schemaTask = yup.object({
    title:yup.string().required(),
    description:yup.string().required(),
    status:yup.string().required(),
})


module.exports = {schemaTask};