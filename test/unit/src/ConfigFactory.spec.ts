import { createSandbox, SinonSandbox, SinonStub } from 'sinon'
import { ConfigFactory } from '../../../src/ConfigFactory'

describe('ConfigFactory', () => {
  let sandbox: SinonSandbox = createSandbox()
  let inputFn: SinonStub
  let configFactory: ConfigFactory

  beforeEach(() => {
    inputFn = sandbox.stub()
    configFactory = new ConfigFactory(inputFn)
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('separates parameter names by comma', () => {
    inputFn
      .withArgs('names')
      .returns('test-1,test-2')

    inputFn
      .withArgs('withDecryption')
      .returns('true')

    return configFactory.get().names.should.deep.equal(['test-1', 'test-2'])
  })

  it('ensures all parameter names are trimmed', () => {
    inputFn
      .withArgs('names')
      .returns('test-1 , test-2')

    inputFn
      .withArgs('withDecryption')
      .returns('true')

    return configFactory.get().names.should.deep.equal(['test-1', 'test-2'])
  })

  it('throws an error if names is an empty string', () => {
    inputFn
      .withArgs('names')
      .returns('')

    inputFn
      .withArgs('withDecryption')
      .returns('true')

    const exec = () => configFactory.get()
    exec.should.throw('The names parameter cannot be an empty string')
  })
  
  it('throws an error if withDecryption is an empty string', () => {
    inputFn
      .withArgs('names')
      .returns('test-1')

    inputFn
      .withArgs('withDecryption')
      .returns('')

    const exec = () => configFactory.get()
    exec.should.throw('the withDecryption parameter cannot be an empty string')
  })

  it('maps "true" to true for withDecryption', () => {
    inputFn
      .withArgs('names')
      .returns('test-1,test-2')

    inputFn
      .withArgs('withDecryption')
      .returns('true')

    return configFactory.get().withDecryption.should.equal(true)
  })

  it('maps "1" to true for withDecryption', () => {
    inputFn
      .withArgs('names')
      .returns('test-1,test-2')

    inputFn
      .withArgs('withDecryption')
      .returns('1')

    return configFactory.get().withDecryption.should.equal(true)
  })

  it('maps "false" to false for withDecryption', () => {
    inputFn
      .withArgs('names')
      .returns('test-1,test-2')

    inputFn
      .withArgs('withDecryption')
      .returns('false')

    return configFactory.get().withDecryption.should.equal(false)
  })

  it('maps "0" to false for withDecryption', () => {
    inputFn
      .withArgs('names')
      .returns('test-1,test-2')

    inputFn
      .withArgs('withDecryption')
      .returns('0')

    return configFactory.get().withDecryption.should.equal(false)
  })

  it('defaults to false for withDecryption', () => {
    inputFn
      .withArgs('names')
      .returns('test-1,test-2')

    inputFn
      .withArgs('withDecryption')
      .returns('invalid-input')

    return configFactory.get().withDecryption.should.equal(false)
  })
})
