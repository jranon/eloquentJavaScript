/*Reversing an array

Arrays have a method reverse, which changes the array by inverting the order in which its elements appear. For this exercise, write two functions, reverseArray and reverseArrayInPlace. The first, reverseArray, takes an array as argument and produces a new array that has the same elements in the inverse order. The second, reverseArrayInPlace, does what the reverse method does: it modifies the array given as argument in order to reverse its elements. Neither may use the standard reverse method.

Thinking back to the notes about side effects and pure functions in the previous chapter, which variant do you expect to be useful in more situations? Which one is more efficient?*/

// Your code here.

function reverseArray(arr) {
  var newArr=[];
  for (var i=arr.length-1;i>=0;i--) {
    newArr.push(arr[i]); 
  };
  return newArr;
};

function reverseArrayInPlace(arr) {
  for (var i=arr.length;i>=0;i--) {
    var last=arr.pop();
    arr.unshift(last);
  }
  return arr;
}
​
console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
var arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]

/*A list

Objects, as generic blobs of values, can be used to build all sorts of data structures. A common data structure is the list (not to be confused with the array). A list is a nested set of objects, with the first object holding a reference to the second, the second to the third, and so on.

var list = {
  value: 1,
  rest: {
    value: 2,
    rest: {
      value: 3,
      rest: null
    }
  }
};
The resulting objects form a chain, like this:

A linked list
A nice thing about lists is that they can share parts of their structure. For example, if I create two new values {value: 0, rest: list} and {value: -1, rest: list} (with list referring to the variable defined earlier), they are both independent lists, but they share the structure that makes up their last three elements. In addition, the original list is also still a valid three-element list.

Write a function arrayToList that builds up a data structure like the previous one when given [1, 2, 3] as argument, and write a listToArray function that produces an array from a list. Also write the helper functions prepend, which takes an element and a list and creates a new list that adds the element to the front of the input list, and nth, which takes a list and a number and returns the element at the given position in the list, or undefined when there is no such element.

If you haven’t already, also write a recursive version of nth.*/

// Your code here.
function arrayToList(arr) {
  list=null;
  for (var i=arr.length-1;i>=0;i--) {
    list={value:arr[i], rest:list};
  }
  return list;
}

function listToArray(list) {
  var arr=[];
  for (var node=list;node;node=node.rest) {
    arr.push(node.value);
  }
  return arr;
}

function prepend(x, list) {
  return {value: x, rest:list};
};

function nth(list, x) {
  return listToArray(list)[x];
}

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20

/*Building up a list is best done back to front. So arrayToList could iterate over the array backward (see previous exercise) and, for each element, add an object to the list. You can use a local variable to hold the part of the list that was built so far and use a pattern like list = {value: X, rest: list} to add an element.

To run over a list (in listToArray and nth), a for loop specification like this can be used:

for (var node = list; node; node = node.rest) {}
Can you see how that works? Every iteration of the loop, node points to the current sublist, and the body can read its value property to get the current element. At the end of an iteration, node moves to the next sublist. When that is null, we have reached the end of the list and the loop is finished.

The recursive version of nth will, similarly, look at an ever smaller part of the “tail” of the list and at the same time count down the index until it reaches zero, at which point it can return the value property of the node it is looking at. To get the zeroeth element of a list, you simply take the value property of its head node. To get element N + 1, you take the Nth element of the list that’s in this list’s rest property.

Deep comparison

The == operator compares objects by identity. But sometimes, you would prefer to compare the values of their actual properties.

Write a function, deepEqual, that takes two values and returns true only if they are the same value or are objects with the same properties whose values are also equal when compared with a recursive call to deepEqual.

To find out whether to compare two things by identity (use the === operator for that) or by looking at their properties, you can use the typeof operator. If it produces "object" for both values, you should do a deep comparison. But you have to take one silly exception into account: by a historical accident, typeof null also produces "object".*/

// Your code here.
function deepEqual(x, y) {
  if (x===y) return true;
  if (x==null||typeof x!="object"||typeof y!="object"||y==null) return false;
  var propsX=0,propsY=0;
  for (var prop in x)
    propsX+=1;
  for (var prop in y) {
    propsY+=1;
    if (!(prop in x) || !deepEqual(x[prop], y[prop]))
      return false;
  }
  return propsX==propsY;

var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true
