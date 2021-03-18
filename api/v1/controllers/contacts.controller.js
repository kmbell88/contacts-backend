"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contacts_delete_contact = exports.contacts_update_contact = exports.contacts_create_new_contact = exports.contacts_get_by_id = exports.contacts_get_all_contacts = void 0;
const contact_validation_1 = require("../ts/contact-validation");
const contacts_get_all_contacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let contacts = yield contact_validation_1.getContacts();
    return contacts ? res.status(200).json(contacts) :
        res.status(404).json({ error: 'Contacts not found' });
});
exports.contacts_get_all_contacts = contacts_get_all_contacts;
const contacts_get_by_id = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let findContact = yield contact_validation_1.validateContact.id(req.params.id);
    return findContact ? res.status(200).json(findContact) :
        res.status(404).json({ error: 'Contact not found' });
});
exports.contacts_get_by_id = contacts_get_by_id;
const contacts_create_new_contact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = yield contact_validation_1.validateContact.validate(req.body);
    return response.error ? res.status(422).json(response) :
        res.status(201).json(response);
});
exports.contacts_create_new_contact = contacts_create_new_contact;
const contacts_update_contact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = yield contact_validation_1.validateContact.validate(req.body);
    if (response.error)
        return response.error === "Contact not found" ?
            res.status(404).json(response) :
            res.status(422).json(response);
    return res.status(200).json(response);
});
exports.contacts_update_contact = contacts_update_contact;
const contacts_delete_contact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = yield contact_validation_1.deleteContact(req.body.id);
    return response.error ? res.status(404).json(response) :
        res.status(200).json(response);
});
exports.contacts_delete_contact = contacts_delete_contact;
