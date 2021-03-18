"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const contact_validation_1 = require("../ts/contact-validation");
describe.skip('Validation Methods', function () {
    describe('test/method/getContacts', function () {
        it('should return all contacts', function () {
            let sampleContacts = contact_validation_1.getContacts();
            chai_1.expect(sampleContacts).to.not.be.empty;
            chai_1.expect(sampleContacts).to.have.lengthOf(3);
            chai_1.expect(sampleContacts[0].fname).to.equal('Ken');
            chai_1.expect(sampleContacts[1].phone).to.equal('5553217755');
        });
    });
    describe('test/method/deleteContact', function () {
        it('should delete one contact and give a confirmation message, or give an error if contact is not found', function () {
            const delete0 = contact_validation_1.deleteContact('1');
            const delete1 = contact_validation_1.deleteContact('50');
            chai_1.expect(delete0.message).to.not.be.undefined;
            chai_1.expect(delete0.message).to.equal('Contacted successfully deleted');
            chai_1.expect(delete0.error).to.be.undefined;
            chai_1.expect(delete1.message).to.be.undefined;
            chai_1.expect(delete1.error).to.not.be.undefined;
            chai_1.expect(delete1.error).to.equal('Contact not found');
        });
    });
    describe('test/method/validateContact.id', function () {
        it('should return a valid contact or an error if contact is not valid or found', function () {
            const contact0 = contact_validation_1.validateContact.id('0');
            const contact50 = contact_validation_1.validateContact.id('50');
            const contactXyz = contact_validation_1.validateContact.id('xyz');
            chai_1.expect(contact0).to.deep.equal({ id: "0", fname: "Ken", lname: "Bell", phone: "9162471859", email: "kmbell88@gmail.com" });
            chai_1.expect(contact50).to.be.undefined;
            chai_1.expect(contactXyz).to.be.undefined;
        });
    });
    describe('test/method/validateContact.name', function () {
        it('should return true if name is valid, false if invalid', function () {
            const name0 = contact_validation_1.validateContact.name('Kenneth'); // Standard          | expect: true
            const name1 = contact_validation_1.validateContact.name('Jerry Sue'); // With Space        | expect: true
            const name2 = contact_validation_1.validateContact.name('Mary-Ann'); // With hyphen       | expect: true
            const name3 = contact_validation_1.validateContact.name('N\'yla'); // With apostrophe   | expect: true
            const name4 = contact_validation_1.validateContact.name('H3rsheys'); // With number       | expect: false
            const name5 = contact_validation_1.validateContact.name('@mber'); // With special char | expect: false
            const name6 = contact_validation_1.validateContact.name(''); // Empty string      | expect: false
            const name7 = contact_validation_1.validateContact.name('123'); // String of numbers | expect: false
            chai_1.expect(name0, 'stardard').to.be.true;
            chai_1.expect(name1, 'with space').to.be.true;
            chai_1.expect(name2, 'with hyphen').to.be.true;
            chai_1.expect(name3, 'with apostrophe').to.be.true;
            chai_1.expect(name4, 'with number').to.be.false;
            chai_1.expect(name5, 'with special char').to.be.false;
            chai_1.expect(name6, 'empty string').to.be.false;
            chai_1.expect(name7, 'string of numbers').to.be.false;
        });
    });
    describe('test/method/validateContact.phone', function () {
        it('should return true if phone is valid, false if invalid', function () {
            const phone0 = contact_validation_1.validateContact.phone('5558884444'); // Standard           | expect: true
            const phone1 = contact_validation_1.validateContact.phone('0123456789'); // Start with zero    | expect: true
            const phone2 = contact_validation_1.validateContact.phone('012345678'); // 9 digits           | expect: false
            const phone3 = contact_validation_1.validateContact.phone('01234567890'); // 11 digits          | expect: false
            const phone4 = contact_validation_1.validateContact.phone('abcdefghij'); // 10 alpha           | expect: false
            const phone5 = contact_validation_1.validateContact.phone('555444333g'); // 1 alpha in string  | expect: false
            const phone6 = contact_validation_1.validateContact.phone('555-444-3333'); // Dash format        | expect: false
            const phone7 = contact_validation_1.validateContact.phone('(555)444-3333'); // Parenthesis format | expect: false
            const phone8 = contact_validation_1.validateContact.phone('!9529493929'); // Special char       | expect: false
            chai_1.expect(phone0, 'standard').to.be.true;
            chai_1.expect(phone1, 'start with zero').to.be.true;
            chai_1.expect(phone2, 'nine digits').to.be.false;
            chai_1.expect(phone3, 'eleven digits').to.be.false;
            chai_1.expect(phone4, 'ten alpha').to.be.false;
            chai_1.expect(phone5, '1 alpha in string').to.be.false;
            chai_1.expect(phone6, 'dash format').to.be.false;
            chai_1.expect(phone7, 'parenthesis').to.be.false;
            chai_1.expect(phone8, 'special char').to.be.false;
        });
    });
    describe('test/method/validateContact.email', function () {
        it('should return true if email is valid, false if invalid', function () {
            const email0 = contact_validation_1.validateContact.email('email@gmail.com'); // Standard email              | expect: true
            const email1 = contact_validation_1.validateContact.email('email@google.gmail.com'); // Subdomain                   | expect: true
            const email2 = contact_validation_1.validateContact.email('email.email@gmail.com'); // Multi-dots name             | expect: true
            const email3 = contact_validation_1.validateContact.email('email.email@google.gmail.com'); // Multi-dots name & subdomain | expect: true
            const email4 = contact_validation_1.validateContact.email('!HelloMe@g!mail.com'); // Special chars in domain     | expect: false
            const email5 = contact_validation_1.validateContact.email('@gmail.com'); // No local string             | expect: false
            const email6 = contact_validation_1.validateContact.email('email@gmail.com.'); // Dot at end                  | expect: false
            const email7 = contact_validation_1.validateContact.email('!HelloMe@gmail.com'); // Special chars name          | expect: true
            const email8 = contact_validation_1.validateContact.email('@'); // Only @ symbol               | expect: false
            const email9 = contact_validation_1.validateContact.email('email@gmail'); // No domain extension         | expect: false
            const email10 = contact_validation_1.validateContact.email('email@gmail.'); // Ends with dot               | expect: false
            chai_1.expect(email0, 'standard').to.be.true;
            chai_1.expect(email1, 'subdomain').to.be.true;
            chai_1.expect(email2, 'multidots in name').to.be.true;
            chai_1.expect(email3, 'multidots in name and subdomain').to.be.true;
            chai_1.expect(email4, 'special chars').to.be.false;
            chai_1.expect(email5, 'no local string').to.be.false;
            chai_1.expect(email6, 'dot at end').to.be.false;
            chai_1.expect(email7, 'special char in name').to.be.true;
            chai_1.expect(email8, 'only @ symbol').to.be.false;
            chai_1.expect(email9, 'no extension').to.be.false;
            chai_1.expect(email10, 'ends with dot').to.be.false;
        });
    });
});
