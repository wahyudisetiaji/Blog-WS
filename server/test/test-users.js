var chai = require('chai')
var expect = chai.expect
var mogoose = require('mongoose')
var chaiHttp = require('chai-http');
var User = require('../models/user')
chai.use(chaiHttp);

describe('User', function(){

    beforeEach(function(done) {
        mogoose.connect('mongodb://testing-blog:sportident17@ds125872.mlab.com:25872/testing-blog', function(){
            User.collection.drop()
        })
        done()
    })

    it('POST success, as expected sign up', function(done) { 
        chai.request('http://localhost:3000')
        .post('/users/signUp')
        .send({
            name: "Wahyudi",
            email: "wahyudi@mail.com",
            password: "123"
        })
        .end(function(err, res) {   
            console.log(res.body);
          expect(res).to.have.status(201);
          expect(res).to.have.a('object')
          done();                              
        });
      });

      it('POST success, as expected sign in', function(done) {
          chai.request('http://localhost:3000')
          .post('/users/signIn')
          .send({
              email: "wahyudi@mail.com",
              password: "123"
          })
          .end(function(err, res) {
              console.log(res.body);
              expect(res).to.have.status(200);
              expect(res).to.have.a('object')
              done()
          })

      })
})
