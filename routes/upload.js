const router = require('express').Router()
const multer = require('multer')
const {storage} = require('../utils/cloudinaryConfig')
const upload = multer({storage})
const jwtverify = require('../middleware/jwtverify')
const pool = require('../db')

router.post('/',jwtverify, upload.single('image'), async(req, res) => {
    res.status(200).json(req.file.path)
})

router.post('/setpicture', jwtverify, async (req,res) => {
    try {
        const change = await pool.query(
            "UPDATE users SET profile_pic = $1 WHERE id = $2", [req.body.url, req.user]
        )
        res.status(200).json("Image uploaded successfully..")
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router