import mongoose from "mongoose";
import crypto from "crypto";
import jwt from "jsonwebtoken";
const DonatorSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    phoneNumber: String,
    address: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String,
    },
    customerId: String,
    latestDonation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subscription",
    },
    oneTimePassword: String,
    oneTimeExpire: Date,
}, {
    timestamps: true
});
DonatorSchema.methods.generateJWTToken = function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
    return token;
};
DonatorSchema.methods.getOneTimePassword = function () {
    const otp = Math.floor(100000 + Math.random() * 900000);
    this.oneTimePassword = crypto
        .createHash("sha256")
        .update(otp.toString())
        .digest("hex");
    this.oneTimeExpire = new Date(Date.now() + 15 * 60 * 1000);
    return otp.toString();
};
const Donator = mongoose.model("Donator", DonatorSchema);
export default Donator;
//# sourceMappingURL=donator.model.js.map