require('dotenv').config()
const jwt = require('jsonwebtoken')

const jwtGenerator = (user_id, is_admin) => {
    const data = {
        user: user_id,
        admin: is_admin
    }

    return jwt.sign(data, process.env.JWT_SECRET, {expiresIn : "2h"})
}

module.exports = jwtGenerator