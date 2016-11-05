import React, { PropTypes } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import { Subheader } from 'material-ui'
import { List, ListItem } from 'material-ui/List'

export default function LinksList ({header, links}) {
  return (
    <div>
      {header}
      <MuiThemeProvider>
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
      </MuiThemeProvider>
    </div>
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
