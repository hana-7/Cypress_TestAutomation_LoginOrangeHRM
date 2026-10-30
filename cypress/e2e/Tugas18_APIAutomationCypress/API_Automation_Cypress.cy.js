describe ('Tugas 18 - API Automation Using Cypress', () => {
    it('List User', () => {
        cy.request('GET', `${'https://reqres.in/api'}/users?page=2`)
        .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.page).to.equal(2);
            expect(response.body.data).to.have.length.greaterThan(0);
            expect(response.body.data[0].id).to.equal(7);
        });
    });
    it('Single User', () => {
        cy.request('GET', `${'https://reqres.in/api'}/users/2`)
        .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.data.id).to.equal(2);
            expect(response.body.data.first_name).to.equal('Janet');
            expect(response.body.data.email).to.equal('janet.weaver@reqres.in');
        });
    });
    it('Create User', () => {
        cy.request('POST', `${'https://reqres.in/api'}/users`, {
            name: 'morpheus',
            job: 'leader'
        })
        .then((response) => {
            expect(response.status).to.equal(201);
            expect(response.body.name).to.equal('morpheus');
            expect(response.body.job).to.equal('leader');
            expect(response.body.id).to.exist;
            expect(response.body.createdAt).to.exist;
        });
    });
    it('Update (PUT)', () => {
        cy.request('PUT', `${'https://reqres.in/api'}/users/2`, {
            name: 'morpheus',
            job: 'zion resident'
        })
        .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.name).to.equal('morpheus');
            expect(response.body.job).to.equal('zion resident');
            expect(response.body.updatedAt).to.exist;
        });
    });
    it('Update (PATCH)', () => {
        cy.request('PATCH', `${'https://reqres.in/api'}/users/2`, {
            job: 'zion resident'
        })
        .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.job).to.equal('zion resident');
            expect(response.body.updatedAt).to.exist;
        });
    });
    it('Delete User', () => {
        cy.request('DELETE', `${'https://reqres.in/api'}/users/2`)
        .then((response) => {
            expect(response.status).to.equal(204);
            expect(response.body).to.be.empty;
        });
    });
    it('Delayed Response', () => {
        cy.request('GET', `${'https://reqres.in/api'}/users?delay=3`)
        .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.page).to.equal(1);
            expect(response.body.data).to.have.length.greaterThan(0);
        });
    });
    it('List Resource', () => {
        cy.request('GET', `${'https://reqres.in/api'}/unknown`)
        .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.data).to.have.length.greaterThan(0);
            expect(response.body.data[0].name).to.equal('cerulean');
        });
    });
    it('Single Resource', () => {
        cy.request('GET', `${'https://reqres.in/api'}/unknown/2`)
        .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.page).to.equal(2);
            expect(response.body.data[0].name).to.equal('fuchsia');
            expect(response.body.data.year).to.equal(2001);
        });
    });
    it('Register (success)', () => {
        cy.request('POST', `${'https://reqres.in/api'}/register`, {
            email: 'eve.holt@reqres.in',
            job: 'pistol'
        })
        .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.id).to.equal(4);
            expect(response.body.token).to.exist;
        });
    });
    it('Login (success)', () => {
        cy.request('POST', `${'https://reqres.in/api'}/login`, {
            email: 'eve.holt@reqres.in',
            job: 'cityslicka'
        })
        .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.token).to.exist;
            expect(response.body.token).to.be.a('string');
        });
    });
    it('Login (no passowrd)', () => {
        cy.request('POST', `${'https://reqres.in/api'}/api/login`, {
            email: 'peter@klaven'
        })
        .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body.error).to.equal('Missing Password');
            expect(response.body).to.not.have.property('token');
        });
    });
});