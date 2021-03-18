"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const ContactsController = require('../controllers/contacts.controller');
router.get('/', ContactsController.contacts_get_all_contacts);
router.get('/id/:id', ContactsController.contacts_get_by_id);
router.post('/', ContactsController.contacts_create_new_contact);
router.patch('/', ContactsController.contacts_update_contact);
router.delete('/', ContactsController.contacts_delete_contact);
exports.default = router;
