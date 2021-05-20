const { Rank } = require('../lib');

const assert = require('chai').assert;

describe('tupdate', function() {
    beforeEach(function () {
    });
    
    afterEach(function () {
    });

    before(function() {
    });

    after(function () {
    });

    it('tincrease test1', function() {
        // size 16
        let data = [1,3,11,4,5,6,9,19,90,7,8,9,11,-10,0.1,1/3];
        let rank = new Rank();
        data.forEach((v, index) => {
            rank.tadd(index.toString(), v);
        })

        data[16] = 40;
        data[17] = -21;

        rank.tincrease("16", 40);
        rank.tincrease("17", -21);

        data.sort((a, b) => a-b);
        let allNode = rank.tgetall();
        assert.equal(allNode.length, data.length);
        for (let i=0; i<data.length; i++) {
            assert.equal(allNode[i][1],data[i]);
        }
    });

    it('tincrease test2', function() {
        // size 16
        let data = [1,3,11,4,5,6,9,19,90,7,8,9,11,-10,0.1,1/3];
        let rank = new Rank();
        data.forEach((v, index) => {
            rank.tadd(index.toString(), v);
        })

        data[5] = data[5] + 20;
        data[3] = data[3] + 31;

        rank.tincrease("5", 20);
        rank.tincrease("3", 31);

        data.sort((a, b) => a-b);
        let allNode = rank.tgetall();
        assert.equal(allNode.length, data.length);
        for (let i=0; i<data.length; i++) {
            assert.equal(allNode[i][1],data[i]);
        }
    });

    it('treduce test1', function() {
        // size 16
        let data = [1,3,11,4,5,6,9,19,90,7,8,9,11,-10,0.1,1/3];
        let rank = new Rank();
        data.forEach((v, index) => {
            rank.tadd(index.toString(), v);
        })

        data[5] = data[5] - 20;
        data[3] = data[3] - 31;

        rank.treduce("5", 20);
        rank.treduce("3", 31);

        data.sort((a, b) => a-b);
        let allNode = rank.tgetall();
        assert.equal(allNode.length, data.length);
        for (let i=0; i<data.length; i++) {
            assert.equal(allNode[i][1],data[i]);
        }
    });

    it('tincrease test2', function() {
        // size 16
        let data = [1,3,11,4,5,6,9,19,90,7,8,9,11,-10,0.1,1/3];
        let rank = new Rank();
        data.forEach((v, index) => {
            rank.tadd(index.toString(), v);
        })

        data[16] = -40;
        data[17] = 21;

        rank.treduce("16", 40);
        rank.treduce("17", -21);

        data.sort((a, b) => a-b);
        let allNode = rank.tgetall();
        assert.equal(allNode.length, data.length);
        for (let i=0; i<data.length; i++) {
            assert.equal(allNode[i][1],data[i]);
        }
    });
});