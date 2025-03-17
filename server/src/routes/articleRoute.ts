import express from 'express'
import { dislikeArticle, getArticlesByPreference, likeArticle, publicArtilce } from '../controllers/articleController'

const router = express.Router()

router.post('/publish-article',publicArtilce)
router.get('/get-articles',getArticlesByPreference)
router.post("/like", likeArticle);
router.post("/dislike", dislikeArticle);

export default router