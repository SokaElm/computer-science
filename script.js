#!/usr/bin/node

function fibs(number) {
  if (number <= 0) return [];
  let result = [0, 1];
  for (let i = 2; i <= number - 1; i++) {
    result[i] = result[i - 1] + result[i - 2];
  }

  return result;
}

function fibsRec(number) {
  if (number <= 1) return [0];
  if (number === 2) return [0, 1];

  let lastValue =
    fibsRec(number - 1)[number - 2] + fibsRec(number - 1)[number - 3];

  let result = fibsRec(number - 1);
  result.push(lastValue);

  return result;
}

function sortMerge(array) {
  if (array.length === 1) return array;

  let leftSubArraySize = Math.trunc(array.length / 2);

  let leftArray = array.slice(0, leftSubArraySize);
  let rightArray = array.slice(leftSubArraySize, array.length);

  return merge(sortMerge(leftArray), sortMerge(rightArray));
}

function merge(leftArray, rightArray) {
  let i = 0;
  let j = 0;

  let mergedArray = [];

  while (i < leftArray.length && j < rightArray.length) {
    if (leftArray[i] <= rightArray[j]) {
      mergedArray.push(leftArray[i]);

      i++;
    } else {
      mergedArray.push(rightArray[j]);

      j++;
    }
  }
  return mergedArray.concat(leftArray.slice(i)).concat(rightArray.slice(j));
}

console.log(sortMerge([105, 79, 100, 110]));
