const express = require('express'); //same as php include
const router = express.Router();
const path = require('path');

router.get('/users', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/portfolio.html'))
});

module.exports = router;
