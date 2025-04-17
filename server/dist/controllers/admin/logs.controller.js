var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import catchAsyncErrors from "../../middleware/catchAsyncErrors.js";
import ErrorHandler from "../../utils/errorHandler.js";
import fs from "fs";
export const getInfoLogs = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fs.promises.readFile("./logger/logs.log", 'utf8');
    if (!data) {
        return next(new ErrorHandler("Logs File is empty", 404));
    }
    let logs = [];
    const logLines = data.split('\n');
    logLines.forEach((line, index) => {
        if (line.trim() !== '') {
            const logParts = line.match(/(.*?)\s\[(.*?)\]\s(.*?):\s(.*)/);
            if (logParts && logParts.length === 5) {
                const [_, timestamp, tag, level, description] = logParts;
                logs.push({
                    id: index + 1,
                    data: {
                        timestamp,
                        tag,
                        level,
                        description
                    }
                });
            }
        }
    });
    res.status(200).json({
        status: 'success',
        data: logs,
    });
}));
export const getErrorLogs = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fs.promises.readFile("./logger/error.log", 'utf8');
    if (!data) {
        return next(new ErrorHandler("Error File is empty", 404));
    }
    let logs = [];
    const logLines = data.split('\n');
    logLines.forEach((line, index) => {
        if (line.trim() !== '') {
            const logParts = line.match(/(.*?)\s\[(.*?)\]\s(.*?):\s(.*)/);
            if (logParts && logParts.length === 5) {
                const [_, timestamp, tag, level, description] = logParts;
                logs.push({
                    id: index + 1,
                    data: {
                        timestamp,
                        tag,
                        level,
                        description
                    }
                });
            }
        }
    });
    res.status(200).json({
        status: 'success',
        data: logs,
    });
}));
export const deleteInfoLogs = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fs.promises.readFile("./logger/logs.log", 'utf8');
    if (!data) {
        return next(new ErrorHandler("Nothing to delete here", 404));
    }
    yield fs.promises.truncate('./logger/logs.log', 0);
    res.status(200).json({
        status: 'success',
        message: 'Logs deleted successfully'
    });
}));
export const deleteErrorLogs = catchAsyncErrors((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fs.promises.readFile("./logger/error.log", 'utf8');
    if (!data) {
        return next(new ErrorHandler("Nothing to delete here", 404));
    }
    yield fs.promises.truncate('./logger/error.log', 0);
    res.status(200).json({
        status: 'success',
        message: 'Errors deleted successfully'
    });
}));
//# sourceMappingURL=logs.controller.js.map