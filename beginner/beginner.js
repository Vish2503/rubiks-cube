import { Raycaster, Vector2 } from "three";
import {
    createWorld,
    generateScramble,
    reverseMove,
    shrinkMoveArray,
} from "../src/Utils";

const container = document.querySelector("#scene-container");
const [world, rubikscube] = createWorld(container);

let cubestring;
let firstNotation;

let pieces = [];

// document.addEventListener("DOMContentLoaded", async () => {
//     rubikscube.setMoveAnimationSpeed(1000)
//     await rubikscube.move("x2")
//     await rubikscube.move("y")
//     rubikscube.setMoveAnimationSpeed()
//     firstNotation = rubikscube.getNotation()
//     Object.keys(firstNotation).forEach(element => pieces.push(getPositionByNotation(element)))
// })

// document.addEventListener("keyup", async () => {
//     // let scramble = generateScramble()
//     // rubikscube.setMoveAnimationSpeed(220)
//     // for (let moves of scramble) {
//     //     await rubikscube.move(moves)
//     // }
//     firstNotation = rubikscube.getNotation()
//     Object.keys(firstNotation).forEach(element => pieces.push(getPositionByNotation(element)))
//     //await rubikscube.move("M")
//     //pieces = [getPositionByNotation("U"), getPositionByNotation("F")];
//     //highlightPieces(pieces)
//     //console.log(pieces);
// })

async function introduction() {
    rubikscube.setMoveAnimationSpeed(1000);
    await rubikscube.move("x2");
    await rubikscube.move("y");
    rubikscube.setMoveAnimationSpeed();
    firstNotation = rubikscube.getNotation();
    Object.keys(firstNotation).forEach((element) =>
        pieces.push(getPositionByNotation(element))
    );
    const infoHeader = document.querySelector("#info-header");
    const infoPara = document.querySelector("#info-para");
    const next = document.querySelector("#next");
    const previous = document.querySelector("#previous");
    const moveName = document.querySelector("#rubikscube.move");

    infoHeader.innerHTML = "INTRODUCTION";
    infoPara.innerHTML = "This is an introduction to the rubiks cube!";
    function first() {
        // if we use > to come to this function we need to remove these listeners
        next.removeEventListener("click", first);
        // if we use < to get to this function we need to remove these listeners
        previous.removeEventListener("click", first);
        next.removeEventListener("click", third);

        revertHighlight(pieces);
        pieces.length = 0;
        // this will push whatever is in the top layer to be highlighted
        Object.keys(firstNotation)
            .filter((key) => key.includes("U"))
            .forEach((element) => {
                pieces.push(getPositionByNotation(element));
            });
        highlightPieces(pieces);
        infoHeader.innerHTML = "LAYERS: Top Layer";
        infoPara.innerHTML =
            "There are three layers in a 3x3 Rubik's Cube. The highlighted pieces make up the top layer.";

        // now add the next one which needs to be gone to on click
        next.addEventListener("click", second);
    }
    function second() {
        next.removeEventListener("click", second);

        previous.removeEventListener("click", second);
        next.removeEventListener("click", fourth);

        revertHighlight(pieces);
        pieces.length = 0;
        // this will push whatever is in the middle layer to be highlighted
        Object.keys(firstNotation)
            .filter((key) => !(key.includes("U") || key.includes("D")))
            .forEach((element) => {
                pieces.push(getPositionByNotation(element));
            });
        highlightPieces(pieces);
        infoHeader.innerHTML = "LAYERS: Middle Layer";
        infoPara.innerHTML =
            "There are three layers in a 3x3 Rubik's Cube. The highlighted pieces make up the middle layer.";

        previous.addEventListener("click", first);
        next.addEventListener("click", third);
    }
    function third() {
        previous.removeEventListener("click", first);
        next.removeEventListener("click", third);

        previous.removeEventListener("click", third);
        next.removeEventListener("click", fifth);

        revertHighlight(pieces);
        pieces.length = 0;
        // this will push whatever is in the bottom layer to be highlighted
        Object.keys(firstNotation)
            .filter((key) => key.includes("D"))
            .forEach((element) => {
                pieces.push(getPositionByNotation(element));
            });
        highlightPieces(pieces);
        infoHeader.innerHTML = "LAYERS: Bottom Layer";
        infoPara.innerHTML =
            "There are three layers in a 3x3 Rubik's Cube. The highlighted pieces make up the bottom layer.";

        previous.addEventListener("click", second);
        next.addEventListener("click", fourth);
    }
    function fourth() {
        previous.removeEventListener("click", second);
        next.removeEventListener("click", fourth);

        previous.removeEventListener("click", fourth);
        next.removeEventListener("click", sixth);

        revertHighlight(pieces);
        infoHeader.innerHTML = "FACES";
        infoPara.innerHTML =
            "There are six faces on a Rubik's Cube. Each colored side of the cube makes up a single face.";

        previous.addEventListener("click", third);
        next.addEventListener("click", fifth);
    }
    function fifth() {
        previous.removeEventListener("click", third);
        next.removeEventListener("click", fifth);

        previous.removeEventListener("click", fifth);
        next.removeEventListener("click", seventh);

        revertHighlight(pieces);
        pieces.length = 0;
        // this will push centers to pieces for highighting
        Object.keys(firstNotation)
            .filter((key) => key.length === 1)
            .forEach((element) => {
                pieces.push(getPositionByNotation(element));
            });
        highlightPieces(pieces);
        infoHeader.innerHTML = "CENTERS";
        infoPara.innerHTML =
            "These pieces have one color. There are six of them on a cube, one for each side. Center pieces are fixed to the core of the cube and do not rubikscube.move, hence we solve the rest of the face with respect to the center piece. Note that the following colors will always stay opposite to each other in a cube: White & Yellow, Blue & Green and Red & Orange";

        previous.addEventListener("click", fourth);
        next.addEventListener("click", sixth);
    }
    function sixth() {
        previous.removeEventListener("click", fourth);
        next.removeEventListener("click", sixth);

        previous.removeEventListener("click", sixth);
        next.removeEventListener("click", eighth);

        revertHighlight(pieces);
        pieces.length = 0;
        // this will push centers to pieces for highighting
        Object.keys(firstNotation)
            .filter((key) => key.length === 2)
            .forEach((element) => {
                pieces.push(getPositionByNotation(element));
            });
        highlightPieces(pieces);
        infoHeader.innerHTML = "EDGES";
        infoPara.innerHTML =
            "These pieces have two colors on them. There are 12 edge pieces on a cube.";

        previous.addEventListener("click", fifth);
        next.addEventListener("click", seventh);
    }
    function seventh() {
        previous.removeEventListener("click", fifth);
        next.removeEventListener("click", seventh);

        previous.removeEventListener("click", seventh);
        next.removeEventListener("click", ninth);

        revertHighlight(pieces);
        pieces.length = 0;
        // this will push centers to pieces for highighting
        Object.keys(firstNotation)
            .filter((key) => key.length === 3)
            .forEach((element) => {
                pieces.push(getPositionByNotation(element));
            });
        highlightPieces(pieces);
        infoHeader.innerHTML = "CORNERS";
        infoPara.innerHTML =
            "These pieces have three colors on them. There are 8 corner pieces on a cube.";

        previous.addEventListener("click", sixth);
        next.addEventListener("click", eighth);
    }
    async function eighth() {
        previous.removeEventListener("click", sixth);
        next.removeEventListener("click", eighth);

        previous.removeEventListener("click", eighth);
        next.removeEventListener("click", tenth);

        revertHighlight(pieces);
        pieces.length = 0;
        Object.keys(firstNotation).forEach((element) =>
            pieces.push(getPositionByNotation(element))
        );
        highlightPieces(pieces);
        infoHeader.innerHTML = "MOVES: UP (U)";
        infoPara.innerHTML =
            "Moves are universal notations used to denote turns for each of the faces. Moves are represented by the first letter of the face and sometimes with an apostrophe or a 2 beside it. Moves are always a 1/4 face rotation. A rubikscube.move with nothing beside it represents a clockwise rotation on its face axis, a rubikscube.move with an apostrophe represents an anti-clockwise rotation on its face axis and a 2 represents 180 degree rotation.";
        moveName.innerHTML = "U";
        await rubikscube.move("U");
        await delay(1000);
        moveName.innerHTML = "U'";
        await rubikscube.move("U'");
        await delay(1000);
        moveName.innerHTML = "U2";
        await rubikscube.move("U2");
        await delay(1000);
        moveName.innerHTML = "";
        rubikscube.setMoveAnimationSpeed(1000);
        await rubikscube.move("U2");
        rubikscube.setMoveAnimationSpeed();

        previous.addEventListener("click", seventh);
        next.addEventListener("click", ninth);
    }
    async function ninth() {
        previous.removeEventListener("click", seventh);
        next.removeEventListener("click", ninth);

        previous.removeEventListener("click", ninth);
        next.removeEventListener("click", eleventh);

        revertHighlight(pieces);
        pieces.length = 0;
        Object.keys(firstNotation).forEach((element) =>
            pieces.push(getPositionByNotation(element))
        );
        highlightPieces(pieces);
        infoHeader.innerHTML = "MOVES: DOWN (D)";
        infoPara.innerHTML =
            "Moves are universal notations used to denote turns for each of the faces. Moves are represented by the first letter of the face and sometimes with an apostrophe or a 2 beside it. Moves are always a 1/4 face rotation. A rubikscube.move with nothing beside it represents a clockwise rotation on its face axis, a rubikscube.move with an apostrophe represents an anti-clockwise rotation on its face axis and a 2 represents 180 degree rotation.";
        moveName.innerHTML = "D";
        await rubikscube.move("D");
        await delay(1000);
        moveName.innerHTML = "D'";
        await rubikscube.move("D'");
        await delay(1000);
        moveName.innerHTML = "D2";
        await rubikscube.move("D2");
        await delay(1000);
        moveName.innerHTML = "";
        rubikscube.setMoveAnimationSpeed(1000);
        await rubikscube.move("D2");
        rubikscube.setMoveAnimationSpeed();

        previous.addEventListener("click", eighth);
        next.addEventListener("click", tenth);
    }
    async function tenth() {
        previous.removeEventListener("click", eighth);
        next.removeEventListener("click", tenth);

        previous.removeEventListener("click", tenth);
        next.removeEventListener("click", twelfth);

        revertHighlight(pieces);
        pieces.length = 0;
        Object.keys(firstNotation).forEach((element) =>
            pieces.push(getPositionByNotation(element))
        );
        highlightPieces(pieces);
        infoHeader.innerHTML = "MOVES: LEFT (L)";
        infoPara.innerHTML =
            "Moves are universal notations used to denote turns for each of the faces. Moves are represented by the first letter of the face and sometimes with an apostrophe or a 2 beside it. Moves are always a 1/4 face rotation. A rubikscube.move with nothing beside it represents a clockwise rotation on its face axis, a rubikscube.move with an apostrophe represents an anti-clockwise rotation on its face axis and a 2 represents 180 degree rotation.";
        moveName.innerHTML = "L";
        await rubikscube.move("L");
        await delay(1000);
        moveName.innerHTML = "L'";
        await rubikscube.move("L'");
        await delay(1000);
        moveName.innerHTML = "L2";
        await rubikscube.move("L2");
        await delay(1000);
        moveName.innerHTML = "";
        rubikscube.setMoveAnimationSpeed(1000);
        await rubikscube.move("L2");
        rubikscube.setMoveAnimationSpeed();

        previous.addEventListener("click", ninth);
        next.addEventListener("click", eleventh);
    }
    async function eleventh() {
        previous.removeEventListener("click", ninth);
        next.removeEventListener("click", eleventh);

        previous.removeEventListener("click", eleventh);
        next.removeEventListener("click", thirteenth);

        revertHighlight(pieces);
        pieces.length = 0;
        Object.keys(firstNotation).forEach((element) =>
            pieces.push(getPositionByNotation(element))
        );
        highlightPieces(pieces);
        infoHeader.innerHTML = "MOVES: RIGHT (R)";
        infoPara.innerHTML =
            "Moves are universal notations used to denote turns for each of the faces. Moves are represented by the first letter of the face and sometimes with an apostrophe or a 2 beside it. Moves are always a 1/4 face rotation. A rubikscube.move with nothing beside it represents a clockwise rotation on its face axis, a rubikscube.move with an apostrophe represents an anti-clockwise rotation on its face axis and a 2 represents 180 degree rotation.";
        moveName.innerHTML = "R";
        await rubikscube.move("R");
        await delay(1000);
        moveName.innerHTML = "R'";
        await rubikscube.move("R'");
        await delay(1000);
        moveName.innerHTML = "R2";
        await rubikscube.move("R2");
        await delay(1000);
        moveName.innerHTML = "";
        rubikscube.setMoveAnimationSpeed(1000);
        await rubikscube.move("R2");
        rubikscube.setMoveAnimationSpeed();

        previous.addEventListener("click", tenth);
        next.addEventListener("click", twelfth);
    }
    async function twelfth() {
        previous.removeEventListener("click", tenth);
        next.removeEventListener("click", twelfth);

        previous.removeEventListener("click", twelfth);

        revertHighlight(pieces);
        pieces.length = 0;
        Object.keys(firstNotation).forEach((element) =>
            pieces.push(getPositionByNotation(element))
        );
        highlightPieces(pieces);
        infoHeader.innerHTML = "MOVES: FRONT (F)";
        infoPara.innerHTML =
            "Moves are universal notations used to denote turns for each of the faces. Moves are represented by the first letter of the face and sometimes with an apostrophe or a 2 beside it. Moves are always a 1/4 face rotation. A rubikscube.move with nothing beside it represents a clockwise rotation on its face axis, a rubikscube.move with an apostrophe represents an anti-clockwise rotation on its face axis and a 2 represents 180 degree rotation.";
        moveName.innerHTML = "F";
        await rubikscube.move("F");
        await delay(1000);
        moveName.innerHTML = "F'";
        await rubikscube.move("F'");
        await delay(1000);
        moveName.innerHTML = "F2";
        await rubikscube.move("F2");
        await delay(1000);
        moveName.innerHTML = "";
        rubikscube.setMoveAnimationSpeed(1000);
        await rubikscube.move("F2");
        rubikscube.setMoveAnimationSpeed();

        previous.addEventListener("click", eleventh);
        next.addEventListener("click", thirteenth);
    }
    async function thirteenth() {
        previous.removeEventListener("click", eleventh);
        next.removeEventListener("click", thirteenth);

        revertHighlight(pieces);
        pieces.length = 0;
        Object.keys(firstNotation).forEach((element) =>
            pieces.push(getPositionByNotation(element))
        );
        highlightPieces(pieces);
        infoHeader.innerHTML = "MOVES: BACK (B)";
        infoPara.innerHTML =
            "Moves are universal notations used to denote turns for each of the faces. Moves are represented by the first letter of the face and sometimes with an apostrophe or a 2 beside it. Moves are always a 1/4 face rotation. A rubikscube.move with nothing beside it represents a clockwise rotation on its face axis, a rubikscube.move with an apostrophe represents an anti-clockwise rotation on its face axis and a 2 represents 180 degree rotation.";
        moveName.innerHTML = "B";
        await rubikscube.move("B");
        await delay(1000);
        moveName.innerHTML = "B'";
        await rubikscube.move("B'");
        await delay(1000);
        moveName.innerHTML = "B2";
        await rubikscube.move("B2");
        await delay(1000);
        moveName.innerHTML = "";
        rubikscube.setMoveAnimationSpeed(1000);
        await rubikscube.move("B2");
        rubikscube.setMoveAnimationSpeed();

        previous.addEventListener("click", twelfth);
    }
    next.addEventListener("click", first);

    function keyboardControls(event) {
        if (event.key == "ArrowRight") {
            next.click();
        } else if (event.key == "ArrowLeft") {
            previous.click();
        }
    }
    document.addEventListener("keyup", keyboardControls);
}

let allFaces;
let selectedFace;
async function getUserCube() {
    await delay(1000);
    firstNotation = rubikscube.getNotation();
    Object.keys(firstNotation).forEach((element) =>
        pieces.push(getPositionByNotation(element))
    );
    revertHighlight(pieces);
    pieces.length = 0;
    const centers = ["U", "D", "F", "B", "R", "L"];
    centers.forEach((element) => {
        pieces.push(getPositionByNotation(element));
    });
    highlightPieces(pieces);

    const pointer = new Vector2();
    const raycaster = new Raycaster();

    const whiteButton = document.querySelector("#whiteButton");
    const redButton = document.querySelector("#redButton");
    const greenButton = document.querySelector("#greenButton");
    const yellowButton = document.querySelector("#yellowButton");
    const orangeButton = document.querySelector("#orangeButton");
    const blueButton = document.querySelector("#blueButton");
    const finished = document.querySelector("#finished");

    let selectedColor;
    function selectFace(event) {
        pointer.x = -1 + (2 * event.offsetX) / container.clientWidth;
        pointer.y = 1 - (2 * event.offsetY) / container.clientHeight;
        raycaster.setFromCamera(pointer, world.camera);
        try {
            const intersects = raycaster.intersectObjects(allFaces);
            if (selectedFace) {
                selectedFace.material.color.set(0x555555);
            }
            selectedFace = intersects[0].object;
            if (selectedColor) {
                selectedFace.material.color.set(selectedColor);
                selectedFace = undefined;
            } else {
                selectedFace.material.color.set(0x999999);
            }
        } catch (error) {}
    }

    whiteButton.addEventListener("click", () => {
        if (!selectedColor) {
            selectedColor = 0xffffff;
        } else {
            selectedColor = undefined;
        }
        if (selectedFace) {
            selectedFace.material.color.set(selectedColor);
            selectedFace = undefined;
        }
    });
    redButton.addEventListener("click", () => {
        if (!selectedColor) {
            selectedColor = 0xff0000;
        } else {
            selectedColor = undefined;
        }
        if (selectedFace) {
            selectedFace.material.color.set(0xff0000);
            selectedFace = undefined;
        }
    });
    greenButton.addEventListener("click", () => {
        if (!selectedColor) {
            selectedColor = 0x00ff00;
        } else {
            selectedColor = undefined;
        }
        if (selectedFace) {
            selectedFace.material.color.set(selectedColor);
            selectedFace = undefined;
        }
    });
    orangeButton.addEventListener("click", () => {
        if (!selectedColor) {
            selectedColor = 0xffa500;
        } else {
            selectedColor = undefined;
        }
        if (selectedFace) {
            selectedFace.material.color.set(selectedColor);
            selectedFace = undefined;
        }
    });
    blueButton.addEventListener("click", () => {
        if (!selectedColor) {
            selectedColor = 0x0000ff;
        } else {
            selectedColor = undefined;
        }
        if (selectedFace) {
            selectedFace.material.color.set(selectedColor);
            selectedFace = undefined;
        }
    });
    yellowButton.addEventListener("click", () => {
        if (!selectedColor) {
            selectedColor = 0xffff00;
        } else {
            selectedColor = undefined;
        }
        if (selectedFace) {
            selectedFace.material.color.set(selectedColor);
            selectedFace = undefined;
        }
    });

    window.addEventListener("click", selectFace);

    function userFinished() {
        let faces = rubikscube.getCubeString();
        if (faces.includes("E")) {
            console.log("not finished");
        }
    }
    finished.addEventListener("click", userFinished);
}

let beforeHighlight = [];
function highlightPieces(pieces) {
    beforeHighlight = [];
    allFaces = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
                if (pieces.includes([i - 1, j - 1, k - 1].join())) {
                    continue;
                } else {
                    for (let w = 0; w < 6; w++) {
                        allFaces.push(rubiksCube.pieces[i][j][k].faces[w]);
                        beforeHighlight.push(
                            rubiksCube.pieces[i][j][k].faces[
                                w
                            ].material.color.getHex()
                        );
                        rubiksCube.pieces[i][j][k].faces[w].material.color.set(
                            0x555555
                        );
                    }
                }
            }
        }
    }
}

function revertHighlight(pieces) {
    let count = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
                if (pieces.includes([i - 1, j - 1, k - 1].join())) {
                    continue;
                } else {
                    for (let w = 0; w < 6; w++) {
                        rubiksCube.pieces[i][j][k].faces[w].material.color.set(
                            beforeHighlight[count]
                        );
                        count++;
                    }
                }
            }
        }
    }
}

// thanks to: https://stackoverflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value
function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
}

function getPositionByNotation(value, notation = firstNotation) {
    return notationPositions[getKeyByValue(notation, value)];
}

// thanks to: https://stackoverflow.com/questions/14226803/wait-5-seconds-before-executing-next-line
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// to help with different permutations of a string
function sortString(str) {
    return str.split("").sort().join("");
}

// introduction()
// getUserCube()

rubikscube.setMoveAnimationSpeed(10000);
let scramble = generateScramble();
// let scramble = `x2 R U R' U' x2`.split(" ")
console.log("scramble:", scramble.join(" "));
for (let i = 0; i < scramble.length; i++) {
    await rubikscube.move(scramble[i]);
}
// rubikscube.setMoveAnimationSpeed()
// await delay(1000)

let solution = {
    daisy: [],
    cross: [],
    firstLayer: [],
    secondLayer: [],
    yellowCross: [],
    yellowFace: [],
    lastLayerCorners: [],
    lastLayerEdges: [],
};
let steps = [...Object.keys(solution)];

let daisyDone = false;
async function solveDaisy() {
    // getting the white edges which are solved in this step
    let currentNotation = rubikscube.getNotation();
    if (currentNotation["D"] !== "U") {
        solution.daisy.push("x2");
        await rubikscube.move("x2");
        currentNotation = rubikscube.getNotation();
    }
    let whiteEdges = Object.keys(currentNotation).filter(
        (key) => key.length === 2 && key.charAt(0) === "U"
    );

    // removing the edges which are in the correct place already from the array
    let i = whiteEdges.length;
    while (i--) {
        if (getKeyByValue(currentNotation, whiteEdges[i]).charAt(0) === "U") {
            whiteEdges.splice(i, 1);
        }
    }

    // base case for recursion, when all edges are in the correct position, we can return
    if (whiteEdges.length === 0) {
        daisyDone = true;
        return;
    }

    let firstEdgePosition = getKeyByValue(currentNotation, whiteEdges[0]);
    if (!solution.daisy.includes(`Current Piece: ${whiteEdges[0]}`)) {
        solution.daisy.push(`Current Piece: ${whiteEdges[0]}`);
    }

    // if the edge is in the correct position but flipped
    if (firstEdgePosition.charAt(1) === "U") {
        while (!(firstEdgePosition === "RU")) {
            solution.daisy.push("y");
            await rubikscube.move("y");
            currentNotation = rubikscube.getNotation();
            firstEdgePosition = getKeyByValue(currentNotation, whiteEdges[0]);
        }
        solution.daisy.push("R'");
        solution.daisy.push("U");
        solution.daisy.push("F'");
        await rubikscube.move("R'");
        await rubikscube.move("U");
        await rubikscube.move("F'");

        await solveDaisy();
        return;
    }

    // moving the cube until we find a white edge to rubikscube.move
    while (!firstEdgePosition.includes("R")) {
        solution.daisy.push("y");
        await rubikscube.move("y");
        currentNotation = rubikscube.getNotation();
        firstEdgePosition = getKeyByValue(currentNotation, whiteEdges[0]);
    }

    // moving the up layer until theres no white piece on the right side which we will be switching so that we dont push it out of the layer
    while (currentNotation["UR"].includes("U")) {
        solution.daisy.push("U");
        await rubikscube.move("U");
        currentNotation = rubikscube.getNotation();
    }

    // doing R moves to get it in the top layer where we want it
    while (!currentNotation["UR"].includes("U")) {
        solution.daisy.push("R");
        await rubikscube.move("R");
        currentNotation = rubikscube.getNotation();
    }

    // now that one of the pieces is in the correct position we can again use this function to solve the rest of the edge pieces left
    await solveDaisy();
}

async function solveCross() {
    let currentNotation = rubikscube.getNotation();
    if (currentNotation["D"] !== "U") {
        solution.cross.push("x2");
        await rubikscube.move("x2");
        currentNotation = rubikscube.getNotation();
    }
    let whiteEdges = Object.keys(currentNotation).filter(
        (key) => key.length === 2 && key.charAt(0) === "U"
    );

    for (let i = whiteEdges.length - 1; i >= 0; i--) {
        let EdgePosition = getKeyByValue(currentNotation, whiteEdges[i]);
        if (
            EdgePosition.charAt(0) === "D" &&
            currentNotation[EdgePosition].charAt(1) ===
                currentNotation[EdgePosition.charAt(1)]
        ) {
            whiteEdges.splice(i, 1);
        }
    }

    if (whiteEdges.length === 0) {
        return;
    }

    if (!daisyDone) {
        if (currentNotation["U"] !== "U") {
            solution.cross.push("x2");
            await rubikscube.move("x2");
            currentNotation = rubikscube.getNotation();
        }
        await solveDaisy();
        currentNotation = rubikscube.getNotation();
    }

    while (currentNotation["UF"].charAt(0) !== "U") {
        await rubikscube.move("y");
        solution.cross.push("y");
        currentNotation = rubikscube.getNotation();
    }

    if (!solution.cross.includes(`Current Piece: ${currentNotation["UF"]}`)) {
        solution.cross.push(`Current Piece: ${currentNotation["UF"]}`);
    }

    while (currentNotation["F"] !== currentNotation["UF"].charAt(1)) {
        await rubikscube.move("d");
        solution.cross.push("d");
        currentNotation = rubikscube.getNotation();
    }

    if (
        currentNotation["UF"].charAt(0) === "U" &&
        currentNotation["F"] === currentNotation["UF"].charAt(1)
    ) {
        await rubikscube.move("F2");
        solution.cross.push("F2");
    }

    await solveCross();
}

async function solveFirstLayer() {
    let currentNotation = rubikscube.getNotation();
    if (currentNotation["U"] !== "U") {
        solution.firstLayer.push("x2");
        await rubikscube.move("x2");
        currentNotation = rubikscube.getNotation();
    }

    let whiteCorners = Object.keys(currentNotation).filter(
        (key) => key.length === 3 && key.charAt(0) === "U"
    );

    for (let i = whiteCorners.length - 1; i >= 0; i--) {
        let cornerPosition = getKeyByValue(currentNotation, whiteCorners[i]);
        if (
            cornerPosition.charAt(0) === "U" &&
            currentNotation[cornerPosition].charAt(1) ===
                currentNotation[cornerPosition.charAt(1)]
        ) {
            whiteCorners.splice(i, 1);
        }
    }

    if (whiteCorners.length === 0) {
        return;
    }

    let whiteCornersSorted = [...whiteCorners];
    for (let i = 0; i < whiteCornersSorted.length; i++) {
        let element = whiteCornersSorted[i];
        element = sortString(element);
        whiteCornersSorted[i] = element;
    }

    async function getCornerOut(piece = null) {
        let condition = piece
            ? sortString(currentNotation["UFR"]) !== sortString(piece)
            : !whiteCornersSorted.includes(sortString(currentNotation["UFR"]));
        let rotation = 0;
        while (condition) {
            solution.firstLayer.push("y");
            await rubikscube.move("y");
            rotation++;
            currentNotation = rubikscube.getNotation();
            condition = piece
                ? sortString(currentNotation["UFR"]) !== sortString(piece)
                : !whiteCornersSorted.includes(
                      sortString(currentNotation["UFR"])
                  );
        }
        solution.firstLayer.push("R'");
        await rubikscube.move("R'");
        solution.firstLayer.push("D'");
        await rubikscube.move("D'");
        solution.firstLayer.push("R");
        await rubikscube.move("R");
        while (rotation) {
            solution.firstLayer.push("y'");
            await rubikscube.move("y'");
            rotation--;
        }
    }

    let rotationCount = 0;
    while (currentNotation["UFR"].includes("U")) {
        solution.firstLayer.push("y");
        await rubikscube.move("y");
        currentNotation = rubikscube.getNotation();
        rotationCount++;
        if (rotationCount === 4) {
            await getCornerOut();
        }
    }

    rotationCount = 0;
    let requiredPiece = "U" + currentNotation["F"] + currentNotation["R"];
    if (!solution.firstLayer.includes(`Current Piece: ${requiredPiece}`)) {
        solution.firstLayer.push(`Current Piece: ${requiredPiece}`);
    }
    while (sortString(currentNotation["DRF"]) !== sortString(requiredPiece)) {
        solution.firstLayer.push("D");
        await rubikscube.move("D");
        currentNotation = rubikscube.getNotation();
        rotationCount++;
        if (rotationCount === 4) {
            await getCornerOut(requiredPiece);
        }
    }

    if (currentNotation["DRF"].charAt(0) === "U") {
        solution.firstLayer.push("Algorithm: downFacingCorner");
        solution.firstLayer.push("F");
        await rubikscube.move("F");
        solution.firstLayer.push("D'");
        await rubikscube.move("D'");
        solution.firstLayer.push("F'");
        await rubikscube.move("F'");
        solution.firstLayer.push("D2");
        await rubikscube.move("D2");
        solution.firstLayer.push("Algorithm: Done");
        currentNotation = rubikscube.getNotation();
    }

    if (currentNotation["RFD"].charAt(0) === "U") {
        solution.firstLayer.push("Algorithm: rightFacingCorner");
        solution.firstLayer.push("D");
        await rubikscube.move("D");
        solution.firstLayer.push("F");
        await rubikscube.move("F");
        solution.firstLayer.push("D'");
        await rubikscube.move("D'");
        solution.firstLayer.push("F'");
        await rubikscube.move("F'");
        solution.firstLayer.push("Algorithm: Done");
        currentNotation = rubikscube.getNotation();
    }

    if (currentNotation["FDR"].charAt(0) === "U") {
        solution.firstLayer.push("Algorithm: frontFacingCorner");
        solution.firstLayer.push("D'");
        await rubikscube.move("D'");
        solution.firstLayer.push("R'");
        await rubikscube.move("R'");
        solution.firstLayer.push("D");
        await rubikscube.move("D");
        solution.firstLayer.push("R");
        await rubikscube.move("R");
        solution.firstLayer.push("Algorithm: Done");
        currentNotation = rubikscube.getNotation();
    }

    await solveFirstLayer();
}

async function solveSecondLayer() {
    let currentNotation = rubikscube.getNotation();
    if (currentNotation["D"] !== "U") {
        solution.secondLayer.push("x2");
        await rubikscube.move("x2");
        currentNotation = rubikscube.getNotation();
    }

    let secondLayerEdges = ["RF", "RB", "LF", "LB"];

    for (let i = secondLayerEdges.length - 1; i >= 0; i--) {
        let EdgePosition = getKeyByValue(currentNotation, secondLayerEdges[i]);
        if (
            currentNotation[EdgePosition].charAt(0) ===
                currentNotation[EdgePosition.charAt(0)] &&
            currentNotation[EdgePosition].charAt(1) ===
                currentNotation[EdgePosition.charAt(1)]
        ) {
            secondLayerEdges.splice(i, 1);
        }
    }

    if (secondLayerEdges.length === 0) {
        return;
    }

    let secondLayerEdgesSorted = [...secondLayerEdges];
    for (let i = 0; i < secondLayerEdgesSorted.length; i++) {
        let element = secondLayerEdgesSorted[i];
        element = sortString(element);
        secondLayerEdgesSorted[i] = element;
    }

    async function movingRight() {
        solution.secondLayer.push("Algorithm: movingRight");
        solution.secondLayer.push("U");
        await rubikscube.move("U");
        solution.secondLayer.push("R");
        await rubikscube.move("R");
        solution.secondLayer.push("U'");
        await rubikscube.move("U'");
        solution.secondLayer.push("R'");
        await rubikscube.move("R'");
        solution.secondLayer.push("U'");
        await rubikscube.move("U'");
        solution.secondLayer.push("F'");
        await rubikscube.move("F'");
        solution.secondLayer.push("U");
        await rubikscube.move("U");
        solution.secondLayer.push("F");
        await rubikscube.move("F");
        solution.secondLayer.push("Algorithm: Done");
    }
    async function movingLeft() {
        solution.secondLayer.push("Algorithm: movingLeft");
        solution.secondLayer.push("y'");
        await rubikscube.move("y'");
        solution.secondLayer.push("U'");
        await rubikscube.move("U'");
        solution.secondLayer.push("F'");
        await rubikscube.move("F'");
        solution.secondLayer.push("U");
        await rubikscube.move("U");
        solution.secondLayer.push("F");
        await rubikscube.move("F");
        solution.secondLayer.push("U");
        await rubikscube.move("U");
        solution.secondLayer.push("R");
        await rubikscube.move("R");
        solution.secondLayer.push("U'");
        await rubikscube.move("U'");
        solution.secondLayer.push("R'");
        await rubikscube.move("R'");
        solution.secondLayer.push("Algorithm: Done");
    }
    async function getEdgeOut() {
        while (
            !secondLayerEdgesSorted.includes(sortString(currentNotation["FR"]))
        ) {
            solution.secondLayer.push("y");
            await rubikscube.move("y");
            currentNotation = rubikscube.getNotation();
        }
        await movingRight();
    }

    let rotationCount = 0;
    let yCount = 0;
    while (
        !(
            currentNotation["FU"].charAt(1) !== currentNotation["U"] &&
            currentNotation["FU"].charAt(0) === currentNotation["F"]
        )
    ) {
        solution.secondLayer.push("U");
        await rubikscube.move("U");
        currentNotation = rubikscube.getNotation();
        rotationCount++;
        if (rotationCount === 4) {
            solution.secondLayer.push("y");
            await rubikscube.move("y");
            currentNotation = rubikscube.getNotation();
            rotationCount = 0;
            yCount++;
            if (yCount === 4) {
                yCount = 0;
                await getEdgeOut();
                await solveSecondLayer();
                return;
            }
        }
    }

    if (
        !solution.secondLayer.includes(
            `Current Piece: ${currentNotation["FU"]}`
        )
    ) {
        solution.secondLayer.push(`Current Piece: ${currentNotation["FU"]}`);
    }

    if (currentNotation["FU"].charAt(1) === currentNotation["R"]) {
        await movingRight();
    } else {
        await movingLeft();
    }

    await solveSecondLayer();
}

async function solveYellowCross() {
    let currentNotation = rubikscube.getNotation();
    if (currentNotation["D"] !== "U") {
        solution.yellowCross.push("x2");
        await rubikscube.move("x2");
        currentNotation = rubikscube.getNotation();
    }

    let yellowEdges = Object.keys(currentNotation).filter(
        (key) => key.length === 2 && key.charAt(0) === "D"
    );

    for (let i = yellowEdges.length - 1; i >= 0; i--) {
        let EdgePosition = getKeyByValue(currentNotation, yellowEdges[i]);
        if (EdgePosition.charAt(0) !== "U") {
            yellowEdges.splice(i, 1);
        }
    }

    if (yellowEdges.length === 4) {
        return;
    }

    async function orientEdges() {
        solution.yellowCross.push("Algorithm: orientEdges");
        solution.yellowCross.push("F");
        await rubikscube.move("F");
        solution.yellowCross.push("U");
        await rubikscube.move("U");
        solution.yellowCross.push("R");
        await rubikscube.move("R");
        solution.yellowCross.push("U'");
        await rubikscube.move("U'");
        solution.yellowCross.push("R'");
        await rubikscube.move("R'");
        solution.yellowCross.push("F'");
        await rubikscube.move("F'");
        solution.yellowCross.push("Algorithm: Done");
    }

    if (yellowEdges.length === 0) {
        await orientEdges();
    }

    if (yellowEdges.length === 2) {
        while (
            !(
                yellowEdges.includes(currentNotation["UL"]) &&
                yellowEdges.includes(currentNotation["UR"])
            ) &&
            !(
                yellowEdges.includes(currentNotation["UL"]) &&
                yellowEdges.includes(currentNotation["UB"])
            )
        ) {
            solution.yellowCross.push("U");
            await rubikscube.move("U");
            currentNotation = rubikscube.getNotation();
        }

        await orientEdges();
    }

    await solveYellowCross();
}

async function solveYellowFace() {
    let currentNotation = rubikscube.getNotation();
    if (currentNotation["D"] !== "U") {
        solution.yellowFace.push("x2");
        await rubikscube.move("x2");
        currentNotation = rubikscube.getNotation();
    }

    let yellowCorners = Object.keys(currentNotation).filter(
        (key) => key.length === 3 && key.charAt(0) === "D"
    );

    let yellowCornersDone = [];
    for (let i = yellowCorners.length - 1; i >= 0; i--) {
        let cornerPosition = getKeyByValue(currentNotation, yellowCorners[i]);
        if (cornerPosition.charAt(0) === "U") {
            yellowCornersDone.push(yellowCorners[i]);
            yellowCorners.splice(i, 1);
        }
    }

    if (yellowCornersDone.length === 4) {
        return;
    }

    async function orientCorners() {
        solution.yellowFace.push("Algorithm: orientCorners");
        solution.yellowFace.push("R");
        await rubikscube.move("R");
        solution.yellowFace.push("U");
        await rubikscube.move("U");
        solution.yellowFace.push("R'");
        await rubikscube.move("R'");
        solution.yellowFace.push("U");
        await rubikscube.move("U");
        solution.yellowFace.push("R");
        await rubikscube.move("R");
        solution.yellowFace.push("U2");
        await rubikscube.move("U2");
        solution.yellowFace.push("R'");
        await rubikscube.move("R'");
        solution.yellowFace.push("Algorithm: Done");
    }

    if (yellowCornersDone.length === 1) {
        while (currentNotation["ULF"].charAt(0) !== currentNotation["U"]) {
            solution.yellowFace.push("U");
            await rubikscube.move("U");
            currentNotation = rubikscube.getNotation();
        }

        await orientCorners();
    }

    if (yellowCornersDone.length === 2) {
        while (currentNotation["FUL"].charAt(0) !== currentNotation["U"]) {
            solution.yellowFace.push("U");
            await rubikscube.move("U");
            currentNotation = rubikscube.getNotation();
        }

        await orientCorners();
    }

    if (yellowCornersDone.length === 0) {
        while (currentNotation["LFU"].charAt(0) !== currentNotation["U"]) {
            solution.yellowFace.push("U");
            await rubikscube.move("U");
            currentNotation = rubikscube.getNotation();
        }

        await orientCorners();
    }

    await solveYellowFace();
}

async function permuteLastLayerCorners() {
    let currentNotation = rubikscube.getNotation();
    let cubestring = rubikscube.getCubeString();
    if (currentNotation["D"] !== "U") {
        solution.lastLayerCorners.push("x2");
        await rubikscube.move("x2");
        currentNotation = rubikscube.getNotation();
    }

    let lastLayerCorners = Object.keys(currentNotation).filter(
        (key) => key.length === 3 && key.charAt(0) === "D"
    );
    let lastLayerCornersDone = [];

    let center;
    if (cubestring[47] === cubestring[45]) {
        lastLayerCornersDone.push(currentNotation["UBL"]);
        lastLayerCornersDone.push(currentNotation["URB"]);
        center = cubestring[47];
    }
    if (cubestring[20] === cubestring[18]) {
        lastLayerCornersDone.push(currentNotation["ULF"]);
        lastLayerCornersDone.push(currentNotation["UFR"]);
        center = cubestring[20];
    }
    if (cubestring[11] === cubestring[9]) {
        lastLayerCornersDone.push(currentNotation["UFR"]);
        lastLayerCornersDone.push(currentNotation["URB"]);
        center = cubestring[11];
    }
    if (cubestring[38] === cubestring[36]) {
        lastLayerCornersDone.push(currentNotation["UBL"]);
        lastLayerCornersDone.push(currentNotation["ULF"]);
        center = cubestring[38];
    }

    for (let i = lastLayerCorners.length - 1; i >= 0; i--) {
        if (lastLayerCornersDone.includes(lastLayerCorners[i])) {
            lastLayerCorners.splice(i, 1);
        }
    }

    if (lastLayerCorners.length === 0) {
        while (cubestring[11] !== currentNotation["R"]) {
            solution.lastLayerCorners.push("U");
            await rubikscube.move("U");
            currentNotation = rubikscube.getNotation();
            cubestring = rubikscube.getCubeString();
        }
        return;
    }

    async function permuteCorners() {
        solution.lastLayerCorners.push("Algorithm: permuteCorners");
        solution.lastLayerCorners.push("R'");
        await rubikscube.move("R'");
        solution.lastLayerCorners.push("F");
        await rubikscube.move("F");
        solution.lastLayerCorners.push("R'");
        await rubikscube.move("R'");
        solution.lastLayerCorners.push("B2");
        await rubikscube.move("B2");
        solution.lastLayerCorners.push("R");
        await rubikscube.move("R");
        solution.lastLayerCorners.push("F'");
        await rubikscube.move("F'");
        solution.lastLayerCorners.push("R'");
        await rubikscube.move("R'");
        solution.lastLayerCorners.push("B2");
        await rubikscube.move("B2");
        solution.lastLayerCorners.push("R2");
        await rubikscube.move("R2");
        solution.lastLayerCorners.push("U'");
        await rubikscube.move("U'");
        solution.lastLayerCorners.push("Algorithm: Done");
    }

    if (lastLayerCornersDone.length === 2) {
        while (currentNotation["B"] !== center) {
            solution.lastLayerCorners.push("y");
            await rubikscube.move("y");
            currentNotation = rubikscube.getNotation();
        }

        while (
            !(
                lastLayerCornersDone.includes(currentNotation["UBL"]) &&
                lastLayerCornersDone.includes(currentNotation["URB"])
            )
        ) {
            solution.lastLayerCorners.push("U");
            await rubikscube.move("U");
            currentNotation = rubikscube.getNotation();
        }

        await permuteCorners();
    }

    if (lastLayerCornersDone.length === 0) {
        await permuteCorners();
    }

    await permuteLastLayerCorners();
}

async function permuteLastLayerEdges() {
    let currentNotation = rubikscube.getNotation();
    let cubestring = rubikscube.getCubeString();
    if (currentNotation["D"] !== "U") {
        solution.lastLayerEdges.push("x2");
        await rubikscube.move("x2");
        currentNotation = rubikscube.getNotation();
    }

    let lastLayerEdges = Object.keys(currentNotation).filter(
        (key) => key.length === 2 && key.charAt(0) === "D"
    );
    let lastLayerEdgesDone = [];

    if (cubestring[47] === cubestring[46]) {
        lastLayerEdgesDone.push(currentNotation["UB"]);
    }
    if (cubestring[20] === cubestring[19]) {
        lastLayerEdgesDone.push(currentNotation["UF"]);
    }
    if (cubestring[11] === cubestring[10]) {
        lastLayerEdgesDone.push(currentNotation["UR"]);
    }
    if (cubestring[38] === cubestring[37]) {
        lastLayerEdgesDone.push(currentNotation["UL"]);
    }

    for (let i = lastLayerEdges.length - 1; i >= 0; i--) {
        if (lastLayerEdgesDone.includes(lastLayerEdges[i])) {
            lastLayerEdges.splice(i, 1);
        }
    }

    if (lastLayerEdges.length === 0) {
        solution.lastLayerEdges.push("x2");
        await rubikscube.move("x2");
        return;
    }

    async function permuteEdges(side) {
        let way;
        if (side === "left") {
            way = "U";
        } else {
            way = "U'";
        }
        solution.lastLayerEdges.push(`Algorithm: permuteEdges${side}`);
        solution.lastLayerEdges.push("F2");
        await rubikscube.move("F2");
        solution.lastLayerEdges.push(way);
        await rubikscube.move(way);
        solution.lastLayerEdges.push("L");
        await rubikscube.move("L");
        solution.lastLayerEdges.push("R'");
        await rubikscube.move("R'");
        solution.lastLayerEdges.push("F2");
        await rubikscube.move("F2");
        solution.lastLayerEdges.push("L'");
        await rubikscube.move("L'");
        solution.lastLayerEdges.push("R");
        await rubikscube.move("R");
        solution.lastLayerEdges.push(way);
        await rubikscube.move(way);
        solution.lastLayerEdges.push("F2");
        await rubikscube.move("F2");
        solution.lastLayerEdges.push("Algorithm: Done");
    }

    if (lastLayerEdgesDone.length === 1) {
        while (currentNotation["UB"] !== lastLayerEdgesDone[0]) {
            solution.lastLayerEdges.push("y");
            await rubikscube.move("y");
            currentNotation = rubikscube.getNotation();
        }

        if (currentNotation["UF"].charAt(1) === currentNotation["L"]) {
            await permuteEdges("left");
        } else {
            await permuteEdges("right");
        }
    }

    if (lastLayerEdgesDone.length === 0) {
        await permuteEdges("left");
    }

    await permuteLastLayerEdges();
}

await solveCross();
await solveFirstLayer();
await solveSecondLayer();
await solveYellowCross();
await solveYellowFace();
await permuteLastLayerCorners();
await permuteLastLayerEdges();
steps.forEach((step) => {
    solution[step] = shrinkMoveArray(solution[step], true);
});
console.log("solution:", solution);

rubikscube.setMoveAnimationSpeed(10000);
for (let i = steps.length - 1; i >= 0; i--) {
    let step = steps[i];
    for (let j = solution[step].length - 1; j >= 0; j--) {
        let currMove = solution[step][j];
        await rubikscube.move(reverseMove(currMove));
    }
}

rubikscube.setMoveAnimationSpeed();
// for (let index = 0; index < solution.length; index++) {
//     const element = solution[index];
//     await rubikscube.move(element)
// }

let playpause = document.querySelector("#playpause");
let next = document.querySelector("#next");
let previous = document.querySelector("#previous");
let moveName = document.querySelector("#move");

let playing = false;
let moves = [];
steps.forEach((step) => {
    moves.push(...solution[step]);
    moves.push("delay");
});
console.log(moves);
let i = 0;

async function playAllMoves() {
    playing = !playing;
    while (playing && moves[i]) {
        moveName.innerHTML = moves[i];
        if (moves[i] === "delay") {
            await delay(1000);
            i++;
            continue;
        }
        await rubikscube.move(moves[i]);
        i++;
    }
}

async function playNextMove() {
    next.removeEventListener("click", playNextMove);
    if (moves[i]) {
        moveName.innerHTML = moves[i];
        await rubikscube.move(moves[i]);
        i++;
    }
    next.addEventListener("click", playNextMove);
}

async function playPreviousMove() {
    previous.removeEventListener("click", playPreviousMove);
    if (i) {
        i--;
        moveName.innerHTML = moves[i - 1];
        await rubikscube.move(reverseMove(moves[i]));
    }
    previous.addEventListener("click", playPreviousMove);
}

playpause.addEventListener("click", playAllMoves);
next.addEventListener("click", playNextMove);
previous.addEventListener("click", playPreviousMove);

function showSolution() {
    for (let i = 0; i < moves.length; i++) {
        if (moves[i].startsWith("Current Piece")) {
            let pieceToHighlight = moves[i].split(" ").pop();
            console.log(pieceToHighlight);
        }
    }
}

showSolution();
