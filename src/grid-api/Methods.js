export const isMatch = (objOne,objTwo) => {

  if (objOne != null && objTwo != null) {
    if (objOne.value == objTwo.value) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

export const flattenArrayToPairs = arr => {
  let flatterArray = [];

  arr.map((row, i) => {
    row.map((e, j) => {
      flatterArray.push(e);
    });
  });

  if (Array.isArray(flatterArray[0]) == false) {
    return arr;
  }

  return flattenArrayToPairs(flatterArray);
};

export const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

export const containsIndexPair = (arr, pair) => {
  let a = arr.filter(e => e[0] == pair[0] && e[1] == pair[1]);
  return a.length !== 0;
};

export const removeIndexPair = (arr, indexPair) => {
  let x = arr.filter(e => {
    if (indexPair[0] == e[0] && indexPair[1] == e[1]) {
      return false;
    } else {
      return true;
    }
  });
  return x;
};

export const testRemoveIndexPair = () => {
  console.log("testing remove index pair");
  let arr = [[0, 0], [1, 0], [0, 1], [1, 1]];
  let newArray = console.log(
    "with [0,0] removed",
    removeIndexPair(arr, [0, 0])
  );
};

export const removeIndexes = (arr, indexes) => {
  arr = removeIndexPair(arr, indexes[0]);
  indexes.shift();

  if (indexes.length == 0 || arr.length == 0) {
    return arr;
  }
  return removeIndexes(arr, indexes);
};

export const testRemoveIndexes = () => {
  console.log("BEGIN: testRemoveIndexes(arr,indexes)");
  let theArray = [[0, 0], [1, 0], [0, 1], [1, 1]];
  let theIndexes = [[1, 0], [0, 1]];
  console.log("arr", theArray);
  console.log("indexes", theIndexes);
  let poop = removeIndexes(theArray, theIndexes);
  console.log("testing remove indexes", poop);
};

/*
export const withSharedIndexes = duplicates.map(e => {
  let allWithIndex = this.returnAllMatchesWithIndex(allMatches, e);
  if (allWithIndex.length > 0) {
    return allWithIndex;
  } else {
    return [];
  }
});

export const withoutSharedIndexes = duplicates.map(e => {
  let allWithOutIndex = this.removeAllMatchesWithIndex(allMatches, e);
  if (allWithIndexOut.length > 0) {
    return allWithOutIndex;
  } else {
    return [];
  }
});
*/



// Returns all arrays that have an index of "index" within them. For two dimensional array.
export const returnAllMatchesWithIndex = (matches, index) => {
  let withIndex = [];
  matches.map(match => {
    if (containsIndexPair(match, index)) {
      withIndex.push(match);
    }
  });
  return withIndex;
};

export const removeAllMatchesWithIndex = (matches, index) => {
  let withOutIndex = [];
  matches.map(match => {
    if (!containsIndexPair(match, index)) {
      withOutIndex.push(match);
    }
  });
  return withOutIndex;
};



// Iterates through each row to look for a match.
export const checkRowsForMatch = (tileData) => {
    // Store the array of matches
    let matches = []

    // Iterate through the rows from top to bottom.
    for (var j = 0; j < 5; j++) {
      // Record the first index in the row.
      let firstIndex = [0,j]
      // Add the index to our potentialMatch
      let potentialMatch = [firstIndex]
      // Record the imgage object corresponding to the first element in our potentialMatch
      let currentImageObj = tileData[0][j].imageObj

      // Traverse the elements of the row.
      for (var i = 0; i < 5; i++) {

      // Get the object stored in the next tile. Set to null if the next index is out of range.
      let nextTileObj = (i+1) < 5 ? tileData[i+1][j].imageObj: null

      if (isMatch(currentImageObj,nextTileObj)) {
        // Add the next index to our potential Match.
        potentialMatch.push([i+1,j])

      } else {
        // Check to see if the potentialMatch is greater than 3.
        if (potentialMatch.length >= 3) {
          matches.push(potentialMatch)
        }
          // Reset the first index.
          firstIndex = [i+1,j]
          // Add it to the potentialMatch
          potentialMatch = [firstIndex]
          // Reset the current imageObj to that of the next image.
          currentImageObj = (i+1) < 5 ? tileData[i+1][j].imageObj: null
      }
    }
  }
  return matches
}

// Iterates through each row to look for a match.
export const checkColsForMatch = (tileData) => {
    // Store the array of matches
    let matches = []

    // Iterate through the rows from top to bottom.
    for (var i = 0; i < 5; i++) {
      // Record the first index in the row.
      let firstIndex = [i,0]
      // Add the index to our potentialMatch
      let potentialMatch = [firstIndex]
      // Record the imgage object corresponding to the first element in our potentialMatch
      let currentImageObj = tileData[i][0].imageObj

      // Traverse the elements of the row.
      for (var j = 0; j < 5; j++) {

      // Get the object stored in the next tile. Set to null if the next index is out of range.
      let nextTileObj = (j+1) < 5 ? tileData[i][j+1].imageObj : null

      if (isMatch(currentImageObj,nextTileObj)) {
        // Add the next index to our potential Match.
        potentialMatch.push([i,j+1])

      } else {
        // Check to see if the potentialMatch is greater than 3.
        if (potentialMatch.length >= 3) {
          matches.push(potentialMatch)
        }
          // Reset the first index.
          firstIndex = [i,j+1]
          // Add it to the potentialMatch
          potentialMatch = [firstIndex]
          // Reset the current imageObj to that of the next image.
          currentImageObj = (j+1) < 5 ? tileData[i][j+1].imageObj : null
      }
    }
  }
  return matches
}


export const getAllMatches = (tileData) => {

  let rowMatches = checkRowsForMatch(tileData)
  let colMatches = checkColsForMatch(tileData)

  return [...rowMatches,...colMatches]

}
