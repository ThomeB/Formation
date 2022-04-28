import logo from './logo.jpg';
import React, { useState, useEffect } from 'react';
import './App.css';
//import { taskList, Form } from './formationComponents';
import { Amplify, Storage, Hub, DataStore } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import { User, Note, Aircraft, Schedule, Task } from './models';
import { useFormik } from "formik";

Amplify.configure(awsExports);

/**-----------------------------------------------------------------
 *                          VALIDATION
 -------------------------------------------------------------------*/
const validate = values => {
  const errors = {};
  if (!values.first_name) {
    errors.first_name = 'Required';
  } else if (values.first_name.length > 15) {
    errors.first_name = 'Must be 15 characters or less';
  }

  if (!values.last_name) {
    errors.last_name = 'Required';
  } else if (values.last_name.length > 20) {
    errors.last_name = 'Must be 20 characters or less';
  }
  if (!values.phone_number) {
    errors.phone_number = 'Required';
  } else if (!/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/i.test(values.phone_number)) {
    errors.phone_number = 'Invalid phone number. Must be in the form 123-123-1234';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

 /**--------------------------------------------------------------------------------
 *                              FORMIK SIGNUPFORM
 ----------------------------------------------------------------------------------*/

 const SignupForm = () => {
  const formik = useFormik({
    initialValues: { 
      first_name: "", 
      last_name: "", 
      phone_number: "", 
      email: "" 
    },
    validate,
    onSubmit: values => {
      //updateUser(values);
      alert(JSON.stringify(values, null, 1));
    }
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
      <label htmlFor="first_name">First Name</label>
      <input
        id="first_name"
        name="first_name"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.first_name}
      />
      </div>
      <div>
      <label htmlFor="last_name">Last Name</label>
      <input
        id="last_name"
        name="last_name"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.last_name}
      />
      </div>
      <div>
      <label htmlFor="phone_number">Phone Number</label>
      <input 
        id="phone_number"
        name="phone_number"
        type="phone"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.phone_number}
      />
      </div>
      <div>
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};




/**---------------------------------------------------------------
 * Listener Section
 -----------------------------------------------------------------*/
const authListener = Hub.listen('auth', async hubData => {
  const { event } = hubData.payload;
  if (event === 'signIn'){
    //DataStore.clear();
    authListener();
  }
})

const dataListener = Hub.listen('datastore', async hubData => {
  const  { event, data } = hubData.payload;
  if (event === 'networkStatus') {
    console.log(`connection: ${data.active}`);
  }
  if (event === 'subscriptionsEstablished') {
    console.log('subs established');
  }
  if (event === 'syncQueriesStarted') {
    console.log(`syncQueries: ${data.models}`);
    console.log("");
  }
  if (event === 'modelSynced') {
    console.log(`${data.model.name} has been -\nFullSync: ${data.isFullSync}\nDelta: ${data.isDeltaSync}\nWith ${data.new} instances\nDeleted?: ${data.deleted}`);
  }
  if (event === 'syncQueriesReady') {
    console.log("All models have been synced from the cloud");
  }
  if (event === 'ready') {
    console.log("Apparently I am ready");
    console.log(`User outboxproc: ${data}`);
    dataListener();
  }
});



/**------------------------------------------------------------------
 * APPLICATION
 -------------------------------------------------------------------*/
function App({ signOut, user }) {
  const [notes, setNotes] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [aircraft, setAircraft] = useState([]);
  const [tasks, setTasks] = useState([]);

  DataStore.query(Note);
  fetchUser();
  fetchAircraft();

  const initialFormState = { name: '', description: '' }
  const initialUserFormState = { first_name: '', last_name: '', email: '', phone_number: '' }
  const initialAircraftFormState = { tail_number: '' }

  const [userFormData, setUserFormData] = useState(initialUserFormState);
  const [aircraftFormData, setAircraftFormData] = useState(initialAircraftFormState);
  const [formData, setFormData] = useState(initialFormState);

  /**---------------------------------------------------------------------
   *  DELETE CREATE UPDATE QUERY SECTION
   -----------------------------------------------------------------------*/
  useEffect(() => {
    fetchNotes();
  }, []);

  //onchange is a listener for the formdata on the notes section
  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchNotes();
  }

  /**------------------------------------------------------------------
   *                             Aircraft
   --------------------------------------------------------------------*/
   async function fetchAircraft(tail) {
     var searchedAircraft;
     if (tail) {
      searchedAircraft = await DataStore.query(Aircraft, a => a.tail_number("eq", tail));
     } else {
      searchedAircraft = await DataStore.query(Aircraft); 
     }
     setAircraft(searchedAircraft);
   }
   /**------------------------------------------------------------------
   *                             Aircraft
   --------------------------------------------------------------------*/

  /**------------------------------------------------------------------
   *                             USER
   --------------------------------------------------------------------*/ 
  async function updateUserForm() {
    //if (!userFormData) return;
    const rightNow = await DataStore.query(User, u => u.email("eq", user.attributes.email));
    console.log(rightNow);
    await DataStore.save(
      User.copyOf(rightNow[0], updated => {
        updated.first_name = userFormData.first_name;
      })
    );
    const updatedArray = await DataStore.query(User, u => u.email("eq", user.attributes.email));
    console.log(updatedArray);
    setCurrentUser(updatedArray);
  } 

  async function fetchUser() {
    const fetchedUser = await DataStore.query(User, u => u.email("eq", user.attributes.email));
    
    setCurrentUser(fetchedUser);
  }

  /**------------------------------------------------------------------
   *                             NOTE
   --------------------------------------------------------------------*/
  async function fetchNotes() {
    const notesFromAPI = await DataStore.query(Note);
    notesFromAPI.map(async note => {
      if (note.image) {
        const image = await DataStore.query(note);
        note.image = image.image;
      }
      return note;
    })
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
        "image": ""
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

  /**
   *  COMPONENT TEST
   */
function InstructorView(props) {
  var currentRole = props.role;
  switch(currentRole[0]){
    case 'INSTRUCTOR':
      return <h1>Instructor</h1>;
    case 'STUDENT':
      return <h1>Student</h1>;
    default:
      return <h1>Neither</h1>;
  }
}

  /**--------------------------------------------------------------------------
   *  ACTUAL HTML RETURNED / WEBSITE LAYOUT
   ----------------------------------------------------------------------------*/
  return (
    <>
      <h1>Quick and Dirty Formation App</h1>
      <button onClick={signOut}>Sign out</button>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p><b>Welcome</b> {currentUser.map( cuser => ( cuser.first_name + " " + cuser.last_name ))}!</p>
          <div className="signUpForm">
            <p>This will update the profile information for the user in my database</p>
            <input 
              onChange={e => setUserFormData({ ...userFormData, 'first_name': e.target.value})}
              placeholder=  {currentUser.map( cuser => ( cuser.first_name ))}
              value={userFormData.first_name}
            />
            <button onClick={updateUserForm}>Submit</button>
          </div>
        </header>
        <InstructorView role={currentUser.map(cuser => cuser.role)} />
      <div className="App">
      <h1>Data Storage Testing Area</h1>
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
                  note.image && <img src={note.image || ""} style={{width: 400}} />
                }
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}


export default withAuthenticator(App); 
