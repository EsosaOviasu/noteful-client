import React from 'react'
import { Link } from 'react-router-dom'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import NotefulContext from '../NotefulContext'
import NotefulErrorBoundary from '../NotefulErrorBoundary';
import PropTypes from 'prop-types';
import './NoteListMain.css'

export default class NoteListMain extends React.Component {
  
  static defaultProps = {
    match: {
      params: {}
    }
  }
  
  static contextType= NotefulContext

  render() {
    const getNotesForFolder = (notes=[], folderId) => (
      (!folderId)
      ? notes
      : notes.filter(note => note.folderId === folderId)
  )

    const { folderId } = this.props.match.params
    const { notes=[] } = this.context
    const notesForFolder = getNotesForFolder(notes, folderId)
  return (
    <section className='NoteListMain'>
      <ul>
        {notesForFolder.map(note =>
          <li key={note.id}>
            <NotefulErrorBoundary>
            <Note
              id={note.id}
              name={note.name}
              modified={note.modified}
            />
            </NotefulErrorBoundary>
          </li>
        )}
      </ul>
      <div className='NoteListMain__button-container'>
        <CircleButton
          tag={Link}
          to='/add-note'
          type='button'
          className='NoteListMain__add-note-button'
        >
          Add Note
        </CircleButton>
      </div>
    </section>
  )
  }

}

NoteListMain.propTypes = {
    match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired
}
