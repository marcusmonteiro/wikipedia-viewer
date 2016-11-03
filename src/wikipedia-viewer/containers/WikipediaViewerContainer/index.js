import React, { Component } from 'react'
import request from 'superagent'
import { SearchBox } from '../../components'

export async function getRandomWikipediaEntryLink () {
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

export default class WikipediaViewerContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      randomEntryLink: null,
      entries: null
    }
    this.setRandomEntryLink = this.setRandomEntryLink.bind(this)
  }

  componentDidMount () {
    this.setRandomEntryLink()
  }

  async setRandomEntryLink () {
    const randomEntryLink = await getRandomWikipediaEntryLink()
    this.setState({
      randomEntryLink
    })
  }

  render () {
    if (this.state.randomEntryLink === null) {
      return <p>Loading..</p>
    }
    return (
      <div>
        <p><a href={this.state.randomEntryLink}><button>Random</button></a></p>
        <SearchBox hintText={'Search Wikipedia...'} />
      </div>
    )
  }
}

