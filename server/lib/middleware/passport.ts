import mongoose from 'mongoose';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import { PassportStatic } from 'passport';
import userModel, { IUserDoc } from '../models/user.model'

export default function passportSetup(passport: PassportStatic) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID as string,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: process.env.GOOGLE_CALLBACK_URL,
                // passReqToCallback: true
            },
            async (accessToken, refreshToken, profile: Profile, done) => {
                // console.log("***Trying to access google account:***\n ", profile)
                try {
                    let user = await userModel.findOne({
                        google_acct: {
                            google_id: profile.id
                        }
                    });

                    if (user) {
                        done(null, user);
                    } else {
                        //register new user

                        const newUser: IUserDoc = new userModel({
                            google_acct: {
                                google_id: profile.id,
                                name: profile.displayName,
                                email: profile.emails?.[0].value,
                                photo: profile.photos?.[0].value
                            }
                        })

                        user = await userModel.create(newUser);
                        console.log("created new user.")
                        done(null, user);

                    }
                } catch (err: any) {
                    console.error(err);
                    done(err, undefined);
                }
            }
        )
    );

    // passport.use(
    //     new AppleStrategy(
    //         //Apple oAuth strategy ...
    //     )
    // )

    passport.serializeUser((user: Express.User, done) => {
        console.log(`passport serialize user: `, user)
        done(null, user.google_acct?.google_id);
    });

    passport.deserializeUser((id, done) => {
        console.log(`passport deserialize user id: `, id)
        userModel.findOne({
            google_acct: {
                google_id: id
            }
        }, (err: mongoose.Error, user: IUserDoc) => {
            done(err, user);
        })
    })
}