import { postRequestBody, putRequestBody } from '../../fixtures/testData.json'

describe('CRUD Operations', () =>{

let studentId 


it('create new estudent using post', () =>{

cy.request({
  method: 'POST', 
  url: Cypress.env('baseUrl'),
  body: postRequestBody



}).then((response) =>{
    console.log(JSON.stringify(response.body, null, 2))




    studentId = response.body.id
    cy.validateResponse(response, postRequestBody)
})



})
it('create new estudent using post ', () =>{
    cy.log(`${Cypress.env('baseUrl')}/${studentId}`)
     cy.request({
        method: 'GET',
        url: `${Cypress.env('baseUrl')}/${studentId}`,
        

     }).then((response) =>{
        expect(response.status).to.equal(200)
        cy.log(JSON.stringify(response.body, null, 2))
     })



    })
    it('Edit and udate an student using PUT', () =>{
        cy.log(`${Cypress.env('baseUrl')}/${studentId}`)
        
        cy.request({
           method: 'PUT',
           url: `${Cypress.env('baseUrl')}/${studentId}`,
           body: putRequestBody,



        }).then((response) =>{
            expect(response.status).to.equal(200)
            cy.validateResponse(response, putRequestBody)
        })



    })


    it('read the updated GET', () =>{
        cy.request({
            method: 'GET',
            url: `${Cypress.env('baseUrl')}/${studentId}`
        }).then((response) =>{
            expect(response.status).to.equal(200)
            expect(response.duration).to.be.below(200)
            expect(response.body.firstName).to.equal(putRequestBody.firstName)
        })
    })
    it('Delete the user Delete', () =>{
        cy.request({
           method: 'DELETE',
           url: `${Cypress.env('baseUrl')}/${studentId}`

        }).then((response) =>{
            expect(response.status).to.equal(200)
        })



    })

})


















// Test-1
// describe('CRUD Operations', () => {


//     it('Create a new student using POST', () => {

//         const newUser = {
//                 firstName: 'ivan',
//                 lastName: 'garcia',
//                 email: 'ivangarcia@global.com',
//                 dob: '1984-05-27',
//             }
            
//         cy.request({
//             method: 'POST',
//             url: Cypress.env('baseUrl'),
//             body: newUser

//         }).then((response) =>{
//             cy.log(JSON.stringify(response.body, null, 2))

//             expect(response.status).to.equal(200)
//             expect(response.duration).lessThan(400)
//             expect(response.body.firstName).to.equal(newUser.firstName)
//             expect(response.body)
            
            
           
//         })
//     })
// })