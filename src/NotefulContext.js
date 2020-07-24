import React from 'react';

const NotefulContext = React.createContext({
    folders: [],
    notes: [],
    deleteNote: () => {},
    addNote: () => {},
    addFolder: () => {},
})

export default NotefulContext;