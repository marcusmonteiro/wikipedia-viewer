/* eslint-env jest */

import React from 'react'
import { mount } from 'enzyme'
import nock from 'nock'
import sinon from 'sinon'
import WikipediaViewerContainer, { getRandomEntryLink, getSearchEntriesLinks } from '..'

let sandbox
let getRandomEntryLinkAjax, getFirstSearchEntriesAjax, getContinueSearchEntriesAjax

const entryBaseUri = 'https://en.wikipedia.org/wiki/'

const mockRandomEntryResponse = {
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
const expectedRandomEntryLink = `${entryBaseUri}${mockRandomEntryResponse.query.random[0].title}`

const mockFirstSearchResponse = {
  'batchcomplete': '',
  'continue': {
    'sroffset': 10,
    'continue': '-||'
  },
  'query': {
    'searchinfo': {
      'totalhits': 4555
    },
    'search': [
      {
        'ns': 0,
        'title': 'Albert Einstein Einstein',
        'snippet': '&quot;<span class="searchmatch">Einstein</span>&quot; redirects here. For other uses, see <span class="searchmatch">Albert Einstein</span> <span class="searchmatch">Einstein</span> (disambiguation) and <span class="searchmatch">Einstein</span> (disambiguation). <span class="searchmatch">Albert Einstein</span> <span class="searchmatch">Einstein</span> (/ˈaɪnstaɪn/; German: [ˈalbɛɐ̯t',
        'size': 137407,
        'wordcount': 14689,
        'timestamp': '2016-10-30T11:58:09Z'
      },
      {
        'ns': 0,
        'title': 'Einstein family',
        'snippet': "The <span class=\"searchmatch\">Einstein</span> family is the family of the physicist <span class=\"searchmatch\">Albert Einstein</span> <span class=\"searchmatch\">Einstein</span> (1879–1955). <span class=\"searchmatch\">Einstein</span>'s great-great-great-great-grandfather, Jakob Weil, was his oldest",
        'size': 35369,
        'wordcount': 3518,
        'timestamp': '2016-11-03T14:35:07Z'
      },
      {
        'ns': 0,
        'title': 'Albert Einstein Einstein Medal',
        'snippet': 'The <span class="searchmatch">Albert Einstein</span> <span class="searchmatch">Einstein</span> Medal is an award presented by the <span class="searchmatch">Albert Einstein</span> <span class="searchmatch">Einstein</span> Society in Bern. First given in 1979, the award is presented to people for &quot;scientific',
        'size': 2419,
        'wordcount': 222,
        'timestamp': '2016-08-18T23:24:05Z'
      },
      {
        'ns': 0,
        'title': 'Albert Einstein Einstein Hospital',
        'snippet': 'The Hospital Israelita <span class="searchmatch">Albert Einstein</span> <span class="searchmatch">Einstein</span> (English: <span class="searchmatch">Albert Einstein</span> <span class="searchmatch">Einstein</span> Israelite Hospital) is a Brazilian hospital, located in the Morumbi district, on the',
        'size': 6059,
        'wordcount': 228,
        'timestamp': '2016-10-28T13:51:09Z'
      },
      {
        'ns': 0,
        'title': 'Albert Einstein Einstein: The Practical Bohemian',
        'snippet': "<span class=\"searchmatch\">Albert Einstein</span> <span class=\"searchmatch\">Einstein</span>: The Practical Bohemian is a stage play that is the only show officially endorsed by the <span class=\"searchmatch\">Einstein</span> family. A quote from <span class=\"searchmatch\">Albert Einstein</span> Einstein's",
        'size': 2502,
        'wordcount': 231,
        'timestamp': '2016-10-11T01:35:50Z'
      },
      {
        'ns': 0,
        'title': 'Albert Einstein Einstein in popular culture',
        'snippet': "<span class=\"searchmatch\">Albert Einstein</span> <span class=\"searchmatch\">Einstein</span> has been the subject of or inspiration for many works of popular culture. On <span class=\"searchmatch\">Einstein</span>'s 72nd birthday on March 14, 1951, UPI photographer",
        'size': 21496,
        'wordcount': 2212,
        'timestamp': '2016-11-02T15:39:21Z'
      },
      {
        'ns': 0,
        'title': 'Political views of Albert Einstein Einstein',
        'snippet': '<span class="searchmatch">Albert Einstein</span> <span class="searchmatch">Einstein</span> was widely known during his lifetime for his work with the theory of relativity and physics in general. His political opinions were of',
        'size': 40766,
        'wordcount': 4653,
        'timestamp': '2016-11-01T11:05:36Z'
      },
      {
        'ns': 0,
        'title': 'Albert Einstein Einstein Peace Prize',
        'snippet': 'The <span class="searchmatch">Albert Einstein</span> <span class="searchmatch">Einstein</span> Peace Prize is/was a peace prize awarded annually since 1980 by the <span class="searchmatch">Albert Einstein</span> <span class="searchmatch">Einstein</span> Peace Prize Foundation. The Foundation dates from',
        'size': 8675,
        'wordcount': 581,
        'timestamp': '2016-09-27T02:57:28Z'
      },
      {
        'ns': 0,
        'title': 'Albert Einstein Einstein Square (Jerusalem)',
        'snippet': '<span class="searchmatch">Albert Einstein</span> <span class="searchmatch">Einstein</span> Square (Kikar <span class="searchmatch">Albert Einstein</span> <span class="searchmatch">Einstein</span>) is a public square in Jerusalem, Israel, named for the physicist <span class="searchmatch">Albert Einstein</span> <span class="searchmatch">Einstein</span>. It is located in the',
        'size': 3019,
        'wordcount': 284,
        'timestamp': '2016-06-27T20:43:55Z'
      },
      {
        'ns': 0,
        'title': 'Albert Einstein Einstein College of Medicine',
        'snippet': 'confused with <span class="searchmatch">Einstein</span> Medical Center. Coordinates: 40°51′03″N 73°50′42″W﻿ / ﻿40.850852°N 73.844949°W﻿ / 40.850852; -73.844949 The <span class="searchmatch">Albert Einstein</span> <span class="searchmatch">Einstein</span> College of',
        'size': 48256,
        'wordcount': 5275,
        'timestamp': '2016-09-10T19:54:25Z'
      }
    ]
  }
}

const mockContinueSearchResponse = {
  'batchcomplete': '',
  'continue': {
    'sroffset': 20,
    'continue': '-||'
  },
  'query': {
    'searchinfo': {
      'totalhits': 4555
    },
    'search': [
      {
        'ns': 0,
        'title': 'Albert Einstein Einstein Memorial',
        'snippet': 'The <span class="searchmatch">Albert Einstein</span> <span class="searchmatch">Einstein</span> Memorial is a monumental bronze statue depicting <span class="searchmatch">Albert Einstein</span> <span class="searchmatch">Einstein</span> seated with manuscript papers in hand by sculptor Robert Berks. It',
        'size': 7694,
        'wordcount': 938,
        'timestamp': '2016-06-29T03:07:36Z'
      },
      {
        'ns': 0,
        'title': 'Albert Einstein Einstein Award',
        'snippet': 'The <span class="searchmatch">Albert Einstein</span> <span class="searchmatch">Einstein</span> Award (sometimes mistakenly called the <span class="searchmatch">Albert Einstein</span> <span class="searchmatch">Einstein</span> Medal because it was accompanied with a gold medal) was an award in theoretical',
        'size': 6074,
        'wordcount': 566,
        'timestamp': '2016-07-01T20:25:41Z'
      },
      {
        'ns': 0,
        'title': 'Bernhard Caesar Einstein',
        'snippet': 'Bernard Caesar <span class="searchmatch">Einstein</span> (10 July 1930 – 30 September 2008) was a German-born Swiss-American physicist, the son of Hans <span class="searchmatch">Albert Einstein</span> <span class="searchmatch">Einstein</span>. Of the three known',
        'size': 7130,
        'wordcount': 768,
        'timestamp': '2016-10-27T12:42:34Z'
      },
      {
        'ns': 0,
        'title': 'Albert Einstein Einstein World Award of Science',
        'snippet': 'The <span class="searchmatch">Albert Einstein</span> <span class="searchmatch">Einstein</span> World Award for Science is a yearly award given by the World Cultural Council &quot;as a means of recognition, and as an incentive to scientific',
        'size': 27063,
        'wordcount': 1182,
        'timestamp': '2016-10-14T15:04:35Z'
      },
      {
        'ns': 0,
        'title': 'Albert Einstein Einstein Archives',
        'snippet': 'physicist <span class="searchmatch">Albert Einstein</span> <span class="searchmatch">Einstein</span>.        In his will, <span class="searchmatch">Albert Einstein</span> <span class="searchmatch">Einstein</span> left the Hebrew University his personal papers and the copyright to them. The <span class="searchmatch">Albert Einstein</span> <span class="searchmatch">Einstein</span> Archives',
        'size': 10134,
        'wordcount': 960,
        'timestamp': '2016-07-22T04:38:59Z'
      },
      {
        'ns': 0,
        'title': 'Religious and philosophical views of Albert Einstein Einstein',
        'snippet': "<span class=\"searchmatch\">Albert Einstein</span> <span class=\"searchmatch\">Einstein</span>'s religious views have been studied extensively. He believed in the pantheistic God of Baruch Spinoza, but not in a personal god, a belief",
        'size': 53924,
        'wordcount': 7121,
        'timestamp': '2016-11-03T11:16:10Z'
      },
      {
        'ns': 0,
        'title': 'List of scientific publications by Albert Einstein Einstein',
        'snippet': '<span class="searchmatch">Albert Einstein</span> <span class="searchmatch">Einstein</span> (1879–1955) was a renowned theoretical physicist of the 20th century, best known for his theories of special relativity and general relativity',
        'size': 164576,
        'wordcount': 4065,
        'timestamp': '2016-06-22T14:24:24Z'
      },
      {
        'ns': 0,
        'title': 'Albert Einstein Einstein School',
        'snippet': '<span class="searchmatch">Albert Einstein</span> <span class="searchmatch">Einstein</span> School may refer to: <span class="searchmatch">Albert Einstein</span> <span class="searchmatch">Einstein</span> College of Medicine, the Bronx, New York, a graduate school of Yeshiva University <span class="searchmatch">Albert Einstein</span>-Einstein-Schule',
        'size': 982,
        'wordcount': 130,
        'timestamp': '2013-12-20T19:10:12Z'
      },
      {
        'ns': 0,
        'title': "Albert Einstein Einstein's brain",
        'snippet': "The brain of physicist <span class=\"searchmatch\">Albert Einstein</span> <span class=\"searchmatch\">Einstein</span> has been a subject of much research and speculation. <span class=\"searchmatch\">Einstein</span>'s brain was removed within seven and a half hours",
        'size': 20135,
        'wordcount': 2454,
        'timestamp': '2016-10-24T16:20:31Z'
      },
      {
        'ns': 0,
        'title': 'List of things named after Albert Einstein Einstein',
        'snippet': "named after <span class=\"searchmatch\">Albert Einstein</span> <span class=\"searchmatch\">Einstein</span>.   Bose–<span class=\"searchmatch\">Einstein</span> condensate Bose–<span class=\"searchmatch\">Einstein</span> statistics <span class=\"searchmatch\">Einstein</span>'s mass-energy relation <span class=\"searchmatch\">Einstein</span>'s constant <span class=\"searchmatch\">Einstein</span>'s radius of",
        'size': 6733,
        'wordcount': 696,
        'timestamp': '2016-09-20T01:34:03Z'
      }
    ]
  }
}

beforeEach(() => {
  const baseUri = 'https://en.wikipedia.org'
  getRandomEntryLinkAjax = nock(baseUri)
    .get('/w/api.php?action=query&list=random&rnlimit=1&format=json&origin=*')
    .reply(200, mockRandomEntryResponse)

  getFirstSearchEntriesAjax = nock(baseUri)
    .get('/w/api.php?action=query&list=search&format=json&srsearch=Albert%20Einstein&origin=*')
    .reply(200, mockFirstSearchResponse)

  getContinueSearchEntriesAjax = nock(baseUri)
    .get('/w/api.php?action=query&list=search&format=json&srsearch=Albert%20Einstein&continue=-%7C%7C&sroffset=10&origin=*')
    .reply(200, mockContinueSearchResponse)

  sandbox = sinon.sandbox.create()
})

afterEach(() => {
  nock.cleanAll()
  sandbox.restore()
})

describe('getRandomEntryLink', () => {
  it(`should return a random Wikipedia entry link by acessing Wikipedia's API`, async () => {
    const randomEntryLink = await getRandomEntryLink()
    expect(randomEntryLink).toBe(expectedRandomEntryLink)
  })
})

describe('getSearchEntriesLinks', () => {
  it('should throw an error when no search term is defined', () => {
    expect(() => {
      getSearchEntriesLinks()
    }).toThrow
  })

  it('should return a list of Wikipedia entries, a unique continue value, and an offset to continue the search', async () => {
    const searchEntriesLinks = await getSearchEntriesLinks('Albert Einstein')

    expect(searchEntriesLinks.entriesLinks.length).toBe(mockFirstSearchResponse.query.search.length)

    const expectedEntriesLinks = mockFirstSearchResponse.query.search.map((entry) => {
      const entryBaseUri = 'https://en.wikipedia.org/wiki/'
      const entryTitle = entry.title
      const entryLink = `${entryBaseUri}${entryTitle}`
      return entryLink
    })
    expect(searchEntriesLinks.entriesLinks).toEqual(expectedEntriesLinks)

    const expectedContinueValue = mockFirstSearchResponse.continue.continue
    expect(searchEntriesLinks.continue).toBe(expectedContinueValue)

    const expectedOffset = mockFirstSearchResponse.continue.sroffset
    expect(searchEntriesLinks.offset).toBe(expectedOffset)
  })

  it('should return a different list when the called with an offset argument', async () => {
    const searchEntriesLinks = await getSearchEntriesLinks('Albert Einstein', '-||', 10)

    expect(searchEntriesLinks.entriesLinks.length).toBe(mockContinueSearchResponse.query.search.length)
    const expectedEntriesLinks = mockContinueSearchResponse.query.search.map((entry) => {
      const entryBaseUri = 'https://en.wikipedia.org/wiki/'
      const entryTitle = entry.title
      const entryLink = `${entryBaseUri}${entryTitle}`
      return entryLink
    })
    expect(searchEntriesLinks.entriesLinks).toEqual(expectedEntriesLinks)

    const expectedContinueValue = mockContinueSearchResponse.continue.continue
    expect(searchEntriesLinks.continue).toBe(expectedContinueValue)

    const expectedOffset = mockContinueSearchResponse.continue.sroffset
    expect(searchEntriesLinks.offset).toBe(expectedOffset)
  })
})

describe('WikipediaViewerContainer container', () => {
  it(`should call Wikipedia's API retrieve a random entry once the component mounts`, () => {
    sandbox.spy(WikipediaViewerContainer.prototype, 'componentDidMount')
    sandbox.spy(WikipediaViewerContainer.prototype, 'setRandomEntryLink')

    mount(<WikipediaViewerContainer />)

    expect(WikipediaViewerContainer.prototype.componentDidMount.callCount).toBe(1)
    expect(WikipediaViewerContainer.prototype.setRandomEntryLink.callCount).toBe(1)
    expect(getRandomEntryLinkAjax.isDone()).toBe(true)
  })

  it('should search Wikipedia for entries with the search term from the SearchBox', () => {
    sandbox.spy(WikipediaViewerContainer.prototype, 'setEntriesLinks')

    const wrapper = mount(<WikipediaViewerContainer />)

    wrapper.setState({randomEntryLink: 'foo'})

    wrapper.find('TextField').setProps({
      value: 'value'
    })

    expect(WikipediaViewerContainer.prototype.setEntriesLinks.callCount).toBe(1)
    expect(getFirstSearchEntriesAjax.done()).toBe(true)
  })
})
