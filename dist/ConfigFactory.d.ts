import { InputOptions } from '@actions/core';
interface Config {
    names: string[];
    withDecryption: boolean;
}
declare type InputFunction = (name: string, options?: InputOptions) => string;
declare class ConfigFactory {
    private inputFn;
    constructor(inputFn: InputFunction);
    get(): Config;
}
export { ConfigFactory };
