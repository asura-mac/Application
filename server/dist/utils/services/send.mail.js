var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import sgMail from "@sendgrid/mail";
import { EMAIL_ACCOUNT_BLOCKED, EMAIL_ACCOUNT_CREATED, EMAIL_ACCOUNT_DEACTIVATED, EMAIL_ADMIN_CUSTOM_MESSAGE, EMAIL_DONATE_CAPTURED, EMAIL_DONATE_FAILED, EMAIL_OTP_VERIFICATION, EMAIL_REPLY_CUSTOM_PLAN, EMAIL_REQUEST_CUSTOM_PLAN, EMAIL_RESET_PASSWORD, EMAIL_SUBSCRIPTION_CANCELLED, EMAIL_SUBSCRIPTION_CHARGED, EMAIL_SUBSCRIPTION_CREATED, EMAIL_SUBSCRIPTION_HALTED, EMAIL_SUBSCRIPTION_PAUSED, EMAIL_SUBSCRIPTION_PENDING, EMAIL_SUBSCRIPTION_RESUMED } from "../../constants/template.js";
const sendMail = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const emailTemplateMappings = [
        {
            emailTemplate: EMAIL_OTP_VERIFICATION,
            templateId: process.env.TEMPLATE_ID_OTP_VERIFICATION
        },
        {
            emailTemplate: EMAIL_ACCOUNT_CREATED,
            templateId: process.env.TEMPLATE_ID_ACCOUNT_CREATED
        },
        {
            emailTemplate: EMAIL_RESET_PASSWORD,
            templateId: process.env.TEMPLATE_ID_RESET_PASSWORD
        },
        {
            emailTemplate: EMAIL_REQUEST_CUSTOM_PLAN,
            templateId: process.env.TEMPLATE_ID_REQUEST_CUSTOM_PLAN
        },
        {
            emailTemplate: EMAIL_REPLY_CUSTOM_PLAN,
            templateId: process.env.TEMPLATE_ID_REPLY_CUSTOM_PLAN
        },
        {
            emailTemplate: EMAIL_ADMIN_CUSTOM_MESSAGE,
            templateId: process.env.TEMPLATE_ID_ADMIN_CUSTOM_MESSAGE
        },
        {
            emailTemplate: EMAIL_ACCOUNT_BLOCKED,
            templateId: process.env.TEMPLATE_ID_ACCOUNT_BLOCKED
        },
        {
            emailTemplate: EMAIL_ACCOUNT_DEACTIVATED,
            templateId: process.env.TEMPLATE_ID_ACCOUNT_DEACTIVATED
        },
        {
            emailTemplate: EMAIL_SUBSCRIPTION_CREATED,
            templateId: process.env.TEMPLATE_ID_SUBSCRIPTION_CREATED
        },
        {
            emailTemplate: EMAIL_SUBSCRIPTION_CHARGED,
            templateId: process.env.TEMPLATE_ID_SUBSCRIPTION_CHARGED
        },
        {
            emailTemplate: EMAIL_SUBSCRIPTION_PENDING,
            templateId: process.env.TEMPLATE_ID_SUBSCRIPTION_PENDING
        },
        {
            emailTemplate: EMAIL_SUBSCRIPTION_HALTED,
            templateId: process.env.TEMPLATE_ID_SUBSCRIPTION_HALTED
        },
        {
            emailTemplate: EMAIL_SUBSCRIPTION_CANCELLED,
            templateId: process.env.TEMPLATE_ID_SUBSCRIPTION_CANCELLED
        },
        {
            emailTemplate: EMAIL_SUBSCRIPTION_PAUSED,
            templateId: process.env.TEMPLATE_ID_SUBSCRIPTION_PAUSED
        },
        {
            emailTemplate: EMAIL_SUBSCRIPTION_RESUMED,
            templateId: process.env.TEMPLATE_ID_SUBSCRIPTION_RESUMED
        },
        {
            emailTemplate: EMAIL_DONATE_CAPTURED,
            templateId: process.env.TEMPLATE_ID_DONATE_CAPTURED
        },
        {
            emailTemplate: EMAIL_DONATE_FAILED,
            templateId: process.env.TEMPLATE_ID_DONATE_FAILED
        }
    ];
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    try {
        const { templateId, recieverEmail, dynamicData } = options;
        console.log(options);
        const templateMapping = emailTemplateMappings.find(mapping => mapping.emailTemplate === templateId);
        if (!templateMapping) {
            throw new Error(`Template ID not found for ${templateId}`);
        }
        const mail = {
            from: {
                name: process.env.ORGANIZATION_NAME,
                email: process.env.ORGANIZATION_EMAIL,
            },
            personalizations: [
                {
                    to: [{ email: recieverEmail }],
                    dynamicTemplateData: dynamicData
                }
            ],
            templateId: templateMapping.templateId,
        };
        yield sgMail.send(mail);
        console.log(`Email sent successfully to ${recieverEmail}`);
    }
    catch (error) {
        console.error("Error sending email:", error);
    }
});
export default sendMail;
//# sourceMappingURL=send.mail.js.map