import mongoose, { Document, Schema } from "mongoose";

export interface IGoogleAct {
    google_id?: string,
    name?: string,
    photo?: string,
    email?: string
}

export interface IAppleAct {
    apple_id?: string,
}

export interface IUserDoc extends Document {
    _id: Schema.Types.ObjectId,
    register_date: Date,
    google_acct?: IGoogleAct,
    apple_acct?: IAppleAct,
}


/**
 * @description User schema that either google act or apple acct is required
 */
const UserSchema = new Schema<IUserDoc>({
    _id: { type: Schema.Types.ObjectId, auto: true },
    register_date: {
        type: Date,
        default: Date.now
    },
    google_acct: {
        google_id: {
            type: String,
            required: function (this: IUserDoc) {
                return !this.apple_acct;
            }
        },
        name: {
            type: String,
            allowNull: true
        },
        photo: {
            type: String,
            allowNull: true
        },
        email: {
            type: String,
            allowNull: true
        },
        required: function (this: IUserDoc) {
            return !this.apple_acct;
        }
    },
    apple_acct: {
        apple_id: {
            type: String,
            required: function (this: IUserDoc) {
                return !this.google_acct;
            }
        },
        required: function (this: IUserDoc) {
            return !this.google_acct;
        }
    }
}, { collection: "user" });

export default mongoose.model<IUserDoc>('user', UserSchema);