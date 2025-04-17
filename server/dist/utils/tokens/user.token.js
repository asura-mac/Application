const sendToken = (user, statusCode, res) => {
    const token = user.generateJWTToken();
    const options = {
        expires: new Date(Date.now() + parseInt(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    };
    res.status(statusCode).cookie("user_token", token, options).json({
        success: true,
        user,
        token,
    });
};
export default sendToken;
//# sourceMappingURL=user.token.js.map