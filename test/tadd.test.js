const { Rank } = require('../lib');

const assert = require('chai').assert;

describe('#tadd', function() {
    beforeEach(function () {
    });
    
    afterEach(function () {
    });

    before(function() {
    });

    after(function () {
    });

    it('tadd node test1', function() {
        let data = [1,3,11,4,5,6,9,19,90,7,8,9,11,-10,0.1,1/3];
        let rank = new Rank();

        data.forEach((v, index) => {
            rank.tadd(index.toString(), v);
        })
        data.sort((a, b) => a-b);
        let allNode = rank.tgetall();
        assert.equal(allNode.length, data.length);
        for (let i=0; i<data.length; i++) {
            assert.equal(allNode[i][1],data[i]);
        }
    });

    it('tadd node test2', function() {
        let data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];
        let rank = new Rank();

        data.forEach((v, index) => {
            rank.tadd(index.toString(), v);
        })
        data.sort((a, b) => a-b);
        
        let allNode = rank.tgetall();
        assert.equal(allNode.length, data.length);
        for (let i=0; i<data.length; i++) {
            assert.equal(allNode[i][1],data[i]);
        }
    });

    it('tadd node test3', function() {
        let data = [17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1];
        let rank = new Rank();

        data.forEach((v, index) => {
            rank.tadd(index.toString(), v);
        })
        data.sort((a, b) => a-b);
        
        let allNode = rank.tgetall();
        assert.equal(allNode.length, data.length);
        for (let i=0; i<data.length; i++) {
            assert.equal(allNode[i][1],data[i]);
        }
    });
});