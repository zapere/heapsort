const assert = require('assert')


function deepSum(arr) {
	let sum = 0

	for (let i = 0; i < arr.length; i++) {
		const element = arr[i]
		if (isArray(element) === true) {
			// arr[0] === 1
			// arr[1] === [2] OR [1, 1]
			sum = sum + deepSum(element)
		} else {
			sum = sum + element
		}
	}
	return sum
}

function isArray(arr) {
	return Array.isArray(arr)
}
// console.log(typeof ([1] + [2]));
// console.log([1] + [2,3]);
assert.deepEqual(isArray([2, 3,]), true)
assert.deepEqual(isArray(2), false)

assert.deepEqual(deepSum([]), 0)
assert.deepEqual(deepSum([2]), 2)
assert.deepEqual(deepSum([1, 2, 3, 4, 5]), 15)
assert.deepEqual(deepSum([1, [2]]), 3)
assert.deepEqual(deepSum([1, [1, 1]]), 3)
assert.deepEqual(deepSum([1, [2, [3, 4, 5, 6, [7, 8, [9]]]]]), 45)


function deepFlatten(arr) {
	const result = []
	for (let i = 0; i < arr.length; i++) {
		const element = arr[i]
		if (isArray(element) === true) {
      const temp = deepFlatten(element)
      temp.forEach(n => result.push(n))
		} else {
      result.push(element)
		}
	}
	return result
}

assert.deepEqual(deepFlatten([]), [])
assert.deepEqual(deepFlatten([1]), [1])
assert.deepEqual(deepFlatten([1, [2, [3, 4, 5, 6, [7, 8, [9]]]]]), [1, 2, 3, 4, 5, 6, 7, 8, 9])
