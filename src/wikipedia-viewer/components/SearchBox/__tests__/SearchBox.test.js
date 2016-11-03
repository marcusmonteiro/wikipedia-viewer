/* eslint-env jest */

import React from 'react'
import sinon from 'sinon'
import { shallow, mount } from 'enzyme'
import SearchBox from '..'

let sandbox
beforeEach(() => {
  sandbox = sinon.sandbox.create()
})

afterEach(() => {
  sandbox.restore()
})

describe('SearchBox component', () => {
  it('should show a hintText when one is passed as props', () => {
    const hintText = 'foo'
    const wrapper = shallow(<SearchBox hintText={hintText} />)
    expect(wrapper.find('TextField').props().hintText).toBe(hintText)
  })

  it('should call a function passed as props when the search icon is clicked', () => {
    const foo = sandbox.stub()
    const wrapper = mount(<SearchBox func={foo} />)
    wrapper.find('IconButton').simulate('click')
    expect(foo.calledOnce).toBe(true)
  })
})
