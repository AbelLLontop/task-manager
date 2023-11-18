const fs = require("fs");
const express = require("express");
const router = express.Router();

const PATH_ROUTES = __dirname;
const removeExtension = (filename)=>{
    return filename.split(".")[0];
}

fs.readdirSync(PATH_ROUTES).forEach((file)=>{
    const name = removeExtension(file);
    if(name!=="index"){
        router.use(`/${name}`,require(`./${file}`));
    }  
})


module.exports = router;