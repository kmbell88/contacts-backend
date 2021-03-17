import express from 'express';
const router = express.Router();
const ContactsController = require('../controllers/contacts.controller');

router.get('/', ContactsController.contacts_get_all_contacts);
router.get('/id/:id', ContactsController.contacts_get_by_id);
router.post('/', ContactsController.contacts_create_new_contact);
router.patch('/', ContactsController.contacts_update_contact);
router.delete('/', ContactsController.contacts_delete_contact);

export default router;