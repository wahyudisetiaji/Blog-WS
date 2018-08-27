const Article = require("../models/article");
const jwt = require('jsonwebtoken')

class ArticleController {
  static createArticle(req, res) {
    let token = req.headers.token
    let decode = jwt.verify(token, process.env.JWT_SECRET_KEY)

    Article.create({
      articleTitle: req.body.articleTitle,
      image: req.body.image,
      article: req.body.article,
      date: req.body.date,
      tags: req.body.tags.split(","),
      userId: decode.id
    })
      .then(result => {
        res.status(201).json({
          message: "article successfully created",
          result
        });
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        });
      });
  }

  static deleteArticle(req, res) {
    let id = req.params.id;
    Article.deleteOne({ _id: id })
      .then(() => {
        res.status(200).json({
          message: "article successfully deleted"
        });
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        });
      });
  }

  static myArticle(req, res) {
    let token = req.headers.token
    let decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
    Article.find({userId: decode.id})
      .populate("userId")
      .then(articles => {
        res.status(200).json({
          message: "data my article",
          articles
        });
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        });
      });
  }

  static getArticle(req, res) {
    Article.find({})
      .populate("userId")
      .then(articles => {
        res.status(200).json({
          message: "data all article",
          articles
        });
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        });
      });
  }

  static getOneArticle(req, res) {
    let id = req.params.id
    Article.find({_id: id})
      .populate("userId")
      .then(articles => {
        res.status(200).json({
          message: "data article",
          articles
        });
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        });
      });
  }

  static updateArticle(req, res) {
    let id = req.params.id;
    Article.updateOne(
      { _id: id },
      {
        $set: {
          articleTitle: req.body.articleTitle,
          image: req.body.image,
          article: req.body.article,
          tags: req.body.tags.split(",")
        }
      }
    )
      .then(result => {
        res.status(200).json({
          message: "article successfully update",
          result
        });
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        });
      });
  }

  static commentArticle(req, res) {
    let token = req.headers.token
    let decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
    let id = req.params.id;
    Article.updateOne(
      {_id: id},
      {
        $push: {
          comments: { 
            comment: req.body.comment,
            date: new Date(),
            name: decode.name
          }
        }
      }
    )
    .then(result => {
      res.status(200).json({
        message: "comment successfully update",
        result
      });
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
  }

  static deleteComment(req, res) {
    let idArticle = req.params.id;
    Article.updateOne(
      {_id: idArticle},
      {
        $pull: {
          comments: { 
            _id: req.body.idComment
          }
        }
      }
    )
    .then(result => {
      res.status(200).json({
        message: "comment successfully deleted",
        result
      });
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
  }
}

module.exports = ArticleController;
