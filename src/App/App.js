import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import NotefulContext from '../NotefulContext'
import './App.css';


class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    handleDelete= (noteId) => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        });
    }

    componentDidMount() {
            Promise.all([
                fetch(`http://localhost:9090/notes`),
                fetch(`http://localhost:9090/folders`)
            ])
                .then(([notesRes, foldersRes]) => {
                    if (!notesRes.ok)
                        return notesRes.json().then(e => Promise.reject(e));
                    if (!foldersRes.ok)
                        return foldersRes.json().then(e => Promise.reject(e));
    
                    return Promise.all([notesRes.json(), foldersRes.json()]);
                })
                .then(([notes, folders]) => {
                    this.setState({notes, folders});
                })
                .catch(error => {
                    console.error({error});
                });
        }
    

    renderNavRoutes() {
        const {notes, folders} = this.state;

        const findFolder = (folders=[], folderId) =>
            folders.find(folder => folder.id === folderId)
        
        const findNote = (notes=[], noteId) =>
            notes.find(note => note.id === noteId)

        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}/>
                ))}
                <Route
                    path="/note/:noteId"
                    component={NotePageNav} />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        const {notes, folders} = this.state;

        const findNote = (notes=[], noteId) =>
            notes.find(note => note.id === noteId)

        const getNotesForFolder = (notes=[], folderId) => (
            (!folderId)
            ? notes
            : notes.filter(note => note.folderId === folderId)
        )

        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}/>
                ))}
                <Route
                    path="/note/:noteId"
                    component={NotePageMain}/>
            </>
        );
    }

    render() {
        const contextValue = {
            folders: this.state.folders,
            notes: this.state.notes,
            deleteNote: this.handleDelete,
        }

        return (
            <NotefulContext.Provider value={contextValue}>
            <div className="App">
                <nav className="App__nav">{this.renderNavRoutes()}</nav>
                <header className="App__header">
                    <h1>
                        <Link to="/">Noteful</Link>
                    </h1>
                </header>
                <main className="App__main">{this.renderMainRoutes()}</main>
            </div>
            </NotefulContext.Provider>
        );
    }
}

export default App;
