const errorHandler = (err,req,res,next)=>{
    //validate yupError
    if(err.name === "ValidationError"){
        const errors = err.inner.map((e)=>({
            path:e.path,
            message:e.message
        }))
        return res.status(400).send({errors});
    }
    return res.status(500).send({error:err.message});
}



module.exports = {errorHandler}