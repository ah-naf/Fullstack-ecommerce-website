const router = require("express").Router();
const bcrypt = require("bcrypt");
const verify = require("../middleware/jwtverify");
const pool = require("../db");
const jwtGenerator = require("../utils/jwtGenerator");



// register
router.post("/register", async (req, res) => {

  const { username, email, password, first_name, last_name, phone } = req.body;

  try {
    console.log('aghe')
    // Check if email exists
    const emailExist = await pool.query(
      "SELECT * FROM users WHERE user_email = $1 OR user_name = $2",
      [email, username]
    );
    console.log('pore')
    if (emailExist.rows.length !== 0) {
      return res.status(400).send({ message: "User already exists!" });
    }

    // Encrypt password using bcrypt
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);

    // Creating new user
    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password, first_name, last_name, phone) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      [username, email, hashedPassword, first_name, last_name, phone]
    );
    // Generate token
    const token = jwtGenerator(newUser.rows[0].id, newUser.rows[0].is_admin);
    res.status(201).json({ token: token });
  } catch (error) {
    console.log(error)
    res.status(500).json({message : error});
  }
});

// login

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if user exist
  const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
    email,
  ]);
  if (user.rows.length === 0) {
    return res.status(400).json({ message: "User doesn't exist" });
  }

  // Check password
  const passDidMatch = await bcrypt.compare(
    password,
    user.rows[0].user_password
  );
  if (!passDidMatch) {
    return res.status(400).json({ message: "Invalid password or email" });
  }

  // Generate token
  const token = jwtGenerator(user.rows[0].id, user.rows[0].is_admin);
  res.status(201).json({ token: token, name: user.rows[0].user_name });
});

router.get("/loginVerify", verify, async (req, res) => {
  if (req.user) {
    res.status(200).json("successfully login");
  } else {
    res.status(403).json("Not Authorized");
  }
});

module.exports = router;
