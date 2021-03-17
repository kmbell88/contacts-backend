import chai, { expect } from 'chai';
import { validateContact, getContacts, deleteContact} from '../ts/contact-validation';

describe.skip('Validation Methods', function() {
  describe('test/method/getContacts', function() {
    it('should return all contacts', function() {
      let sampleContacts = getContacts();

      expect(sampleContacts).to.not.be.empty;
      expect(sampleContacts).to.have.lengthOf(3);
      expect(sampleContacts[0].fname).to.equal('Ken');
      expect(sampleContacts[1].phone).to.equal('5553217755');
    });
  });

  describe('test/method/deleteContact', function() {
    it('should delete one contact and give a confirmation message, or give an error if contact is not found', function() {
      const delete0 = deleteContact('1');
      const delete1 = deleteContact('50');

      expect(delete0.message).to.not.be.undefined;
      expect(delete0.message).to.equal('Contacted successfully deleted');
      expect(delete0.error).to.be.undefined;
      expect(delete1.message).to.be.undefined;
      expect(delete1.error).to.not.be.undefined;
      expect(delete1.error).to.equal('Contact not found');
    });
  });

  describe('test/method/validateContact.id', function() {
    it('should return a valid contact or an error if contact is not valid or found', function() {
      const contact0 = validateContact.id('0');
      const contact50 = validateContact.id('50');
      const contactXyz = validateContact.id('xyz');

      expect(contact0).to.deep.equal({ id: "0", fname: "Ken", lname: "Bell", phone: "9162471859", email: "kmbell88@gmail.com" });
      expect(contact50).to.be.undefined;
      expect(contactXyz).to.be.undefined;
    });
  });

  describe('test/method/validateContact.name', function() {
    it('should return true if name is valid, false if invalid', function() {
      const name0 = validateContact.name('Kenneth');   // Standard          | expect: true
      const name1 = validateContact.name('Jerry Sue'); // With Space        | expect: true
      const name2 = validateContact.name('Mary-Ann');  // With hyphen       | expect: true
      const name3 = validateContact.name('N\'yla');    // With apostrophe   | expect: true
      const name4 = validateContact.name('H3rsheys');  // With number       | expect: false
      const name5 = validateContact.name('@mber') ;    // With special char | expect: false
      const name6 = validateContact.name('');          // Empty string      | expect: false
      const name7 = validateContact.name('123');       // String of numbers | expect: false

      expect(name0, 'stardard').to.be.true;
      expect(name1, 'with space').to.be.true;
      expect(name2, 'with hyphen').to.be.true;
      expect(name3, 'with apostrophe').to.be.true;
      expect(name4, 'with number').to.be.false;
      expect(name5, 'with special char').to.be.false;
      expect(name6, 'empty string').to.be.false;
      expect(name7, 'string of numbers').to.be.false;
    });
  });

  describe('test/method/validateContact.phone', function() {
    it('should return true if phone is valid, false if invalid', function() {
      const phone0 = validateContact.phone('5558884444');    // Standard           | expect: true
      const phone1 = validateContact.phone('0123456789');    // Start with zero    | expect: true
      const phone2 = validateContact.phone('012345678');     // 9 digits           | expect: false
      const phone3 = validateContact.phone('01234567890');   // 11 digits          | expect: false
      const phone4 = validateContact.phone('abcdefghij');    // 10 alpha           | expect: false
      const phone5 = validateContact.phone('555444333g');    // 1 alpha in string  | expect: false
      const phone6 = validateContact.phone('555-444-3333');  // Dash format        | expect: false
      const phone7 = validateContact.phone('(555)444-3333'); // Parenthesis format | expect: false
      const phone8 = validateContact.phone('!9529493929');   // Special char       | expect: false

      expect(phone0, 'standard').to.be.true;
      expect(phone1, 'start with zero').to.be.true;
      expect(phone2, 'nine digits').to.be.false;
      expect(phone3, 'eleven digits').to.be.false;
      expect(phone4, 'ten alpha').to.be.false;
      expect(phone5, '1 alpha in string').to.be.false;
      expect(phone6, 'dash format').to.be.false;
      expect(phone7, 'parenthesis').to.be.false;
      expect(phone8, 'special char').to.be.false;
    });
  });

  describe('test/method/validateContact.email', function() {
    it('should return true if email is valid, false if invalid', function() {
      const email0  = validateContact.email('email@gmail.com');               // Standard email              | expect: true
      const email1  = validateContact.email('email@google.gmail.com');        // Subdomain                   | expect: true
      const email2  = validateContact.email('email.email@gmail.com');         // Multi-dots name             | expect: true
      const email3  = validateContact.email('email.email@google.gmail.com');  // Multi-dots name & subdomain | expect: true
      const email4  = validateContact.email('!HelloMe@g!mail.com');           // Special chars in domain     | expect: false
      const email5  = validateContact.email('@gmail.com');                    // No local string             | expect: false
      const email6  = validateContact.email('email@gmail.com.');              // Dot at end                  | expect: false
      const email7  = validateContact.email('!HelloMe@gmail.com');            // Special chars name          | expect: true
      const email8  = validateContact.email('@');                             // Only @ symbol               | expect: false
      const email9  = validateContact.email('email@gmail');                   // No domain extension         | expect: false
      const email10 = validateContact.email('email@gmail.');                  // Ends with dot               | expect: false
      
      expect(email0, 'standard').to.be.true;
      expect(email1, 'subdomain').to.be.true;
      expect(email2, 'multidots in name').to.be.true;
      expect(email3, 'multidots in name and subdomain').to.be.true;
      expect(email4, 'special chars').to.be.false;
      expect(email5, 'no local string').to.be.false;
      expect(email6, 'dot at end').to.be.false;
      expect(email7, 'special char in name').to.be.true;
      expect(email8, 'only @ symbol').to.be.false;
      expect(email9, 'no extension').to.be.false;
      expect(email10, 'ends with dot').to.be.false;
    });
  });
});