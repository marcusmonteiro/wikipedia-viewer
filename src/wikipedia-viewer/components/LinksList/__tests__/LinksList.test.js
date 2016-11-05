/* eslint-env jest */

import React from 'react'
import sinon from 'sinon'
import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { shallow } from 'enzyme'
import LinksList from '..'

chai.use(chaiEnzyme())

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
  it('should render a list of link objects passed as props', () => {
    const wrapper = shallow(<LinksList links={links} />)
    const wrapperLinks = wrapper.find('a')
    expect(wrapperLinks.length).toBe(links.length)
    wrapperLinks.map((wrapperLink, idx) => {
      chai.expect(wrapperLink).to.have.attr('href').equal(links[idx].href)
      // TODO: See how to access the value
      // chai.expect(wrapperLink).to.have.value(links[idx].description)
    })
  })

  test('if a header is passed as props, it should render it', () => {
    const header = 'header'
    const wrapper = shallow(<LinksList header={header} links={links} />)
    chai.expect(wrapper.find('Subheader')).to.contain.text(header)
  })
})
