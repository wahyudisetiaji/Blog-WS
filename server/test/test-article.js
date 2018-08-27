var chai = require('chai')
var expect = chai.expect
var mogoose = require('mongoose')
var chaiHttp = require('chai-http');
var Article = require('../models/article')
chai.use(chaiHttp);

describe('Article', function(){

    beforeEach(function(done) {
        mogoose.connect('mongodb://testing-blog:sportident17@ds125872.mlab.com:25872/testing-blog', function(){
            User.collection.drop()
        })
        done()
    })

    it('GET success, as expected get all article', function(done) { 
        chai.request('http://localhost:3000')
        .get('/articles')
        .end(function (err, res) {
            expect(res).to.have.status(200)
            expect(res).to.be.a('object')
            done()
        })
    });

    it('GET success, as expected get one article', function(done) { 
        chai.request('http://localhost:3000')
        .get(`/articles/article/5b7bc623ea9f72f8feeb2497`)
        .end(function (err, res) {
            expect(res).to.have.status(200)
            expect(res).to.be.a('object')
            done()
        })
    });

    it('DELETE success, as expected to my article', function(done) { 
        chai.request('http://localhost:3000')
        .get(`/articles/5b7bc623ea9f72f8feeb2497`)
        .end(function (err, res) {
            expect(res).to.have.status(200)
            expect(res).to.be.a('object')
            done()
        })
    });

    it('PUT success, as expected to my article', function(done) { 
        chai.request('http://localhost:3000')
        .get(`/articles/5b7bc623ea9f72f8feeb2497`)
        .end(function (err, res) {
            expect(res).to.have.status(200)
            expect(res).to.be.a('object')
            done()
        })
    });
})