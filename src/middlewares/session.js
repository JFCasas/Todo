module.exports = function(req,res,next){

    if (!req.session._id){
        res.redirect("session/login");
        console.log("Middleware:El usuario no está logueado")
        next();
    } else {
        console.log("Middleware:El usuario está logueado")
        next();
    }
}