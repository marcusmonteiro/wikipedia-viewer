import React, { PropTypes } from 'react'
import { Subheader } from 'material-ui'
import { List, ListItem, makeSelectable } from 'material-ui/List'

export default function LinksList({links}) {
  return (
    <List>
      {links.map((link) => {
        return (
          <ListItem>
          </ListItem>
        )
      })}
    </List>
  )
}

LinksList.propTypes = {
  header: PropTypes.string,
  links: PropTypes.arrayOf(
    link: PropTypes.shape({
      description: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
}
