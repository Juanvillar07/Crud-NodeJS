const express = require('express');
const { faker } = require('@faker-js/faker');
const router = express.Router();


router.get('/', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId
  });
})

module.exports = router;
