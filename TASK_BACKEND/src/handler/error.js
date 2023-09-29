const errorHandler = (err,req,res,next)=>{
    //validate yupError
    if(err.name === "ValidationError"){
        const errors = err.inner.map((e)=>({
            field:e.path,
            message:e.message
        }))
        return res.status(400).send({
            status:"error",
            error_type:"validation",
            message:"Error de validacion",
            errors:errors,
            code:400
        });
    }
    return res.status(500).send({
        status:"error",
        error_type:"interno",
        message:"Se ha producido un error interno en el servidor",
        code:500
    });;
}



module.exports = {errorHandler}