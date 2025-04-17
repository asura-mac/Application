class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    getQuery() {
        return this.query;
    }
    search() {
        const keyword = this.queryStr.keyword
            ? {
                // "profile.email": { $regex: this.queryStr.keyword, $options: "i"},
                // $or: [
                //     { shortCode: { $regex: this.queryStr.keyword, $options: "i" } },
                //     { "data.name": { $regex: this.queryStr.keyword, $options: "i" } },
                // ],
                $or: [
                    { "profile.email": { $regex: this.queryStr.keyword, $options: "i" } },
                    { "profile.firstName": { $regex: this.queryStr.keyword, $options: "i" } },
                    { "profile.lastName": { $regex: this.queryStr.keyword, $options: "i" } },
                    {
                        $expr: {
                            $regexMatch: {
                                input: { $concat: ["$profile.firstName", " ", "$profile.lastName"] },
                                regex: this.queryStr.keyword,
                                options: "i",
                            },
                        },
                    },
                ],
            }
            : {};
        this.query = this.query.find(Object.assign({}, keyword));
        return this;
    }
    searchCard() {
        const keyword = this.queryStr.keyword
            ? {
                $or: [
                    { shortCode: { $regex: this.queryStr.keyword, $options: "i" } },
                    { "data.name": { $regex: this.queryStr.keyword, $options: "i" } },
                ],
            }
            : {};
        this.query = this.query.find(Object.assign({}, keyword));
        return this;
    }
    filter() {
        const queryCopy = Object.assign({}, this.queryStr);
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach((key) => delete queryCopy[key]);
        const accountFilters = {};
        ["isVerified", "isBlocked", "isDeactivated"].forEach((key) => {
            if (queryCopy[key] !== undefined) {
                accountFilters[`account.${key}`] = queryCopy[key];
                delete queryCopy[key];
            }
        });
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        // this.query = this.query.find(JSON.parse(queryStr));
        this.query = this.query.find(Object.assign(Object.assign({}, JSON.parse(queryStr)), accountFilters));
        return this;
    }
    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}
export default ApiFeatures;
//# sourceMappingURL=api.features.js.map