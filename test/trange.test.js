const { Rank } = require('../lib');

const assert = require('chai').assert;

describe('#trange', function() {
    beforeEach(function () {
    });
    
    afterEach(function () {
    });

    before(function() {
    });

    after(function () {
    });

    it('tcount tree test', function() {
        let data = [1,3,11,4,5,6,9,19,90,7,8,9,11,-10,0.1,1/3];
        let rank = new Rank();

        data.forEach((v, index) => {
            rank.tadd(index.toString(), v);
        })

        let start = 8;
        let end = 19;
        data = data.filter((v) => {
            if (v <= end && v >= start) {
                return true;
            }
            return false;
        })

        assert.equal(rank.tcount(start, end), data.length);
    });

    it('trevrangebyscore tree test', function() {
        let data = [1,3,11,4,5,6,9,19,90,7,8,9,11,-10,0.1,1/3];
        let rank = new Rank();

        data.forEach((v, index) => {
            rank.tadd(index.toString(), v);
        })

        let start = 8;
        let end = 19;
        data = data.filter((v) => {
            if (v <= end && v >= start) {
                return true;
            }
            return false;
        })
        data.sort((a, b) => a-b);
        let allNode = rank.trevrangebyscore(start, end);
        assert.equal(allNode.length, data.length);
        for (let i=0; i<data.length; i++) {
            assert.equal(allNode[i][1], data[i]);
        }
    });
});