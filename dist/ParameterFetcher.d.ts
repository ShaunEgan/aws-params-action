import { SSM } from 'aws-sdk';
interface Parameter {
    name: string;
    value: string;
}
declare class ParameterFetcher {
    private ssm;
    constructor(ssm: SSM);
    fetch(names: string[], withDecryption: boolean): Promise<Parameter[]>;
}
export { ParameterFetcher, Parameter };
