/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  PanResponder,
  Image
} from "react-native";

// import { primaryColor } from “../styles/common.js”;

// import Viewport from './app/Viewport';


let pjb = require("../assets/PinkJellyBean.png");
let pujb = require("../assets/PurpleJellyBean.png");
let bjb = require("../assets/BlueJellyBean.png");
let ojb = require("../assets/OrangeJellyBean.png");
let gjb = require("../assets/GreenJellyBean.png");
let yjb = require("../assets/YellowJellyBean.png");
let rjb = require("../assets/RedJellyBean.png");

export default class Tile extends Component<{}> {
  constructor(props) {
    super(props);

    this.state = {
      dropZoneValues: null,
      scale: new Animated.Value(1),
      showDraggable: true,
      start: new Animated.ValueXY(),
      end: new Animated.ValueXY(),
      view: this.props.subviews
    };

  }

  render() {
    let scale = this.props.scale;

    let [translateX, translateY] = [
      this.props.location.x,
      this.props.location.y
    ];

    return (
      // The coordinates of the view will transform to the 'prop' location and locationc

      <Animated.Image
        source = {this.props.img}
        style={[
          styles.tile,
          { transform: [{ translateX }, { translateY }, { scale }] }
        ]}
/>
    );
  }
}

let Window = Dimensions.get("window");
let windowSpan = Math.min(Window.width, Window.height);
let TILE_WIDTH = Window.width / 7;

let styles = StyleSheet.create({
  child: {
    flexDirection: "row",
    flex: 1
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    color: "#fff"
  },
  tile: {
    width: TILE_WIDTH,
    height: TILE_WIDTH,
    position: "absolute",
  }
});

module.exports = Tile;
