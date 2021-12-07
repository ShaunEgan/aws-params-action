import { SSM } from 'aws-sdk'

interface Parameter {
  name: string
  value: string
}

class ParameterFetcher {
  constructor (private ssm: SSM) {
  }

  public fetch (names: string[], withDecryption: boolean): Promise<Parameter[]> {
    if (names.length == 0) return Promise.resolve([])

    const params = {
      Names: names,
      WithDecryption: withDecryption
    }

    return this.ssm.getParameters(params).promise()
      .then(result => {
        if (!result.Parameters) throw new Error('No parameters returned')
        if (result.Parameters.length !== names.length) throw new Error('Not all parameters exist')

        return result.Parameters.map(param => ({ name: param.Name, value: param.Value } as Parameter))
      })
  }
}

export { ParameterFetcher, Parameter }
