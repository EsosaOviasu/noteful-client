import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import CircleButton from '../CircleButton/CircleButton'
import NotefulContext from '../NotefulContext'
import PropTypes from 'prop-types';
import './NoteListNav.css'

export default class NoteListNav extends React.Component {
  static contextType= NotefulContext;

  render() {
    const { folders=[], notes=[] } = this.context

  return (
    <div className='NoteListNav'>
      <ul className='NoteListNav__list'>
        {folders.map(folder =>
          <li key={folder.id}>
            <NavLink
              className='NoteListNav__folder-link'
              to={`/folder/${folder.id}`}
            >
              {folder.name}
            </NavLink>
          </li>
        )}
      </ul>
      <div className='NoteListNav__button-wrapper'>
        <CircleButton
          tag={Link}
          to='/add-folder'
          type='button'
          className='NoteListNav__add-folder-button'
        >
           Add Folder
        </CircleButton>
      </div>
    </div>
  )
  }
}

NoteListNav.propTypes = {
    match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired
}