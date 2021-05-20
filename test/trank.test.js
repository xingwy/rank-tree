const { Rank } = require('../lib');

const assert = require('chai').assert;

describe('#trank', function() {
    beforeEach(function () {
    });
    
    afterEach(function () {
    });

    before(function() {
    });

    after(function () {
    });

    it('trank test', function() {
        let data = [1,3,11,4,5,6,9,19,90,7,8,9,11,-10,0.1,1/3];
        let rank = new Rank();

        data.forEach((v, index) => {
            rank.tadd(index.toString(), v);
        })
      
        data.sort((a, b) => a-b);
        let allNode = rank.tgetall();
        assert.equal(allNode.length, data.length);
        for (let i=0; i<data.length; i++) {
            assert.equal(allNode[i][1], data[i]);
        }
    });
});