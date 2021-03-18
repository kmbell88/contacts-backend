"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = exports.deleteContact = exports.getContacts = exports.validateContact = void 0;
//import { contacts } from './test-contacts';  // TESTING SCRIPT
const sample_contacts_1 = require("./sample-contacts"); // PRODUCTION SCRIPT:
const uuid_1 = require("uuid");
exports.validateContact = {
    id: (id) => {
        return sample_contacts_1.contacts.find((contact) => contact.id == id);
    },
    name: (name) => {
        let nameRegex = /^[a-z ,.'-]+$/i;
        return name !== "" && nameRegex.test(name);
    },
    phone: (phone) => {
        let phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phone);
    },
    email: (email) => {
        let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+([a-zA-Z0-9-]+)*$/;
        return emailRegex.test(email);
    },
    validate: (newContact) => {
        const { id, fname, lname, phone, email } = newContact;
        let processContact = exports.validateContact.id(id);
        if (id && !processContact)
            return { error: "Contact not found" };
        if (id && fname != undefined && !exports.validateContact.name(fname) ||
            !id && !exports.validateContact.name(fname))
            return { error: "The first name entered is invalid" };
        if (id && lname != undefined && !exports.validateContact.name(lname) ||
            !id && !exports.validateContact.name(lname))
            return { error: "The last name entered is invalid" };
        if (phone && !exports.validateContact.phone(phone))
            return { error: "The phone number entered is invalid" };
        if (email && !exports.validateContact.email(email))
            return { error: "The email entered is invalid" };
        if (processContact) {
            Object.assign(processContact, newContact);
            return { message: "Contact successfully updated" };
        }
        else {
            newContact.id = exports.generateId();
            sample_contacts_1.contacts.push(newContact);
            return { message: "Contact successfully created" };
        }
    }
};
const getContacts = () => {
    return sample_contacts_1.contacts;
};
exports.getContacts = getContacts;
const deleteContact = (id) => {
    const index = sample_contacts_1.contacts.findIndex(contact => contact.id === id);
    if (index === -1)
        return ({ error: "Contact not found" });
    sample_contacts_1.contacts.splice(index, 1);
    return ({ message: "Contact successfully deleted" });
};
exports.deleteContact = deleteContact;
const generateId = () => {
    return uuid_1.v4();
};
exports.generateId = generateId;
