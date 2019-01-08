

const Types = {
  COIN: 0,
  POLYGON: 1,
  NUMERAL: 2,
  DOTS: 3,
  CHARACTER: 4
}

// Beans
let pjb = require("../assets/PinkJellyBean.png");
let prjb = require("../assets/PurpleJellyBean.png");
let bjb = require("../assets/BlueJellyBean.png");
let ojb = require("../assets/OrangeJellyBean.png");
let gjb = require("../assets/GreenJellyBean.png");
let yjb = require("../assets/YellowJellyBean.png");
let rjb = require("../assets/RedJellyBean.png");

// Jam
let BlueJam = require("../assets/BlueJam.png");
let RedJam = require("../assets/RedJam.png");
let GreenJam = require("../assets/GreenJam.png");
let OrangeJam = require("../assets/OrangeJam.png");
let YellowJam = require("../assets/YellowJam.png");
let PinkJam = require("../assets/PinkJam.png");
let PurpleJam = require("../assets/PurpleJam.png");

let Zero = require("../assets/NumbersLady.png")
let One = require("../assets/One.png")
let Two = require("../assets/Two.png")
let Three = require("../assets/Three.png")
let Four = require("../assets/Four.png")
let Five = require("../assets/Five.png")
let Six = require("../assets/Six.png")
let Seven = require("../assets/Seven.png")
let Eight = require("../assets/Eight.png")
let Nine = require("../assets/Nine.png")

let NSThree = require("../assets/NSThree.png")
let NSFour = require("../assets/NSFour.png")
let NSFive = require("../assets/NSFive.png")
let NSSix = require("../assets/NSSix.png")
let NSSeven = require("../assets/NSSeven.png")
let NSEight = require("../assets/NSEight.png")
let NSNine = require("../assets/NSNine.png")


let GoldCoin = require("../assets/GoldCoin.png")


let Character_3 = require("../assets/Character_3.png")
let Character_4 = require("../assets/Character_4.png")
let Character_5 = require("../assets/Character_5.png")
let Character_6 = require("../assets/Character_6.png")
let Character_7 = require("../assets/Character_7.png")
let Character_8 = require("../assets/Character_8.png")
let Character_9 = require("../assets/Character_9.png")


// Candy

let Triangle = require("../assets/Triangle.png")
let Square = require("../assets/Square.png")
let Pentagon = require("../assets/Pentagon.png")
let Hexagon = require("../assets/Hexagon.png")
let Septagon = require("../assets/Septagon.png")
let Octagon = require("../assets/Octagon.png")
let Nonagon = require("../assets/Nonagon.png")

// Others
let floatingClouds = require("../assets/FloatingClouds.png");
let CartoonTuffy = require("../assets/TuffyTile.png");
let TopOfTuffysHead = require("../assets/TopOfTuffysHead.png");
let BackArrow = require("../assets/BackArrow.png");
let TurnIndicatorImage = require("../assets/TurnIndicatorImage.png");
let SwipeInstructions = require("../assets/SwipeInstructionalScene.png");
let BeanInstructions = require("../assets/BeanInstructionalScene.png");
let JarInstructions = require("../assets/JarInstructionalScene.png");

let RainbowJam = require("../assets/RainbowJam.png")
let Diamond = require("../assets/Diamond.png")


export const CHARACTER_3 = {
  img: Character_3,
  value: 3,
}

export const CHARACTER_4 = {
  img: Character_4,
  value: 4,
}

export const CHARACTER_5 = {
  img: Character_5,
  value: 5,
}

export const CHARACTER_6 = {
  img: Character_6,
  value: 6,
}

export const CHARACTER_7 = {
  img: Character_7,
  value: 7,
}

export const CHARACTER_8 = {
  img: Character_8,
  value: 8,
}

export const CHARACTER_9 = {
  img: Character_9,
  value: 9,
}

// Construct and object that contains key value pairs for each type.


export const CHARACTERS = {
  3: CHARACTER_3,
  4: CHARACTER_4,
  5: CHARACTER_5,
  6: CHARACTER_6,
  7: CHARACTER_7,
  8: CHARACTER_8,
  9: CHARACTER_9,
}

export const GOLD_COIN = {
    img: GoldCoin,
    value: 0,
    polygon: null,
    numeral: null,
    type: Types.COIN
}

export const NSTHREE = {
    img: NSThree,
    value: 3,
    polygon: TRIANGLE,
    numeral: THREE,
    type: Types.DOTS
}

export const NSFOUR = {
    img: NSFour,
    value: 4,
    polygon: SQUARE,
    numeral: FOUR,
    type: Types.DOTS
}


export const NSFIVE = {
    img: NSFive,
    value: 5,
    polygon: PENTAGON,
    numeral: null,
    type: Types.DOTS
}

export const NSSIX = {
    img: NSSix,
    value: 6,
    polygon: HEXAGON,
    numeral: null,
    type: Types.DOTS
}

export const NSSEVEN = {
    img: NSSeven,
    value: 7,
    polygon: SEPTAGON,
    numeral: null,
    type: Types.DOTS
}

export const NSEIGHT = {
    img: NSEight,
    value: 8,
    polygon: PENTAGON,
    numeral: null,
    type: Types.DOTS
}

export const NSNINE = {
    img: NSNine,
    value: 9,
    polygon: NONAGON,
    numeral: null,
    type: Types.DOTS
}


export const TRIANGLE = {
    img: Triangle,
    value: 3,
    polygon: null,
    numeral: THREE,
    type: Types.POLYGON
}

export const SQUARE = {
    img: Square,
    value: 4,
    polygon: SQUARE,
    numeral: FOUR,
    type: Types.POLYGON
}


export const PENTAGON = {
    img: Pentagon,
    value: 5,
    polygon: null,
    numeral: FIVE,
    type: Types.POLYGON
}

export const HEXAGON = {
    img: Hexagon,
    value: 6,
    polygon: null,
    numeral: SIX,
    type: Types.POLYGON
}

export const SEPTAGON = {
    img: Septagon,
    value: 7,
    polygon: null,
    numeral: SEVEN,
    type: Types.POLYGON
}

export const OCTAGON = {
    img: Octagon,
    value: 8,
    polygon: null,
    numeral: EIGHT,
    type: Types.POLYGON
}

export const NONAGON = {
    img: Nonagon,
    value: 9,
    polygon: null,
    numeral: NINE,
    type: Types.POLYGON
}



export const THREE = {
    img: Three,
    value: 3,
    polygon: TRIANGLE,
    numeral: null,
    type: Types.NUMERAL
}

export const FOUR = {
    img: Four,
    value: 4,
    polygon: SQUARE,
    numeral: null,
    type: Types.NUMERAL
}

export const FIVE = {
    img: NSFive,
    value: 5,
    polygon: PENTAGON,
    numeral: null,
    type: Types.NUMERAL
}

export const SIX = {
    img: Six,
    value: 6,
    polygon: HEXAGON,
    numeral: null,
    type: Types.NUMERAL
}


export const SEVEN = {
    img: Seven,
    value: 7,
    polygon: SEPTAGON,
    numeral: null,
    type: Types.NUMERAL
}


export const EIGHT = {
    img: Eight,
    value: 8,
    polygon: OCTAGON,
    numeral: null,
    type: Types.NUMERAL
}


export const NINE = {
    img: Nine,
    value: 9,
    polygon: NONAGON,
    numeral: null,
    type: Types.NUMERAL
}


export const ImageTypes = {
  ZERO: Zero,
  ONE: One,
  TWO: Two,
  THREE: Three,
  FOUR: Four,
  FIVE: Five,
  SIX: Six,
  SEVEN: Seven,
  EIGHT: Eight,
  NINE: Nine,
  PINKJELLYBEAN: One,
  PURPLEJELLYBEAN: Two,
  BLUEJELLYBEAN: Three,
  REDJELLYBEAN: Four,
  YELLOWJELLYBEAN: Five,
  ORANGEJELLYBEAN: Six,
  GREENJELLYBEAN: Seven,
  TRIANGLE: Triangle,
  SQUARE: Square,
  PENTAGON: Pentagon,
  HEXAGON: Hexagon,
  SEPTAGON: Septagon,
  OCTAGON: Octagon,
  NONAGON: Nonagon,
  CARTOONTUFFY: CartoonTuffy,
  TOPOFTUFFYSHEAD: TopOfTuffysHead,
  BACKARROW: BackArrow,
  TURNINDICATORIMAGE: TurnIndicatorImage,
  SWIPEINSTRUCTIONS: SwipeInstructions,
  BEANINSTRUCTIONS: BeanInstructions,
  JARINSTRUCTIONS: JarInstructions,
  RAINBOWJAM: RainbowJam,
  DIAMOND: Diamond,
  NSTHREE: NSThree,
  NSFOUR: NSFour,
  NSFIVE: NSFive,
  NSSIX: NSSix,
  NSSEVEN: NSSeven,
  NSEIGHT: NSEight,
  NSNINE: NSNine
};
