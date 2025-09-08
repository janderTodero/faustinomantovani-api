const express = require("express");
const router = express.Router()
const { create, getAllArticles, getArticleById, update, deleteArticle } = require("../controllers/articlesController")
const { requireAuth } = require("../middlewares/authMiddleware");

router.post("/", requireAuth, create);
router.get("/", getAllArticles);
router.get("/:id", getArticleById);
router.put("/:id", requireAuth, update);
router.delete("/:id", requireAuth, deleteArticle);

module.exports = router;
