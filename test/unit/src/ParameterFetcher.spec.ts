import { createSandbox, SinonSandbox } from 'sinon'
import { ParameterFetcher } from '../../../src/ParameterFetcher'

describe('ParameterFetcher', () => {
  let sandbox: SinonSandbox = createSandbox()
  let ssm: any
  let request: any
  let parameterFetcher: ParameterFetcher

  beforeEach(() => {
    request = {
      promise: sandbox.stub()
    }

    ssm = {
      getParameters: sandbox.stub()
    }

    parameterFetcher = new ParameterFetcher(ssm)
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('#fetch', () => {
    const params = [ 'test-name' ]
    const withDecryption = true

    it('resolves an empty array when no names are supplied', () => {
      return parameterFetcher.fetch([], withDecryption)
        .should.eventually.deep.equal([])
    })

    it('calls ssm.getParameters with the expected options', () => {
      ssm.getParameters
        .onFirstCall()
        .returns(request)

      request.promise
        .resolves({
          Parameters: [
            {
              Name: params[0],
              Value: 'test-value'
            }
          ]
        })

      return parameterFetcher.fetch(params, withDecryption)
        .then(() => {
          ssm.getParameters.should.have.been.calledOnceWithExactly({
            Names: params,
            WithDecryption: withDecryption
          })
        })
    })

    it('rejects when no results are returned', () => {
      ssm.getParameters
        .onFirstCall()
        .returns(request)

      request.promise
        .resolves({})

      return parameterFetcher.fetch(params, withDecryption).should.eventually.be.rejectedWith('No parameters returned')
    })

    it('rejects when the number of results do no match the number of parameters requested', () => {
      ssm.getParameters
        .onFirstCall()
        .returns(request)

      request.promise
        .resolves({
          Parameters: [
            {
              Name: 'first-param',
              Value: 'test-value'
            }
          ]
        })

      return parameterFetcher.fetch([ 'first-param', 'second-param' ], withDecryption).should.eventually.be.rejectedWith('Not all parameters exist')
    })

    it('returns the expected result', () => {
      ssm.getParameters
        .onFirstCall()
        .returns(request)

      request.promise
        .resolves({
          Parameters: [
            {
              Name: params[0],
              Value: 'test-value'
            }
          ]
        })

      return parameterFetcher.fetch(params, withDecryption).should.eventually.deep.equal([
        {
          name: params[0],
          value: 'test-value'
        }
      ])
    })
  })
})
