import { ResponseError } from "../error/response-error.js";

const errorMiddleware = async (err, req, res, next) => {
    console.error("Error middleware:", err);

    if (err instanceof ResponseError) {
        return res.status(err.statusCode).json({ errors: err.message }).end();
    }

    res.status(500).json({ errors: err.message }).end();
};

export { errorMiddleware };