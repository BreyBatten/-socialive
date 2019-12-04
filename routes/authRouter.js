const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secrets = require("../config/secrets");

const db = require("../database/config");

function genToken(user) {
  const payload = {
    subject: user.id,
    email: user.email,
    username: user.username
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

router.post("/register", async (req, res) => {
  const {
    username,
    first_name,
    last_name,
    age,
    email,
    password,
    gender,
    gender_preference
  } = req.body;

  if (!username || !first_name || !last_name || !age || !email || !password) {
    return res.status(400).json({
      error:
        "`username`, `first_name`, `last_name`, `age`, `email`, and `password` are required!"
    });
  }

  try {
    const hash = bcrypt.hashSync(password, 10);
    const [id] = await db("users")
      .insert({
        username,
        first_name,
        last_name,
        age,
        email,
        password: hash,
        gender,
        gender_preference
      })
      .returning("id");

    const [user] = await db("users").where({ id });
    return res.status(201).json(user);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

router.post("/login", async (req, res) => {
  const { username, email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      error: "All fields are required!"
    });
  }
  try {
    const [user] = await db("users").where({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = genToken(user);

      await db("users")
        .where({ email })
        .update({ jwt: token });

      return res.status(200).json({
        message: `Welcome ${user.username}!`,
        token: token,
        user
      });
    } else {
      return res.status(401).json({
        error: "Please provide correct email and password"
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;
