import { ResponseError } from "../error/response-error.js";

const errorMiddleware = async (err, req, res, next) => {
    if(!err) return next();

    if (err instanceof ResponseError) {
        res.satus(err.statusCode).json({ errors: err.message }).end();
    } else {
        res.satus(500).json({ errors: err.message }).end();
    }
}

export { errorMiddleware };