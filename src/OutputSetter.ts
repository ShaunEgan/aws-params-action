import { Parameter } from './ParameterFetcher'

type OutputFn = (key: string, value: string) => void
type MaskerFn = (key: string) => void

class OutputSetter {
  constructor (private outputFn: OutputFn, private maskerFn: MaskerFn) {
  }

  public set(params: Parameter[]): void {
    params.forEach(param => {
      this.maskerFn(param.value)
      this.outputFn(param.name, param.value)
    })
  }
}

export { OutputSetter }
