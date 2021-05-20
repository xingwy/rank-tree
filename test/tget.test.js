const { Rank } = require('../lib');

const assert = require('chai').assert;

describe('#get', function() {
    beforeEach(function () {
    });
    
    afterEach(function () {
    });

    before(function() {
    });

    after(function () {
    });

    it('tscore tree test', function() {
        let data = [1,3,11,4,5,6,9,19,90,7,8,9,11,-10,0.1,1/3];
        let rank = new Rank();

        data.forEach((v, index) => {
            rank.tadd(index.toString(), v);
        })

        for (let i=0; i<data.length; i++) {
            assert.equal(rank.tscore(i.toString()), data[i]);
        }
    });

    it('tgetwithindex tree test', function() {
        let data = [1,3,11,4,5,6,9,19,90,7,8,9,11,-10,0.1,1/3];
        let rank = new Rank();

        data.forEach((v, index) => {
            rank.tadd(index.toString(), v);
        })

        data.sort((a, b) => a-b);
        for (let i=0; i<data.length; i++) {
            let pair = rank.tgetwithindex(i+1);
            console.log(pair)
            // assert.equal((data[i], pair[1]));
        }
    });

});