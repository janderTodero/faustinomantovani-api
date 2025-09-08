const Article = require("../models/Article");

// CREATE
exports.create = async (req, res) => {
  const { title, content, imageUrl, url } = req.body;

  try {
    const newArticle = new Article({ title, content, imageUrl, url });
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ message: "Error to create article", error: error.message });
  }
};

// READ ALL
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Error to get articles", error: error.message });
  }
};

// READ BY ID
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: "Error to get article", error: error.message });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedArticle) return res.status(404).json({ message: "Article not found" });
    res.status(200).json(updatedArticle);
  } catch (error) {
    res.status(500).json({ message: "Error to update article", error: error.message });
  }
};

// DELETE
exports.deleteArticle = async (req, res) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);
    if (!deletedArticle) return res.status(404).json({ message: "Article not found" });
    res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error to delete article", error: error.message });
  }
};
