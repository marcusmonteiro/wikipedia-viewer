import React, { Component } from 'react'
import request from 'superagent'
import { SearchBox } from '../../components'

export async function getRandomEntryLink () {
  const randomEntryAPIUri = 'https://en.wikipedia.org/w/api.php?action=query&list=random&rnlimit=1&format=json&origin=*'
  const randomEntryLink = await request
    .get(randomEntryAPIUri)
    .then((res) => {
      const entryBaseUri = 'https://en.wikipedia.org/wiki/'
      const entryTitle = res.body.query.random[0].title
      const randomEntryLink = `${entryBaseUri}${entryTitle}`
      return randomEntryLink
    })
    .catch((err) => {
      console.error(err)
    })
  return randomEntryLink
}

export async function getSearchEntriesLinks (searchTerm, _continue, offset = 0) {
  let searchAPIUri
  if (typeof _continue === 'string') {
    searchAPIUri = `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=${searchTerm}&continue=${_continue}&sroffset=${offset}&origin=*`
  } else {
    searchAPIUri = `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=${searchTerm}&origin=*`
  }
  const result = {
    continue: _continue,
    offset,
    entriesLinks: []
  }
  await request
    .get(searchAPIUri)
    .then((res) => {
      const entryBaseUri = 'https://en.wikipedia.org/wiki/'
      result.continue = res.body.continue.continue
      result.offset = res.body.continue.sroffset
      res.body.query.search.forEach((entry) => {
        const entryTitle = entry.title
        const entryLink = `${entryBaseUri}${entryTitle}`
        result.entriesLinks.push(entryLink)
      })
    })
    .catch((err) => {
      console.error(err)
    })
  return result
}

export default class WikipediaViewerContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      randomEntryLink: null,
      entriesLinks: null,
      textFieldValue: null
    }
    this.setRandomEntryLink = this.setRandomEntryLink.bind(this)
    this.setEntriesLinks = this.setEntriesLinks.bind(this)
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this)
    this.handleSearchIconClick = this.handleSearchIconClick.bind(this)
  }

  componentDidMount () {
    this.setRandomEntryLink()
  }

  async setRandomEntryLink () {
    const randomEntryLink = await getRandomEntryLink()
    this.setState({
      randomEntryLink
    })
  }

  async setEntriesLinks (searchTerm, _continue, offset) {
    const entriesLinks = await getSearchEntriesLinks(searchTerm)
    this.setState({
      entriesLinks
    })
  }

  handleTextFieldChange (e) {
    this.setState({
      textFieldValue: e.target.value
    })
  }

  handleSearchIconClick (e) {
    this.setEntriesLinks(this.state.textFieldValue)
  }

  render () {
    if (this.state.randomEntryLink === null) {
      return <p>Loading..</p>
    }
    return (
      <div>
        <p><a href={this.state.randomEntryLink}><button>Random</button></a></p>
        <SearchBox
          hintText={'Search Wikipedia...'}
          textFieldChangeHandler={this.handleTextFieldChange}
          searchIconClickHandler={this.handleSearchIconClick}
        />
      </div>
    )
  }
}

