led.enable(true)
pins.analogWritePin(AnalogPin.P12, 0) //red
pins.analogWritePin(AnalogPin.P8, 0) //green
pins.analogWritePin(AnalogPin.P16, 0) //yellow
let dot1 = game.createSprite(2, 2)
dot1.off()
let dot2 = game.createSprite(2, 2)
dot2.off()
let dot3 = game.createSprite(2, 2)
dot3.off()
let asleep: boolean = true
let g: Gesture

input.onButtonPressed(Button.A, function () {
    asleep = true
})
input.onButtonPressed(Button.B, function () {
    asleep = false
})
input.onGesture(Gesture.Shake, function () {
    g = Gesture.Shake
    for (let index = 0; index <= 3071; index++) {
        if (index < 2046) {
            if (index <= 1023) {
                pins.analogWritePin(AnalogPin.P12, index)
            } else {
                pins.analogWritePin(AnalogPin.P12, 1023 - (index - 1023))
            }
        } else {
            pins.analogWritePin(AnalogPin.P12, 0)
        }

    }
})
input.onLogoDown(function () {
    g = Gesture.LogoDown
    for (let index = 0; index <= 3071; index++) {
        if (index > 1023) {
            if (index <= 2046) {
                pins.analogWritePin(AnalogPin.P8, index - 1023)
            } else {
                pins.analogWritePin(AnalogPin.P8, 1023 - (index - 2047))
            }
        } else {
            pins.analogWritePin(AnalogPin.P8, 0)
        }
    }
})
input.onLogoUp(function () {
    g = Gesture.LogoUp
    for (let index = 0; index <= 3071; index++) {
        if (index < 1023) {
            pins.analogWritePin(AnalogPin.P16, 1022 - index)
        } else if (index > 2048) {
            pins.analogWritePin(AnalogPin.P16, index - 2048)
        } else {
            pins.analogWritePin(AnalogPin.P16, 0)
        }
    }
})
input.onGesture(Gesture.TiltLeft, function () {
    g = Gesture.TiltLeft
})
input.onGesture(Gesture.TiltRight, function () {
    g = Gesture.TiltRight
})
function dots() {
    dot1.on()
    dot2.on()
    dot3.on()
    dot1.move(1);
    basic.pause(100)
    dot2.move(-1);
    dot2.turn(Direction.Right, 90)
    basic.pause(500)
    dot3.turn(Direction.Right, -45)
    dot3.move(1);
    basic.pause(2000)
    dot1.ifOnEdgeBounce();
    dot1.turn(Direction.Right, 45)
    dot2.ifOnEdgeBounce();
    dot2.turn(Direction.Right, 45)
    dot3.ifOnEdgeBounce();
    dot3.turn(Direction.Right, 45)
    dot1.off()
    dot2.off()
    dot3.off()

}
function jump() {
    basic.showLeds(`
            . # # # .
            . # # # .
            # . # . #
            . . # . .
            . # . # .
            `)
    basic.pause(100)
    basic.showLeds(`
            . # # # .
            # # # # #
            . . # . .
            # # # # #
            . . . . .
            `)
    basic.pause(300)
    basic.clearScreen()
}
function wave() {
    basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    basic.pause(300)
    basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            # . . . .
            . # . . .
            `)
    basic.pause(200)
    basic.showLeds(`
            # # # . .
            . . . # .
            . . # . .
            . # . . .
            . . # . .
            `)
    basic.pause(200)
    basic.showLeds(`
            . . . . #
            . . . # .
            . . # . .
            . . . # .
            . . . . #
            `)
    basic.pause(200)
    basic.showLeds(`
            . . . . .
            . . . . .
            . . . . #
            . . . . .
            . . . . .
            `)
    basic.pause(200)
    basic.clearScreen()
}
function wink() {
    basic.showLeds(`
            . # . # .
            . # . # .
            . . . . .
            # . . . #
            . # # # .
            `)
    basic.pause(300)
    basic.showLeds(`
            . . . # .
            # # . # .
            . . . . .
            # . . . .
            . # # # .
            `)
    basic.pause(300)
    basic.clearScreen()

}
function FerrisWheel() {
    basic.showLeds(`
            . # # # .
            # . # . #
            # # # # #
            # . # . #
            . # # # .
            `)
    basic.pause(500)
    basic.showLeds(`
            . # . # .
            # . # . #
            . # . # .
            # . # . #
            . # . # .
            `)
    basic.pause(500)
    basic.showLeds(`
            . . # . .
            . . . . .
            # . # . #
            . . . . .
            . . # . .
            `)
    basic.pause(500)
    basic.clearScreen()


}
basic.forever(function () {
    if (asleep) {
        if (g == Gesture.Shake) {
            dots()
        }
        else if (g == Gesture.LogoDown) {
            FerrisWheel()
        }
        else if (g == Gesture.LogoUp) {
            wave()
        }
        else if (g == Gesture.TiltLeft) {
            jump()
        }
        else if (g == Gesture.TiltRight) {
            wink()
        } else {
            dots()
        }
    } else {
        basic.showString("Awake")
    }
})






