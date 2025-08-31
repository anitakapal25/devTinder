const adminAuth = (req,res,next) => {
    console.log("Admin auth getting checked");
    const token = "www";
    const isAdminAuthorized = token ==="xyz";
    if(!isAdminAuthorized) {
        res.status(401).send("Unauthorized request");
    }
    next();
}

module.exports = {
    adminAuth
}