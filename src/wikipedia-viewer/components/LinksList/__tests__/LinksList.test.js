/* eslint-env jest */

import React from 'react'
import sinon from 'sinon'
import { shallow, mount } from 'enzyme'
import LinksList from '..'

let sandbox, links
beforeEach(() => {
  sandbox = sinon.sandbox.create()
  links = [
    {
      description: 'google',
      href: 'http://www.google.com'
    },
    {
      description: 'freecodecamp',
      href: 'http://www.freecodecamp.com'
    },
    {
      description: 'quora',
      href: 'http://www.quora.com'
    }
  ]
})

afterEach(() => {
  sandbox.restore()
})

describe('<LinksList />', () => {
  it('should render a list of link objects passed as as props', () => {
    const wrapper = shallow(<LinksList links={links} />)
    expect(wrapper.find('ListItem').length).toBe(links.length)
  })
})
