import { Parameter } from './ParameterFetcher'

type OutputFn = (key: string, value: string) => void

class OutputSetter {
  constructor (private outputFn: OutputFn) {
  }

  public set(params: Parameter[]): void {
    params.forEach(param => this.outputFn(param.name, param.value))
  }
}

export { OutputSetter }
