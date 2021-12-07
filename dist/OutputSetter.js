"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputSetter = void 0;
var OutputSetter = /** @class */ (function () {
    function OutputSetter(outputFn) {
        this.outputFn = outputFn;
    }
    OutputSetter.prototype.set = function (params) {
        var _this = this;
        params.forEach(function (param) { return _this.outputFn(param.name, param.value); });
    };
    return OutputSetter;
}());
exports.OutputSetter = OutputSetter;
//# sourceMappingURL=OutputSetter.js.map