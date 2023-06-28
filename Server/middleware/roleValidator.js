async function roleValidator(req,res,next){

    let {role} = req.headers
    // let {role} = req.query

    // console.log(req.path,role)
    if((req.method=="PATCH"||req.method=="DELETE")){
        // console.log("Working")
        if(role=="admin"){
            next()
        }else{ 
            res.send({
                message:"You are not Admin Please cheak your role"
            })
        }

    }else{
        next()
    }


}


module.exports={roleValidator}