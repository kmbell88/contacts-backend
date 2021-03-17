# Contacts API (V1)

#### **Engineer & Designer**: Ken Bell

#### **Technologies**: Node.js (14.16.0), Express.js, TypeScript

#### **Operating System**: Linux Mint 20.1 Cinnamon

#### **IDE**: Visual Studio Code (1.54.3)

#### **Testing Framework:** Mocha, Chai

#### **Released**: 2021 March 17

#### **Latest Update**: 2021 March 17

<br />

## **Description**

This is a contact book-style API that contains all the information related to all user contacts, as well as the ability to create, read, update, and delete individual contacts. <br />

### **V1 Details**

This is a personal project application that is focused on the study and applied practice of the following objectives:

- TypeScript, Mocha, and Chai frameworks.
- Test Driven Development (TDD) techniques and applications, considering factors such as:
  - Proper and efficient implementation of unit testing, integration testing, and E2E testing.
  - Abstraction, data injection, and inversion of control (IoC) practices and techniques that enable better testability, readability, and scalability of code.
- Best coding practices, including clearly and concisely written and maintained code, intuitive flow of written and executed code, well-structured file organization following principles of MVC architecture, and optimizing functional and modular components.
- Techniques of proper documentation.

**Note:** In this version of the application **there is no external database** being used, making this a sandbox application used primarily for the objectives listed above. It includes a static list of contacts for the sake of example which can be manipulated by the user and may be stored locally to the server. Since this is deployed on a free-tier server on Heroku, everytime the dyno goes to sleep and wakes, all previously manipulated data is cleared from its cache and the application is restored to its default state. Future versions will feature a fully operational database.

<br />

## **Contact Properties**

| Name      | Type   | Description                 | Notes                                                                                                                                                                                                                                                                              |
| --------- | ------ | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **id**    | String | Unique ID of the contact    | Required; Provided by the API                                                                                                                                                                                                                                                      |
| **fname** | String | First name of the contact   | Required                                                                                                                                                                                                                                                                           |
| **lname** | String | Last name of the contact    | Required                                                                                                                                                                                                                                                                           |
| **phone** | String | Phone number of the contact | [Optional] <br />Must be sent as an **unformatted** string of numbers (i.e. “8005550000” is valid; “800-555-0000” is invalid). Returned as an unformatted string of numbers. <br />May extend to formatted phone numbers in the future, which will not affect prior functionality. |
| **email** | String | Email of the contact        | [Optional]                                                                                                                                                                                                                                                                         |

---

<br />

## **Example Contact Object**

<pre>
{
  "id": "3805d716-a749-45ea-997a-c4045e2d90e2",
  "fname": "Johann Sebastian",
  "lname": "Bach",
  "phone": "9168675309",
  "email": "js.bach@clavier.master.com"
}
</pre>

<br />

## **Endpoints**

### <getText>**GET**</getText> /api/v1/contacts

Returns an array of contact objects.

**Requirements:** None <br />
**Parameters:** None <br />
**Responses:** <br />

- **200**: <codeText>[{ /* All Contacts */ }]</codeText>
- **404**: <codeText>{ error: "Contacts not found" }</codeText>

---

### <getText>**GET**</getText> /api/v1/contacts/:id

Returns a single contact as an object.

**Requirements:** None <br />
**Parameters:**

- **id**: As a parameter in the endpoint<br />

**Responses:**

- **200**: <codeText>{/\* Contact \*/}</codeText>
- **404**: <codeText>{ error: "Contact not found" }</codeText>

---

### <postText>**POST**</postText> /api/v1/contacts/

Creates a new contact.

**Requirements:** None <br />
**Parameters:**

- **fname**
- **lname**
- **phone** [optional]
- **email** [optional]

**Responses:**

- **201:** <codeText>{ message: “Contact successfully created” }</codeText>
- **422:**
  - <codeText>{ error: "The first name entered is invalid" }</codeText>
  - <codeText>{ error: "The last name entered is invalid" }</codeText>
  - <codeText>{ error: "The phone number entered is invalid" }</codeText>
  - <codeText>{ error: "The email entered is invalid" }</codeText>

---

### <patchText>**PATCH**</patchText> /api/v1/contacts/

Updates an existing contact.<br />
**Note:** You must only pass optional parameters that you want updated in the contact. Optional parameters sent as empty strings, undefined, or null may overwrite values in the database unintentionally or return a 422 status. Specific reasoning for this is because a user may want to remove an optional field such as a phone number or email without replacing it with a new value, so by sending an empty string it will overwrite the value with the empty string.<br />
**Suggestion:** If you don't want to send back only specifically updated fields, send back the entire contact object with all fields both updated and not (as you would with a PUT request) to ensure values are not unintentially changed.

**Requirements:** None <br />
**Parameters:**

- **id**
- **fname** [optional]
- **lname** [optional]
- **phone** [optional]
- **email** [optional]

**Responses:**

- **201:** <codeText>{ message: “Contact successfully updated" }</codeText>
- **404:** <codeText>{ error: "Contact not found" }</codeText>
- **422:**
  - <codeText>{ error: "The first name entered is invalid" }</codeText>
  - <codeText>{ error: "The last name entered is invalid" }</codeText>
  - <codeText>{ error: "The phone number entered is invalid" }</codeText>
  - <codeText>{ error: "The email entered is invalid" }</codeText>

---

### <deleteText>**DELETE**</deleteText> /api/v1/contacts/

Deletes a single contact.

**Requirements:** None <br />
**Parameters:**

- **id**

**Responses:**

- **200**: <codeText>{ message: "Contact successfully deleted" }</codeText>
- **404:** <codeText>{ error: "Contact not found" }</codeText>

<style>
getText {
  color: #5e8da0;
}

postText {
  color: #63d863
}

patchText {
  color: #ffb347;
}

deleteText {
  color: #ff5747;
}

codeText {
  font-family: 'Courier New';
}
</style>
