const multer = require("multer");

const storage = multer.diskStorage({
    destination:function(req,file,callback){
        const routeImages = `${__dirname}/../images`
        callback(null,routeImages)
    },
    filename:function(req,file,callback){
        const extension = file.originalname.split(".").pop();
        const fileName = `file-${Date.now()}.${extension}`;
        callback(null,fileName);
    }
})

const uploadImageMiddleware = multer({storage:storage,fileFilter:
    function(req,file,callback){
        const extensionsMimes = ["image/png","image/jpg","image/jpeg"];
        if(!extensionsMimes.includes(file.mimetype)){
            req.fileValidationError = "You can upload only image files";
            return callback(null,false, req.fileValidationError);
        }
        callback(null,true)}
}).single("image")

module.exports = uploadImageMiddleware;