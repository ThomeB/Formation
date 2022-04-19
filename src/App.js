import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import { Amplify, API, Storage } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import { listNotes } from './graphql/queries';
import { DataStore } from '@aws-amplify/datastore';
import { Aircraft, Instructor, Student, Schedule, Note } from './models';
Amplify.configure(awsExports);

const initialFormState = { name: '', description: '', image: null }

function App({ signOut, user }) {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  DataStore.start();

  useEffect(() => {
    fetchNotes();
  }, []);

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchNotes();
  }

  async function fetchNotes() {
    //const apiData = await API.graphql({ query: listNotes });
    const notesFromAPI = await DataStore.query(Note);//apiData.data.listNotes.items;
    await Promise.all(notesFromAPI.map(async note => {
      if (note.image) {
        const image = await DataStore.query(note);//Storage.get(note.image);
        note.image = image.image;
      }
      return note;
    }))
    const newNotesArray = await DataStore.query(Note);
    setNotes(newNotesArray);
  }

  async function createNote() {
    if (!formData.name || !formData.description) return;
    if (formData.image) {
      const image = await Storage.get(formData.image);
      await DataStore.save(
        new Note({
        "name": formData.name,
        "description": formData.description,
        "image": image
        })
      );
    } else {
      await DataStore.save(
        new Note({
        "name": formData.name,
        "description": formData.description,
        "image": null
        })
      );
    }
    const newNotesArray = await DataStore.query(Note);
    setNotes(newNotesArray);
    setFormData(initialFormState);
  }

  async function deleteNote(note) {
    DataStore.delete(note);
    const newNotesArray = await DataStore.query(Note);
    setNotes(newNotesArray);
  }

  return (
    <>
      <h1>Hello { user.username }</h1>
      <button onClick={signOut}>Sign out</button>
      <div className="App">
        <h1>My Notes App</h1>
        <input
          type="file"
          onChange={onChange}
        />
        <input
          onChange={e => setFormData({ ...formData, 'name': e.target.value})}
          placeholder="Note name"
          value={formData.name}
        />
        <input
          onChange={e => setFormData({ ...formData, 'description': e.target.value})}
          placeholder="Note description"
          value={formData.description}
        />
        <button onClick={createNote}>Create Note</button>
        <div style={{marginBottom: 30}}>
          {
            notes.map(note => (
              <div key={note.id || note.name}>
                <h2>{note.name}</h2>
                <p>{note.description}</p>
                <button onClick={() => deleteNote(note)}>Delete note</button>
                <br></br>
                {
                  note.image && <img src={note.image} style={{width: 400}} />
                }
              </div>
            ))
          }
        </div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <h1>New Test</h1>
        </header>
      </div>
    </>
  );
}

export default withAuthenticator(App);
