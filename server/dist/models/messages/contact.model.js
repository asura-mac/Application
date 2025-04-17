import mongoose from "mongoose";
const ContactSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please Enter your Email"],
        match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    name: {
        type: String,
        required: [true, "Please Enter your Name"],
    },
    message: {
        type: String,
        required: [true, "Please Enter Message"],
    },
    report: {
        type: Boolean,
        required: true,
        default: false
    },
    attended: {
        type: Boolean,
        required: true,
        default: false
    },
}, {
    timestamps: true
});
const Contact = mongoose.model("Contact", ContactSchema);
export default Contact;
//# sourceMappingURL=contact.model.js.map