"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterFetcher = void 0;
var ParameterFetcher = /** @class */ (function () {
    function ParameterFetcher(ssm) {
        this.ssm = ssm;
    }
    ParameterFetcher.prototype.fetch = function (names, withDecryption) {
        if (names.length == 0)
            return Promise.resolve([]);
        var params = {
            Names: names,
            WithDecryption: withDecryption
        };
        return this.ssm.getParameters(params).promise()
            .then(function (result) {
            if (!result.Parameters)
                throw new Error('No parameters returned');
            if (result.Parameters.length !== names.length)
                throw new Error('Not all parameters exist');
            return result.Parameters.map(function (param) { return ({ name: param.Name, value: param.Value }); });
        });
    };
    return ParameterFetcher;
}());
exports.ParameterFetcher = ParameterFetcher;
//# sourceMappingURL=ParameterFetcher.js.map