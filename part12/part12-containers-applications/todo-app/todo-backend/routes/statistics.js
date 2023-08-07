const express = require("express")
const router = express.Router()
const redis = require("../redis")

/* GET todos listing */
router.get("/", async (_, res) => {
  const count = await redis.getAsync("added_todos")

  res.json({
    added_todos: Number(count) || 0 //if none found (nothing has been set), default to 0
  })
})

module.exports = router