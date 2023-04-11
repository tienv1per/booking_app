const jwt = require('jsonwebtoken');
const createError = require('./error');


// middlware kiem tra authen, neu sai/khong co in ra loi
// neu co => next() thuc hien ham tiep theo o ben duoi
module.exports.verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token) {
        return next(createError(401, "You are not authenticated"));
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if(err) {
            return next(createError(403, "Invalid token"));
        }
        console.log(1234);
        // gan 1 thuoc tinh user cho request 
        req.user = user;
        next();
    })
}

module.exports.verifyUser = (req, res, next) => {
    this.verifyToken(req, res, () => {
        console.log(req.user.isAdmin);
        if(req.url.slice(1) === req.params.id || req.user.isAdmin) {

            next();
        }
        else {
            return next(createError(403, "You are not correct user with the id provided"));
        }
    });
}

module.exports.verifyAdmin = (req, res, next) => {
    this.verifyToken(req, res, () => {
        if(req.user.isAdmin) {
            next();
        }
        else {
            return next(createError(403, "You are not admin, you have no permission"));
        }
    });
}