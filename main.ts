function showUNI (xx: number, yy: number) {
    for (let index = 0; index <= 4; index++) {
        for (let index2 = 0; index2 <= 4; index2++) {
            led.plotBrightness(index2, index, Universe[getSPOT(xx + index2, yy + index)])
        }
    }
}
function buildWorld () {
    for (let index2 = 0; index2 <= Diameter - 1; index2++) {
        Universe[getSPOT(index2, 4)] = DIRT
        if (6 < randint(0, 10)) {
            Universe[getSPOT(index2, 3)] = GRASS
        }
    }
}
input.onButtonPressed(Button.A, function () {
    x += -1
    if (x < 0) {
        x = 99
    }
    showUNI(x, y)
})
input.onButtonPressed(Button.B, function () {
    x += 1
    if (x > 99) {
        x = 0
    }
    showUNI(x, y)
})
function getY (spot: number) {
    return Math.trunc(spot / Diameter)
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
let DIRT = 0
let Universe: number[] = []
let Diameter = 0
Diameter = 100
let Unisize = Diameter * 10
Universe = [0]
for (let index = 0; index < Unisize; index++) {
    Universe.push(0)
}
DIRT = 255
let Tree = 100
GRASS = 100
x = 0
y = 0
buildWorld()
showUNI(x, y)
