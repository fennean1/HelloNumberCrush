import {ImageTypes} from "../components/ImageTypes";


export const isCandy = obj => {
  switch (obj) {
    case ImageTypes.REDCANDY:
      return true;
      break;
    case ImageTypes.BLUECANDY:
      return true;
      break;
    case ImageTypes.GREENCANDY:
      return true;
      break;
    case ImageTypes.ORANGECANDY:
      return true;
      break;
    case ImageTypes.PINKCANDY:
      return true;
      break;
    case ImageTypes.YELLOWCANDY:
      return true;
      break;
    case ImageTypes.PURPLECANDY:
      return true;
      break;
    case ImageTypes.RAINBOWCANDY:
      return true;
      break;
    case ImageTypes.DIAMOND:
      return true;
      break;
    default:
      return false;
  }
};

export const getCandyFromBean = bean => {
  switch (bean) {
    case ImageTypes.PINKJELLYBEAN:
      return ImageTypes.PINKCANDY;
      break;
    case ImageTypes.REDJELLYBEAN:
      return ImageTypes.REDCANDY;
      break;
    case ImageTypes.YELLOWJELLYBEAN:
      return ImageTypes.YELLOWCANDY;
      break;
    case ImageTypes.ORANGEJELLYBEAN:
      return ImageTypes.ORANGECANDY;
      break;
    case ImageTypes.GREENJELLYBEAN:
      return ImageTypes.GREENCANDY;
      break;
    case ImageTypes.BLUEJELLYBEAN:
      return ImageTypes.BLUECANDY;
      break;
    case ImageTypes.PURPLEJELLYBEAN:
      return ImageTypes.PURPLECANDY;
      break;
  }
};


export const isJam = obj => {
  switch (obj) {
    case ImageTypes.TRIANGLE:
      return true;
      break;
    case ImageTypes.SQUARE:
      return true;
      break;
    case ImageTypes.PENTAGON:
      return true;
      break;
    case ImageTypes.HEXAGON:
      return true;
      break;
    case ImageTypes.SEPTAGON:
      return true;
      break;
    case ImageTypes.OCTAGON:
      return true;
      break;
    case ImageTypes.NONAGON:
      return true;
      break;
    case ImageTypes.RAINBOWJAM:
      return true;
      break;
    default:
      return false;
  }
};

export const getJamJarFromBean = bean => {
  switch (bean) {
    case ImageTypes.THREE:
      return ImageTypes.TRIANGLE;
      break;
    case ImageTypes.FOUR:
      return ImageTypes.SQUARE;
      break;
    case ImageTypes.FIVE:
      return ImageTypes.PENTAGON;
      break;
    case ImageTypes.SIX:
      return ImageTypes.HEXAGON;
      break;
    case ImageTypes.SEVEN:
      return ImageTypes.SEPTAGON;
      break;
    case ImageTypes.EIGHT:
      return ImageTypes.OCTAGON;
      break;
    case ImageTypes.NINE:
      return ImageTypes.NONAGON;
      break;
      case ImageTypes.TRIANGLE:
        return ImageTypes.DIAMOND
        break;
      case ImageTypes.SQUARE:
      return ImageTypes.DIAMOND
        break;
      case ImageTypes.PENTAGON:
      return ImageTypes.DIAMOND
        break;
      case ImageTypes.HEXAGON:
        return ImageTypes.DIAMOND
        break;
      case ImageTypes.SEPTAGON:
            return ImageTypes.DIAMOND
        break;
      case ImageTypes.OCTAGON:
            return ImageTypes.DIAMOND
        break;
      case ImageTypes.NONAGON:
            return ImageTypes.DIAMOND
        break;
      case ImageTypes.RAINBOWJAM:
          return ImageTypes.DIAMOND
  }
};
