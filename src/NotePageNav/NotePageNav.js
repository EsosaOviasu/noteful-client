import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import './NotePageNav.css'
import NotefulContext from '../NotefulContext'
import PropTypes from 'prop-types';

export default class NotePageNav extends React.Component {

  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  }

  static contextType = NotefulContext

  render() {
    const findFolder = (folders=[], folderId) =>
      folders.find(folder => folder.id === folderId)

    const findNote = (notes=[], noteId) =>
      notes.find(note => note.id === noteId)

    const { notes, folders, } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || {}
    const folder = findFolder(folders, note.folderId)

  return (
    <div className='NotePageNav'>
      <CircleButton
        tag='button'
        role='link'
        onClick={() => this.props.history.goBack()}
        className='NotePageNav__back-button'
      >
        <FontAwesomeIcon icon='chevron-left' />
        <br />
        Back
      </CircleButton>
      {folder && (
        <h3 className='NotePageNav__folder-name'>
          {folder.name}
        </h3>
      )}
    </div>
  )
  }
}

NotePageNav.propTypes = {
  match: PropTypes.shape({
  isExact: PropTypes.bool,
  params: PropTypes.object,
  path: PropTypes.string,
  url: PropTypes.string,
}).isRequired
}