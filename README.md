<p align="center">
    <h1 align="center">RANK TREE</h1>
    <h4 align="center">A sort set based on red-black tree.</h4>
</p>

## Installation

```bash
npm install rank-tree
```

## Usage

#### Example

```js
const { Rank } = require("rank-tree");

let rank = new Rank();

// ...do somethings for value rank
```

### API

The following methods are supported.

| name             | opts                          | performance |
| ---------------- | ----------------------------- | ----------- |
| tadd             | [k: string, v: number]        | O(logn)     |
| trem             | [k: string]                   | O(logn)     |
| tincrease        | [k: string, v: number]        | O(logn)     |
| treduce          | [k: string, v: number]        | O(logn)     |
| trank            | [k: string]                   | O(logn)     |
| tcount           | [minV: number, maxV: number]  | O(logn)+m   |
| tcard            | []                            | O(1)        |
| trange           | [minI: number, maxI?: number] | O(logn)+m   |
| trevrangebyscore | [minV: number, maxV?: number] | O(logn)+m   |
| tgetall          | []                            | O(n)        |
| tscore           | [k: string]                   | O(1)        |
| tgetwithindex    | [index: number]               | O(logn)     |

### Details

#### `"tadd"`

Insert a `<key-value>` pair into the rank set, and override if the key already exists.

```js
let rank = new Rank();
rank.tadd("a", 1);
rank.tadd("b", 2);
rank.tadd("c", 3);

// tree
[a:1, b:2, c:3]
```



#### `"trem"`

Find and delete the specified key.

```js
// tree
[a:1, b:2, c:3, d:4]

let rank = new Rank();
rank.trem("a");
rank.trem(["b", "c"]);

// tree
[d:4]
```



#### `"tincrease"`

Increases the value of the specified key.

```js
// tree
[a:1, b:2]

let rank = new Rank();
rank.tincrease("a", 2);
rank.tincrease("c", 1);

// tree
[c:1, b:2, a:3]
```



#### `"treduce"`

Reduces the value of the specified key.

```js
// tree
[a:1, b:2]

let rank = new Rank();
rank.treduce("a", 2);
rank.treduce("c", 1);

// tree
[c:-1, a:0, b:2]
```



#### `"trank"`

Gets the ranking of the specified key.

```js
// tree
[a:17, b:20, c:31]

let rank = new Rank();
rank.trank("a");  // 1
rank.trank("c");  // 3
```



#### `"trange"`

Gets values between rankA and rankB

```js
// tree
[a:17, b:20, c:31, d:56]

let rank = new Rank();
rank.trange(2, 3);  // [b:20, c:31]
rank.trange(1, 1);  // [a:17]
rank.trange(3);     // [c:31, d:56]
```



#### `"tcard"`

Gets total nodes count.

```js
// tree
[a:17, b:20, c:31, d:56]

let rank = new Rank();
rank.tcard();  // 4
```



#### `"tcount"`

Gets the quantity of nodes with values between vA and vB.

```js
// tree
[a:17, b:20, c:31, d:56]

let rank = new Rank();
rank.tcount(21, 31);  // 1
rank.tcount(20, 31);  // 2
```



#### `"trevrangebyscore"`

Gets the nodes with values between vA and vB.

```js
// tree
[a:17, b:20, c:31, d:56]

let rank = new Rank();
rank.trevrangebyscore(21, 31);  // [c:31]
rank.trevrangebyscore(20, 31);  // [b:20, c:31]
```



#### `"tgetall"`

Gets all nodes.

```js
// tree
[a:17, b:20, c:31, d:56]

let rank = new Rank();
rank.tgetall();  // [a:17, b:20, c:31, d:56]
```



#### `"tscore"`

Gets all value with key.

```js
// tree
[a:17, b:20, c:31, d:56]

let rank = new Rank();
rank.tscore("a");  // 17
```



#### `"tgetwithindex"`

Gets all value with rank.

```js
// tree
[a:17, b:20, c:31, d:56]

let rank = new Rank();
rank.tscore(2);  // 20
```



## Test

```bash
npm test
```

## License

This repository is licensed under the "MIT" license. See [LICENSE](LICENSE).


