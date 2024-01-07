
import {postRequestBody, putRequestBody, putPartialRequestBodyUpdate} from '../../fixtures/testData.json'



describe('API project 02', () =>{

    let studentId
    let defaultUsers = []

    it('Retrive a list of all users', () =>{
        cy.request({
            method: 'GET',
            url: `${Cypress.env('baseUrl')}`,
            body: postRequestBody
        }).then((response) =>{
            expect(response.status).to.equal(200)
            expect(response.duration).to.be.below(600)

            defaultUsers = response.body;
            expect(defaultUsers.length).to.be.gte(2)

            //second option:
            // expect(defaultUsers).to.have.length.greaterThan(2)
            expect(response.body[1].firstName).to.equal('John');  // we put number [1] because it is an array that initiate from 0
            expect(response.body[1].lastName).to.equal('Doe'); // the info for this user was taken from the website since it is a defautl user


            
        })
    })

    it('Create a new user', () =>{

       cy.request({
        method: 'POST',
        url: Cypress.env('baseUrl'),
        body: postRequestBody
       }).then((response) =>{
        expect(response.status).to.eq(200)
        expect(response.duration).to.be.below(700)
        expect(response.body.firstName).to.equal(postRequestBody.firstName)
        expect(response.body.lastName).to.equal(postRequestBody.lastName)
        expect(response.body.email).to.equal(postRequestBody.email)
        expect(response.body.dob).to.equal(postRequestBody.dob)

        studentId = response.body.id
       })

    })
    
   it('Retrive created user', () =>{
    cy.request({
        method: 'GET',
        url:`${Cypress.env('baseUrl')}/${studentId}`
    }).then((response) =>{
        expect(response.body.firstName).to.equal(postRequestBody.firstName)
        expect(response.body.lastName).to.equal(postRequestBody.lastName)
        expect(response.body.email).to.equal(postRequestBody.email)
        expect(response.body.dob).to.equal(postRequestBody.dob)
    })
   })

   it('Update an existing user', () =>{
    cy.request({
        method: 'PUT',
        url:`${Cypress.env('baseUrl')}/${studentId}`,
        body: putRequestBody
    }).then((response) =>{
        expect(response.status).to.eq(200)
        expect(response.duration).to.be.below(800)
        expect(response.body.firstName).to.equal(putRequestBody.firstName) // here we use the put request body that was created into testData.json
        expect(response.body.lastName).to.equal(putRequestBody.lastName)
        expect(response.body.email).to.equal(putRequestBody.email)
        expect(response.body.dob).to.equal(putRequestBody.dob)
    })
   })

   it('Partially update an existing User', () =>{
    cy.request({
        method: 'PATCH',
        url: `${Cypress.env('baseUrl')}/${studentId}`,
        body: putPartialRequestBodyUpdate
    }).then((response) =>{
        expect(response.status).to.eq(200)
        expect(response.body.email).to.equal(putPartialRequestBodyUpdate.email)
        expect(response.body.dob).to.equal(putPartialRequestBodyUpdate.dob)
    })
   })

   it('Retrieve a list of all users again', () =>{
    cy.request({
        method: 'GET',
        url: Cypress.env('baseUrl'),
        body: defaultUsers
    }).then((response) =>{
        expect(response.status).to.eq(200)
        expect(response.duration).to.be.below(700)

        //by assigned again the variable defaultUsers here it will update the amount of user,
        // it will provide the 2 default user + the one we just created and updated.
        defaultUsers = response.body;

        expect(defaultUsers.length).to.be.gte(3)
    })
   })


it('Retrieve a specific user created to confirm the update', () =>{
    cy.request({
        method: 'GET',
        url: `${Cypress.env('baseUrl')}/${studentId}`,
        body: putPartialRequestBodyUpdate
    }).then((response) =>{
        expect(response.status).to.eq(200)
        expect(response.duration).to.be.below(800)
        expect(response.body.firstName).to.equal(putPartialRequestBodyUpdate.firstName)
        expect(response.body.lastName).to.equal(putPartialRequestBodyUpdate.lastName)
        expect(response.body.email).to.equal(putPartialRequestBodyUpdate.email)
        expect(response.body.dob).to.equal(putPartialRequestBodyUpdate.dob)
    })
})
    it('Finally, delete the user that you created', () =>{
        cy.request({
           method: 'DELETE',
           url: `${Cypress.env('baseUrl')}/${studentId}`
        }).then((response) =>{
           expect(response.status).to.eq(200)
           expect(response.duration).to.be.below(800)
        })
     })
})