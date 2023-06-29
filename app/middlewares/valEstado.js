import jwt from 'jsonwebtoken'

export const validateState = (req, res, next) => {
    try {
        const token = jwt.verify(req.cookies.cookieBG, process.env.SECRET_KEY)
        if (token.ESTADO === "ACTIVO") {
            next()
        }
        else {
            res.redirect("/logout?alert=5")
        }
    } catch (error) {
        // console.error(error);
        res.redirect("/");
    }
};
