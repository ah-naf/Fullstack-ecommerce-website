const router = require("express").Router();
const verify = require("../middleware/jwtverify");
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    let products = await pool.query("SELECT * FROM products");
    if (req.query.cat) {
      if (req.query.cat === "accessories") {
        req.query.cat = "unisex";
      }
      products = await pool.query(
        "SELECT * FROM products WHERE LOWER(gender) = LOWER($1)",
        [req.query.cat]
      );
    }
    if (req.query.pricel) {
      const low = parseFloat(req.query.pricel) * 80;
      const high = parseFloat(req.query.priceh) * 80;
      products = await pool.query(
        "SELECT * FROM products WHERE price >= $1 AND price <= $2",
        [low, high]
      );
    }
    res.status(200).json(products.rows);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let product = await pool.query("SELECT * FROM products WHERE id = $1", [
      req.params.id,
    ]);
    res.status(200).json(product.rows[0]);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/fav/:id", verify, async (req, res) => {
  try {
    let fav = await pool.query(
      "SELECT * FROM wishlist WHERE user_id = $1 AND product_id = $2",
      [req.user, req.params.id]
    );
    if (fav.rows.length === 0) {
      fav = await pool.query(
        "INSERT INTO wishlist (user_id, product_id, is_fav) VALUES ($1,$2,$3)",
        [req.user, req.params.id, "true"]
      );
    } else {
      const val = fav.rows[0].is_fav === true ? "false" : "true";
      
      fav = await pool.query(
        "UPDATE wishlist SET is_fav = $1 WHERE user_id = $2 AND product_id = $3 RETURNING *",
        [val, req.user, req.params.id]
      );
    }
    res.json(fav.rows);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/fav/:id", verify, async (req, res) => {
    try {
        const isItFav = await pool.query(
            'SELECT is_fav FROM wishlist WHERE user_id = $1 AND product_id = $2', [req.user, req.params.id]
        )
        res.status(200).json({fav : isItFav.rows[0].is_fav})
    } catch (error) {
        res.status(500).json({message : error})
    }
});


module.exports = router;
