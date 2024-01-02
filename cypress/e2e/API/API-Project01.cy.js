
import{postRequestBody, putRequestBody} from '../../fixtures/testData.json'


describe('API-Project01', () =>{

   let studentId
    
     it('Create a new user', () =>{
         
  

     cy.request({
        method: 'POST',
        url: Cypress.env('baseUrl'),
        body: postRequestBody

        
     }).then((response) =>{
      cy.log(JSON.stringify(response.body, null, 2))
      expect(response.status).to.eq(200);
      expect(response.duration).to.be.below(5000);

      studentId = response.body.id
     
   // This validation is added into the the support folder inside the commands.js file. 
   //Validate first name, last, email and dob. 
      cy.validateResponse(response, postRequestBody)

      })
    
      
     })

     it('Retrive a specific user-created', () =>{
      cy.request({
         metho: 'GET',
         url: `${Cypress.env('baseUrl')}/${studentId}`
      }).then((response) =>{
         expect(response.status).to.eq(200);
         expect(response.duration).to.be.below(5000)
         // validate user details retrieved from the specific GET
         // here again we used the same function as prior test (POST)
         cy.validateResponse(response, postRequestBody)
      })
     })
  
     it('Update an existing user', () =>{
      cy.request({
         method: 'PUT',
         url: `${Cypress.env('baseUrl')}/${studentId}`,
         body: putRequestBody
      }).then((response) =>{
         expect(response.status).to.eq(200)
         expect(response.duration).to.be.below(600)

         // this ocation we validated using our putRequestBody from import, this profile is updated one
         cy.validateResponse(response, putRequestBody)





      })
      })
      it('Retrieve a specific user created to confirm the update', () =>{
         
         cy.request({
            method: 'GET',
            url: `${Cypress.env('baseUrl')}/${studentId}`
         }).then((response) =>{
            expect(response.status).to.eq(200)
            expect(response.duration).to.be.below(700)

            // in this case we are going to validated our profile one by one and not using the fuction that we used in prior test
            expect(response.body.firstName).to.equal(putRequestBody.firstName)
            expect(response.body.lastName).to.equal(putRequestBody.lastName)
            expect(response.body.email).to.equal(putRequestBody.email)
            expect(response.body.dob).to.equal(putRequestBody.dob)

         })


      })
      it('Delete the user that you created', () =>{
         cy.request({
            method: 'DELETE',
            url: `${Cypress.env('baseUrl')}/${studentId}`
         }).then((response) =>{
            expect(response.status).to.eq(200)
            expect(response.duration).to.be.below(800)
         })
      })
     })




   



