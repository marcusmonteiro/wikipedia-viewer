/* eslint-env jest */

import React from 'react'
import sinon from 'sinon'
import { mount } from 'enzyme'
import PreviousNext from '..'

let sandbox
beforeEach(() => {
  sandbox = sinon.sandbox.create()
})

afterEach(() => {
  sandbox.restore()
})

describe('<PreviousNext />', () => {
  it(`should call a function passed as props when the 'previous' icon button is clicked`, () => {
    const foo = sandbox.stub()
    const wrapper = mount(<PreviousNext previousFunc={foo} />)
    const previousButton = wrapper.find('IconButton').first()
    previousButton.simulate('click')
    expect(foo.calledOnce).toBe(true)
  })

  it(`should call a function passed as props when the 'next' icon button is clicked`, () => {
    const foo = sandbox.stub()
    const wrapper = mount(<PreviousNext nextFunc={foo} />)
    const nextButton = wrapper.find('IconButton').last()
    nextButton.simulate('click')
    expect(foo.calledOnce).toBe(true)
  })
})
