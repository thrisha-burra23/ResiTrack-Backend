export const validate = (schema) => {
    return function (req, res, next) {
        try {
            const validated = schema.parse(req.body);
            req.body = validated;
            next();
        } catch (error) {
            return res.status(400).json({
                errors: error.errors.map(err => ({
                    field: err.path[0],
                    message: err.message
                }))
            })
        }
    }

}