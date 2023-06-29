import jwt from 'jsonwebtoken'

export const validateAdmin = (req, res, next) => {
    try {
        const token = jwt.verify(req.cookies.cookieBG, process.env.SECRET_KEY)
        if (token.COD_ROL === 2) {
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
