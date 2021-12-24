const router = require("express").Router();
const verify = require("../middleware/jwtverify");
const pool = require("../db");

router.post("/", verify, async (req, res) => {
  const { size, id, quantity, total } = req.body;
  try {
    const cartDataExist = await pool.query(
      "SELECT * FROM cart WHERE user_id = $1 AND product_id = $2 AND  size = $3",
      [req.user, id, size]
    );
    let cartData;
    if (cartDataExist.rows.length) {
      const { quantity: prevQuantity, total: prevTotal } =
        cartDataExist.rows[0];
      cartData = await pool.query(
        "UPDATE cart SET quantity = $1, total = $2 WHERE user_id = $3 AND product_id = $4 AND size = $5 RETURNING product_id,quantity,size,total",
        [quantity + prevQuantity, total + prevTotal, req.user, id, size]
      );
    } else {
      cartData = await pool.query(
        "INSERT INTO cart (user_id, product_id, quantity, size, total) VALUES ($1,$2,$3,$4,$5) RETURNING product_id,quantity,size,total",
        [req.user, id, quantity, size, total]
      );
    }
    cartData = await pool.query(
      "SELECT cart.id AS cart_id, products.id, cart.total, cart.quantity, cart.size, products.images, products.name, products.price FROM cart JOIN products ON products.id = cart.product_id WHERE cart.user_id = $1",
      [req.user]
    );
    res.status(200).json(cartData.rows);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/", verify, async (req, res) => {
  try {
    const data = await pool.query(
      "SELECT cart.id AS cart_id, products.id, cart.total, cart.quantity, cart.size, products.images, products.name, products.price FROM cart JOIN products ON products.id = cart.product_id WHERE cart.user_id = $1",
      [req.user]
    );
    res.status(200).json(data.rows);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.delete("/:id", verify, async (req, res) => {
  try {
    const deleteItem = await pool.query("DELETE FROM cart WHERE id = $1", [
      req.params.id,
    ]);
    res.status(202).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.put("/:id", verify, async (req, res) => {
  const { quantity } = req.body;
  try {
    let editData = await pool.query(
      "UPDATE cart SET quantity = $1 WHERE id = $2 AND user_id = $3",
      [quantity, req.params.id, req.user]
    );
    editData = await pool.query(
      "SELECT cart.id AS cart_id, products.id, cart.total, cart.quantity, cart.size, products.images, products.name, products.price FROM cart JOIN products ON products.id = cart.product_id WHERE cart.user_id = $1",
      [req.user]
    );
    res.status(201).json(editData.rows);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;
