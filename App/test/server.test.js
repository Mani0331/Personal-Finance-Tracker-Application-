import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js'; // Correct import

const { expect } = chai;
chai.use(chaiHttp);

describe('Transaction API Tests', () => {
    let transactionId;

    // Test 1: Get Transactions (Initially Empty)
    it('GET /transactions should return an array', (done) => {
        chai.request(app) // Use `app` instead of `server`
            .get('/transactions')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    // Test 2: Add a Transaction
    it('POST /transactions should add a new transaction', (done) => {
        const newTransaction = {
            description: "Test Expense",
            amount: 100,
            type: "expense"
        };

        chai.request(app)
            .post('/transactions')
            .send(newTransaction)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('transaction');
                transactionId = res.body.transaction.id;
                done();
            });
    });

    // Test 3: Edit a Transaction
    it('PUT /transactions/:id should update a transaction', (done) => {
        const updatedTransaction = {
            description: "Updated Test Expense",
            amount: 200,
            type: "expense"
        };

        chai.request(app)
            .put(`/transactions/${transactionId}`)
            .send(updatedTransaction)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.transaction.amount).to.equal(200);
                done();
            });
    });

    // Test 4: Delete a Transaction
    it('DELETE /transactions/:id should delete a transaction', (done) => {
        chai.request(app)
            .delete(`/transactions/${transactionId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
});
