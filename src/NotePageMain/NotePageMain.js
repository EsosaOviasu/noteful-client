import React from 'react'
import Note from '../Note/Note'
import NotefulContext from '../NotefulContext'
import './NotePageMain.css'
import NotefulErrorBoundary from '../NotefulErrorBoundary'
import PropTypes from 'prop-types';

export default class NotePageMain extends React.Component {

  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = NotefulContext

  handleDeleteNote = noteId => {
    this.props.history.push(`/`)
  }

  render() {
    const findNote = (notes=[], noteId) =>
        notes.find(note => note.id === noteId)
    
    const { notes=[] } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || { content: '' }

  return (
    <section className='NotePageMain'>
      <NotefulErrorBoundary>
      <Note
        id={note.id}
        name={note.name}
        modified={note.modified}
      />
      </NotefulErrorBoundary>
      <div className='NotePageMain__content'>
        {note.content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
    </section>
  )
  }
}

NotePageMain.propTypes = {
    match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired
}