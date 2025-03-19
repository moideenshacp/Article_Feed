import express from 'express'
import { archieveArticle, blockArticle, dislikeArticle, getArticlesByPreference, likeArticle, publicArtilce, updateArticle } from '../controllers/articleController'
import { authenticate } from '../middleware/authMiddleware'

const router = express.Router()

router.post('/publish-article',authenticate, publicArtilce)
router.get('/get-articles',authenticate,getArticlesByPreference)
router.post("/like",authenticate, likeArticle);
router.post("/dislike",authenticate, dislikeArticle);
router.put("/block-article",authenticate, blockArticle);
router.put("/archieve-article",authenticate, archieveArticle);
router.patch("/edit-article",authenticate, updateArticle);

export default router