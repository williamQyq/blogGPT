import { IUserDoc } from "./lib/models/user.model";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_DEV: 'development' | 'production' | 'test';
            SESSION_SECRETE: string;
            GOOGLE_CLIENT_ID: string;
            GOOGLE_CLIENT_SECRET: string;
            GOOGLE_CALLBACK_URL: string;
            MONGO_URI: string;
            ORIGIN: string;
        }
    };
    namespace Express {
        interface User extends IUserDoc { }
    }

}

export { }