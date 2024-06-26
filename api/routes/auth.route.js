import express from 'express';                   // routing 
import {google, signin, signup, signOut } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);                             // function authentication route
router.post('/google', google);
router.get('/signout', signOut);
        
export default router;