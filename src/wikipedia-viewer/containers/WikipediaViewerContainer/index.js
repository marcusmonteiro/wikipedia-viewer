import React, { Component } from 'react'
import request from 'superagent'
import { Grid, Row, Col } from 'react-bootstrap'
import { RaisedButton, FontIcon } from 'material-ui'
import { SearchBox, LinksList, PreviousNext } from '../../components'

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
  if (!searchTerm) {
    return
  }
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
        const entryDescription = entry.title
        const entryLink = {
          description: entryDescription,
          href: `${entryBaseUri}${entryDescription}`
        }
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
    this.handleNextButtonClick = this.handleNextButtonClick.bind(this)
    this.handlePreviousButtonClick = this.handlePreviousButtonClick.bind(this)
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
    const entriesLinks = await getSearchEntriesLinks(searchTerm,  _continue, offset)
    if (entriesLinks) {
      this.setState({
        entriesLinks
      })
    } else {
      this.setState({
        entriesLinks: null
      })
    }
  }

  handleTextFieldChange (e) {
    this.setState({
      textFieldValue: e.target.value
    })
  }

  handleSearchIconClick (e) {
    this.setEntriesLinks(this.state.textFieldValue)
  }

  handleNextButtonClick (e) {
    this.setEntriesLinks(
      this.state.textFieldValue,
      this.state.entriesLinks.continue,
      this.state.entriesLinks.offset
    )
  }

  handlePreviousButtonClick (e) {
    let offset = Math.max(0, this.state.entriesLinks.offset - 20)
    if (this.state.entriesLinks.offset)
    this.setEntriesLinks(
      this.state.textFieldValue,
      this.state.entriesLinks.continue,
      offset
    )
  }

  render () {
    if (this.state.randomEntryLink === null) {
      return <p>Loading..</p>
    }
    let linksList
    if (this.state.entriesLinks !== null) {
      linksList = (
        <div>
          <LinksList links={this.state.entriesLinks.entriesLinks} />
          <PreviousNext previousFunc={this.handlePreviousButtonClick}
            nextFunc={this.handleNextButtonClick} />
        </div>
      )
    }
    return (
      <Grid>
        <Row>
          <Col>
          <a href={this.state.randomEntryLink}>
            <RaisedButton
              label='random article'
              icon={<FontIcon className='fa fa-wikipedia-w' />}
            />
          </a>
          </Col>
          <Col>
          <SearchBox
            hintText={'Search Wikipedia...'}
            textFieldChangeHandler={this.handleTextFieldChange}
            searchIconClickHandler={this.handleSearchIconClick}
          />
          </Col>
        </Row>
        <Row>
        {linksList}
        </Row>
      </Grid>
    )
  }
}

