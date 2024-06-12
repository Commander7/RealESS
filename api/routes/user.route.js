import express from 'express';         // use express for routes function  // define routes in index.js
import { test } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/test', test);                  // first router with get method

export default router;