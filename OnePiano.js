"use strict";

//h1 Defining Selectors.
const parent_container__Btns = document.querySelector(
    ".parent_container__Btns"
);
const piano = document.querySelector(".container1 .piano");
const keys = piano.querySelectorAll(".key");

//h1 Event Listener.
parent_container__Btns.addEventListener("click", (event) => {
    const clicked = event.target.closest("button");
    /// Guard clause
    if (!clicked) return;
    /// Redirect to specific function
    //console.log(event.target.closest('button'))
    switch (clicked.dataset.button) {
        case "notebtn":
            noteBtn(clicked);
            break;
        case "chordcolor":
            chordColorBtn(clicked);
            break;
        case "chordsize":
            chordSizeBtn(clicked);
            break;
        case "accidental":
            accidentalBtn(clicked);
        default:
            break;
    }
    printChord();
});

//h1 Object with State Variables.
const chord = {
    note: null,
    color: "major",
    size: "triad",
    accidental: "natural",
};

const noteBtn = function (HTMLbutton) {
    /// Get all siblings
    const Btns = [...HTMLbutton.parentElement.children];
    Btns.forEach((button) => {
        button.classList.remove("btnSelected");
    });
    HTMLbutton.classList.add("btnSelected");
    //console.log(chord.note)
};
const chordColorBtn = function (HTMLbutton) {
    /// Get all siblings
    const Btns = [...HTMLbutton.parentElement.children];
    Btns.forEach((button) => {
        button.classList.remove("btnSelected");
    });
    HTMLbutton.classList.add("btnSelected");
    //console.log(chord.color)
};
const chordSizeBtn = function (HTMLbutton) {
    /// Special Case. We need to change display of color btns depending of this button.
    /// Get all siblings
    const Btns = [...HTMLbutton.parentElement.children];
    Btns.forEach((button) => {
        button.classList.remove("btnSelected");
    });
    HTMLbutton.classList.add("btnSelected");
    //console.log(chord.size)
    /// Acting on Color Butons.
    const chordColorContainer = [
        ...document.querySelector(".container__chordColorBtns").children,
    ];
    chordColorContainer.forEach((buttons) => {
        [...buttons.children].forEach((button) =>
            button.classList.remove("btnSelected")
        );
        buttons.classList.add("hidden");
    });
    chord.size = HTMLbutton.dataset.chordsize
    if (chord.size == "triad") {
        chordColorContainer[0].classList.remove("hidden");
    } else if (chord.size == "tetrad") {
        chordColorContainer[1].classList.remove("hidden");
    }
    chord.color = null; //! Se resetea el estado del color del chord. Podemos cambiarlo a que tenga uno por defecto. Veamos como funciona mejor.
};
const accidentalBtn = function (HTMLbutton) {
    /// Special Case. The button can be 'turned off'.
    /// Get all siblings
    const Btns = [...HTMLbutton.parentElement.children];
    if (HTMLbutton.classList.contains("btnSelected")) {
        /// Apagamos el boton
        HTMLbutton.classList.remove("btnSelected");
    } else {
        Btns.forEach((button) => {
            button.classList.remove("btnSelected");
        });
        HTMLbutton.classList.add("btnSelected");
    }
    //console.log(chord.accidental)
};

function checkChord() {
    /// chordCheck returns true if all fields are valid.
    const chordCheck = Object.values(chord).reduce((acc, field) => {
        if (!field & field !== 0) {
            acc = false};
        return acc;
    }, true);
    return chordCheck;
}

function printChord() {
    console.log(getChordData());
    /// Guard clause: Si el objeto chord tiene algun campo null, no hacer nada. Si todos son no null, hacer algo.
    if (!checkChord()) {
        console.log('Se corta')
        removeKeys()
        return
    }
    console.log('Hacer algo')
    rootNoteNumber(chord)
    const keysInfo = {
        major: [0, 4, 7],
        minor: [0, 3, 7],
        diminished: [0, 3, 6],
        augmented: [0, 4, 8],
        sus2: [0, 2, 7],
        sus4: [0, 5, 7],
        maj7: [0, 4, 7, 11],
        minor7: [0, 3, 7, 10],
        dominant7: [0, 4, 7, 10], /// Major with minor at the end.
    };
    const intervals = keysInfo[chord.color].map((interval)=> (interval + chord.number)%12)
    //console.log('intervals',intervals) 
    markKeys(intervals)
}

function getChordData() {
    /// See which buttons are selected.
    chord.chordSize = [
        ...parent_container__Btns.querySelector(".container__chordSizeBtns")
            .children,
    ].filter((button) => {
        return button.classList.contains("btnSelected");
    })[0].dataset.chordsize;
    const colorBtns = [
        ...parent_container__Btns.querySelector(".container__chordColorBtns")
            .children[0].children,
        ...parent_container__Btns.querySelector(".container__chordColorBtns")
            .children[1].children,
    ];
    try{
        chord.color = colorBtns.filter((button) => {return button.classList.contains("btnSelected")})[0].dataset.chordcolor
    } catch {
        chord.color = undefined
    }
    
    try{
        chord.note = [
            ...parent_container__Btns.querySelector(".container__noteBtns").children].filter((button) => {
                return button.classList.contains("btnSelected");
            })[0].dataset.note;
    } catch {
        chord.note = undefined
    }

    chord.accidental = [
        ...parent_container__Btns.querySelector(".container__accidentalsBtns")
            .children,
    ].filter((button) => {
        return button.classList.contains("btnSelected");
    })[0];
    if (!chord.accidental) chord.accidental = 'natural'
    else {
        chord.accidental = chord.accidental.dataset.accidental;
    }
    return chord
}
function rootNoteNumber() {
    const notesOrder = {
        Cb: 11,
        C: 0,
        Cs: 1,
        Db: 1,
        D: 2,
        Ds: 3,
        Eb: 3,
        E: 4,
        Fb: 4,
        Es: 5,
        F: 5,
        Fs: 6,
        Gb: 6,
        G: 7,
        Gs: 8,
        Ab: 8,
        A: 9,
        As: 10,
        Bb: 10,
        B: 11,
        Bs: 0,
    };
    /// Calculate rootNoteNumber based on chord object info.
    if (chord.accidental == 'sharp'){
        chord.number = ((notesOrder[chord.note] + 1)%12)
    } else if (chord.accidental == 'bemol'){
        chord.number = (((notesOrder[chord.note]-1)+12)%12)
    } else {
        chord.number = notesOrder[chord.note]
    }
}
function markKeys(intervals){
    removeKeys()
    intervals.forEach((keyNumber,index)=>{
        console.log('index',index,'key',keyNumber)
        if (index === 0){
            /// This is the rootNote.
            const rootKeys = piano.querySelectorAll(`[data-notenumber="${keyNumber}"]`)
            console.log(rootKeys)
            rootKeys.forEach(key=>key.classList.add('rootKeySelected'))
        } else {
            /// This are other notes.
            const otherKeys = piano.querySelectorAll(`[data-notenumber="${keyNumber}"]`)
            otherKeys.forEach(key=>key.classList.add('keySelected'))
        }
    })
}
function removeKeys(){
    const allKeys = piano.querySelectorAll('.key')
    allKeys.forEach((key)=>{
        key.classList.remove('rootKeySelected')
        key.classList.remove('keySelected')
    })
}
