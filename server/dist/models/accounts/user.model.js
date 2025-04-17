var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
export const UserRoleEnum = {
    USER: "USER",
    ADMIN: "ADMIN",
    ORGANIZATION: "ORGANIZATION"
};
export const UserAccountEnum = {
    EMAIL: "EMAIL",
    GOOGLE: "GOOGLE",
};
const BillingInfoSchema = new mongoose.Schema({
    phoneNumber: String,
    address: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String,
    }
}, {
    _id: false
});
const UserSchema = new mongoose.Schema({
    profile: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            index: true,
            match: [/.+\@.+\..+/, 'Please enter a valid email address']
        },
        password: {
            type: String,
            required: [true, "Please Enter your Password"],
            minLength: [8, "Password should have more than 8 characters"],
            default: "GooglePassword",
            select: false
        },
        profilePicture: {
            type: String,
            default: ''
        },
        role: {
            type: String,
            enum: Object.values(UserRoleEnum),
            default: UserRoleEnum.USER,
        },
        googleId: String,
        customerId: String,
    },
    account: {
        accountType: {
            type: [{
                    type: String,
                    enum: Object.values(UserAccountEnum),
                }],
            default: [UserAccountEnum.EMAIL],
        },
        isBlocked: {
            type: Boolean,
            default: false
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        isDeactivated: {
            type: Boolean,
            default: false
        },
        deactivateReason: String,
        deactivateTime: Date,
        loginAttempt: {
            count: {
                type: Number,
                default: 0,
            },
            lastLogin: {
                type: Date,
                default: Date.now
            },
        },
    },
    access: {
        billingInfo: BillingInfoSchema,
        latestSubscription: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subscription',
        },
        freeAccess: {
            type: Boolean,
            required: true,
            default: false
        },
        cards: {
            total: {
                initial: {
                    type: Number,
                    required: true,
                    default: 10
                },
                extra: {
                    type: Number,
                    required: true,
                    default: 0
                }
            },
            created: {
                type: Number,
                required: true,
                default: 0
            }
        },
    },
    organization: {
        website: String,
        organizationBilling: BillingInfoSchema,
    },
    oneTimePassword: String,
    oneTimeExpire: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, {
    timestamps: true,
});
// Password Hash
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("profile.password")) {
            return next();
        }
        if (this.profile.password) {
            this.profile.password = yield bcrypt.hash(this.profile.password, 10);
        }
        next();
    });
});
// Access Token
UserSchema.methods.generateJWTToken = function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
    return token;
};
// Compare Password
UserSchema.methods.comparePassword = function (enteredPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.profile.password)
            return false;
        return yield bcrypt.compare(enteredPassword, this.profile.password);
    });
};
// Generating Password Reset Token
UserSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.resetPasswordExpire = new Date(Date.now() + 15 * 60 * 1000);
    return resetToken;
};
// Generating One Time Password
UserSchema.methods.getOneTimePassword = function () {
    const otp = Math.floor(100000 + Math.random() * 900000);
    this.oneTimePassword = crypto
        .createHash("sha256")
        .update(otp.toString())
        .digest("hex");
    this.oneTimeExpire = new Date(Date.now() + 15 * 60 * 1000);
    return otp.toString();
};
const User = mongoose.model("User", UserSchema);
export default User;
//# sourceMappingURL=user.model.js.map