const assert = require('assert')

function getNodeChildren(index) {
    const first = index * 2 + 1
    return [first, first + 1]
}

assert.deepEqual(getNodeChildren(3), [7, 8]);
assert.deepEqual(getNodeChildren(2), [5, 6]);

function getNodeParent(index) {
    const parent = Math.ceil(index / 2) - 1
    return parent
}

assert.deepEqual(getNodeParent(7), 3);
assert.deepEqual(getNodeParent(1), 0);
assert.deepEqual(getNodeParent(8), 3);

function swap(list, position1, position2) {
    const value1 = list[position1]
    const value2 = list[position2]

    list[position1] = value2
    list[position2] = value1
    return list
}

assert.deepEqual(swap([1, 4, 7, 6], 1, 3), [1, 6, 7, 4])

// This function (and maybe others) is going to need to know the end-of-heap
// index.  This one will also need to compare chiild1 and child2 to see if
// they fall beyond that index, and not do any swapping to indexes beyond end-of-heap
function swapWithMaxChild(list, parentIndex, endOfHeap) {
    const [child1, child2] = getNodeChildren(parentIndex)

    // if both children are on the list
    if (child2 <= endOfHeap) {
        if (list[child1] < list[child2]
            && list[child2] > list[parentIndex]) {
            swap(list, parentIndex, child2)
            swapWithMaxChild(list, child2, endOfHeap)
        }
        if (list[child2] <= list[child1]
            && list[child1] > list[parentIndex]) {
            swap(list, parentIndex, child1)
            swapWithMaxChild(list, child1, endOfHeap)
        }
    } else if (child1 <= endOfHeap) {
        if (list[child1] > list[parentIndex]) {
            swap(list, parentIndex, child1)
        }
    }

    return list
}

assert.deepEqual(swapWithMaxChild([1, 2, 3], 0, 2), [3, 2, 1])
assert.deepEqual(swapWithMaxChild([1, 2, 3], 0, 1), [2, 1, 3])

function maxheapify(list, endOfHeap) {
    if (list.length < 3) {
        return list
    }
    let parentIndex = getNodeParent(list.length - 1)
    while (parentIndex >= 0) {
        swapWithMaxChild(list, parentIndex, endOfHeap)
        parentIndex = parentIndex - 1
    }
    return list
}

assert.deepEqual(maxheapify([1], 0), [1], 0)
assert.deepEqual(maxheapify([3, 2, 1], 2), [3, 2, 1])
assert.deepEqual(maxheapify([2, 3, 1], 2), [3, 2, 1])
assert.deepEqual(maxheapify([2, 1, 3], 2), [3, 1, 2])
assert.deepEqual(maxheapify([1, 3, 2], 2), [3, 1, 2])
assert.deepEqual(maxheapify([1, 2, 3], 2), [3, 2, 1])

assert.deepEqual(maxheapify([1, 2, 3, 4, 5], 4), [5, 4, 3, 1, 2])

// maxheapify
// start at the last node with children (parent of the last node)
// for all nodes including and before that one:
//   if parent isn't bigger than both its children:
//      swap with its largest child, and recursively apply.

// heapsort
// set endOfHeap = length - 1
// while endOfHeap > 0:
//      maxheapify
//      swqp first and last (heap) elements
//      decrement endOfHeap

function heapsort(list){
    let endOfHeap = list.length -1
    while (endOfHeap > 0) {
        maxheapify(list, endOfHeap)
        swap(list, 0, endOfHeap)
        endOfHeap = endOfHeap -1
    }
    return list
}

assert.deepEqual(heapsort([1, 2, 5, 4, 7, 3, 6]), [1, 2, 3, 4, 5, 6, 7])
