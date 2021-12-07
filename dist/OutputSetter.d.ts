import { Parameter } from './ParameterFetcher';
declare type OutputFn = (key: string, value: string) => void;
declare class OutputSetter {
    private outputFn;
    constructor(outputFn: OutputFn);
    set(params: Parameter[]): void;
}
export { OutputSetter };
