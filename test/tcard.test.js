const { Rank } = require('../lib');

const assert = require('chai').assert;

describe('#tcard', function() {
    beforeEach(function () {
    });
    
    afterEach(function () {
    });

    before(function() {
    });

    after(function () {
    });

    it('tcard tree test', function() {
        let data = [1,3,11,4,5,6,9,19,90,7,8,9,11,-10,0.1,1/3];
        let rank = new Rank();

        data.forEach((v, index) => {
            rank.tadd(index.toString(), v);
        })
        let allNode = rank.tgetall();
        assert.equal(allNode.length, data.length);
    });
});