const assert = require('assert')

function getNodeChildren(index){
const first = index*2+1
return [first, first+1]
}

assert.deepEqual (getNodeChildren(3), [7,8]);
assert.deepEqual (getNodeChildren(2), [5,6]);

function getNodeParent(index){
const parent = Math.ceil(index/2)-1
return parent
}

assert.deepEqual (getNodeParent(7), 3);
assert.deepEqual (getNodeParent(1), 0);
assert.deepEqual (getNodeParent(8), 3);

function swap (list, position1, position2){
const value1 = list[position1]
const value2 = list[position2]

list[position1] = value2
list[position2] = value1
    return list
}

assert.deepEqual (swap([1, 4, 7, 6], 1, 3), [1, 6, 7, 4])

// maxheapify
// start at the last node with children (parent of the last node)
// for all nodes including and before that one:
//   if parent isn't bigger than both its children:
//      swap with its largest child, and recursively apply.