import express from 'express';
import blogController from './../controllers/blogController.js';

const router = express.Router();

// GET all blogs
router.get('/', blogController);

export default router;
