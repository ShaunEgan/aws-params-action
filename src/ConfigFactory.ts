import { InputOptions } from '@actions/core'

interface Config {
  names: string[],
  withDecryption: boolean
}

type InputFunction = (name: string, options?: InputOptions) => string
const nullOrEmpty = (val: string) => val === null || val === ''

class ConfigFactory {
  constructor (private inputFn: InputFunction) {
  }

  public get (): Config {
    const opts: InputOptions = { required: true }
    const rawNames = this.inputFn('names', opts)
    const withDecryption = this.inputFn('withDecryption', opts)

    if (nullOrEmpty(rawNames)) throw new Error('The names parameter cannot be an empty string')
    if (nullOrEmpty(withDecryption)) throw new Error('the withDecryption parameter cannot be an empty string')

    return {
      names: rawNames.split(',').map(name => name.trim()),
      withDecryption: withDecryption === 'true' || withDecryption === '1'
    }
  }
}

export { ConfigFactory }
