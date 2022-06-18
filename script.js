"use strict";

function piano(containerReference) {
    const stringButtons = `.container.${containerReference} button`;
    const allButtons = document.querySelectorAll(stringButtons);
    const stringKeys = `.${containerReference} .key`;
    const keys = document.querySelectorAll(stringKeys);
    //console.log(allButtons);
    //console.log(keys);

    //h1 Triad/Tetrads Buttons.
    const BooleanChordSize = { triad: true, tetrad: false };
    /// Filtramos de todos los botones, los que corresponden.
    const chordSizeBtns = [...allButtons].filter((button) => {
        return Object.keys(button.dataset)[0] === "chordsize";
    });
    /// Triad div and Tetrad div.
    const triadDivString = `.container.${containerReference} div.triadBtns`;
    const triadDiv = document.querySelector(triadDivString);
    const tetradDivString = `.container.${containerReference} div.tetradBtns`;
    const tetradDiv = document.querySelector(tetradDivString);
    //h2 EventListeners
    for (let button of chordSizeBtns) {
        button.addEventListener("click", function () {
            selectChordSize(this.dataset.chordsize);
            //! showTriadButtons(); Debemos integrar esta opción para que segun el boton triad/tedrad, aparezcan los botones correspondientes de los chordColors.
        });
    }
    //h2 Select Triad/Tetrad
    function selectChordSize(chordSize) {
        /// Esta función maneja un objeto de 2 booleanos, segun el tamaño del acorde.
        /// Manipula también las clases de los botones Triad/Tetrad del DOM para mostrar cuál está seleccionado.)
        if (chordSize === "triad") {
            changeBooleanChordColor('major');
            console.log(BooleanChordColor);
            //console.log('triad')
            [BooleanChordSize["triad"], BooleanChordSize["tetrad"]] = [
                true,
                false,
            ];
            chordSizeBtns[0].classList.add("btnSelected");
            chordSizeBtns[1].classList.remove("btnSelected");
            triadDiv.classList.remove('hidden');
            tetradDiv.classList.add('hidden');

        } else if (chordSize === "tetrad") {
            changeBooleanChordColor('maj7');
            console.log(BooleanChordColor);
            //console.log('tetrad')
            [BooleanChordSize["triad"], BooleanChordSize["tetrad"]] = [
                false,
                true,
            ];
            chordSizeBtns[0].classList.remove("btnSelected");
            chordSizeBtns[1].classList.add("btnSelected");
            triadDiv.classList.add('hidden');
            tetradDiv.classList.remove('hidden');
        }
    }
    //h1 All ChordColor Buttons.
    const BooleanChordColor = {
        major: true,
        minor: false,
        diminished: false,
        augmented: false,
        sus2: false,
        sus4: false,
        maj7: false,
        minor7: false,
        dominant7: false,
    };

    function changeBooleanChordColor(string){
        const ObjectArray = Object.keys(BooleanChordColor)
        ObjectArray.forEach((key)=>{
            if (key !== string){
                BooleanChordColor[key] = false;
            } else if (key === string){
                BooleanChordColor[key] = true;
                console.log(chordColorBtns);
                const chordColorbtn = chordColorBtns.filter((button)=>{
                    return button.dataset['chordcolor'] === string
                })
                console.log(chordColorbtn[0].classList);
                chordColorbtn[0].classList.add("btnSelected");
            }
        });
        
    }


    const chordColorBtns = [...allButtons].filter((button) => {
        return Object.keys(button.dataset)[0] === "chordcolor";
    });
    //h2 EventListeners
    for (let button of chordColorBtns) {
        button.addEventListener("click", function () {
            //console.log(this)
            selectChordColor(button);
        });
    }
    //h2 Select Mayor/Minor chord.
    function selectChordColor(chordColorBtn) {
        /// Esta función maneja un objeto de 6 booleanos, segun el color del acorde que se elija.
        /// Manipula también las clases de los botones Mayor/Minor/Diminished/Augmented/Sus2/Sus4 del DOM para mostrar cuál está seleccionado.
        const chordColor = chordColorBtn.dataset.chordcolor;
        chordColorBtns.forEach((button) => {
            const chordColorIterator = button.dataset.chordcolor; /// chord color del boton de turno en el loop
            if (chordColorIterator === chordColor) {
                BooleanChordColor[chordColor] = true;
                button.classList.add("btnSelected");
            } else {
                BooleanChordColor[chordColorIterator] = false;
                button.classList.remove("btnSelected");
            }
        });
    }
    //h1 Accidental Buttons.
    const BooleanAccidental = { sharp: false, bemol: false, natural: true };
    const accidentalBtns = [...allButtons].filter((button) => {
        return Object.keys(button.dataset)[0] === "accidental";
    });
    //h2 EventListeners
    for (let button of accidentalBtns) {
        button.addEventListener("click", function () {
            selectAccidental(button);
        });
    }
    //h2 Select Accidental
    function selectAccidental(accidentalBtn) {
        /// Esta funcion maneja un objeto de 3 booleans, segun el accidental que se elija o no.
        /// Manipula también las clases de los botones '#' y 'b' del DOM para mostrar cual accidental está seleccionado. Si no hay accidental seleccionado, es porque el chord es natural (sin accidentals).
        const accidental = accidentalBtn.dataset.accidental;
        if (accidental === "sharp") {
            /// preguntamos si ya estaba activo.
            const active = accidentalBtn.classList.contains("btnSelected");
            if (active) {
                accidentalBtn.classList.remove("btnSelected");
                [BooleanAccidental["sharp"], BooleanAccidental["natural"]] = [
                    false,
                    true,
                ];
            } else {
                accidentalBtns[0].classList.add("btnSelected");
                accidentalBtns[1].classList.remove("btnSelected");
                [
                    BooleanAccidental["sharp"],
                    BooleanAccidental["bemol"],
                    BooleanAccidental["natural"],
                ] = [true, false, false];
            }
        } else if (accidental === "bemol") {
            /// preguntamos si ya estaba activo.
            const active = accidentalBtn.classList.contains("btnSelected");
            if (active) {
                accidentalBtn.classList.remove("btnSelected");
                [BooleanAccidental["bemol"], BooleanAccidental["natural"]] = [
                    false,
                    true,
                ];
            } else {
                accidentalBtns[0].classList.remove("btnSelected");
                accidentalBtns[1].classList.add("btnSelected");
                [
                    BooleanAccidental["sharp"],
                    BooleanAccidental["bemol"],
                    BooleanAccidental["natural"],
                ] = [false, true, false];
            }
        }
    }

    //h1 Note Buttons.
    const noteBtns = [...allButtons].filter((button) => {
        return Object.keys(button.dataset)[0] === "note";
    });
    const BooleanNoteBtns = {
        C: false,
        D: false,
        E: false,
        F: false,
        G: false,
        A: false,
        B: false,
    };
    //h2 EventListeners
    for (let button of noteBtns) {
        button.addEventListener("click", function () {
            selectRootNote(this);
        });
    }
    //h2 Select RootNote
    function selectRootNote(rootNoteBtn) {
        /// Esta funcion maneja un objeto con booleanos acorde a la nota seleccionada.
        /// Maneja también las clases de los botones notas del DOM para mostrar cuál está seleccionado.
        const rootNote = rootNoteBtn.dataset.note;
        noteBtns.forEach((noteBtn) => {
            /// remove btnSelected class from all buttons.
            noteBtn.classList.remove("btnSelected");
            BooleanNoteBtns[noteBtn.dataset.note] = false;
        });
        /// add 'btnSelected' and set true only to selected btn.
        BooleanNoteBtns[rootNote] = true;
        rootNoteBtn.classList.add("btnSelected");
    }

    //h1 Key Buttons
    //console.log(keys)
    //h2 EventListeners
    for (let key of keys) {
        //console.log(tecla)
        key.addEventListener("click", function () {
            console.log(this.dataset.note);
        });
    }
    //h2 Select Keys
    function selectKeys() {
        const ChordData = getChordData();
        console.log("Key Data (selectKeys())", ChordData);
        removeKeyMarks(); /// Start with a fresh keyboard.
        markKeys(ChordData);
    }
    function removeKeyMarks() {
        keys.forEach((key) => {
            /// Removemos seleccionada.
            key.classList.remove("rootKeySelected");
            key.classList.remove("keySelected");
        });
    }
    function markKeys(ChordData) {
        const KeysInfo = {
            triad: {
                major: [0, 4, 7],
                minor: [0, 3, 7],
                diminished: [0, 3, 6],
                augmented: [0, 4, 8],
                sus2: [0, 2, 7],
                sus4: [0, 5, 7],
            },
            tetrad: {
                maj7: [0, 4, 7, 11],
                minor7: [0, 3, 7, 10],
                dominant7: [0, 4, 7, 10], /// Major with minor at the end.
            },
        };
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

        const rootNoteNumber = notesOrder[ChordData.rootNote]; /// Number from 0 to 11 wich corresponds rootNote DOM key.
        const [chordSize, chordColor] = [
            ChordData.chordSize,
            ChordData.chordColor,
        ];
        const chordNumbers = KeysInfo[chordSize][chordColor]; /// Array from KeysInfo with chord numbers.
        const rootNoteKey = [...keys].filter((key) => {
            /// DOM rootNote key.
            return Number(key.dataset.notenumber) === rootNoteNumber;
        });
        /// Mark Keys.
        for (const [index, noteIndex] of chordNumbers.entries()) {
            if (index === 0) { /// For Root Note
                const keyNumber = (noteIndex + rootNoteNumber) % 12;
                const keysDOM = [...keys];
                const keyNumberDOM = keysDOM.filter((keyButton) => {
                    return Number(keyButton.dataset.notenumber) === keyNumber;
                });
                keyNumberDOM.forEach((key) =>
                    key.classList.add("rootKeySelected")
                );
            } else {
                const keyNumber = (noteIndex + rootNoteNumber) % 12;
                const keysDOM = [...keys];
                const keyNumberDOM = keysDOM.filter((keyButton) => {
                    return Number(keyButton.dataset.notenumber) === keyNumber;
                });
                keyNumberDOM.forEach((key) => key.classList.add("keySelected"));
            }
        }
    }

    //h1 Get Chord Data
    /// Obtenemos la informacion de todos los botones.
    function getChordData() {
        const ChordData = {
            accidental: Object.keys(BooleanAccidental).find((key) => {
                return BooleanAccidental[key] === true;
            }),
            rootNote: Object.keys(BooleanNoteBtns).find((key) => {
                return BooleanNoteBtns[key] === true;
            }),
            chordSize: Object.keys(BooleanChordSize).find((key) => {
                return BooleanChordSize[key] === true;
            }),
            chordColor: Object.keys(BooleanChordColor).find((key) => {
                return BooleanChordColor[key] === true;
            }),
        };
        if (!BooleanAccidental.natural) {
            /// Si es falso significa que la nota tiene un accidental.
            BooleanAccidental.sharp == true
                ? (ChordData.rootNote += "s")
                : (ChordData.rootNote += "b");
        }
        return ChordData;
    }

    allButtons.forEach((button) =>
        button.addEventListener("click", selectKeys)
    ); /// Este event listener debe estar despues de todos los demás para rescatar la última información disponible de los botones!
}

piano("container1");
piano("container2");
piano("container3");
piano("container4");


