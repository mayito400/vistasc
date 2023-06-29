import jwt from 'jsonwebtoken'

export const validateToken = (req, res, next) => {
    try {
        const token = jwt.verify(req.cookies.cookieBG, process.env.SECRET_KEY)
        if (token) {
            next()
        }
        else {
            res.redirect("/")
        }
    } catch (error) {
        // console.error(error);
        res.redirect("/");
    }
};
