import React from 'react';
import NotefulContext from './NotefulContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import nextId from 'react-id-generator';
import CircleButton from './CircleButton/CircleButton';
import PropTypes from 'prop-types';

class AddFolder extends React.Component {

    static contextType = NotefulContext

    static defaultProps = {
        history: {
            goBack: () => { },
        }
      }

      handleClickAddFolder = e => {
        e.preventDefault()
        const newFolderId = nextId()
        const newFolderName = e.target.name.value
        const newFolder = {newFolderId, newFolderName}
       
        fetch(`http://localhost:9090/folders`, {
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
                  id: newFolderId,
                  name: newFolderName,
              })
          })
          .then((data) => {
              this.context.addFolder(data)
          })
          .catch(error => {
            console.error({ error })
          })
      }

    render() {
        console.log(this.context)
        console.log(this.context.addFolder)
        return (
            <div>
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
            <form id="addFolder" onSubmit={e => this.handleClickAddFolder(e)}>
                <h2>Add Folder</h2>
                <div className="addFolder__hint">* required field</div>  
                <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input type="text" className="addFolder__control"
                    name="name" id="name"/>
                </div>
                <div className="addFolder__button__group">
                    <button type="reset" className="addFolder__button">
                    Cancel
                    </button>
                    <button type="submit" className="addFolder__button" onClick={() => this.props.history.goBack()}>
                    Save
                    </button>
                </div>
            </form>
            </div>
              )
    }
}

AddFolder.proptype = {
    history: PropTypes.object.isRequired,
}

export default AddFolder;