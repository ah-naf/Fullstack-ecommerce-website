const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtverify = require("../middleware/jwtverify");

// Update
router.put("/:id", jwtverify, async (req, res) => {
  if (req.user === req.params.id) {
    let { email, name, password } = req.body;
    const getUser = await pool.query("SELECT * FROM users WHERE id = $1", [
      req.user,
    ]);
    try {
      let hashedPassword;
      if (password) {
        const saltRound = 10;
        hashedPassword = await bcrypt.hash(password, saltRound);
      } else {
        hashedPassword = getUser.rows[0].user_password
      }

      !name && (name = getUser.rows[0].user_name);
      !email && (email = getUser.rows[0].user_email);

      const updatedUser = await pool.query(
        "UPDATE users SET user_email = $1, user_name = $2, user_password = $3 WHERE id = $4",
        [email, name, hashedPassword, req.user]
      );

      res.status(200).json("Profile Updated..!");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json("Access Denied!");
  }
});

// Delete
router.delete("/:id",jwtverify, async (req, res) => {
  if(req.user === req.params.id) {
    try {
      const deletePost = await pool.query(
        "DELETE FROM posts WHERE userId = $1", [req.user]
      )

      const deleteUser = await pool.query(
        "DELETE FROM users WHERE id = $1", [req.user]
      )

      res.status(200).json("Deleted user successfully..")
    } catch (error) {
      res.status(500).json(error)
    }
  } else {
    res.status(401).json("Access Denied!");
  }
});

// Get current user
router.get("/",jwtverify, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT * FROM users WHERE id = $1", [req.user]
    )
    const {user_password, ...other} = user.rows[0]
    res.status(200).json(other)
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;
