const router = require("express").Router();
const verify = require("../middleware/jwtverify");
const pool = require("../db");

router.get('/', verify, async (req,res) => {
  try {
    const fav = await pool.query(
      "SELECT products.id, products.name, products.price,products.images, products.description FROM wishlist JOIN products ON wishlist.product_id = products.id WHERE wishlist.is_fav = true AND wishlist.user_id = $1",
      [req.user]
    );
    res.status(200).json(fav.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
})


module.exports = router;
