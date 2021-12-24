const router = require("express").Router();
const verify = require("../middleware/jwtverify");
const pool = require("../db");

router.post('/:id', verify, async (req, res) => {
    const {title, desc, rating} = req.body
    try {
        console.log('review aghe')
        const review = await pool.query(
            'INSERT INTO review (user_id, product_id, title, review_desc, rating) VALUES ($1,$2,$3,$4,$5) RETURNING *', [req.user, req.params.id, title, desc, rating]
        )
        console.log('review pore')
        res.status(201).json(review.rows)
    } catch (error) {
        res.status(500).json({message : error})
    }
})

router.get('/:id', async (req,res) => {
    try {
        console.log('review ekta aghe')
        const review = await pool.query(
            'SELECT users.first_name, users.last_name, users.avatar, review.title, review.review_desc, review.rating FROM review JOIN users ON users.id = review.user_id WHERE review.product_id = $1', [req.params.id]
        )
        console.log('review ekta pore')
        res.status(200).json(review.rows)
    } catch (error) {
        console.log(error)
        res.status(500).json({message : error})
    }
})

module.exports = router