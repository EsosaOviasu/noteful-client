import React from 'react'
import { Link } from 'react-router-dom'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import NotefulContext from '../NotefulContext'
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
            <Note
              id={note.id}
              name={note.name}
              modified={note.modified}
            />
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
