var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import qs from "qs";
import axios from "axios";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import User, { UserAccountEnum, UserRoleEnum } from "../models/accounts/user.model.js";
import { CLIENT_URL } from "../index.js";
const router = express.Router();
const getGoogleAuthToken = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const url = "https://oauth2.googleapis.com/token";
    const values = {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URL,
        grant_type: "authorization_code",
    };
    try {
        const res = yield axios.post(url, qs.stringify(values), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        return res.data;
    }
    catch (error) {
        console.error("AUth Token: ", error.message);
        throw new Error(error.message);
    }
});
const getGoogleUser = (id_token, access_token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
            headers: {
                Authorization: `Bearer ${id_token}`,
            },
        });
        return res.data;
    }
    catch (error) {
        console.error("Google User: ", error.message);
        throw new Error(error.message);
    }
});
router.route("/api/google/oauth").get(catchAsyncErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { code } = req.query;
    if (!code) {
        throw new ErrorHandler("No code provided", 400);
    }
    const { id_token, access_token } = yield getGoogleAuthToken(code);
    const googleUser = yield getGoogleUser(id_token, access_token);
    if (!googleUser.email) {
        throw new ErrorHandler("Google authentication failed: No email received", 400);
    }
    const options = {
        expires: new Date(Date.now() + parseInt(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    };
    let user = yield User.findOne({ "profile.email": googleUser.email });
    if (user) {
        if (user.profile.googleId !== googleUser.id) {
            user.profile.googleId = googleUser.id;
            user.account.accountType = [...new Set([...user.account.accountType, UserAccountEnum.GOOGLE])];
            if (!user.profile.profilePicture || user.profile.profilePicture.length === 0) {
                user.profile.profilePicture = googleUser.picture;
            }
            yield user.save();
        }
    }
    else {
        // Fixing the missing firstName, lastName issue
        const fullName = ((_a = googleUser.name) === null || _a === void 0 ? void 0 : _a.split(" ")) || ["", ""];
        const firstName = fullName[0] || "Unknown";
        const lastName = fullName.slice(1).join(" ") || "Unknown";
        user = yield User.create({
            profile: {
                firstName,
                lastName,
                email: googleUser.email,
                profilePicture: googleUser.picture || "",
                googleId: googleUser.id,
                role: googleUser.email === process.env.ADMIN_EMAIL ? UserRoleEnum.ADMIN : UserRoleEnum.USER,
            },
            account: {
                accountType: [UserAccountEnum.GOOGLE],
                isVerified: googleUser.verified_email || false,
            }
        });
    }
    const token = user.generateJWTToken();
    res.cookie("user_token", token, options);
    return res.redirect(CLIENT_URL);
})));
export default router;
//# sourceMappingURL=google.routes.js.map