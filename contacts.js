const fs = require('fs').promises;
const {v4} = require('uuid')
const {contactsPath} = require('./contactsPath');


const listContacts = async () => {
  try {
   const data =  await fs.readFile(contactsPath)
   const contacts = JSON.parse(data);
   return contacts
  } catch (error) {
    console.log(error.message);
  }
   
}

const  getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    
    const result = contacts.find(item => item.id === contactId);
    if(!result) {
      return null;
    }
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId);
    if(idx === -1) {
      return null;
    }
    const [removedContact] = contacts.splice(idx, 1)
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    return removedContact;
  } catch (error) {
    console.log(error.message);
  }
}

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContact = {name, email, phone, id: v4()}
    contacts.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
 
}

module.exports = { listContacts, getContactById, addContact, removeContact}
