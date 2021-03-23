import { validateContact, getContacts, deleteContact } from '../ts/contact-validation';
import { Request, Response } from 'express';

export const contacts_get_all_contacts = async (req: Request, res: Response) => {
  let contacts = await getContacts();
  return contacts ? res.status(200).json(contacts) :
                    res.status(404).json({ error: 'Contacts not found' });
};

export const contacts_get_by_id = async (req: Request, res: Response) => {
  let findContact = await validateContact.id(req.params.id);
  return findContact ? res.status(200).json(findContact) : 
                       res.status(404).json({ error: 'Contact not found' });
};

export const contacts_create_new_contact = async (req: Request, res: Response) => {
  let response = await validateContact.validate(req.body);
  return response.error ? res.status(422).json(response) :
                          res.status(201).json(response);
};

export const contacts_update_contact = async (req: Request, res: Response) => {
  let response = await validateContact.validate(req.body);
  if(response.error)
    return response.error === "Contact not found" ?
      res.status(404).json(response) :
      res.status(422).json(response);
  return res.status(200).json(response);
};

export const contacts_delete_contact = async (req: Request, res: Response) => {
  let response = await deleteContact(req.body.id);
  return response.error ? res.status(404).json(response) :
                          res.status(200).json(response);
};