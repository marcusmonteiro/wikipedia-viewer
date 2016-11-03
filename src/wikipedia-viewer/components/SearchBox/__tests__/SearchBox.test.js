/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import SearchBox from '..'

describe('SearchBox component', () => {
  it('should show a hintText when one is passed as props', () => {
    const hintText = 'foo'
    const wrapper = shallow(<SearchBox hintText={hintText} />)
    expect(wrapper.find('TextField').props().hintText).toBe(hintText)
  })
})
