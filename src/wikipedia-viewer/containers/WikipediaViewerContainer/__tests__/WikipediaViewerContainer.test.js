/* eslint-env jest */

import React from 'react'
import { mount } from 'enzyme'
import nock from 'nock'
import sinon from 'sinon'
import WikipediaViewerContainer, { getRandomWikipediaEntryLink } from '..'

let sandbox
let getRandomEntryAjax
const mockResponse = {
  'batchcomplete': '',
  'continue': {
    'rncontinue': '0.180850061118|0.180850096868|40636728|0', 'continue': '-||'
  },
  'query': {
    'random': [
      {
        'id': 33860543, 'ns': 3, 'title': 'User talk:124.190.198.128'
      }
    ]
  }
}
const entryBaseUri = 'https://en.wikipedia.org/wiki/'
const expectedEntryLink = `${entryBaseUri}${mockResponse.query.random[0].title}`

beforeEach(() => {
  const randomEntryAPIUri = 'https://en.wikipedia.org'
  getRandomEntryAjax = nock(randomEntryAPIUri)
    .get('/w/api.php?action=query&list=random&rnlimit=1&format=json&origin=*')
    .reply(200, mockResponse)

  sandbox = sinon.sandbox.create()
})

afterEach(() => {
  nock.cleanAll()
  sandbox.restore()
})

describe('getRandomWikipediaEntryLink', () => {
  it(`should return a random Wikipedia entry link by acessing Wikipedia's API`, async () => {
    const randomEntryLink = await getRandomWikipediaEntryLink()
    expect(randomEntryLink).toBe(expectedEntryLink)
  })
})

describe('WikipediaViewerContainer container', () => {
  it(`should call Wikipedia's API retrieve a random entry once the component mounts`, () => {
    sandbox.spy(WikipediaViewerContainer.prototype, 'componentDidMount')
    sandbox.spy(WikipediaViewerContainer.prototype, 'setRandomEntryLink')

    mount(<WikipediaViewerContainer />)

    expect(WikipediaViewerContainer.prototype.componentDidMount.callCount).toEqual(1)
    expect(WikipediaViewerContainer.prototype.setRandomEntryLink.callCount).toEqual(1)
    expect(getRandomEntryAjax.isDone()).toBe(true)
  })
})
