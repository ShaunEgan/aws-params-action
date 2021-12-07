import { createSandbox, SinonSandbox, SinonStub } from 'sinon'
import { OutputSetter } from '../../../src/OutputSetter'
import { Parameter } from '../../../src/ParameterFetcher'

describe('OutputSetter', () => {
  let sandbox: SinonSandbox = createSandbox()
  let outputFn: SinonStub
  let outputSetter: OutputSetter

  beforeEach(() => {
    outputFn = sandbox.stub()
    outputSetter = new OutputSetter(outputFn)
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('calls the outputFn with the expected params for every parameter', () => {
    const params: Parameter[] = [
      {
        name: 'test-name',
        value: 'test-value'
      },
      {
        name: 'test-name-2',
        value: 'test-value-2'
      }
    ]

    outputSetter.set(params)

    outputFn.should.have.been.calledTwice
    outputFn.should.have.been.calledWithExactly(params[0].name, params[0].value)
    outputFn.should.have.been.calledWithExactly(params[1].name, params[1].value)
  })
})
