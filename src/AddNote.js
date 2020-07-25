import React from 'react';
import NotefulContext from './NotefulContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from './CircleButton/CircleButton'
import nextId from 'react-id-generator';
import PropTypes from 'prop-types';

class AddNote extends React.Component {

    static contextType = NotefulContext

    static defaultProps = {
        history: {
          goBack: () => { }
        }
      }

    handleClickAddNote = e => {
        e.preventDefault()
        const newId = 'note'+nextId()
        const newName = e.target.name.value
        const newModified = e.target.modifiedDate.value
        const newContent = e.target.content.value

        const folderName = e.target.folder.value
        const folderSelected = this.context.folders.find(folder => folderName === folder.name)
        const newFolderId = folderSelected.id

        const newNote = {newId, newName, newModified, newFolderId, newContent}
       
        fetch(`http://localhost:9090/notes`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
        })
          .then(res => {
            if (!res.ok)
              return res.json().then(e => Promise.reject(e))
            return res.json()
          })
          .then((data) => {
              return (data = {
                  id: newId,
                  name: newName,
                  modified: newModified,
                  folderId: newFolderId,
                  content: newContent,
              })
          })
          .then((data) => {
              this.context.addNote(data)
          })
          .catch(error => {
            console.error({ error })
          })
      }
    


    render() {
        const folderOptions= this.context.folders.map((folder) => {
            return (<option key={folder.id} value={folder.name}>{folder.name}</option>)
        })
        console.log(folderOptions)

            return (
                <div>
                <form id="addNote" onSubmit={e => this.handleClickAddNote(e)}>
                  <h2>Add Note</h2>
                  <div className="addNote__hint">* required field</div>  
                  <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input type="text" className="addNote__control"
                      name="name" id="name"/>
                  </div>
                  <div className="form-group">
                     <label htmlFor="folder">Folder *</label>
                     <select form="addNote" className="addNote__control"
                      name="folder" id="folder">
                          {folderOptions}
                      </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="content">Content *</label>
                    <input type="text" className="addNote__control"
                      name="content" id="content"/>
                  </div>
                  <div className="form-group">
                     <label htmlFor="modifiedDate">Date Created *</label>
                     <input type="text" className="addNote__control"
                      name="modifiedDate" id="modifiedDate" placeholder="YYYY-MM-DD"/>
                  </div>
                  <div className="addNote__button__group">
                   <button type="reset" className="addNote__button">
                       Cancel
                   </button>
                   <button type="submit" className="addNote__button" onClick={() => this.props.history.goBack()}>
                       Save
                   </button>
                  </div>
                </form>
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
                </div>
              )
    }
}

AddNote.proptype = {
    history: PropTypes.object.isRequired,
}

export default AddNote;