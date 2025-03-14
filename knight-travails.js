function knightnextPosition(position) {
  let i = position[0];
  let j = position[1];

  let array = [
    [i + 2, j + 1],
    [i + 1, j + 2],
    [i + 2, j - 1],
    [i + 1, j - 2],
    [i - 2, j + 1],
    [i - 1, j + 2],
    [i - 2, j - 1],
    [i - 1, j - 2],
  ];

  return array.filter(([x, y]) => x >= 0 && x <= 7 && y >= 0 && y <= 7);
}

function findPosition(array, position) {
  return array.some(
    (elem) => elem[0] === position[0] && elem[1] === position[1]
  );
}

function showResult(array) {
  let moveNumber = array.length - 1;
  let result =
    "You made it in " +
    moveNumber +
    " moves!  Here's your path:" +
    JSON.stringify(array);
  console.log(result);
}

function knightMoves(initialPosition, finalPosition) {
  let map = new Map();
  let queue = [initialPosition];

  if (findPosition(queue, finalPosition)) return showResult(queue);

  while (queue.length !== 0) {
    const current = queue.shift();
    const adj = knightnextPosition(current);

    adj.forEach((elem) => {
      if (!map.has(JSON.stringify(elem))) {
        map.set(JSON.stringify(elem), current);
        if (findPosition([elem], finalPosition)) {
          map.set(JSON.stringify(finalPosition), current);
          return showResult(constructPath(map, initialPosition, finalPosition));
        }

        queue.push(elem);
      }
    });
  }
}

function constructPath(map, initialPosition, finalPosition) {
  let current = finalPosition;
  let path = [];

  while (!findPosition([current], initialPosition)) {
    path.push(current);
    current = map.get(JSON.stringify(current));
  }

  path.push(initialPosition);
  return path.reverse();
}

knightMoves([0, 0], [7, 7]);
