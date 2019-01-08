/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// TODO Write the condenseColumns function so that it takes the indexes instead of the color.
// Pass "data" around instead of constantly referring to "state" this makes it so that we don't have to
// set state as ofter

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  PanResponder,
  Image,
  TouchableHighlight,
  ImageBackground
} from "react-native";

import GestureRecognizer, {
  swipeDirections
} from "react-native-swipe-gestures";

import Tile from "./Tile";

import {ImageTypes} from "../components/ImageTypes";

import { getAllMatches } from "../grid-api/Methods";


import {GOLD_COIN,TRIANGLE,SQUARE,PENTAGON,HEXAGON,SEPTAGON,OCTAGON,NONAGON,THREE,FOUR,FIVE,SIX,SEVEN,EIGHT,NINE,NSTHREE,NSFOUR,NSFIVE,NSSIX,NSSEVEN,NSEIGHT,NSNINE} from "../components/ImageTypes";


import { getJamJarFromBean, isCandy, getCandyFromBean, isJam } from "../components/JamFunctions";

import {
  getRandomInt,
  testRemoveIndexPair,
  testRemoveIndexes,
  flattenArrayToPairs,
  returnAllMatchesWithIndex,
  removeAllMatchesWithIndex
} from "../grid-api/Methods";

let firstLoad = true;

let boardWidth = 5;
let boardHeight = 5;

let speed = 300;

class TileData {
  constructor(obj, index, key) {
    // The number of matches that a tile exits within.
    this.matchMemberships = 0;
    this.index = index;
    this.key = key;
    this.imageObj = obj;
    this.imageType = ImageTypes.ZERO;
    this.location = new Animated.ValueXY();
    this.rotation = new Animated.Value(0);
    this.scale = new Animated.Value(1);
    this.view = null
  }

  setView(imageType) {
    this.imageType = imageType;
    this.view = <Image source={imageType} style={styles.tile} />;
  }
}

const animationType = {
  SWAP: 0,
  FALL: 1
};

const rowOrCol = {
  ROW: 0,
  COLUMN: 1
};

// Need this array for finding random beans
const numbers = [
THREE,
FOUR,
FIVE,
SIX,
SEVEN,
EIGHT,
NINE,
SQUARE,
TRIANGLE,
PENTAGON,
HEXAGON,
SEPTAGON,
OCTAGON,
NONAGON,
NSTHREE,
NSFOUR,
NSFIVE,
NSSIX,
NSSEVEN,
NSEIGHT,
NSNINE
];

export default class Swappables extends Component<{}> {
  constructor(props) {
    super(props);

    // Inititalize to swipe up, will change later.
    this.swipeDirection = swipeDirections.SWIPE_UP;
    this.isCandy = false
    this.currentIJ = {}
    this.nextIJ = {}
    this.crunchThisImage = null
    this.crunchTheseIfCandy = new Array([[0,0]]);

    // Speed of the animations
    this.speed = 100; // Rate at which the animation occurs.
    this.origin = [];
    this.animationState = animationType.SWAP;
    this.currentDirection = rowOrCol.ROW;
    this.otherDirection = rowOrCol.COLUMN;
    this.cancelTouches = false;
    this.consecutiveSwaps = 1;
    this.isLady = false
    this.jarThisTurn = null
    this.animateTo = null

    this.previousSwappedIndexes = [];
    this.shouldReimburseForSwap = true;

    this.state = {
      tileComponents: [],
      tileDataSource: this.initializeDataSource()
    };
  }

  onSwipe(gestureName, gestureState) {

    if (this.cancelTouches == false && this.props.gameOver == false) {
      let initialGestureX = gestureState.x0;
      let initialGestureY = gestureState.y0;

      // Need to get convert location of swipe to an index.
      let i = Math.round((initialGestureX - TILE_WIDTH) / TILE_WIDTH);
      let j = Math.round(
        (initialGestureY -
          this.props.topMargin -
          this.origin[1] -
          0.5 * TILE_WIDTH) /
          TILE_WIDTH
      );

      const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
      this.setState({ gestureName: gestureName });

      //  TODO: Make sure that the boundary conditions 0 and 4 aren't HARDCODED
      switch (gestureName) {
        case SWIPE_UP:

          if (j > 0) {
            this.swipeDirection = SWIPE_UP;
            this.swap(i, j, 0, -1);
          }

          break;
        case SWIPE_DOWN:

          if (j < 4) {
            this.swipeDirection = SWIPE_DOWN;
            this.swap(i, j, 0, 1);
          }

          break;
        case SWIPE_LEFT:

          if (i > 0) {
            this.swipeDirection = SWIPE_LEFT;
            this.swap(i, j, -1, 0);
          }

          break;
        case SWIPE_RIGHT:

          if (i < 4) {
            this.swipeDirection = SWIPE_RIGHT;
            this.swap(i, j, 1, 0);
          }
          break;
      }
    }
  }

  pushTileDataToComponent() {
    console.log("PUSHING TILE DATA TO COMPONENTE!!")
    var a = [];
    // This creates the array of Tile components that is stored as a state variable.
    this.state.tileDataSource.map((row, i) => {
      let rows = row.map((e, j) => {
        e.scale.setValue(1)
        a.push(
          <Tile
            location={e.location}
            scale={e.scale}
            key={e.key}
            rotation={e.rotation}
            img ={e.imageObj.img}
          />
        );
      });
      // This is where the error occurs where an element no longer receives touches.
      // Don't wrap this in a view.
      return;
      rows;
    });
    this.setState({
      tileComponents: a
    });
  }

  // data - the array of
  returnTileDataComponents() {


    var a = [];
    // This creates the array of Tile components that is stored as a state variable.
    this.state.tileDataSource.map((row, i) => {
      let rows = row.map((e, j) => {
        a.push(
          <Tile
            location={e.location}
            scale={e.scale}
            key={e.key}
            rotation={e.rotation}
            subview={e.view}
          />
        );
      });
      // This is where the error occurs where an element no longer receives touches.
      // Don't wrap this in a view.
      return;
      rows;
    });

    return a;
  }

  renderTiles(tileDataSource) {
    return this.returnTileDataComponents();
  }

  // takes the indexes that will be animated and
  animateCandyCrunch(indexesToAnimate) {

    let len = indexesToAnimate.length;

    for (var n = 0; n < len; n++) {
      let e = indexesToAnimate[n];

      let i = e[0];
      let j = e[1];

      Animated.sequence([
        Animated.delay(350),
        Animated.timing(this.state.tileDataSource[i][j].scale, {
          toValue: 1.05,
          duration: 150,
          useNativeDriver: true
        }),
        Animated.timing(this.state.tileDataSource[i][j].scale, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true
        }),
      ]).start(() => {
        this.animationState = animationType.FALL;
      });
    }
  }


  // takes the indexes that will be animated and
  animateBeanMatch(indexesToAnimate, location) {
    let locationToAnimateTo = [
      location[0] * TILE_WIDTH,
      location[1] * TILE_WIDTH
    ];

    let len = indexesToAnimate.length;
    console.log('INDEXES TO ANIMATE LENGTH',len)

    for (var n = 0; n < len; n++) {
      let e = indexesToAnimate[n];

      let i = e[0];
      let j = e[1];

      Animated.sequence([
        Animated.delay(350),
        Animated.timing(this.state.tileDataSource[i][j].scale, {
          toValue: 1.05,
          duration: 150,
          useNativeDriver: true
        }),
        Animated.timing(this.state.tileDataSource[i][j].scale, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true
        })
      ]).start(() => {
        this.animationState = animationType.FALL;
      });
    }

/*
Animated.timing(this.state.tileDataSource[i][j].location, {
  toValue: { x: locationToAnimateTo[0], y: locationToAnimateTo[1] },
  duration: this.speed,
  useNativeDriver: true
})
*/

  }

  condenseColumns(beanIndexes) {

    let spotsToFill = 0;
    // NOTE: HARDCODED!
    for (let i = 0; i < 5; i++) {
      spotsToFill = 0;

      // Iterate through each column
      for (let j = 4; j >= 0; j--) {
        // Get all the
        let indexesToFill = beanIndexes.filter(e => {
          return i == e[0] && j == e[1];
        });

        // Check to see if the element is a spot that needs filling.
        if (indexesToFill.length != 0) {
          // Increment the spots to fill...since we found a spot to fill.
          spotsToFill++;
          // Place the location above the top of the screen for when it "falls"
          this.state.tileDataSource[i][j].location.setValue({
            x: TILE_WIDTH * i,
            y: -3 * TILE_WIDTH
          });
          this.state.tileDataSource[i][j].scale.setValue(1);

        } else if (spotsToFill > 0) {
          // Move bean downward
          const currentSpot = this.state.tileDataSource[i][j];
          const newSpot = this.state.tileDataSource[i][j + spotsToFill];

          this.state.tileDataSource[i][j] = newSpot;
          this.state.tileDataSource[i][j + spotsToFill] = currentSpot;
        }
      }
    }
  }

  sharedIndex(arrOne, arrTwo) {
    let match = [];
    arrOne.map((u, i) => {
      arrTwo.map((v, j) => {
        if (u[0] == v[0] && u[1] == v[1]) {
          match = u;
        }
      });
    });
    return match;
  }

  containsIndexPair(arr, pair) {
    let a = arr.filter(e => e[0] == pair[0] && e[1] == pair[1]);
    return a.length !== 0;
  }

  //Remove the spot where the jar needs to go
  removeIndexes(arr, indexes) {
    let filteredArray = [];

    if (indexes.length == 0) {
      return arr;
    } else {
      indexes.map(index => {
        filteredArray = arr.filter(e => {
          let firstAreEqual = e[0] == index[0];
          let secondAreEqual = e[1] == index[1];
          b = !(firstAreEqual && secondAreEqual);

          return b;
        });
        //NOTE: this used to be arr = filteredArray and worked fine
        arr = filteredArray;
      });
      return filteredArray;
    }
  }

  swap(i, j, dx, dy) {
    let swipeBeganAt = [i, j];
    let swipeDirectedAt = [i + dx, j + dy];

    this.currentIJ = swipeBeganAt
    this.nextIJ = swipeDirectedAt

    // If the indexes are the same as the previous two then give the turn back.
    if (
      this.containsIndexPair(this.previousSwappedIndexes, swipeBeganAt) &&
      this.containsIndexPair(this.previousSwappedIndexes, swipeDirectedAt)
    ) {
      this.consecutiveSwaps += 1;

      let inc = Math.pow(-1, this.consecutiveSwaps);
      this.props.incrementTurns(inc);

    } else {
      this.props.incrementTurns(-1);
    }

    // Log the previous indexes
    this.previousSwappedIndexes = [swipeBeganAt, swipeDirectedAt];

    const newData = this.state.tileDataSource;

    const swapStarter = this.state.tileDataSource[i][j];
    const swapEnder = this.state.tileDataSource[i + dx][j + dy];

    /*NOTE Collect Swap metadata to determine how to manage the candy (now RainbowBean)
    if (isCandy(swapStarter.imageType)){
      this.isCandy = true
      this.crunchThisImage = swapEnder.imageType
      this.crunchTheseIfCandy = this.getIndexesWithColor(this.crunchThisImage)
      this.crunchTheseIfCandy.push(this.currentIJ)
    } else if (isCandy(swapEnder.imageType)){
      this.isCandy = true
      this.crunchThisImage = swapStarter.imageType
      this.crunchTheseIfCandy = this.getIndexesWithColor(this.crunchThisImage)
      this.crunchTheseIfCandy.push(this.nextIJ)
    }

    if (swapStarter.imageType == ImageTypes.ZERO) {
      this.isLady = true
      this.crunchThisImage = swapEnder.imageType
      this.crunchTheseIfCandy = this.getIndexesWithColor(this.crunchThisImage)
      this.crunchTheseIfCandy.push(this.currentIJ)
      this.animateTo = this.nextIJ
      this.jarThisTurn = getJamJarFromBean(this.crunchThisImage)
    } else if (swapEnder.imageType == ImageTypes.ZERO) {
      this.isLady = true
      this.crunchThisImage = swapStarter.ImageTypes
      this.crunchTheseIfCandy = this.getIndexesWithColor(this.crunchThisImage)
      this.crunchTheseIfCandy.push(this.nextIJ)
      this.animateTo = this.currentIJ
      this.jarThisTurn = getJamJarFromBean(this.crunchThisImage)
    }
    */

    // Perform the swap - this calls "Component did update" - I think.
    newData[i][j] = swapEnder;
    newData[i + dx][j + dy] = swapStarter;

    this.updateGrid();
  }

  // Handles swipe events
  updateGrid() {

    // The amount of jam and numbers of beans gathered in this swipe.
    let beansThisTurn = 0;
    let jamThisTurn = 0;
    let indexesToRemove = [];

    let allMatches = []
    allMatches = getAllMatches(this.state.tileDataSource)

    if (this.isLady) {


      jarThisTurn = getJamJarFromBean(this.crunchThisImage)
      //this.state.tileDataSource[this.animateTo[0]][this.animateTo[1]].setView(jarThisTurn);

      this.animateBeanMatch(this.crunchTheseIfCandy, this.animateTo);
      beansThisTurn += this.crunchTheseIfCandy.length


      this.crunchTheseIfCandy = this.removeIndexes([...this.crunchTheseIfCandy],[this.animateTo])


      setTimeout(()=> {
      this.recolorMatches(this.crunchTheseIfCandy)
      this.condenseColumns(this.crunchTheseIfCandy)
      this.pushTileDataToComponent()
      this.animationState = animationType.SWAP

      setTimeout(() => {
        if (this.allMatchesOnBoard().length != 0) {
          this.isCandy = false
          this.isLady = false
          this.updateGrid();
        } else {
          this.isCandy = false
          this.isLady = false
          this.cancelTouches = false;
          this.animationState = animationType.SWAP;
        }

      }, 1200);

    },1200)

    }
    else if (this.isCandy){


        this.cancelTouches = true;
        if (isJam(this.crunchThisImage)){
          jamThisTurn = 2
          this.props.incrementTurns(jamThisTurn);
        } else {
          beansThisTurn = this.crunchTheseIfCandy.length*3
          this.props.incrementTurns(1)
        }

        this.props.updateScore(beansThisTurn,jamThisTurn)

        this.animateCandyCrunch(this.crunchTheseIfCandy)

        setTimeout(()=> {
        this.recolorMatches(this.crunchTheseIfCandy)
        this.condenseColumns(this.crunchTheseIfCandy)
        this.pushTileDataToComponent()
        this.animationState = animationType.SWAP

        setTimeout(() => {
          if (this.allMatchesOnBoard().length != 0) {
            this.isCandy = false
            this.updateGrid();
          } else {
            this.isCandy = false
            this.cancelTouches = false;
            this.animationState = animationType.SWAP;
          }

        }, 1200);

      },1200)
    }
    else if (allMatches.length != 0) {
      console.log("PROCESSING ALL MATCHES!!! BECAUSE LENGTH != 0!!!")
      this.cancelTouches = true;
      // Previousy swapped indexes stores the indexes that were most
      // recently swapped to determine if turn reimbursement
      // is necessary. This gets reset after match.
      this.previousSwappedIndexes = [];
      let duplicates = this.returnDuplicates(allMatches);

      // These are the indexes that were matched and need to be replaced with new beans

      if (duplicates.length == 1) {
        const withSharedIndexes = duplicates.map(e => {
          let allWithIndex = returnAllMatchesWithIndex(allMatches, e);
          if (allWithIndex.length > 0) {
            return allWithIndex;
          } else {
            return [];
          }
        });

        const withoutSharedIndexes = duplicates.map(e => {
          let allWithOutIndex = removeAllMatchesWithIndex(allMatches, e);
          if (allWithOutIndex.length > 0) {
            return allWithOutIndex;
          } else {
            return [];
          }
        });


        withSharedIndexes.map((row, i) => {
          // This reduces the beans this turn by one to account for the shared index being counted twice
          beansThisTurn = beansThisTurn - withSharedIndexes.length;
          // Animate to the index that they share
          let animateTo = this.sharedIndex(row[0], row[1]);
          let jar = null;

          row.map(match => {
            // Get the indexs of the first item
            let i = match[0][0];
            let j = match[0][1];
            let currentImage = this.state.tileDataSource[i][j].imageType;

            if (isJam(currentImage)){
              this.props.incrementTurns(3)
            }

              //jar = imageType.DIAMOND
              this.animateBeanMatch(match, animateTo);
              beansThisTurn += match.length;
              //indexesToRemove.push(animateTo);

          });

          //this.state.tileDataSource[animateTo[0]][animateTo[1]].setView(jar);

        });

        // Check to see if the first match in the set of those withoutSharedIndexes is zero.
        if (withoutSharedIndexes[0].length != 0) {

        withoutSharedIndexes.map((row, i) => {
          // This reduces the beans this turn by one to account for the shared index being counted twice
          beansThisTurn = beansThisTurn - withSharedIndexes.length;
          // Animate to the index that they share
          let animateTo = row[0][0]

          let jar = null;

          row.map(match => {
            // Get the indexs of the first item
            let i = match[0][0];
            let j = match[0][1];
            let currentImage = this.state.tileDataSource[i][j].imageType;


              jar = getJamJarFromBean(currentImage);
              this.animateBeanMatch(match, animateTo);
              beansThisTurn += match.length;
              //indexesToRemove.push(animateTo);

          });

          //this.state.tileDataSource[animateTo[0]][animateTo[1]].setView(jar);

        });
      }

      } else {
        allMatches.map(match => {

          let u = match[0][0];
          let v = match[0][1]

          let img = null

          let isThisJam = isJam(this.state.tileDataSource[u][v].imageType)

          if (match.length > 3 && !isThisJam) {
            img = ImageTypes.ZERO// This is actually a RainbowBean
          } else if (isThisJam) {
            jamThisTurn = match.length
            img = getJamJarFromBean(this.state.tileDataSource[u][v].imageType);
          }
         else {
              img = getJamJarFromBean(this.state.tileDataSource[u][v].imageType);
            }
            //this.state.tileDataSource[u][v].setView(img);
            this.animateBeanMatch(match, match[0]);
            beansThisTurn += match.length;
            //indexesToRemove.push(match[0]);

        });
      }

      // Everytime you get jam match you get extra turns.
      if (jamThisTurn > 0) {
        this.props.incrementTurns(2 * (jamThisTurn - 2));
      }

      this.props.updateScore(beansThisTurn, jamThisTurn);

      // TODO: Write a function that removes an array of indexes so I don't have to keep slicing away and I can control what gets "condensed"

/*

      allMatches = allMatches.map(match => {
        return this.removeIndexes(match, indexesToRemove);
      });

*/

      // Waits for "animate match" to complete.
      setTimeout(() => {

        allMatches.map(match => {
          this.recolorMatches(match);
          this.condenseColumns(match);
        });

        this.pushTileDataToComponent();

        setTimeout(() => {
          if (this.allMatchesOnBoard().length != 0) {
            this.updateGrid();
          } else {
            this.cancelTouches = false;
            this.animationState = animationType.SWAP;
          }
        }, 1200);
      }, 1200);
    }
  }

  componentDidUpdate() {
    // !!! Make this take a "Type" and perform an animation based on the
    // type of update that's occured. ie swipe, condense, load.

    switch (this.animationState) {
      case animationType.SWAP:
        this.animateValuesToLocationsSwapStyle();
        break;
      case animationType.FALL:
        this.animateValuesToLocationsWaterfalStyle();
        break;
    }
  }

  initializeDataSource() {
    // Grid that contains the keys that will be assigned to each tile via map
    let keys = [
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24]
    ];

    var tileData = keys.map((row, i) => {
      let dataRows = row.map((key, j) => {
        let randIndex = getRandomInt(numbers.length);

        let data = new TileData(numbers[randIndex], [i, j], key);

        return data;
      });
      return dataRows;
    });
    return tileData;
  }

  componentWillMount() {
    // NOTE: Run tests
    testRemoveIndexPair();
    testRemoveIndexes();
    this.animateValuesToLocationsWaterfalStyle();
  }

  onLayout(event) {
    this.origin = [event.nativeEvent.layout.x, event.nativeEvent.layout.y];

  }

  componentDidMount() {
    this.pushTileDataToComponent();
  }

  isMatch(itemOne, itemTwo) {
    if (itemOne.imageObj.value == itemTwo.imageObj.value) {
      console.log("ISMATCH!!!!",itemOne.imageObj.value,itemTwo.imageObj.value)
      return true;
    }
    return false
  }

  checkRowColForMatch(coordinate, direction) {
    let consecutives = [];

    for (let i = 0; i < 4; i++) {
      // If its a column,check the next item in the column
      // Inistialize these to zero and then decide which one will be iterated and which will be held consant.
      let x = 0;
      let y = 0;

      // Used to whether the next itme should be on the left or on the right.
      let dx = 0;
      let dy = 0;

      if (direction == rowOrCol.COLUMN) {
        x = coordinate[0];
        y = i;
        dy = 1;
      } else if (direction == rowOrCol.ROW) {
        x = i;
        dx = 1;
        y = coordinate[1];
      }

      let firstItem = this.state.tileDataSource[x][y];
      let nextItem = this.state.tileDataSource[x + dx][y + dy];

      if (this.isMatch(firstItem, nextItem)) {
        console.log("Pushing to consecutives")
        consecutives.push([x, y]);

        // Check if I've reached the end of the loop.
        if (i == 3) {
          consecutives.push([x + dx, y + dy]);
        }
      } else {
        // Push the last item in the sequence of matches
        consecutives.push([x, y]);
        if (consecutives.length >= 3) {

          return consecutives;
        } else {
          // Reset
          consecutives = [];
        }
      }
    }

    if (consecutives.length >= 3) {
      return consecutives;
    } else {
      return [];
    }
  }

  areIndexesEqual(pairOne, pairTwo) {
    return a[0] == e[0] && a[1] == e[1];
  }

  // Returns all arrays that have an index of "index" within them. For two dimensional array.
  allWithIndex(arr, index) {
    let withIndex = [];
    arr.map(row => {
      if (this.containsIndexPair(row, index)) {
        withIndex.push(row);
      }
    });
    return withIndex;
  }

  returnDuplicates(arr) {
    // Destructure the two dimensional array to a 1D NOTE: I have a function for this now!
    let stream = [];
    arr.map(row => {
      row.map(e => {
        stream.push(e);
      });
    });

    let dups = [];
    let x = stream.map((e, i) => {
      if (stream.slice(i).length > 1) {
        let iterator = stream.slice(i + 1);

        if (this.containsIndexPair(iterator, e)) {
          dups.push(e);
        }
      }
    });
    return dups;
  }


// Need to rewrite this
  removeDuplicates(arr) {
    let x = arr.map((e, i) => {
      let iterator = x.slice(i);
      if (this.containsIndexPair(iterator, e)) {
        arr.splice(0, 1);
      }
    });
    return arr;
  }

  allMatchesOnBoard() {
    let matches = [];

    for (let i = 0; i < 5; i++) {
      // Check to find all the rows that have matches.
      let rowMatch = this.checkRowColForMatch([0, i], rowOrCol.ROW);
      if (rowMatch.length > 0) {
        matches.push(rowMatch);
      }
      // Check to find all the columns that have matches
      let colMatch = this.checkRowColForMatch([i, 0], rowOrCol.COLUMN);
      if (colMatch.length > 0) {
        matches.push(colMatch);
      }
    }

    console.log("this is the length of the number of matches",matches.length)

    return matches;
  }

  // Gets all indexes with a specific color.
  getIndexesWithColor(color) {
    let colorIndexes = new Array();

    let x = this.state.tileDataSource.map((row, i) => {
      let colorRow = row.map((e, j) => {
        if (e.imageType == color) {
          colorIndexes.push([i, j]);
        } else if (isJam(e.imageType) && isJam(color)) {
          colorIndexes.push([i, j]);
        }
      });
    });
    return colorIndexes;
  }

  // Animates the values in the tile data source based on their index in the array.
  animateValuesToLocationsSwapStyle() {
    this.state.tileDataSource.map((row, i) => {
      row.map((elem, j) => {
        Animated.timing(elem.location, {
          toValue: { x: TILE_WIDTH * i, y: TILE_WIDTH * j },
          duration: this.speed,
          useNativeDriver: true
        }).start();
      });
    });
  }

  // Animates the values in the tile data source based on their index in the array.
  animateValuesToLocationsWaterfalStyle() {
    this.state.tileDataSource.map((row, i) => {
      row.map((elem, j) => {
        Animated.sequence([
          Animated.delay(50),
          Animated.spring(
            //Step 1
            elem.location, //Step 2
            { toValue: { x: TILE_WIDTH * i, y: TILE_WIDTH * j }, friction: 4,useNativeDriver: true } //Step 3
          )
        ]).start();
      });
    });
  }

  recolorMatches(neighbors) {
    let tmpNeighbors = neighbors.slice()
    let head = tmpNeighbors[0]
    if (this.state.tileDataSource[head[0]][head[1]].imageObj.value != 0){
      console.log("Hello this is not a gold coin")
      let first = tmpNeighbors.pop()
      this.state.tileDataSource[first[0]][first[1]].imageObj = GOLD_COIN
    }

    tmpNeighbors.map(e => {
      let i = e[0];
      let j = e[1];
      let randIndex = getRandomInt(numbers.length);
      this.state.tileDataSource[i][j].imageObj = numbers[randIndex];
    });
  }

  render() {
    const config = {
      velocityThreshold: 0.1,
      directionalOffsetThreshold: 20
    };

    return (
          <GestureRecognizer
            config={config}
            onLayout={this.onLayout.bind(this)}
            style={styles.container}
            onSwipe={(direction, state) => this.onSwipe(direction, state)}
          >
            {this.state.tileComponents}
          </GestureRecognizer>
    );
  }
}

let Window = Dimensions.get("window");
let windowSpan = Math.min(Window.width, Window.height);
let TILE_WIDTH = windowSpan / 6;

let windowWidth = Window.width;
let windowHeight = Window.height;

let blue = "#4286f4";
let red = "#f24646";
let yellow = "#faff7f";
let green = "#31a51a";
let orange = "#ff7644";
let pink = "#ff51f3";

let styles = StyleSheet.create({
  backGroundImage: {
    flex: 1,
    width: 300,
    height: 300
  },
  gridContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "white"
  },
  mainView: {
    flex: 1,
    alignItems: "center"
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: red
  },
  gestureContainer: {
    flex: 1,
    width: TILE_WIDTH * 5,
    height: TILE_WIDTH * 5,
    position: "absolute"
    //backgroundColor: "#31a51a"
  },
  container: {
    width: TILE_WIDTH * 5,
    height: TILE_WIDTH * 5,
    backgroundColor: "rgba(255,255,255,0.65)",
    borderRadius: TILE_WIDTH/5,
  },
  tile: {
    width: TILE_WIDTH,
    height: TILE_WIDTH
  }
});
