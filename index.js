const express = require("express");
const app = express();
const authRoute = require("./routes/auth");
const cors = require("cors")
const path = require('path')

const PORT = process.env.PORT || 5000

require("dotenv").config();

app.use(cors())
app.use(express.json());

// app.use(express.static(path.join(__dirname, 'client/build')))

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')))
}

app.use("/api/auth", authRoute);
app.use("/api/users", require("./routes/users"));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/products', require('./routes/product'))
app.use('/api/cart', require('./routes/cart'))
app.use('/api/reviews', require('./routes/reviews'))
app.use('/api/checkout', require('./routes/stripe'))

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/build/index.html"));
// });

app.listen(PORT, () => {
  console.log("Server is running");
});
