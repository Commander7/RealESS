import express from 'express';                   // routing 
import {google, signin, signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);                             // function authentication route
router.post('/google', google);
        
export default router;