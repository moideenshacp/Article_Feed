import express from 'express'
import { archieveArticle, blockArticle, dislikeArticle, getArticlesByPreference, likeArticle, publicArtilce, updateArticle } from '../controllers/articleController'

const router = express.Router()

router.post('/publish-article',publicArtilce)
router.get('/get-articles',getArticlesByPreference)
router.post("/like", likeArticle);
router.post("/dislike", dislikeArticle);
router.put("/block-article", blockArticle);
router.put("/archieve-article", archieveArticle);
router.patch("/edit-article", updateArticle);

export default router