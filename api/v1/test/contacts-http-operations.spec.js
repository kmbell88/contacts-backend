"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importStar(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const index_1 = __importDefault(require("../../../src/index"));
chai_1.default.use(chai_http_1.default);
describe('Contacts API', function () {
    // Test GET all
    describe('test/GET all contacts', function () {
        it('should GET all contacts', function () {
            chai_1.default.request(index_1.default)
                .get('/api/v1/contacts')
                .end((err, res) => {
                chai_1.expect(res).to.have.status(200);
                chai_1.expect(res.body).to.be.an('array');
                chai_1.expect(res.body).to.have.lengthOf(3);
                chai_1.expect(res.body[0]).to.have.all.keys('id', 'fname', 'lname', 'phone', 'email');
                chai_1.expect(res.body[3]).to.be.undefined;
            });
        });
    });
    // Test GET by ID
    describe('test/GET contact by ID tests', function () {
        it('should GET single contact by ID', function () {
            chai_1.default.request(index_1.default)
                .get('/api/v1/contacts/id/' + 0)
                .end((err, res) => {
                chai_1.expect(res).to.have.status(200);
                chai_1.expect(res.body).to.be.an('object');
                chai_1.expect(res.body).to.have.all.keys('id', 'fname', 'lname', 'phone', 'email');
                chai_1.expect(res.body.phone).to.be.a('string');
            });
        });
        it('should NOT GET single contact by invalid ID', function () {
            chai_1.default.request(index_1.default)
                .get('/api/v1/contacts/id/' + 'xyz')
                .end((err, res) => {
                chai_1.expect(res).to.have.status(404);
            });
        });
        it('should NOT GET single contact by ID', function () {
            chai_1.default.request(index_1.default)
                .get('/api/v1/contacts/id/' + 5)
                .end((err, res) => {
                chai_1.expect(res).to.have.status(404);
            });
        });
    });
    // Test POST
    describe('test/POST contact', function () {
        it('should POST a single contact', function () {
            // Standard | expect: status 201
            const newContact0 = {
                fname: 'Donkey',
                lname: 'Kong',
                phone: '9543458765',
                email: 'asdfsdf@a.a.com'
            };
            // first name sent as an empty string should be invalid | expect: status 422
            const newContact1 = {
                fname: '',
                lname: 'Kong',
                phone: '4565559898',
                email: 'incorrect@gmail.com'
            };
            // Sent with no phone number should be valid | expect: status 201
            const newContact2 = {
                fname: 'Abraham',
                lname: 'Licoln',
                email: 'abesAxes@hotmail.com'
            };
            // Sent with no email should be valid | expect: status 201
            const newContact3 = {
                fname: 'Jim',
                lname: 'Brown',
                phone: '5678887766'
            };
            chai_1.default.request(index_1.default)
                .post('/api/v1/contacts')
                .type('form')
                .send(newContact0)
                .end((err, res) => {
                chai_1.expect(res, 'status 201/standard').to.have.status(201);
            });
            chai_1.default.request(index_1.default)
                .post('/api/v1/contacts')
                .type('form')
                .send(newContact1)
                .end((err, res) => {
                chai_1.expect(res, 'status 422/no fname').to.have.status(422);
            });
            chai_1.default.request(index_1.default)
                .post('/api/v1/contacts')
                .type('form')
                .send(newContact2)
                .end((err, res) => {
                chai_1.expect(res, 'status 201/no phone').to.have.status(201);
            });
            chai_1.default.request(index_1.default)
                .post('/api/v1/contacts')
                .type('form')
                .send(newContact3)
                .end((err, res) => {
                chai_1.expect(res, 'status 201/no email').to.have.status(201);
            });
        });
    });
    // Test PATCH
    describe('test/PATCH contact', function () {
        it('should PATCH a single contact', function () {
            // Update only fname | expect: status 200
            const patchContact0 = {
                id: '0',
                fname: 'Mario'
            };
            // Update only fname with digit | expect: status 422
            const patchContact1 = {
                id: '0',
                fname: 'Mari0'
            };
            // Update only phone | expect: status 200
            const patchContact2 = {
                id: '0',
                phone: '9168675309'
            };
            // Invalid ID | expect: status 404
            const patchContact3 = {
                id: 'xyz',
                fname: "Charles",
                lname: "Barkley"
            };
            // Update only email | expect: status 200
            const patchContact4 = {
                id: '1',
                email: "chickenlittle@gmail.com"
            };
            // Patch all fields | expect: status 200
            const patchContact5 = {
                id: '2',
                fname: 'Count',
                lname: 'Dracula',
                phone: 8883339999,
                email: 'nightwalker@msn.com'
            };
            chai_1.default.request(index_1.default)
                .patch('/api/v1/contacts')
                .type('form')
                .send(patchContact0)
                .end((err, res) => {
                chai_1.expect(res, 'status 200/PATCH only fname').to.have.status(200);
            });
            chai_1.default.request(index_1.default)
                .patch('/api/v1/contacts')
                .type('form')
                .send(patchContact1)
                .end((err, res) => {
                chai_1.expect(res, 'status 422/PATCH only fname with digit').to.have.status(422);
            });
            chai_1.default.request(index_1.default)
                .patch('/api/v1/contacts')
                .type('form')
                .send(patchContact2)
                .end((err, res) => {
                chai_1.expect(res, 'status 200/PATCH only phone').to.have.status(200);
            });
            chai_1.default.request(index_1.default)
                .patch('/api/v1/contacts')
                .type('form')
                .send(patchContact3)
                .end((err, res) => {
                chai_1.expect(res, 'status 404/PATCH invalid ID').to.have.status(404);
            });
            chai_1.default.request(index_1.default)
                .patch('/api/v1/contacts')
                .type('form')
                .send(patchContact4)
                .end((err, res) => {
                chai_1.expect(res, 'status 200/PATCH only email').to.have.status(200);
            });
            chai_1.default.request(index_1.default)
                .patch('/api/v1/contacts')
                .type('form')
                .send(patchContact5)
                .end((err, res) => {
                chai_1.expect(res, 'status 200/PATCH all fields').to.have.status(200);
            });
        });
    });
    // Test DELETE
    describe('test/DELETE contact', function () {
        it('should DELETE a single contact', function () {
            // Delete valid contact ID | expect: status 200; TEST 3: Delete ID that's been deleted | expect: status 404
            const deleteContact0 = {
                id: '0'
            };
            // Delete invalid contact ID | expect: status 404
            const deleteContact1 = {
                id: '89000'
            };
            chai_1.default.request(index_1.default)
                .delete('/api/v1/contacts')
                .type('form')
                .send(deleteContact0)
                .end((err, res) => {
                chai_1.expect(res, 'status 200/DELETE valid contact ID').to.have.status(200);
            });
            chai_1.default.request(index_1.default)
                .delete('/api/v1/contacts')
                .type('form')
                .send(deleteContact1)
                .end((err, res) => {
                chai_1.expect(res, 'status 404/DELETE invalid contact ID').to.have.status(404);
            });
            chai_1.default.request(index_1.default)
                .delete('/api/v1/contacts')
                .type('form')
                .send(deleteContact0)
                .end((err, res) => {
                chai_1.expect(res, 'status 404/DELETE same contact twice').to.have.status(404);
            });
        });
    });
});
