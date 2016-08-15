var mocha = require('mocha'),
    chai = require('chai'),
    should = require('should'),
    expect = require('expect')
    Promise = require('bluebird')
    fs = require('fs');

var bowlingKata = require('./bowlingKata');

describe('Bowling Kata Start Tests', function() {
    var game = null;
    beforeEach('create a new game', function(done) {
        game = new bowlingKata.game();

        done();
    })

    it('should start a new game and set game points to zero', function(done) {
        game.score().should.equal(0);

        done();
    });

    /**
     * First test to get roll method working
     */
    it('should get 20 points when each bowl knocks 1 pin over', function(done) {

        /**
         * 20 bowls over a game
         * 1 pin = 1 point
         */
        for (var i = 0; i < 20; i++) 
        {
            game.bowl(1);
        }
        game.score().should.equal(20);

        done();
    }); 

    /**
     * Null score due to no pins hit in any frame
     */
    it('should score zero points if 20 rolls and no pins hit', function(done) {
        for (var i = 0; i < 20; i++) 
        {
            game.bowl(0);
        }
        game.score().should.equal(0);

        done();
    });
    

    /**
     * Strike followed by a 7 and a 1
     * score is (10+6+3) + (6+3)
     */
    it('should get 28 when bowling a strike followed by a 6 and a 3', function(done) { 
        game.bowl(10);
        game.bowl(6);
        game.bowl(3);

        for (var i = 0; i < 16; i++ ) {
            game.bowl(0);
        }

        game.score().should.equal(28);

        done();
    });

    /**
     * Should calculate 300 if a perfect bowl in all 10 round, with two extra bowls in 10th frame
     */
    it('should allow golden score of 300 when a strike on each frame', function(done) {
        for (var i = 0; i < 12; i++ ) {
            game.bowl(10); 
        }

        game.score().should.equal(300);

        done();
    });

    it.skip('should should treat last frame differently', function(done){

        done();
    }); 

    /**
     * Should score 90 points if rolling 9 and miss in each frame
     */
    it('should get 90 when 10 pairs of 9 and a miss', function(done) {
        for (var i = 0; i < 10; i++ ) {
            game.bowl(9);
            game.bowl(0);
        }

        game.score().should.equal(90);
        done();
    });

    /**
     * Should score 155 when bolwing 5 and 5 in each frame
     */
    it('should get 150 when 10 pairs of 5 and a spare (5)', function(done) {
        for (var i = 0; i < 20; i++ ) {
            game.bowl(5);
        }

        game.score().should.equal(150);
        done();
    });

})
