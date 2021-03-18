// import { contacts } from './test-contacts';  // TESTING SCRIPT
import { contacts } from './sample-contacts';   // PRODUCTION SCRIPT:
import { Contact } from '../interfaces/contact.interface';
import { v4 as uuid } from 'uuid';

export const validateContact = {
  id: (id: string) => {
    return contacts.find((contact: { id: string; }) => contact.id == id);
  },
  name: (name: string) => {
    const nameRegex = /^[a-z ,.'-]+$/i;
    return name !== "" && nameRegex.test(name);
  },
  phone: (phone: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  },
  email: (email: string) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+([a-zA-Z0-9-]+)*$/;
    return emailRegex.test(email);
  },
  validate: (newContact: Contact) => {
    const { id, fname, lname, phone, email } = newContact;
    let processContact: Contact | undefined = validateContact.id(id);
    
    if(id && !processContact)
      return { error: "Contact not found" };
    if (id && fname != undefined && !validateContact.name(fname) ||
          !id && !validateContact.name(fname))
      return { error: "The first name entered is invalid" };
    if (id && lname != undefined && !validateContact.name(lname) ||
          !id && !validateContact.name(lname))
      return { error: "The last name entered is invalid" };
    if(phone && phone !== "" && !validateContact.phone(phone))
      return { error: "The phone number entered is invalid" };
    if(email && email !== "" && !validateContact.email(email))
      return { error: "The email entered is invalid" };
    
    if (processContact) {
      Object.assign(processContact, newContact);
      return { message: "Contact successfully updated" };
    } else {
      newContact.id = generateId();
      contacts.push(newContact);
      return { message: "Contact successfully created" };
    }
  }
};

export const getContacts = () => {
  return contacts;
};

export const deleteContact = (id: string) => {
  const index = contacts.findIndex(contact => contact.id === id);
  if (index === -1)
    return { error: "Contact not found" };

  contacts.splice(index, 1);
  return { message: "Contact successfully deleted" };
};

export const generateId = () => {
  return uuid();
};
