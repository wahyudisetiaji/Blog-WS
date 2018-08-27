var express = require('express');
var router = express.Router();
var ArticleController = require('../controllers/article-controller')
var isLogin = require('../middlewares/isLogin')
const images = require('../helpers/images')

router.post('/upload',
  images.multer.single('image'), 
  images.sendUploadToGCS,
  (req, res) => {
    res.send({
      status: 200,
      message: 'Your file is successfully uploaded',
      link: req.file.cloudStoragePublicUrl
    })
})
router.get('/', ArticleController.getArticle)
router.get('/article/:id', ArticleController.getOneArticle)
router.get('/myarticle', isLogin, ArticleController.myArticle)
router.post('/create', isLogin, ArticleController.createArticle)
router.delete('/:id', isLogin, ArticleController.deleteArticle)
router.put('/:id', isLogin, ArticleController.updateArticle)
router.put('/comment/:id', isLogin, ArticleController.commentArticle)
router.put('/comment/delete/:id', isLogin, ArticleController.deleteComment)

module.exports = router;