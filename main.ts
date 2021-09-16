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
function MkStars (Xx: number, Yy: number) {
    Clear_Screen(Xx, Yy)
    for (let index3 = 0; index3 <= 3; index3++) {
        for (let index4 = 0; index4 <= 4; index4++) {
            if (8 > randint(0, 10)) {
                setPix(Xx + index4, Yy + index3, randint(30, 50))
            }
        }
    }
    showUNI(Xx, Yy)
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
    for (let index5 = 0; index5 <= Unisize; index5++) {
        Universe[index5] = 0
    }
    basic.pause(500)
    for (let index22 = 0; index22 <= Diameter - 1; index22++) {
        Universe[getSPOT(index22, 4)] = DIRT
        if (6 < randint(0, 10)) {
            Universe[getSPOT(index22, 3)] = GRASS
        }
        if (3 == randint(0, 5)) {
            mkTree(index22, 3)
        }
    }
    for (let y = 0; y <= 4; y++) {
        for (let x = 0; x <= Diameter; x++) {
            setPix(x, 5 + y, randint(30, 50))
        }
    }
}
function Clear_Screen (Sx: number, Sy: number) {
    for (let index6 = 0; index6 <= 3; index6++) {
        for (let index7 = 0; index7 <= 4; index7++) {
            setPix(Sx + index7, Sy + index6, 0)
        }
    }
    mode = 0
    showUNI(Sx, Sy)
}
input.onButtonPressed(Button.A, function () {
    if (mode == 0) {
        x += -1
        if (x < 0) {
            x = 99
        }
        showUNI(x, y)
    }
    if (mode == 3) {
        y += -1
        if (y < 0) {
            y = 9
        }
        showUNI(x, y)
    }
    if (mode == 1) {
        MkStars(x, y)
        showUNI(x, y)
        mode = 0
    }
    if (mode == 2) {
        Clear_Screen(x, y)
        mode = 0
        showUNI(x, y)
    }
})
function mkBuilding (xt: number, yt: number) {
    setPix(xt, yt, DIRT)
    setPix(xt, yt - 1, DIRT)
    setPix(xt, yt - 2, DIRT)
    setPix(xt + 1, yt, DIRT)
    setPix(xt + 1, yt - 1, DIRT)
    setPix(xt + 1, yt - 2, DIRT)
}
input.onButtonPressed(Button.AB, function () {
    mode += 1
    if (3 < mode) {
        mode = 0
    }
    Modes[mode].showImage(0)
})
input.onButtonPressed(Button.B, function () {
    if (mode == 0) {
        x += 1
        if (x > 99) {
            x = 0
        }
        showUNI(x, y)
    }
    if (mode == 3) {
        y += 1
        if (y > 9) {
            y = 0
        }
        showUNI(x, y)
    }
    if (mode == 1) {
        mkTree(x + 2, 4)
        mode = 0
        showUNI(x, y)
    }
    if (mode == 2) {
        Clear_Screen(x, y)
        mode = 0
        mkBuilding(x, 4)
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
let Modes: Image[] = []
let Universe: number[] = []
let Unisize = 0
let Diameter = 0
let mode = 0
mode = 0
Diameter = 100
Unisize = Diameter * 10
Universe = [0]
for (let index = 0; index < Unisize; index++) {
    Universe.push(0)
}
Modes = [
images.createImage(`
    . . # . .
    . # # # .
    . . # . .
    . # . # .
    . # . . #
    `),
images.createImage(`
    # # . . .
    # . # # #
    . # . # .
    # # . # .
    . . . # .
    `),
images.createImage(`
    # # . . .
    # . . . .
    # # . # #
    . . . # #
    . . . # #
    `),
images.createImage(`
    . . # . .
    . . # . .
    . # # # .
    . # # # .
    . . # . .
    `)
]
DIRT = 255
let Star = 25
Tree = 100
GRASS = 100
x = 0
y = 0
images.createBigImage(`
    . . . . . . . . . #
    . # # . . # # . . .
    . # # . . . # # . #
    . # # . . . # . . .
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
