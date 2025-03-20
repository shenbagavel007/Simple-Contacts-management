import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';  // Make sure to import the CSS file for styles

function App() {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', phone_number: '' });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const result = await axios.get('http://127.0.0.1:8000/api/contacts/');
    setContacts(result.data);
  };

  const addContact = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/contacts/create/', newContact);
      console.log('Contact added successfully:', response.data);
      fetchContacts(); // Refresh the contact list
    } catch (error) {
      console.error('Error adding contact:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
    }
  };

  const deleteContact = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/contacts/${id}/`);
    fetchContacts();
  };

  return (
    <div className="app">
      <h1 className="app-header">WhatsApp Contacts</h1>
      <div className="contact-form">
        <input
          type="text"
          placeholder="Name"
          value={newContact.name}
          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={newContact.phone_number}
          onChange={(e) => setNewContact({ ...newContact, phone_number: e.target.value })}
          className="input-field"
        />
        <button onClick={addContact} className="add-button">Add Contact</button>
      </div>
      <ul className="contact-list">
        {contacts.map((contact) => (
          <li key={contact.id} className="contact-item">
            <span className="contact-info">
              {contact.name} ({contact.phone_number})
            </span>
            <button onClick={() => deleteContact(contact.id)} className="delete-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;


