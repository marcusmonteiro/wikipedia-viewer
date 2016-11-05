import React, { PropTypes } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Subheader } from 'material-ui'
import { List, ListItem } from 'material-ui/List'

export default function LinksList ({header, links}) {
  return (
    <MuiThemeProvider>
      <div>
        <Subheader>{header}</Subheader>
        <List>
          {links.map((link, idx) => {
            return (
              <ListItem
                key={idx}
              >
                <a href={link.href}>{link.description}</a>
              </ListItem>
            )
          })}
        </List>
      </div>
    </MuiThemeProvider>
  )
}

LinksList.propTypes = {
  header: PropTypes.string,
  links: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired
  }).isRequired
  ).isRequired
}
