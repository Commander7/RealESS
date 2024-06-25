import express from 'express';         // use express for routes function  // define routes in index.js
import { test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test);                  // first router with get method
router.post('/update/:id', verifyToken, updateUser)

export default router;