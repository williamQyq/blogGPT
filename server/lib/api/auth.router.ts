import express, { Router, Request, Response } from "express";
import passport from "passport";
import { IResponseErrorMessage } from "lib/api/api.interface";

const router: Router = express.Router();

router.get("/login/failed", (req: Request, res: Response) => {
    const errorMsg: IResponseErrorMessage = {
        success: false,
        msg: "UnAuthorized login "
    }
    res.status(401).json(errorMsg);
})

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

/**
 * @description
 *  "onSuccess": direct user page to http://[ORIGIN]/login/success. e.g. http://localhost:3001/login/success
 *  "onFailure": direct request to http://localhost:5500/api/auth/login/failed
 */
router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: process.env.ORIGIN + '/login/success',
        failureRedirect: 'api/auth/login/failed',
    }),
)

export default router;