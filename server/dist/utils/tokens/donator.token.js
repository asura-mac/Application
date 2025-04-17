const sendDonatorToken = (donator, statusCode, res) => {
    const donator_auth = donator.generateJWTToken();
    const options = {
        expires: new Date(Date.now() + parseInt(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    };
    res.status(statusCode).cookie("donator_auth", donator_auth, options).json({
        success: true,
        donator,
        donator_auth,
    });
};
export default sendDonatorToken;
//# sourceMappingURL=donator.token.js.map