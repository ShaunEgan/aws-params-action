"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aws_sdk_1 = require("aws-sdk");
var ConfigFactory_1 = require("./ConfigFactory");
var core_1 = require("@actions/core");
var ParameterFetcher_1 = require("./ParameterFetcher");
var OutputSetter_1 = require("./OutputSetter");
var ssm = new aws_sdk_1.SSM({ apiVersion: '2014-11-06' });
var configFactory = new ConfigFactory_1.ConfigFactory(core_1.getInput);
var parameterFetcher = new ParameterFetcher_1.ParameterFetcher(ssm);
var outputSetter = new OutputSetter_1.OutputSetter(core_1.setOutput);
Promise.resolve()
    .then(function () { return configFactory.get(); })
    .then(function (config) { return parameterFetcher.fetch(config.names, config.withDecryption); })
    .then(function (params) { return outputSetter.set(params); })
    .catch(console.error);
//# sourceMappingURL=index.js.map