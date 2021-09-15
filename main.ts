function setPix (xp: number, xy: number, color: number) {
    Universe[getSPOT(xp, xy)] = color
}
function showUNI (xx: number, yy: number) {
    for (let index = 0; index <= 4; index++) {
        for (let index2 = 0; index2 <= 4; index2++) {
            led.plotBrightness(index2, index, Universe[getSPOT(xx + index2, yy + index)])
        }
    }
}
function buildWorld () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    x = 0
    y = 0
    for (let index = 0; index <= Unisize; index++) {
        Universe[index] = 0
    }
    basic.pause(500)
    for (let index2 = 0; index2 <= Diameter - 1; index2++) {
        Universe[getSPOT(index2, 4)] = DIRT
        if (6 < randint(0, 10)) {
            Universe[getSPOT(index2, 3)] = GRASS
        }
        if (3 == randint(0, 5)) {
            mkTree(index2, 3)
        }
    }
}
input.onButtonPressed(Button.A, function () {
    if (mode == 0) {
        x += -1
        if (x < 0) {
            x = 99
        }
        showUNI(x, y)
    }
    if (mode == 5) {
        y += -1
        if (y < 0) {
            y = 9
        }
        showUNI(x, y)
    }
    if (mode == 1) {
        mkTree(x, 4)
        showUNI(x, y)
    }
})
input.onButtonPressed(Button.AB, function () {
    mode += 1
    if (5 < mode) {
        mode = 0
    }
    basic.showString("" + (Modes[mode]))
})
input.onButtonPressed(Button.B, function () {
    if (mode == 0) {
        x += 1
        if (x > 99) {
            x = 0
        }
        showUNI(x, y)
    }
    if (mode == 5) {
        y += 1
        if (y > 9) {
            y = 0
        }
        showUNI(x, y)
    }
    if (mode == 1) {
        mkTree(x + 2, 4)
        showUNI(x, y)
    }
})
input.onGesture(Gesture.Shake, function () {
    buildWorld()
})
function getY (spot: number) {
    return Math.trunc(spot / Diameter)
}
function mkTree (xt: number, yt: number) {
    setPix(xt, yt, Tree)
    setPix(xt, yt - 1, Tree)
    setPix(xt, yt - 2, Tree)
    setPix(xt - 1, yt - 2, Tree)
    setPix(xt, yt - 3, Tree)
    setPix(xt + 1, yt - 3, Tree)
}
function getSPOT (xx: number, yy: number) {
    return xx + yy * Diameter
}
function getX (spot: number) {
    return spot % Diameter
}
let y = 0
let x = 0
let GRASS = 0
let Tree = 0
let DIRT = 0
let Modes: string[] = []
let Universe: number[] = []
let Unisize = 0
let Diameter = 0
let mode = 0
mode = 0
Diameter = 100
Unisize = Diameter * 10
Universe = [0]
Modes = [
"M",
"T",
"S",
"C",
"R",
"D"
]
for (let index = 0; index < Unisize; index++) {
    Universe.push(0)
}
DIRT = 255
Tree = 100
GRASS = 100
x = 0
y = 0
images.createBigImage(`
    . . . . . . . . . .
    . # # . . . . . . .
    . # . . . . . . . .
    . # . . . . . . . .
    # # # # # # # # # #
    `).scrollImage(1, 200)
basic.showString("MyCraft")
basic.showLeds(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `)
buildWorld()
showUNI(x, y)
