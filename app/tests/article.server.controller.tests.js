/* jshint node: true, jasmine: true */
"use strict";

var app = require('../../server'),
    request = require('supertest'),
    should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Article = mongoose.model('Article');

var user, article;

describe('Article Controller Unit Tests:', function() {
    beforeEach(function(done) {
        user = new User({
            firstName: 'Full',
             lastName: 'Name',
             fullName: 'Full Name',
             email: 'test@test.com',
             provider: 'DaronCorp',
             username: 'username',
             password: 'password'
        });

        user.save(function(err) {
            if (err) return done(err);

            article = new Article({
                title: 'Article Title',
                content: 'Article Content',
                creator: user
            });
            
            article.save(function(err) {
                if (err) return done(err);
                done();
            });
        });
    });

    describe('Testing the GET methods', function() {
        it('Should be able to be able to get the list of articles', function(done) {
            request(app).get('/api/articles/')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);

                    res.body.should.be.instanceOf(Array).and.have.a.lengthOf(1);
                    res.body[0].should.have.property('title', article.title);
                    res.body[0].should.have.property('content', article.content);
                    
                    done();
                });
        });
        
        it('Should be able to get the specific article', function(done) {
            request(app).get('/api/articles/' + article.id)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    res.body.should.be.an.instanceOf(Object).and.have.property('title', article.title);
                    res.body.should.have.property('content', article.content);

                    done();
                });
        });
    });

    afterEach(function(done){
        Article.remove().exec();
        User.remove().exec();
        done();
    });
});
