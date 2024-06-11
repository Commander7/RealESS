import express from 'express';         // use express for routes  // define routes in index.js
import { test } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/test', test);

export default router;