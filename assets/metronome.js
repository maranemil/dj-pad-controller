//let sandBox;
let savedSong;
let savedSongSample;
let siteLoaded = 0;
let timesPressed = 0;
let sampleLoaded = "kanye";
//let savedRhythms;
let eighth = 0;
let quarter = 0;
let threeEighths = 0;
let halfNote = 0;
let keyDownTime;
let stopTime = 0;
//const firstShow = false;
let secondPlaying = false;
let startMessage = 0;
let letter;
let presetLoaded = false;

let a = false; //changes on key-up
let b = false; //changes on key-up
let c = false; //changes on key-up
let d = false; //changes on key-up
let e = false; //changes on key-up
let f = false; //changes on key-up
let g = false; //changes on key-up
let h = false; //changes on key-up
let ii = false; //changes on key-up
let j = false; //changes on key-up
let k = false; //changes on key-up
let l = false; //changes on key-up
let m = false; //changes on key-up
let n = false; //changes on key-up
let o = false; //changes on key-up
let p = false; //changes on key-up
let q = false; //changes on key-up
let r = false; //changes on key-up
let s = false; //changes on key-up
let t = false; //changes on key-up
let u = false; //changes on key-up
let v = false; //changes on key-up
let w = false; //changes on key-up
let x = false; //changes on key-up
let y = false; //changes on key-up
let z = false; //changes on key-up

let aPlaying;
let bPlaying;
let cPlaying;
let dPlaying;
let ePlaying;
let fPlaying;
let gPlaying;
let hPlaying;
let iiPlaying;
let jPlaying;
let kPlaying;
let lPlaying;
let mPlaying;
let nPlaying;
let oPlaying;
let pPlaying;
let qPlaying;
let rPlaying;
let sPlaying;
let tPlaying;
let uPlaying;
let vPlaying;
let wPlaying;
let xPlaying;
let yPlaying;
let zPlaying;
/*
const sOnePlaying = false;
const sTwoPlaying = false;
const sThreePlaying = false;
const sFourlaying = false;
const sFivePlaying = false;
const sSixPlaying = false;
*/
let audioContext = null;
//let analyser;
//let frequencyData;

let isPlaying = false;      // Are we currently playing?
//let startTime;              // The start time of the entire sequence.
let current16thNote;        // What note is currently last scheduled?
const tempo = 89.0;          // tempo (in beats per minute)
const lookahead = 25.0;       // How frequently to call scheduling function
//(in milliseconds)
const scheduleAheadTime = 0.1;    // How far ahead to schedule audio (sec)
// This is calculated from lookahead, and overlaps
// with next interval (in case the timer is late)
let nextNoteTime = 0.0;     // when the next note is due.
//const noteResolution = 0;     // 0 == 16th, 1 == 8th, 2 == quarter note
//const noteLength = 0.05;      // length of "beep" (in seconds)
let canvas,                 // the canvas element
    canvasContext;          // canvasContext is the canvas' audioContext 2D
let last16thNoteDrawn = -1; // the last "box" we drew on the screen
const notesInQueue = [];      // the notes that have been put into the web audio,
// and may or may not have played yet. {note, time}
let timerWorker = null;     // The Web Worker used to fire timer messages
//const willHit = 0;
let metronomeDisplayed = "default";
let isMetronome = false;
let isRecording = false;
let current; //for the choke
let current2;
let metronomePlaying;
let metronomeInterval;

const BUFFERS = {};

let BUFFERS_TO_LOAD = {
    hat: '/wavs3/hat.wav',
    kick: '/wavs3/kick.wav',
    f_key: '/wavs3/f_key.wav',
    u_key: '/wavs3/u_key.wav',
    e_key: '/wavs3/e_key.wav',
    l_key: '/wavs3/l_key.wav',
    r_key: '/wavs3/r_key.wav',
    s_key: '/wavs3/s_key.wav',
    p_key: '/wavs3/p_key.wav',
    k_key: '/wavs3/k_key.wav',
    h_key: '/wavs3/h_key.wav',
    m_key: '/wavs3/m_key.wav',
    n_key: '/wavs3/n_key.wav',
    o_key: '/wavs3/o_key.wav',
    z_key: '/wavs3/z_key.wav',
    ii_key: '/wavs3/i_key.wav',
    v_key: '/wavs3/v_key.wav',
    a_key: '/wavs3/a_key.wav',
    g_key: '/wavs3/g_key.wav',
    j_key: '/wavs3/j_key.wav',
    q_key: '/wavs3/q_key.wav',
    x_key: '/wavs3/x_key.wav',
    c_key: '/wavs3/c_key.wav',
    b_key: '/wavs3/b_key.wav',
    w_key: '/wavs3/w_key.wav',
    d_key: '/wavs3/d_key.wav',
    y_key: '/wavs3/y_key.wav',
    t_key: '/wavs3/t_key.wav'
};


const BUFFERS_TO_LOAD_2 = {
    hat: '/wavs2/hat.wav',
    kick: '/wavs2/kick.wav',
    f_key: '/wavs2/f_key.wav',
    u_key: '/wavs2/u_key.wav',
    e_key: '/wavs2/e_key.wav',
    l_key: '/wavs2/l_key.wav',
    r_key: '/wavs2/r_key.wav',
    s_key: '/wavs2/s_key.wav',
    p_key: '/wavs2/p_key.wav',
    k_key: '/wavs2/k_key.wav',
    h_key: '/wavs2/h_key.wav',
    m_key: '/wavs2/m_key.wav',
    n_key: '/wavs2/n_key.wav',
    o_key: '/wavs2/o_key.wav',
    z_key: '/wavs2/z_key.wav',
    ii_key: '/wavs2/i_key.wav',
    v_key: '/wavs2/v_key.wav',
    a_key: '/wavs2/a_key.wav',
    g_key: '/wavs2/g_key.wav',
    j_key: '/wavs2/j_key.wav',
    q_key: '/wavs2/q_key.wav',
    x_key: '/wavs2/x_key.wav',
    c_key: '/wavs2/c_key.wav',
    b_key: '/wavs2/b_key.wav',
    w_key: '/wavs2/w_key.wav',
    d_key: '/wavs2/d_key.wav',
    y_key: '/wavs2/y_key.wav',
    t_key: '/wavs2/t_key.wav'
};


const BUFFERS_TO_LOAD_1 = {
    hat: '/wavs/hat.wav',
    kick: '/wavs/kick.wav',
    f_key: '/wavs/f_key.wav',
    u_key: '/wavs/u_key.wav',
    e_key: '/wavs/e_key.wav',
    l_key: '/wavs/l_key.wav',
    r_key: '/wavs/r_key.wav',
    s_key: '/wavs/s_key.wav',
    p_key: '/wavs/p_key.wav',
    k_key: '/wavs/k_key.wav',
    h_key: '/wavs/h_key.wav',
    m_key: '/wavs/m_key.wav',
    n_key: '/wavs/n_key.wav',
    o_key: '/wavs/o_key.wav',
    z_key: '/wavs/z_key.wav',
    ii_key: '/wavs/i_key.wav',
    v_key: '/wavs/v_key.wav',
    a_key: '/wavs/a_key.wav',
    g_key: '/wavs/g_key.wav',
    j_key: '/wavs/j_key.wav',
    q_key: '/wavs/q_key.wav',
    x_key: '/wavs/x_key.wav',
    c_key: '/wavs/c_key.wav',
    b_key: '/wavs/b_key.wav',
    w_key: '/wavs/w_key.wav',
    d_key: '/wavs/d_key.wav',
    y_key: '/wavs/y_key.wav',
    t_key: '/wavs/t_key.wav'
};

const BUFFERS_TO_LOAD_3 = {
    hat: '/wavs3/hat.wav',
    kick: '/wavs3/kick.wav',
    f_key: '/wavs3/f_key.wav',
    u_key: '/wavs3/u_key.wav',
    e_key: '/wavs3/e_key.wav',
    l_key: '/wavs3/l_key.wav',
    r_key: '/wavs3/r_key.wav',
    s_key: '/wavs3/s_key.wav',
    p_key: '/wavs3/p_key.wav',
    k_key: '/wavs3/k_key.wav',
    h_key: '/wavs3/h_key.wav',
    m_key: '/wavs3/m_key.wav',
    n_key: '/wavs3/n_key.wav',
    o_key: '/wavs3/o_key.wav',
    z_key: '/wavs3/z_key.wav',
    ii_key: '/wavs3/i_key.wav',
    v_key: '/wavs3/v_key.wav',
    a_key: '/wavs3/a_key.wav',
    g_key: '/wavs3/g_key.wav',
    j_key: '/wavs3/j_key.wav',
    q_key: '/wavs3/q_key.wav',
    x_key: '/wavs3/x_key.wav',
    c_key: '/wavs3/c_key.wav',
    b_key: '/wavs3/b_key.wav',
    w_key: '/wavs3/w_key.wav',
    d_key: '/wavs3/d_key.wav',
    y_key: '/wavs3/y_key.wav',
    t_key: '/wavs3/t_key.wav'
};


const sampleLibrary = {
    "dilla": {
        "a_key": {
            "letter": "a",
            "sample": "a_key",
            "word": "youuu",
            "text": "a-text",
            "key": "youuu"
        },
        "b_key": {
            "letter": "b",
            "sample": "b_key",
            "key": "ambient",
            "text": "b-text",
            "word": "ambient"
        },
        "c_key": {
            "letter": "c",
            "sample": "c_key",
            "key": "ouuu 3",
            "text": "c-text",
            "word": "ouuu"
        },
        "d_key": {
            "letter": "d",
            "sample": "d_key",
            "key": "I know",
            "text": "d-text",
            "word": "I KNOW"
        },
        "e_key": {
            "letter": "e",
            "sample": "e_key",
            "key": "IFFFFF",
            "text": "e-text",
            "word": "IFFFFF"
        },
        "f_key": {
            "letter": "f",
            "sample": "f_key",
            "text": "f-text",
            "key": "BABY",
            "word": "BABY"
        },
        "g_key": {
            "letter": "g",
            "sample": "g_key",
            "key": "IIII",
            "text": "g-text",
            "word": "IIII"
        },
        "h_key": {
            "letter": "h",
            "sample": "h_key",
            "key": "OUUU 1",
            "text": "h-text",
            "word": "OUUUU"
        },
        "ii_key": {
            "letter": "ii",
            "sample": "ii_key",
            "key": "BELL 3",
            "text": "ii-text",
            "word": "BELL"
        },
        "j_key": {
            "letter": "j",
            "sample": "j_key",
            "key": "SNARE",
            "text": "j-text",
            "word": "SNARE"
        },
        "k_key": {
            "letter": "k",
            "sample": "k_key",
            "key": "KICK",
            "text": "k-text",
            "word": "KICK"
        },
        "l_key": {
            "letter": "l",
            "sample": "l_key",
            "key": "GUITAR",
            "text": "l-text",
            "word": "GUITAR"
        },
        "m_key": {
            "letter": "m",
            "sample": "m_key",
            "key": "NEVER",
            "text": "m-text",
            "word": "NEVER"
        },
        "n_key": {
            "letter": "n",
            "sample": "n_key",
            "key": "WITH",
            "text": "n-text",
            "word": "WITH"
        },
        "o_key": {
            "letter": "o",
            "sample": "o_key",
            "key": "BELL 4",
            "text": "o-text",
            "word": "BELL"
        },
        "p_key": {
            "letter": "p",
            "sample": "p_key",
            "key": "OH MY",
            "text": "p-text",
            "word": "OH MY"
        },
        "q_key": {
            "letter": "q",
            "sample": "q_key",
            "key": "CYMBAL",
            "text": "q-text",
            "word": "CYMBAL"
        },
        "r_key": {
            "letter": "r",
            "sample": "r_key",
            "key": "SORROW",
            "text": "r-text",
            "word": "SORROW"
        },
        "s_key": {
            "letter": "s",
            "sample": "s_key",
            "key": "KICK 2",
            "text": "s-text",
            "word": "KICK"
        },
        "t_key": {
            "letter": "t",
            "sample": "t_key",
            "key": "STRINGS",
            "text": "t-text",
            "word": "STRINGS"
        },
        "u_key": {
            "letter": "u",
            "sample": "u_key",
            "key": "BELL 2",
            "text": "u-text",
            "word": "BELL"
        },
        "v_key": {
            "letter": "v",
            "sample": "v_key",
            "key": "GUITAR 2",
            "text": "v-text",
            "word": "GUITAR"
        },
        "w_key": {
            "letter": "w",
            "sample": "w_key",
            "key": "BELL",
            "text": "w-text",
            "word": "BELL"
        },
        "x_key": {
            "letter": "x",
            "sample": "x_key",
            "key": "OUUU 2",
            "text": "x-text",
            "word": "OUUU"
        },
        "y_key": {
            "letter": "y",
            "sample": "y_key",
            "key": "LET MY",
            "text": "y-text",
            "word": "LET MY"
        },
        "z_key": {
            "letter": "z",
            "sample": "z_key",
            "text": "z-text",
            "key": "OUUU 1",
            "word": "OUUU"
        }
    },
    "kanye": {
        "a_key": {
            "letter": "a",
            "sample": "a_key",
            "word": "ohhh",
            "text": "a-text",
            "key": "ohhh"
        },
        "b_key": {
            "letter": "b",
            "sample": "b_key",
            "key": "gotta -1",
            "text": "b-text",
            "word": "gotta"
        },
        "c_key": {
            "letter": "c",
            "sample": "c_key",
            "key": "never",
            "text": "c-text",
            "word": "never"
        },
        "d_key": {
            "letter": "d",
            "sample": "d_key",
            "key": "ness",
            "text": "d-text",
            "word": "ness"
        },
        "e_key": {
            "letter": "e",
            "sample": "e_key",
            "key": "won't",
            "text": "e-text",
            "word": "won't"
        },
        "f_key": {
            "letter": "f",
            "sample": "f_key",
            "text": "f-text",
            "key": "organ",
            "word": "organ"
        },
        "g_key": {
            "letter": "g",
            "sample": "g_key",
            "key": "yeah",
            "text": "g-text",
            "word": "yeah"
        },
        "h_key": {
            "letter": "h",
            "sample": "h_key",
            "key": "piano",
            "text": "h-text",
            "word": "piano"
        },
        "ii_key": {
            "letter": "ii",
            "sample": "ii_key",
            "key": "get it",
            "text": "ii-text",
            "word": "get it"
        },
        "j_key": {
            "letter": "j",
            "sample": "j_key",
            "key": "piano 2",
            "text": "j-text",
            "word": "piano"
        },
        "k_key": {
            "letter": "k",
            "sample": "k_key",
            "key": "piano! 3",
            "text": "k-text",
            "word": "piano"
        },
        "l_key": {
            "letter": "l",
            "sample": "l_key",
            "key": "squeeze",
            "text": "l-text",
            "word": "sqeeze"
        },
        "m_key": {
            "letter": "m",
            "sample": "m_key",
            "key": "na na na",
            "text": "m-text",
            "word": "na na na"
        },
        "n_key": {
            "letter": "n",
            "sample": "n_key",
            "key": "gotta",
            "text": "n-text",
            "word": "gotta"
        },
        "o_key": {
            "letter": "o",
            "sample": "o_key",
            "key": "looove",
            "text": "o-text",
            "word": "looove"
        },
        "p_key": {
            "letter": "p",
            "sample": "p_key",
            "key": "is their",
            "text": "p-text",
            "word": "is their"
        },
        "q_key": {
            "letter": "q",
            "sample": "q_key",
            "key": "guitar",
            "text": "q-text",
            "word": "guitar"
        },
        "r_key": {
            "letter": "r",
            "sample": "r_key",
            "key": "no no",
            "text": "r-text",
            "word": "no no"
        },
        "s_key": {
            "letter": "s",
            "sample": "s_key",
            "key": "happy",
            "text": "s-text",
            "word": "happy"
        },
        "t_key": {
            "letter": "t",
            "sample": "t_key",
            "key": "piano 4",
            "text": "t-text",
            "word": "piano"
        },
        "u_key": {
            "letter": "u",
            "sample": "u_key",
            "key": "they",
            "text": "u-text",
            "word": "they dont"
        },
        "v_key": {
            "letter": "v",
            "sample": "v_key",
            "key": "her",
            "text": "v-text",
            "word": "her"
        },
        "w_key": {
            "letter": "w",
            "sample": "w_key",
            "key": "guitar 2",
            "text": "w-text",
            "word": "guitar"
        },
        "x_key": {
            "letter": "x",
            "sample": "x_key",
            "key": "tease",
            "text": "x-text",
            "word": "tease her"
        },
        "y_key": {
            "letter": "y",
            "sample": "y_key",
            "key": "some",
            "text": "y-text",
            "word": "some girls"
        },
        "z_key": {
            "letter": "z",
            "sample": "z_key",
            "text": "z-text",
            "key": "eeze her",
            "word": "eeze her"
        }
    },
    "impress": {
        "a_key": {
            "letter": "a",
            "sample": "a_key",
            "word": "glow",
            "text": "a-text",
            "key": "glow"
        },
        "b_key": {
            "letter": "b",
            "sample": "b_key",
            "key": "horns 3",
            "text": "b-text",
            "word": "horns"
        },
        "c_key": {
            "letter": "c",
            "sample": "c_key",
            "key": "my",
            "text": "c-text",
            "word": "my"
        },
        "d_key": {
            "letter": "d",
            "sample": "d_key",
            "key": "horns 1",
            "text": "d-text",
            "word": "horns"
        },
        "e_key": {
            "letter": "e",
            "sample": "e_key",
            "key": "snare",
            "text": "e-text",
            "word": "snare"
        },
        "f_key": {
            "letter": "f",
            "sample": "f_key",
            "text": "f-text",
            "key": "horns 2",
            "word": "horns"
        },
        "g_key": {
            "letter": "g",
            "sample": "g_key",
            "key": "on this",
            "text": "g-text",
            "word": "on this"
        },
        "h_key": {
            "letter": "h",
            "sample": "h_key",
            "key": "earth",
            "text": "h-text",
            "word": "earth"
        },
        "ii_key": {
            "letter": "ii",
            "sample": "ii_key",
            "key": "guitar",
            "text": "ii-text",
            "word": "guitar"
        },
        "j_key": {
            "letter": "j",
            "sample": "j_key",
            "key": "separate",
            "text": "j-text",
            "word": "separate"
        },
        "k_key": {
            "letter": "k",
            "sample": "k_key",
            "key": "babe",
            "text": "k-text",
            "word": "babe"
        },
        "l_key": {
            "letter": "l",
            "sample": "l_key",
            "key": "ohhhh",
            "text": "l-text",
            "word": "ohhhh"
        },
        "m_key": {
            "letter": "m",
            "sample": "m_key",
            "key": "ouu-ou",
            "text": "m-text",
            "word": "ouu-ou"
        },
        "n_key": {
            "letter": "n",
            "sample": "n_key",
            "key": "d-doo",
            "text": "n-text",
            "word": "d-doo"
        },
        "o_key": {
            "letter": "o",
            "sample": "o_key",
            "key": "make",
            "text": "o-text",
            "word": "make"
        },
        "p_key": {
            "letter": "p",
            "sample": "p_key",
            "key": "rain",
            "text": "p-text",
            "word": "rain"
        },
        "q_key": {
            "letter": "q",
            "sample": "q_key",
            "key": "piano",
            "text": "q-text",
            "word": "piano"
        },
        "r_key": {
            "letter": "r",
            "sample": "r_key",
            "key": "thang",
            "text": "r-text",
            "word": "thang"
        },
        "s_key": {
            "letter": "s",
            "sample": "s_key",
            "key": "bells 2",
            "text": "s-text",
            "word": "bells"
        },
        "t_key": {
            "letter": "t",
            "sample": "t_key",
            "key": "bell",
            "text": "t-text",
            "word": "bell"
        },
        "u_key": {
            "letter": "u",
            "sample": "u_key",
            "key": "piano 2",
            "text": "u-text",
            "word": "piano"
        },
        "v_key": {
            "letter": "v",
            "sample": "v_key",
            "key": "shine",
            "text": "v-text",
            "word": "sunshine"
        },
        "w_key": {
            "letter": "w",
            "sample": "w_key",
            "key": "strings",
            "text": "w-text",
            "word": "strings"
        },
        "x_key": {
            "letter": "x",
            "sample": "x_key",
            "key": "are",
            "text": "x-text",
            "word": "are"
        },
        "y_key": {
            "letter": "y",
            "sample": "y_key",
            "key": "i know",
            "text": "y-text",
            "word": "i know"
        },
        "z_key": {
            "letter": "z",
            "sample": "z_key",
            "text": "z-text",
            "key": "you",
            "word": "you"
        }
    }
};

let samples = [0, 0, 0, 0, 0, 0];
let rhythms = {
    "kick": [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    "hat": [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    "f_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "u_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "e_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "l_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "r_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "s_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "p_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "k_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "h_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "m_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "n_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "o_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "z_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ii_key: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "v_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "a_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "g_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "j_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "q_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "x_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "c_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "b_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "w_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "d_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "y_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "t_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
};

// var rhythms = {"kick": [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "hat": [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], "f_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "u_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "e_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "l_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "r_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "s_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "p_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "k_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "h_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], "m_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "n_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "o_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "z_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ii_key: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "v_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "a_key": [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "g_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "j_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "q_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "x_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "c_key": [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "b_key": [0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0], "w_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "d_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "y_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "t_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}

function clearAll() {
    rhythms = {
        "kick": [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        "hat": [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        "f_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "u_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "e_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "l_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "r_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "s_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "p_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "k_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "h_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "m_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "n_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "o_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "z_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ii_key: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "v_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "a_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "g_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "j_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "q_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "x_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "c_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "b_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "w_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "d_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "y_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "t_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
}

// sample one
const sampleOne = {
    "kanye": {
        "kick": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "hat": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "f_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "u_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "e_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "l_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "r_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "s_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "p_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "k_key": [0, 0, 0, 0, 0, 0, 0, 0, 1.35, 0, 0, 0, 0, 0, 0, 0],
        "h_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "m_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "n_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "o_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "z_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ii_key: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "v_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "a_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "g_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "j_key": [1.35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "q_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "x_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "c_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "b_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "w_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "d_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "y_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "t_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    "dilla": {
        "kick": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "hat": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "f_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "u_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "e_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "l_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "r_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "s_key": [.67, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "p_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "k_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "h_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "m_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "n_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "o_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "z_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ii_key: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "v_key": [0, 0, 0, 0, 0, 0, .33, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "a_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "g_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "j_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "q_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "x_key": [0, 0, 0, 0, .33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "c_key": [0, 0, 0, 0, 0, 0, 0, 0, .33, 0, 0, 0, 0, 0, 0, 0],
        "b_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "w_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "d_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "y_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "t_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, .33, 0, .67, 0, 0, 0]
    },
    "impress": {
        "kick": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "hat": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "f_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "u_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "e_key": [0, 0, 0, 0, .33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "l_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "r_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "s_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "p_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "k_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "h_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "m_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "n_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "o_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "z_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ii_key: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, .67, 0, 0, 0],
        "v_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "a_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "g_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "j_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "q_key": [1.01, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "x_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "c_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "b_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "w_key": [0, 0, 0, 0, 0, 0, .33, .5, 0, .33, .5, 0, 0, 0, 0, 0],
        "d_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "y_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "t_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
};

const sampleTwo = {
    "kanye": {
        "kick": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "hat": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "f_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "u_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "e_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "l_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "r_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "s_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "p_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "k_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "h_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "m_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.01, 0, 0, 0, 0, 0],
        "n_key": [0, 0, 1.35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "o_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "z_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ii_key: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "v_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "a_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "g_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "j_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "q_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "x_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "c_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "b_key": [.67, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "w_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "d_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "y_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "t_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    "dilla": {
        "kick": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "hat": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "f_key": [0, 0, 0, 0, 0, 0, 0, 0, .33, 0, .33, 0, 0, 0, 0, 0],
        "u_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "e_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "l_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "r_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "s_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "p_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, .33, 0, 0, 0],
        "k_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "h_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "m_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "n_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "o_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, .33, 0],
        "z_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ii_key: [.33, 0, 1.01, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "v_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "a_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "g_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "j_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "q_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "x_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "c_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "b_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "w_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "d_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "y_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "t_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    "impress": {
        "kick": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "hat": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "f_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "u_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "e_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "l_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "r_key": [1.01, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "s_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, .67, 0, 0, 0],
        "p_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "k_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "h_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "m_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "n_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "o_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "z_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ii_key: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "v_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "a_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "g_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "j_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "q_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "x_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "c_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "b_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "w_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "d_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "y_key": [0, 0, 0, 0, .33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "t_key": [0, 0, 0, 0, 0, 0, .33, .33, 0, .33, .33, 0, 0, 0, 0, 0]
    }
};

const sampleThree = {
    "kanye": {
        "kick": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "hat": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "f_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "u_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "e_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "l_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "r_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "s_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "p_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "k_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.01, 0, 0, 0],
        "h_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "m_key": [0, 0, 0, 0, 0, 0, 0, 0, 1.35, 0, 0, 0, 0, 0, 0, 0],
        "n_key": [1.35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "o_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "z_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ii_key: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "v_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "a_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "g_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "j_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "q_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "x_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "c_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "b_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "w_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "d_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "y_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "t_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    "dilla": {
        "kick": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "hat": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "f_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "u_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "e_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "l_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "r_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "s_key": [0, 0, 0, 0, 0, 0, 0, 0, .33, 0, .33, 0, 0, 0, 0, 0],
        "p_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "k_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "h_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "m_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "n_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "o_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "z_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ii_key: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "v_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "a_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "g_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "j_key": [0, 0, 0, 0, .33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "q_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "x_key": [.33, 0, .33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "c_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "b_key": [0, 0, 0, 0, 0, 0, .33, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "w_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "d_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "y_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "t_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, .33, 0, .33, 0]
    },
    "impress": {
        "kick": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "hat": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "f_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "u_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "e_key": [0, 0, 0, 0, .33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "l_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "r_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "s_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "p_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "k_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "h_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "m_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "n_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "o_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "z_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ii_key: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, .67, 0, 0, 0],
        "v_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "a_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "g_key": [0, 0, .33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "j_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "q_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "x_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "c_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "b_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "w_key": [0, 0, 0, 0, .5, 0, .33, .5, 0, .33, .5, 0, 0, 0, 0, 0],
        "d_key": [.85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "y_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "t_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
};

const sampleFour = {
    "kanye": {
        "kick": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "hat": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "f_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "u_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "e_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "l_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "r_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "s_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "p_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "k_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "h_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "m_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "n_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "o_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "z_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ii_key: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "v_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "a_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "g_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "j_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "q_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "x_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "c_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "b_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "w_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "d_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "y_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "t_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    "dilla": {
        "kick": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "hat": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "f_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "u_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "e_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "l_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "r_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "s_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "p_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "k_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "h_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "m_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "n_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "o_key": [.67, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, .67, 0, 0, 0],
        "z_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ii_key: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "v_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "a_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "g_key": [0, 0, 0, 0, 1.35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "j_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "q_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "x_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "c_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "b_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "w_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "d_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "y_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "t_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    "impress": {
        "kick": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "hat": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "f_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "u_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "e_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "l_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "r_key": [1.01, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "s_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "p_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "k_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "h_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "m_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "n_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "o_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "z_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ii_key: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "v_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "a_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, .67, 0, 0, 0],
        "g_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "j_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "q_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "x_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "c_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "b_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "w_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "d_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "y_key": [0, 0, 0, 0, .33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "t_key": [0, 0, 0, 0, 0, 0, .33, .33, 0, .33, .33, 0, 0, 0, 0, 0]
    }
};

const sampleFive = {
    "kanye": {
        "kick": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "hat": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "f_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "u_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "e_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "l_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "r_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "s_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "p_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "k_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "h_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "m_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "n_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "o_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "z_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ii_key: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "v_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "a_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "g_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "j_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "q_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "x_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "c_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "b_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "w_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "d_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "y_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "t_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    "dilla": {
        "kick": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "hat": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "f_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "u_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "e_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "l_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "r_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "s_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "p_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "k_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "h_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "m_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "n_key": [.33, 0, .33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "o_key": [0, 0, 0, 0, .67, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "z_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ii_key: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "v_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "a_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "g_key": [0, 0, 0, 0, 0, 0, 0, 0, 1.35, 0, 0, 0, 0, 0, 0, 0],
        "j_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "q_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "x_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "c_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "b_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "w_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "d_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, .33, 0],
        "y_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "t_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    "impress": {
        "kick": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "hat": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "f_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "u_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "e_key": [0, 0, 0, .33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "l_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "r_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "s_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "p_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "k_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "h_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "m_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "n_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "o_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "z_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ii_key: [0, 0, 0, 0, .67, 0, 0, 0, 0, 0, 0, 0, .67, 0, 0, 0],
        "v_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "a_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "g_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "j_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "q_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "x_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "c_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "b_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "w_key": [.5, 0, 0, 0, 0, 0, .33, .5, 0, .33, .5, 0, 0, 0, 0, 0],
        "d_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "y_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "t_key": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
};


//
function replaceKeyboard() {
    const keyCodes = sampleLibrary[sampleLoaded];
    $.each(keyCodes, function (key, value) {
        $('#' + value["text"]).text(value["key"]);
    });
}


//post key press
function runSample(letter, sample) {
    console.log("letter = " + letter + ", sample = " + sample);
    highlight(200, sample);
    playGuitar(BUFFERS[sample], letter);
    if (isRecording) {
        let rhythmIndex = current16thNote - 1;
        rhythms[sample][rhythmIndex] = 1;
        if (rhythmIndex === -1) {
            rhythms[sample][15] = 1;
        }
    }
    updateControls(sample);
}

function mobileRunSample(letter, sample) {
    playGuitar(BUFFERS[sample], letter);
    if (isRecording) {
        let rhythmIndex = current16thNote - 1;
        rhythms[sample][rhythmIndex] = 1;
        if (rhythmIndex === -1) {
            rhythms[sample][15] = 1;
        }
    }
    mobileHighlight(letter);
    updateControls(sample);
    //if (!isPlaying) {
    //  noteShow("note-abril",sampleLibrary[sampleLoaded][sample]["word"]);
    //}
}

//turn-up message

function turnUp(point) {
    const keyPressed = point;
    let turn_up_obj = $('#turn-up');
    let turn_up_text = $('#turn-up-text');
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        //starting-up, so startMessage is < 1
        if (startMessage < 1) {
            timesPressed = timesPressed + 1;
            startMessage = .5;
            //at 1 times pressed
            if (timesPressed === 1) {
                if (keyPressed === "space-button") {
                    // play();
                }


                turn_up_obj.velocity({opacity: 1}, {display: "block"}, 0);
                turn_up_text.text('Each key on your keyboard plays a short clip of the Otis Redding sample that Kanye used to construct the hook of Otis.');
                $('#keybutton-return').show();
                $('#intro').velocity({opacity: 1}, {display: "block"}, 0);
                $('#intro-two').removeClass('intro-hidden');
                $('#keyboard-wrapper').velocity({opacity: 1}, {display: "block"}, 0);
                $('#player-headline').velocity({opacity: 0}, {display: "none"}, 0);
                $('#top-text').velocity({opacity: 0}, {display: "none"}, 0);
                $('#toolbar').velocity({opacity: 1}, {display: "block"}, 0);
                $('#byline').velocity({opacity: 0}, {display: "none"}, 0);
                $('#player-top').velocity({opacity: 1}, {display: "block"}, 0);
                turn_up_obj.css("top", "");
                turn_up_obj.velocity({
                    fontSize: "16px",
                    borderRadius: "10px",
                    height: "48px",
                    left: "0px",
                    width: "350px",
                    opacity: 1,
                    backgroundColor: "#fff",
                    color: "#000",
                    bottom: "382px"
                }, {display: "block"}, 0);
            }
            if (timesPressed === 10) {
                turn_up_obj.velocity({opacity: 1}, {display: "block"}, 0);
                turn_up_text.text('Imagine yourself as a producer...');
                turn_up_obj.velocity({backgroundColor: "#E94953", color: "#fff", height: "24px"}, 100);
            }
            //at 10 times pressed
            if (timesPressed === 15) {
                // startMessage at 1 should be the presets
                startMessage = 1;
                turn_up_obj.velocity({opacity: 1}, {display: "block"}, 0);
                turn_up_text.text("Kanye's arrangement of this sample can be played by typing '1-3' on your keyboard.");
                turn_up_obj.velocity({
                    backgroundColor: "#fff",
                    color: "#000",
                    bottom: "328px",
                    left: "367px",
                    width: "240px",
                    height: "44px",
                }, 100);
                turn_up_text.velocity({width: "242px"}, 0);
                turn_up_obj.addClass("turn-up-arrow-white-down");
            }
            console.log(timesPressed);
        }

        //if hit space bar after first keystroke, displaying messages to type keys away...
        if (timesPressed > 1 && startMessage < 3 && keyPressed === "space-button") {
            startMessage = 3;
            turn_up_obj.velocity({opacity: 1}, {display: "block"}, 0);
            turn_up_obj.css("bottom", "");
            turn_up_obj.velocity({
                backgroundColor: "#E94953",
                color: "#fff",
                top: "70px",
                left: "0px",
                right: "0px",
                width: "270px",
                height: "24px"
            }, 300);
            turn_up_text.velocity({width: "271px"}, 0);
            turn_up_text.text("Try a new sample. Click a song above. Have fun.");
            turn_up_obj.removeClass("turn-up-arrow");
            turn_up_obj.removeClass("turn-up-arrow-white-down");
            turn_up_obj.removeClass("turn-up-arrow-blue");
            turn_up_obj.addClass("turn-up-arrow-red-two");

            $('#top-text').velocity({opacity: 0}, {display: "none"}, 0);
            $('#player-headline').velocity({opacity: 0}, {display: "none"}, 0);
            $('#player-top ').velocity({opacity: 1}, {display: "block"}, 0);
            $('#toolbar').velocity({opacity: 1}, {display: "block"}, 0);
            $('#metronome').show();
            $('#keybutton-return').show();
            $('#intro').velocity({opacity: 1}, {display: "block"}, 0);
            $('#intro-two').velocity({opacity: 1}, {display: "block"}, 0);
        }

        if (startMessage < 2 && keyPressed === "preset-button") {
            startMessage = 2;
            turn_up_obj.velocity({opacity: 1}, {display: "block"}, 0);
            turn_up_obj.velocity({
                fontSize: "16px",
                borderRadius: "10px",
                height: "48px",
                left: "548px",
                width: "200px",
                opacity: 1,
                backgroundColor: "#58B79A",
                color: "#fff",
                bottom: "112px"
            }, {display: "block"}, 0);
            turn_up_obj.addClass("turn-up-arrow");
            turn_up_text.addClass("center");
            turn_up_text.velocity({width: "130px"}, 0);
            turn_up_text.text('‘Space Bar’ to starts, stops a beat.');
            turn_up_obj.removeClass("turn-up-arrow-white-down");
            turn_up_obj.removeClass("turn-up-arrow-blue");
            turn_up_obj.addClass("turn-up-arrow");
            $('#metronome').show();
            //startMessage = 6;
        }
        if (startMessage === 4 && keyPressed === "record-button") {
            startMessage = 5;
            turn_up_obj.velocity({opacity: 1}, {display: "block"}, 0);
            turn_up_text.text('‘Backspace’ clears your recording.');
            turn_up_text.velocity({width: "225px"}, 0);
            turn_up_obj.velocity({
                width: "220px",
                height: "21px",
                borderRadius: "13px",
                backgroundColor: "#ECECEC",
                color: "#000",
                bottom: "175px",
                left: "290px",
                right: "-90px"
            }, {display: "block"}, 0);
            turn_up_obj.removeClass("turn-up-arrow-white");
            turn_up_obj.addClass("turn-up-arrow-white-two");
        }

        if (startMessage < 4 && keyPressed === "record-button") {
            startMessage = 4;
            turn_up_obj.velocity({opacity: 1}, {display: "block"}, 0);
            $('#keybutton-return').show();
            turn_up_obj.velocity({opacity: 1}, {display: "block"}, 0);
            $('#metronome').show();
            turn_up_obj.removeClass("turn-up-arrow-white-down");
            turn_up_obj.removeClass("turn-up-arrow-red");
            turn_up_obj.addClass("turn-up-arrow-white");
            turn_up_obj.velocity({
                opacity: 1,
                width: "260px",
                height: "45px",
                borderRadius: "13px",
                backgroundColor: "#ECECEC",
                color: "#000",
                bottom: "113px",
                left: "150px",
                right: "-90px"
            }, {display: "block"}, 0);
            turn_up_text.velocity({width: "260px"}, 0);
            $('#toolbar').velocity({opacity: 1}, {display: "block"}, 0);
            $('#delete-button').show();
            turn_up_obj.css("top", "");
            turn_up_text.text('Start simple, with just one note. Press ‘Enter’ again to stop recording.');
        }

        if (startMessage === 5 && keyPressed === "delete-button") {
            startMessage = 6;
            turn_up_obj.velocity({opacity: 0}, {display: "none"}, 0);
        }

        if (startMessage === 7) {
            turn_up_obj.velocity({opacity: 0}, {display: "none"}, 0);
        }

        if (keyPressed === "sample-button") {
            startMessage = 7;
            turn_up_obj.velocity({opacity: 1}, {display: "block"}, 0);
            turn_up_obj.css("bottom", "");
            turn_up_obj.removeClass("turn-up-arrow");
            turn_up_obj.removeClass("turn-up-arrow-white-down");
            turn_up_obj.removeClass("turn-up-arrow-blue");
            turn_up_obj.removeClass("turn-up-arrow-red-two");
            turn_up_obj.velocity({
                opacity: 1,
                width: "270px",
                height: "45px",
                borderRadius: "13px",
                backgroundColor: "#ECECEC",
                color: "#000",
                top: "200px",
                left: "0px",
                right: "0px"
            }, {display: "block"}, 0);
            turn_up_text.text('Wait a few seconds for the sample to load. Press some keys to check it out.');
        }

        if (keyPressed === "space-button" && startMessage === 7) {
            startMessage = 8;
            $('#top-text').velocity({opacity: 0}, {display: "none"}, 0);
            $('#metronome').show();
            $('#keybutton-return').show();
            $('#delete-button').show();
        }
    } else {
        if (keyPressed === "space-button" && startMessage === 0) {
            startMessage = 1;
            $('#intro').velocity({opacity: 1}, {display: "block"}, 0);
            $('#intro-two').removeClass('intro-hidden');
            $('#mobile-samples').velocity({opacity: 1}, {display: "block"}, 0);
            $('#mobile-toolbar').velocity({opacity: 1}, {display: "block"}, 0);
            $('#player-top').velocity({opacity: 1}, {display: "block"}, 0);
            $('#byline').velocity({opacity: 0}, {display: "none"}, 0);
            $('#mobile-intro').velocity({opacity: 0}, {display: "none"}, 0);
            $('#player-headline').velocity({opacity: 0}, {display: "none"}, 0);
            $('#metronome').velocity({opacity: 1}, {display: "block"}, 0);
        }
        if (keyPressed === "letter" && startMessage === 0) {
            startMessage = 1;
            $('#intro').velocity({opacity: 1}, {display: "block"}, 0);
            $('#intro-two').removeClass('intro-hidden');
            $('#mobile-samples').velocity({opacity: 1}, {display: "block"}, 0);
            $('#mobile-toolbar').velocity({opacity: 1}, {display: "block"}, 0);
            $('#player-top').velocity({opacity: 1}, {display: "block"}, 0);
            $('#byline').velocity({opacity: 0}, {display: "none"}, 0);
            $('#mobile-intro').velocity({opacity: 0}, {display: "none"}, 0);
            $('#player-headline').velocity({opacity: 0}, {display: "none"}, 0);
        }
        if (keyPressed === "space-button" && startMessage === 1) {
            startMessage = 2;
            $('#metronome').velocity({opacity: 1}, {display: "block"}, 0);
        }
    }
}


//highlight key

function highlight(delay, sample) {
    turnUp(letter);
    //var letters = {"a":0, "b":0, "c":0, "d":0, "e":0, "f":0, "g":0, "h":0, "ii":0, "j":0, "k":0, "l":0, "m":0, "n":0, "o":0, "p":0, "q":0, "r":0, "s":0, "t":0, "u":0, "v":0, "w":0, "x":0, "y":0, "z":0};
    const letterSplit = sample.split('_');
    letter = letterSplit[0];
    //letters[letter] = 1;
    const letter2 = letter.charAt(0);
    $('#notes-helper-displayed').text("‘" + letter2 + "’" + " key:");
    $('#' + letter + '-button').velocity({backgroundColor: "#FDFDFD"}, 0);
    //  setTimeout(function() {
    //    $('#' + letter + '-button').velocity({backgroundColor: "#444"},0);
    //  }, delay);
}

function mobileHighlight(letter) {
    //var letters = {"a":0, "b":0, "c":0, "d":0, "e":0, "f":0, "g":0, "h":0, "ii":0, "j":0, "k":0, "l":0, "m":0, "n":0, "o":0, "p":0, "q":0, "r":0, "s":0, "t":0, "u":0, "v":0, "w":0, "x":0, "y":0, "z":0};
    //var letterSplit = sample.split('_');
    //letter = letterSplit[0];
    //letters[letter] = 1;
    $('#' + letter + '-button').css("background-color", "#FDFDFD");
//    setTimeout(function() {
//      $('#' + letter + '-button').velocity({backgroundColor: "#444"},0);
//    }, 200);
}


function highlightTwo(delay, sample) {
    let letter = sample.split('_');
    letter = letter[0];
    $('#' + letter + '-button').velocity({backgroundColor: "#FDFDFD"}, 0);
    setTimeout(function () {
        $('#' + letter + '-button').velocity("reverse");
    }, delay);
}

function noteFlicker(word) {
    let note_visual_text = $("#note-visual-text");
    note_visual_text.replaceWith("<p id='note-visual-text' class='note-flicker'>" + word + "</p>");
    note_visual_text.fadeTo(100, 0.1).fadeTo(120, .3).fadeTo(140, .8).fadeTo(190, .6).fadeTo(200, .4).fadeTo(300, .5).fadeTo(400, 0);
}

function noteScale(word) {
    let note_visual_text = $("#note-visual-text");
    note_visual_text.velocity("stop");
    note_visual_text.replaceWith("<p id='note-visual-text' class='note-scale'>" + word + "</p>");
    $('#note-visual-text').velocity({fontSize: "420px"}, 1000, function () {
            $('#note-visual-text').velocity({opacity: 0});
        }
    );
}

function spaceButton() {

    let keybutton_space = $('#keybutton-space')
    if (!isPlaying) {
        $(".note_item").each(function () {
            $(this).removeClass('note_metronome');
            $(this).removeClass('note_metronome_two');
        });
        $('#note-visual').addClass('hide-visual');
        $('#keybutton-space-play-button-mobile').css('fill', '#fff');
        keybutton_space.css('background-color', 'rgba(221,110,110,1)');
        keybutton_space.css('color', '#fff');
        $('#keybutton-space-play-button').css('fill', '#fff');
        keybutton_space.addClass('flashing');
    } else {
        keybutton_space.css('background-color', 'rgba(236,236,236,1)');
        keybutton_space.css('color', '#000');
        $('#keybutton-space-play-button-mobile').css('fill', '#000');
        $('#keybutton-space-play-button').css('fill', '#000');
        keybutton_space.removeClass('flashing');
        $('#note-visual').removeClass('hide-visual');
    }
}

//highlight function


function notePopOut(word) {
    let note_visual_text = $("#note-visual-text")
    note_visual_text.velocity("stop");
    note_visual_text.replaceWith("<p id='note-visual-text' class='note-pop-out'>" + word + "</p>");
    $('#note-visual-text').delay(300).velocity(
        {fontSize: "300px"}, 0).velocity(
        {fontSize: "400px"}, 0).delay(50).velocity(
        {fontSize: "600px"}, 0, function () {
            $('#note-visual-text').velocity({opacity: 0});
        });

}

function noteOutline(word) {
    let note_visual_text = $("#note-visual-text")
    note_visual_text.velocity("stop");
    note_visual_text.replaceWith("<p id='note-visual-text' class='note-scale'>" + word + "</p>");
    $('#note-visual-text').delay(1000).velocity({opacity: 0});
}


/*function noteReplicate(word) {
    let note_visual_text = $("#note-visual-text")
    note_visual_text.velocity("stop");
    note_visual_text.replaceWith("<div id='note-visual-text' class='note-sunshine' style='position:relative;'><p style='zindex: 1000;' class='note-word-replicate'>" + word + "</p><p style='zindex: 10;' class='note-word-replicate'>" + word + "</p><p style='zindex: 20;' class='note-word-replicate'>" + word + "</p><p style='zindex: 0;' class='note-word-replicate'>" + word + "</p><p style='zindex: 10;' class='note-word-replicate'>" + word + "</p><p style='zindex: 10;' class='note-word-replicate'>" + word + "</p><p style='zindex: 10;' class='note-word-replicate'>" + word + "</p><p style='zindex: 10;' class='note-word-replicate'>" + word + "</p><p style='zindex: 10;' class='note-word-replicate'>" + word + "</p></div>");
    $($(".note-word-replicate").get().reverse()).each(function (index) {
        $(this).delay(index * 50).velocity({translateX: index * 10 + "px", translateY: index * 10 + "px"}, 0);
    });
    $('#note-visual-text').delay(1000).velocity({opacity: 0});
}*/

function noteBlackout(word) {
    let note_visual_text = $("#note-visual-text");
    note_visual_text.velocity("stop");
    note_visual_text.replaceWith("<div id='note-visual-text' class='note-sunshine-green' style='position:relative;'><p style='zindex: 1000;' class='note-word-replicate'>" + word + "</p><p style='zindex: 10;' class='note-word-replicate'>" + word + "</p><p style='zindex: 20;' class='note-word-replicate'>" + word + "</p><p style='zindex: 0;' class='note-word-replicate'>" + word + "</p><p style='zindex: 10;' class='note-word-replicate'>" + word + "</p><p style='zindex: 10;' class='note-word-replicate'>" + word + "</p><p style='zindex: 10;' class='note-word-replicate'>" + word + "</p><p style='zindex: 10;' class='note-word-replicate'>" + word + "</p><p style='zindex: 10;' class='note-word-replicate'>" + word + "</p></div>");
    $($(".note-word-replicate").get().reverse()).each(function (index) {
        $(this).delay(index * 50).velocity({translateX: index * 10 + "px"}, 0).velocity({opacity: 0}, 0);
    });
    $('#note-visual-text').delay(1000).velocity({opacity: 0});
}

function noteShow(font, word) {
    let note_visual_text = $("#note-visual-text");
    note_visual_text.velocity("stop");
    note_visual_text.replaceWith("<p id='note-visual-text' class='" + font + "'> " + word + "</p>");
    note_visual_text.fadeTo(100, 0.1).fadeTo(120, 1.0).fadeTo(140, .1).fadeTo(190, 1.0).fadeTo(200, .5).fadeTo(300, 1.0).fadeTo(400, 0);
    $('#note-visual-text').delay(1000).velocity({opacity: 0});
}

function playGuitar(instrument, keyPlaying) {
    const source = audioContext.createBufferSource();
    source.buffer = instrument;

    source.connect(audioContext.destination);
    if (current2) {
        if (!current2.stop) {
            current2.stop = current2.noteOff;
        }
        current2.stop(0);
    }
    if (!source.start)
        source.start = source.noteOn;
    keyDownTime = audioContext.currentTime;
    source.start(0);


    if (keyPlaying === "a") {
        if (aPlaying) {
            if (!aPlaying.stop) {
                aPlaying.stop = aPlaying.noteOff;
            }
            aPlaying.stop(0);
        }
        aPlaying = source;
    }
    if (keyPlaying === "b") {
        if (bPlaying) {
            if (!bPlaying.stop) {
                bPlaying.stop = bPlaying.noteOff;
            }
            bPlaying.stop(0);
        }
        bPlaying = source;
    }
    if (keyPlaying === "c") {
        if (cPlaying) {
            if (!cPlaying.stop) {
                cPlaying.stop = cPlaying.noteOff;
            }
            cPlaying.stop(0);
        }
        cPlaying = source;
    }
    if (keyPlaying === "d") {
        if (dPlaying) {
            if (!dPlaying.stop) {
                dPlaying.stop = dPlaying.noteOff;
            }
            dPlaying.stop(0);
        }
        dPlaying = source;
    }
    if (keyPlaying === "e") {
        if (ePlaying) {
            if (!ePlaying.stop) {
                ePlaying.stop = ePlaying.noteOff;
            }
            ePlaying.stop(0);
        }
        ePlaying = source;
    }
    if (keyPlaying === "f") {
        if (fPlaying) {
            if (!fPlaying.stop) {
                fPlaying.stop = fPlaying.noteOff;
            }
            fPlaying.stop(0);
        }
        fPlaying = source;
    }
    if (keyPlaying === "g") {
        if (gPlaying) {
            if (!gPlaying.stop) {
                gPlaying.stop = gPlaying.noteOff;
            }
            gPlaying.stop(0);
        }
        gPlaying = source;
    }
    if (keyPlaying === "h") {
        if (hPlaying) {
            if (!hPlaying.stop) {
                hPlaying.stop = hPlaying.noteOff;
            }
            hPlaying.stop(0);
        }
        hPlaying = source;
    }
    if (keyPlaying === "ii") {
        if (iiPlaying) {
            if (!iiPlaying.stop) {
                iiPlaying.stop = iiPlaying.noteOff;
            }
            iiPlaying.stop(0);
        }
        iiPlaying = source;
    }
    if (keyPlaying === "j") {
        if (jPlaying) {
            if (!jPlaying.stop) {
                jPlaying.stop = jPlaying.noteOff;
            }
            jPlaying.stop(0);
        }
        jPlaying = source;
    }
    if (keyPlaying === "k") {
        if (kPlaying) {
            if (!kPlaying.stop) {
                kPlaying.stop = kPlaying.noteOff;
            }
            kPlaying.stop(0);
        }
        kPlaying = source;
    }
    if (keyPlaying === "l") {
        if (lPlaying) {
            if (!lPlaying.stop) {
                lPlaying.stop = lPlaying.noteOff;
            }
            lPlaying.stop(0);
        }
        lPlaying = source;
    }
    if (keyPlaying === "m") {
        if (mPlaying) {
            if (!mPlaying.stop) {
                mPlaying.stop = mPlaying.noteOff;
            }
            mPlaying.stop(0);
        }
        mPlaying = source;
    }
    if (keyPlaying === "n") {
        if (nPlaying) {
            if (!nPlaying.stop) {
                nPlaying.stop = nPlaying.noteOff;
            }
            nPlaying.stop(0);
        }
        nPlaying = source;
    }
    if (keyPlaying === "o") {
        if (oPlaying) {
            if (!oPlaying.stop) {
                oPlaying.stop = oPlaying.noteOff;
            }
            oPlaying.stop(0);
        }
        oPlaying = source;
    }
    if (keyPlaying === "p") {
        if (pPlaying) {
            if (!pPlaying.stop) {
                pPlaying.stop = pPlaying.noteOff;
            }
            pPlaying.stop(0);
        }
        pPlaying = source;
    }
    if (keyPlaying === "q") {
        if (qPlaying) {
            if (!qPlaying.stop) {
                qPlaying.stop = qPlaying.noteOff;
            }
            qPlaying.stop(0);
        }
        qPlaying = source;
    }
    if (keyPlaying === "r") {
        if (rPlaying) {
            if (!rPlaying.stop) {
                rPlaying.stop = rPlaying.noteOff;
            }
            rPlaying.stop(0);
        }
        rPlaying = source;
    }
    if (keyPlaying === "s") {
        if (sPlaying) {
            if (!sPlaying.stop) {
                sPlaying.stop = sPlaying.noteOff;
            }
            sPlaying.stop(0);
        }
        sPlaying = source;
    }
    if (keyPlaying === "t") {
        if (tPlaying) {
            if (!tPlaying.stop) {
                tPlaying.stop = tPlaying.noteOff;
            }
            tPlaying.stop(0);
        }
        tPlaying = source;
    }
    if (keyPlaying === "u") {
        if (uPlaying) {
            if (!uPlaying.stop) {
                uPlaying.stop = uPlaying.noteOff;
            }
            uPlaying.stop(0);
        }
        uPlaying = source;
    }
    if (keyPlaying === "v") {
        if (vPlaying) {
            if (!vPlaying.stop) {
                vPlaying.stop = vPlaying.noteOff;
            }
            vPlaying.stop(0);
        }
        vPlaying = source;
    }
    if (keyPlaying === "w") {
        if (wPlaying) {
            if (!wPlaying.stop) {
                wPlaying.stop = wPlaying.noteOff;
            }
            wPlaying.stop(0);
        }
        wPlaying = source;
    }
    if (keyPlaying === "x") {
        if (xPlaying) {
            if (!xPlaying.stop) {
                xPlaying.stop = xPlaying.noteOff;
            }
            xPlaying.stop(0);
        }
        xPlaying = source;
    }
    if (keyPlaying === "z") {
        if (zPlaying) {
            if (!zPlaying.stop) {
                zPlaying.stop = zPlaying.noteOff;
            }
            zPlaying.stop(0);
        }
        zPlaying = source;
    }

    if (keyPlaying === "y") {
        if (yPlaying) {
            if (!yPlaying.stop) {
                yPlaying.stop = yPlaying.noteOff;
            }
            yPlaying.stop(0);
        }
        yPlaying = source;
    }
}


function stopGuitar(keyPlaying, sample) {

    const difference = stopTime - keyDownTime;
    if (keyPlaying) {
        if (!keyPlaying.stop) {
            keyPlaying.stop = keyPlaying.noteOff;
        }
        if (difference < .33) {
            if (isRecording) {
                rhythms[sample][rhythmIndex] = .33;
                if (rhythmIndex === -1) {
                    rhythms[sample][15] = .33;
                }
                console.log(sample + " = " + rhythms[sample]);
            }
            keyPlaying.stop(eighth);
            $("#first-check").fadeOut(1300);

        }
        if (difference > .33 && difference < .67) {
            keyPlaying.stop(quarter);
            if (isRecording) {
                rhythms[sample][rhythmIndex] = .67;
                if (rhythmIndex === -1) {
                    rhythms[sample][15] = .67;
                }
                console.log(sample + " = " + rhythms[sample]);
            }
        }

        if (difference > .67 && difference < 1.01) {
            keyPlaying.stop(threeEighths);
            if (isRecording) {
                rhythms[sample][rhythmIndex] = 1.01;
                console.log(sample + " = " + rhythms[sample]);
            }
        }

        if (difference > 1.01) {
            keyPlaying.stop(halfNote);
            if (isRecording) {
                rhythms[sample][rhythmIndex] = 1.35;
                if (rhythmIndex === -1) {
                    rhythms[sample][15] = .33;
                }
            }
            console.log(sample + " = " + rhythms[sample]);
        }
    }
}

//same for all keys
function keyDownAnimation() {

    let first_check = $("#first-check");
    let note_bar_full = $("#note-bar-full");
    let note_bar_full_second = $("#note-bar-full-second");
    let note_bar_full_second_half = $("#note-bar-full-second-half");
    let note_bar_full_third = $("#note-bar-full-third");

    $("#second-check").finish().fadeOut(100);
    $("#third-check").finish().fadeOut(100);
    $("#fourth-check").finish().fadeOut(100);
    first_check.finish();
    note_bar_full.stop().css({width: "0px"});
    note_bar_full_second.stop().css({width: "0px"});
    note_bar_full_second_half.stop().css({width: "0px"});
    note_bar_full_third.stop().css({width: "0px"});

    note_bar_full_third.animate(
        {width: "280px"}, 1000, function () {
        }
    );
    note_bar_full_second_half.animate(
        {width: "250px"}, 900, function () {
            $("#third-check").fadeOut(100);
            $("#fourth-check").fadeIn(0);
            $("#third-hold").fadeOut(0);
        }
    );
    note_bar_full_second.animate(
        {width: "250px"}, 700, function () {
            $("#third-check").fadeIn(100);
            $("#second-check").fadeOut(100);
            $("#second-hold").fadeOut(200);
            $("#third-hold").fadeIn(100);
        }
    );
    note_bar_full.filter(':not(:animated)').animate(
        {width: "78px"}, 290, function () {
            $("#second-check").fadeIn(100);
            $("#first-check").fadeOut(100);
            $("#first-hold").fadeOut(200);
            $("#second-hold").fadeIn(100);
        }
    );
    $("#first-hold").show();
    first_check.show();
}


//same for all keys
function keyUpAnimation(letter) {

    $('#' + letter + '-button').velocity({backgroundColor: "#ff9900"}, 0);

    $("#first-hold").fadeOut(100);
    $("#second-hold").fadeOut(100);
    $("#third-hold").fadeOut(100);

    let note_bar_full = $("#note-bar-full");
    let note_bar_full_second = $("#note-bar-full-second");
    let note_bar_full_second_half = $("#note-bar-full-second-half");
    let note_bar_full_third = $("#note-bar-full-third");

    note_bar_full.stop();
    note_bar_full.filter(':not(:animated)').animate({width: "0px"});
    note_bar_full_second.stop();
    note_bar_full_second.filter(':not(:animated)').animate({width: "0px"});
    note_bar_full_second_half.stop();
    note_bar_full_second_half.filter(':not(:animated)').animate({width: "0px"});
    note_bar_full_third.stop();
    note_bar_full_third.filter(':not(:animated)').animate({width: "0px"});

}

/*function playGuitar2(instrument) {
    var source = audioContext.createBufferSource();
    source.buffer = instrument;
    source.connect(audioContext.destination);
    //source.connect(analyser);
    //try this after source start if doesn't work
    if (!source.start)
        source.start = source.noteOn;
    startTime = audioContext.currentTime;
    //eighth = startTime + .25;
    //quarter = startTime + .5;
    //threeEights = startTime + .75;
    //console.log(startTime);
    //console.log(quarter);
    //console.log(threeEights);
    source.start(0);
    // stops sample at 8th note (for 60 tempo - needs to be dynamic)
    z_playing = source;
}*/


function BufferLoader(context, urlList, callback) {
    this.audioContext = context;
    this.urlList = urlList;
    this.onload = callback;
    //this.bufferList = new Array();
    this.bufferList = [];
    this.loadCount = 0;
}


BufferLoader.prototype.loadBuffer = function (url, index) {
    // Load buffer asynchronously
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    const loader = this;

    request.onload = function () {
        // Asynchronously decode the audio file data in request.response
        loader.audioContext.decodeAudioData(
            request.response,
            function (buffer) {
                if (!buffer) {
                    alert('error decoding file data: ' + url);
                    return;
                }
                loader.bufferList[index] = buffer;
                if (++loader.loadCount === loader.urlList.length)
                    loader.onload(loader.bufferList);
            },
            function (error) {
                console.error('decodeAudioData error', error);
            }
        );
    }
    request.onerror = function () {
        alert('BufferLoader: XHR error');
    }
    request.send();
}

BufferLoader.prototype.load = function () {
    for (let i = 0; i < this.urlList.length; ++i)
        this.loadBuffer(this.urlList[i], i);
}

// First, let's shim the requestAnimationFrame API, with a setTimeout fallback
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();


function nextNote() {
    // Advance current note and time by a 16th note...
    const secondsPerBeat = 60.0 / tempo;    // Notice this picks up the CURRENT
    // tempo value to calculate beat length.
    nextNoteTime += 0.25 * secondsPerBeat;    // Add beat length to last beat time

    current16thNote++;    // Advance the beat number, wrap to zero
    if (current16thNote === 16) {
        current16thNote = 0;
    }
}


function scheduleNote(buffer, beatNumber, time, length, sample) {
    // push the note on the queue, even if we're not playing.
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    highlightTwo(150, sample)
    if (current) {
        if (!current.stop) {
            current.stop = current.noteOff;
        }
        current.stop(time);
    }
    if (!source.start)
        source.start = source.noteOn;
    source.start(time);
    source.stop(time + length);
    //current = source;
}

//the scheduler was launched when e.data == tick

function scheduler() {
    // while there are notes that will need to play before the next interval,
    // schedule them and advance the pointer.

    //nextNoteTime starts at the current value of when play was hit. This says when nextNoteTime is less than
    // current screen time plus the scheduleaheadtime, run scheduleNote() and nextNote()

    while (nextNoteTime < audioContext.currentTime + scheduleAheadTime) {


        // this used to be in the scheduleNote function at the top
        // push the note on the queue, even if we're not playing.

        notesInQueue.push({note: current16thNote, time: nextNoteTime});


        //notesInQueue[0] contains current16thNote and time to next note

        if (rhythms["kick"][current16thNote]) {
            scheduleNote(BUFFERS.kick, current16thNote, nextNoteTime, rhythms["kick"][current16thNote], "");
        }

        if (rhythms["hat"][current16thNote]) {
            scheduleNote(BUFFERS.hat, current16thNote, nextNoteTime, rhythms["hat"][current16thNote], "");
        }

        if (rhythms["w_key"][current16thNote]) {
            scheduleNote(BUFFERS.w_key, current16thNote, nextNoteTime, rhythms["w_key"][current16thNote], "w_key");
        }

        if (rhythms["d_key"][current16thNote]) {
            scheduleNote(BUFFERS.d_key, current16thNote, nextNoteTime, rhythms["d_key"][current16thNote], "d_key");
        }

        if (rhythms["y_key"][current16thNote]) {
            scheduleNote(BUFFERS.y_key, current16thNote, nextNoteTime, rhythms["y_key"][current16thNote], "y_key");
        }

        if (rhythms["t_key"][current16thNote]) {
            scheduleNote(BUFFERS.t_key, current16thNote, nextNoteTime, rhythms["t_key"][current16thNote], "t_key");
        }

        if (rhythms["c_key"][current16thNote]) {
            scheduleNote(BUFFERS.c_key, current16thNote, nextNoteTime, rhythms["c_key"][current16thNote], "c_key");
        }

        if (rhythms["b_key"][current16thNote]) {
            scheduleNote(BUFFERS.b_key, current16thNote, nextNoteTime, rhythms["b_key"][current16thNote], "b_key");
        }

        if (rhythms["q_key"][current16thNote]) {
            scheduleNote(BUFFERS.q_key, current16thNote, nextNoteTime, rhythms["q_key"][current16thNote], "q_key");
        }

        if (rhythms["x_key"][current16thNote]) {
            scheduleNote(BUFFERS.x_key, current16thNote, nextNoteTime, rhythms["x_key"][current16thNote], "x_key");
        }

        if (rhythms["g_key"][current16thNote]) {
            scheduleNote(BUFFERS.g_key, current16thNote, nextNoteTime, rhythms["g_key"][current16thNote], "g_key");
        }

        if (rhythms["j_key"][current16thNote]) {
            scheduleNote(BUFFERS.j_key, current16thNote, nextNoteTime, rhythms["j_key"][current16thNote], "j_key");
        }

        if (rhythms["a_key"][current16thNote]) {
            scheduleNote(BUFFERS.a_key, current16thNote, nextNoteTime, rhythms["a_key"][current16thNote], "a_key");
        }

        if (rhythms["v_key"][current16thNote]) {
            scheduleNote(BUFFERS.v_key, current16thNote, nextNoteTime, rhythms["v_key"][current16thNote], "v_key");
        }

        if (rhythms["ii_key"][current16thNote]) {
            scheduleNote(BUFFERS.ii_key, current16thNote, nextNoteTime, rhythms["ii_key"][current16thNote], "ii_key");
        }

        if (rhythms["z_key"][current16thNote]) {
            scheduleNote(BUFFERS.z_key, current16thNote, nextNoteTime, rhythms["z_key"][current16thNote], "z_key");
        }

        if (rhythms["o_key"][current16thNote]) {
            scheduleNote(BUFFERS.o_key, current16thNote, nextNoteTime, rhythms["o_key"][current16thNote], "o_key");
        }

        if (rhythms["n_key"][current16thNote]) {
            scheduleNote(BUFFERS.n_key, current16thNote, nextNoteTime, rhythms["n_key"][current16thNote], "n_key");
        }

        if (rhythms["m_key"][current16thNote]) {
            scheduleNote(BUFFERS.m_key, current16thNote, nextNoteTime, rhythms["m_key"][current16thNote], "m_key");
        }

        if (rhythms["f_key"][current16thNote]) {
            scheduleNote(BUFFERS.f_key, current16thNote, nextNoteTime, rhythms["f_key"][current16thNote], "f_key");
        }

        if (rhythms["u_key"][current16thNote]) {
            scheduleNote(BUFFERS.u_key, current16thNote, nextNoteTime, rhythms["u_key"][current16thNote], "u_key");
        }

        if (rhythms["e_key"][current16thNote]) {
            scheduleNote(BUFFERS.e_key, current16thNote, nextNoteTime, rhythms["e_key"][current16thNote], "e_key");
        }
        if (rhythms["l_key"][current16thNote]) {
            scheduleNote(BUFFERS.l_key, current16thNote, nextNoteTime, rhythms["l_key"][current16thNote], "l_key");
        }

        if (rhythms["s_key"][current16thNote]) {
            scheduleNote(BUFFERS.s_key, current16thNote, nextNoteTime, rhythms["s_key"][current16thNote], "s_key");
        }

        if (rhythms["p_key"][current16thNote]) {
            scheduleNote(BUFFERS.p_key, current16thNote, nextNoteTime, rhythms["p_key"][current16thNote], "p_key");
        }

        if (rhythms["k_key"][current16thNote]) {
            scheduleNote(BUFFERS.k_key, current16thNote, nextNoteTime, rhythms["k_key"][current16thNote], "k_key");
        }

        if (rhythms["h_key"][current16thNote]) {
            scheduleNote(BUFFERS.h_key, current16thNote, nextNoteTime, rhythms["h_key"][current16thNote], "h_key");
        }

        if (rhythms["r_key"][current16thNote]) {
            scheduleNote(BUFFERS.r_key, current16thNote, nextNoteTime, rhythms["r_key"][current16thNote], "r_key");
        }

//  scheduleNote( current16thNote, nextNoteTime );
        //advances 16th notes
        nextNote();
    }
}

function play() {
    //changes isPlaying to true
    isPlaying = !isPlaying;
    if (isPlaying) {
        // start playing
        // sets current16thNote to zero (where the metronome begins)
        current16thNote = 0;
        // sets nextNoteTime to the current time.
        // This is basically when the metronome starts.
        nextNoteTime = audioContext.currentTime;
        timerWorker.postMessage("start");
        return "stop";
    } else {
        // if not playing
        timerWorker.postMessage("stop");
        return "play";
    }
    // clearAll();
}

function resetCanvas() {
    // resize the canvas - but remember - this clears the canvas too.
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // make sure we scroll to the top left.
    window.scrollTo(0, 0);
}


//////

function drawNote(draw, xindex) {
//  var elButton = document.getElementById(instruments[yindex] + '_' + xindex);
    if (draw > 0) {
        $('#note_' + xindex).addClass('note_selected');
    } else {
        $('#note_' + xindex).removeClass('note_selected');
    }
}

function updateControls(instrument) {
    metronomeDisplayed = instrument;
    for (let i = 0; i < 16; ++i) {
        drawNote(rhythms[instrument][i], i);
    }
}

//////

function draw() {
    // this thing is always running...we just want it to only run the drawing thing when the
    // last note drawn doesnt = the current note drawn.
    //  notesInQueue.push( { note: current16thNote, time: nextNoteTime } );
    // last16thNoteDrawn is now -1
    let currentNote = last16thNoteDrawn;
    // gets current time
    const currentTime = audioContext.currentTime;
    while (notesInQueue.length && notesInQueue[0].time < currentTime) {
        //this sets currentNote to the current16thNote
        currentNote = notesInQueue[0].note;
        //this seems to just remove the array from notesInQueue
        notesInQueue.splice(0, 1);   // remove note from queue
    }
    // We only need to draw if the note has moved.
    if (last16thNoteDrawn !== currentNote) {
        if (current16thNote < 5) {
            $("#measure_0").addClass("measure_metronome");
        } else {
            $("#measure_0").removeClass("measure_metronome");
        }
        if (current16thNote > 4) {
            $("#measure_1").addClass("measure_metronome");
        } else {
            $("#measure_1").removeClass("measure_metronome");
        }
    }
    if (last16thNoteDrawn !== currentNote) {
        // x is now width divided by 18
        // var x = Math.floor( canvas.width / 18 );
        // rectangle the size of the canvas
        // canvasContext.clearRect(0,0,canvas.width, canvas.height);
        const noteIndex = (current16thNote + 15) % 16;
        if (isRecording) {
            $("#note_" + noteIndex).addClass("note_metronome");
            $("#note_" + (noteIndex - 1)).removeClass("note_metronome");
            if (noteIndex === 0) {
                $("#note_15").removeClass("note_metronome");
            }
        } else {
            $("#note_" + noteIndex).addClass("note_metronome_two");
            $("#note_" + (noteIndex - 1)).removeClass("note_metronome_two");
            if (noteIndex === 0) {
                $("#note_15").removeClass("note_metronome_two");
            }
        }
//      for (var i=0; i<16; i++) {
//        canvasContext.fillStyle = ( currentNote == i ) ?
//        ((currentNote%4 === 0)?"red":"blue") : "black";
//        canvasContext.fillRect( x * (i+1), x, x/2, x/2 );
//      }
        //equalizes out the two, so that it doesn't run again.
        last16thNoteDrawn = currentNote;
    }
    // set up to draw again
    requestAnimFrame(draw);
}


function initBuffers() {
    replaceKeyboard();
    const names = [];
    const paths = [];
    for (let name in BUFFERS_TO_LOAD) {
        let path = BUFFERS_TO_LOAD[name];
        names.push(name);
        paths.push(path);
    }
    let bufferLoader = new BufferLoader(audioContext, paths, function (bufferList) {
        for (let i = 0; i < bufferList.length; i++) {
            const name = names[i];
            BUFFERS[name] = bufferList[i];
        }
        initDone(BUFFERS);
    });
    bufferLoader.load();
}

function init() {
    const container = document.createElement('div');
    container.className = "container";
    canvas = document.createElement('canvas');
    canvasContext = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //document.body.appendChild( container );
    //container.appendChild(canvas);
    //canvasContext.strokeStyle = "#ffffff";
    //canvasContext.lineWidth = 2;
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    // NOTE: THIS RELIES ON THE MONKEYPATCH LIBRARY BEING LOADED FROM
    // Http://cwilso.github.io/AudioContext-MonkeyPatch/AudioContextMonkeyPatch.js
    // TO WORK ON CURRENT CHROME!!  But this means our code can be properly
    // spec-compliant, and work on Chrome, Safari and Firefox.
    // creates a new audioaudioContext
    audioContext = new AudioContext();
    //analyser = audioContext.createAnalyser();
    initBuffers();
    window.onorientationchange = resetCanvas;
    window.onresize = resetCanvas;
    requestAnimFrame(draw);    // start the drawing loop.
    timerWorker = new Worker("assets/metronomeworker.js");
    timerWorker.onmessage = function (e) {
        // tick means the thing is running
        if (e.data === "tick") {
            //            console.log("tick!");
            scheduler();
        } else
            console.log("message: " + e.data);
    };
    //assigns lookahead value to interval
    timerWorker.postMessage({"interval": lookahead});

}

//basically, when i hit the key, it needs to change the array, which is

function initDone() {
    let turn_up_text = $('#turn-up-text');
    if (siteLoaded === 0) {
        if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
            turn_up_text.text("Press any key, A to Z and unmute your sound");
            if (savedSong) {
                turn_up_text.text("Pre-recorded beat. Press 'Space' twice to hear it, 'Backspace' to erase");
            }
            $('#player-headline').velocity({opacity: 1}, {display: "block"}, 0);
            $('#keyboard-wrapper').velocity({opacity: .3}, {display: "block"}, 0);
            $('#byline').velocity({opacity: 1}, {display: "block"}, 0);
            siteLoaded = 1;
        } else {
            $('#mobile-intro-text').text("First, unmute your sound. Each key below plays a short clip of the Otis Redding sample that Kanye used to construct the hook of Otis.");
            $('#player-headline').velocity({opacity: 1}, {display: "block"}, 0);
            siteLoaded = 1;
        }
    }
}

function sampleOnOff(sample) {
    let sampleIndex;
    let sampleButton;
    let sampleId;
    if (!isPlaying) {
        presetLoaded = true;
    }
    turnUp("preset-button");
    updateControls("e_key");
    $('#delete-button').show();
    $(".sample-button").each(function () {
        $(this).css("background-color", "#fff");
    });

    if (sample === "1") {
        rhythms = sampleOne[sampleLoaded];
        sampleId = "#sample-one";
        sampleButton = "#sample-one-play";
        sampleIndex = 0;
    }

    if (sample === "2") {
        rhythms = sampleTwo[sampleLoaded];
        sampleId = "#sample-two";
        sampleButton = "#sample-two-play";
        sampleIndex = 1;
    }

    if (sample === "3") {
        rhythms = sampleThree[sampleLoaded];
        sampleId = "#sample-three";
        sampleButton = "#sample-three-play";
        sampleIndex = 2;
    }

    if (sample === "4") {
        rhythms = sampleFour[sampleLoaded];
        sampleId = "#sample-four";
        sampleButton = "#sample-four-play";
        sampleIndex = 3;
    }

    if (sample === "5") {
        rhythms = sampleFive[sampleLoaded];
        sampleId = "#sample-five";
        sampleButton = "#sample-five-play";
        sampleIndex = 4;
    }

    //if we're not playing turn that shit on and turn everything else off
    if (!isPlaying) {
        $(sampleId).velocity({backgroundColor: "#58B79A"}, 0);
        $(sampleButton).hide();
        //other buttons turned off
        samples[sampleIndex] = 1;
        spaceButton();
        play();
    } else {
        //if it was playing and it was also sOne, turn it off, simple
        presetLoaded = false;
        if (samples[sampleIndex]) {
            //turn if off
            spaceButton();
            clearAll();
            play();
            samples = [0, 0, 0, 0, 0, 0];
            $(sampleId).velocity({backgroundColor: "#fff"}, 0);
            $(sampleButton).show();
        }
        //if it was playing and it wasn't sOne, different...
        else {
            presetLoaded = true;
            //turn off shit
            play();
            console.log('here');
            samples = [0, 0, 0, 0, 0, 0];

            if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
                $('#sample-one-play').show();
                $('#sample-two-play').show();
                $('#sample-three-play').show();
                $('#sample-four-play').show();
                $('#sample-five-play').show();
                $('#sample-six-play').show();
                $(sampleButton).hide();
            }

            $('#sample-one').velocity({backgroundColor: "#FFF"}, 0);
            $('#sample-two').velocity({backgroundColor: "#FFF"}, 0);
            $('#sample-three').velocity({backgroundColor: "#FFF"}, 0);
            $('#sample-four').velocity({backgroundColor: "#FFF"}, 0);
            $('#sample-five').velocity({backgroundColor: "#FFF"}, 0);
            $('#sample-six').velocity({backgroundColor: "#FFF"}, 0);
            //turn on shit
            $(sampleId).velocity({backgroundColor: "#58B79A"}, 0);

            samples[sampleIndex] = 1;
            play();
        }
    }
}

$(document).ready(function () {
    savedSong = getParameterByName('song');
    savedSongSample = getParameterByName('sample');

    function getParameterByName(name) {
        name = name.replace(/\[/, "\\[").replace(/]/, "\\]");
        const regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    if (savedSongSample) {
        sampleLoaded = savedSongSample;
        if (savedSongSample === "kanye") {
            BUFFERS_TO_LOAD = BUFFERS_TO_LOAD_3;
            initBuffers();
            $('#dilla-sample').velocity({color: '#fff'}, 0);
            $('#otis-sample').velocity({color: '#58B79A'}, 0);
            $('#presets-by').text("BEATS BY KANYE");
            $('.kanye-hide').velocity({opacity: 0}, {display: "none"}, 0);
        }
        if (savedSongSample === "impress") {
            BUFFERS_TO_LOAD = BUFFERS_TO_LOAD_1;
            initBuffers();
            $('#dilla-sample').velocity({color: '#fff'}, 0);
            $('#impress-sample').velocity({color: '#58B79A'}, 0);
            $('#presets-by').text("BEATS BY 9TH WONDER");
            if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
                $('.dilla-sample').velocity({backgroundColor: '#fff'}, 0);
                $('.impress-sample').velocity({backgroundColor: '#58B79A'}, 0);
                $('.otis-sample').velocity({backgroundColor: '#fff'}, 0);
            } else {
                $('.dilla-sample').velocity({color: '#fff'}, 0);
                $('.impress-sample').velocity({color: '#58B79A'}, 0);
                $('.otis-sample').velocity({color: '#fff'}, 0);
            }
        }
        if (savedSongSample === "dilla") {
            BUFFERS_TO_LOAD = BUFFERS_TO_LOAD_2;
            initBuffers();
            $('#dilla-sample').velocity({color: '#fff'}, 0);
            $('#impress-sample').velocity({color: '#58B79A'}, 0);
            $('#presets-by').text("BEATS BY DILLA");
            if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
                $('.dilla-sample').velocity({backgroundColor: '#58B79A'}, 0);
                $('.impress-sample').velocity({backgroundColor: '#fff'}, 0);
                $('.otis-sample').velocity({backgroundColor: '#fff'}, 0);
            } else {
                $('.dilla-sample').velocity({color: '#58B79A'}, 0);
                $('.impress-sample').velocity({color: '#fff'}, 0);
                $('.otis-sample').velocity({color: '#fff'}, 0);
            }
        }
    }

    /*if (savedSong) {
        $.ajax({
            url: 'http://www.mdaniels.com/samples/database.php',                  //the script to call to get data
            data: "id=" + savedSong,                        //you can insert url argumnets here to pass to api.php
            //for example "id=5&parent=6"
            dataType: 'json',                //data format
            crossDomain: true,
            success: function (data)          //on recieve of reply
            {
                sandBox = data;
                const newRhythms = data[1];
                rhythms = JSON.parse(newRhythms);
                $(document).scrollTop($("#player").offset().top);
                $('#delete-button').show();
                $('#turn-up-text').text("This is a pre-recorded beat. Press 'Space' twice to hear it, 'Backspace' to erase");
                $('#saved-intro-text').text("A pre-recorded beat is loaded via the URL.");
                $('#turn-up').css('width', '500px');
                //var oldRhythms = JSON.stringify(rhythms);
            }
        });
    }*/

    $(".about-link").click(function () {
        $('#intro').velocity("scroll", {duration: 500});
    });

    $("#turn-up").click(function () {
        turnUp();
        $('#turn-up').velocity({opacity: 0}, {display: "none"}, 0);
    });

    $(".dilla-sample").click(function () {
        sampleLoaded = "dilla";
        clearAll();
        if (isPlaying) {
            spaceButton();
            play();
        }
        turnUp("sample-button");

        if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
            $('.dilla-sample').velocity({backgroundColor: '#58B79A'}, 0);
            $('.impress-sample').velocity({backgroundColor: '#fff'}, 0);
            $('.otis-sample').velocity({backgroundColor: '#fff'}, 0);
        } else {
            $('.dilla-sample').velocity({color: '#58B79A'}, 0);
            $('.impress-sample').velocity({color: '#fff'}, 0);
            $('.otis-sample').velocity({color: '#fff'}, 0);
        }

        $('#presets-by').text("BEATS BY J DILLA");
        $('.kanye-hide').velocity({opacity: 1}, {display: "block"}, 0);
        BUFFERS_TO_LOAD = BUFFERS_TO_LOAD_2;
        initBuffers();
        replaceKeyboard();
    });

    $(".impress-sample").click(function () {
        sampleLoaded = "impress";
        clearAll();
        if (isPlaying) {
            spaceButton();
            play();
        }
        turnUp("sample-button");
        if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
            $('.dilla-sample').velocity({backgroundColor: '#fff'}, 0);
            $('.impress-sample').velocity({backgroundColor: '#58B79A'}, 0);
            $('.otis-sample').velocity({backgroundColor: '#fff'}, 0);
        } else {
            $('.dilla-sample').velocity({color: '#fff'}, 0);
            $('.impress-sample').velocity({color: '#58B79A'}, 0);
            $('.otis-sample').velocity({color: '#fff'}, 0);
        }
        $('#presets-by').text("BEATS BY 9TH WONDER");
        $('.kanye-hide').velocity({opacity: 1}, {display: "block"}, 0);
        BUFFERS_TO_LOAD = BUFFERS_TO_LOAD_1;
        initBuffers();
        replaceKeyboard();
    });

    $(".otis-sample").click(function () {
        sampleLoaded = "kanye";
        clearAll();
        if (isPlaying) {
            spaceButton();
            play();
        }
        turnUp("sample-button");
        if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
            $('.dilla-sample').velocity({backgroundColor: '#fff'}, 0);
            $('.impress-sample').velocity({backgroundColor: '#fff'}, 0);
            $('.otis-sample').velocity({backgroundColor: '#58B79A'}, 0);
        } else {
            $('.dilla-sample').velocity({color: '#fff'}, 0);
            $('.impress-sample').velocity({color: '#fff'}, 0);
            $('.otis-sample').velocity({color: '#58B79A'}, 0);
        }
        $('#presets-by').text("BEATS BY KANYE");
        $('.kanye-hide').velocity({opacity: 0}, {display: "none"}, 0);
        BUFFERS_TO_LOAD = BUFFERS_TO_LOAD_3;
        initBuffers();
        replaceKeyboard();
    });

    $(".note_item").each(function () {
        $(this).on("click", function () {
            let sampleClicked;
            let noteClicked;
            noteClicked = $(this).attr('id')
            sampleClicked = letter + "_key";
            noteClicked = noteClicked.split('_');
            noteClicked = noteClicked[1]; // this is the key
            //sampleClicked = JSON.stringify(sampleClicked);
            //noteClicked = JSON.stringify(noteClicked);
            //var letter2 = letter.charAt(0);
            if (rhythms[sampleClicked][noteClicked] === 0) {
                console.log("add");
                $(this).addClass('note_selected');
                rhythms[sampleClicked][noteClicked] = .67;
            } else {
                console.log("remove");
                rhythms[sampleClicked][noteClicked] = 0;
                $(this).removeClass('note_selected');
            }
        });
    });

    $(".keybutton2").each(function () {
        $(this).bind('touchstart', function () {
            let keyClicked;
            keyClicked = $(this).attr('id')
            keyClicked = keyClicked.charAt(0);
            if (keyClicked === "i") {
                keyClicked = "ii";
            }
            const sampleClicked = keyClicked + "_key";
            mobileRunSample(keyClicked, sampleClicked);
            //console.log(keyClicked);
            //mobileRunSample(keyClicked);
            turnUp("letter");
            console.log("began touch of" + this);
        });

        $(this).bind('touchend', function () {
            let keyClicked;
            keyClicked = $(this).attr('id')
            keyClicked = keyClicked.charAt(0);
            if (keyClicked === "i") {
                keyClicked = "ii";
            }
            const sampleClicked = keyClicked + "_key";
            $('#' + keyClicked + '-button').css("background-color", "#444");
            stopTime = audioContext.currentTime
            eighth = keyDownTime + .33;
            quarter = keyDownTime + .67;
            threeEighths = keyDownTime + 1.01;
            halfNote = keyDownTime + 1.35;

            switch (sampleClicked) {
                case "a_key":
                    stopGuitar(aPlaying, "a_key");
                    break;
                case "b_key":
                    stopGuitar(bPlaying, "b_key");
                    break;
                case "c_key":
                    stopGuitar(cPlaying, "c_key");
                    break;
                case "d_key":
                    stopGuitar(dPlaying, "d_key");
                    break;
                case "e_key":
                    stopGuitar(ePlaying, "e_key");
                    break;
                case "f_key":
                    stopGuitar(fPlaying, "f_key");
                    break;
                case "g_key":
                    stopGuitar(gPlaying, "g_key");
                    break;
                case "h_key":
                    stopGuitar(hPlaying, "h_key");
                    break;
                case "ii_key":
                    stopGuitar(iiPlaying, "ii_key");
                    break;
                case "j_key":
                    stopGuitar(jPlaying, "j_key");
                    break;
                case "k_key":
                    stopGuitar(kPlaying, "k_key");
                    break;
                case "l_key":
                    stopGuitar(lPlaying, "l_key");
                    break;
                case "m_key":
                    stopGuitar(mPlaying, "m_key");
                    break;
                case "n_key":
                    stopGuitar(nPlaying, "n_key");
                    break;
                case "o_key":
                    stopGuitar(oPlaying, "o_key");
                    break;
                case "p_key":
                    stopGuitar(pPlaying, "p_key");
                    break;
                case "q_key":
                    stopGuitar(qPlaying, "q_key");
                    break;
                case "r_key":
                    stopGuitar(rPlaying, "r_key");
                    break;
                case "s_key":
                    stopGuitar(sPlaying, "s_key");
                    break;
                case "t_key":
                    stopGuitar(tPlaying, "t_key");
                    break;
                case "u_key":
                    stopGuitar(uPlaying, "u_key");
                    break;
                case "v_key":
                    stopGuitar(vPlaying, "v_key");
                    break;
                case "w_key":
                    stopGuitar(wPlaying, "w_key");
                    break;
                case "x_key":
                    stopGuitar(xPlaying, "x_key");
                    break;
                case "y_key":
                    stopGuitar(yPlaying, "y_key");
                    break;
                case "z_key":
                    stopGuitar(zPlaying, "z_key");
                    break;
            }
        });
    });


    /*$("#share-beat").click(function () {
        savedRhythms = JSON.stringify(rhythms);
        //data = $(this).serialize() + "&" + $.param(savedRhythms);
        //get max
        $.ajax({
            type: "POST",
            url: 'http://www.mdaniels.com/samples/database2.php',                  //the script to call to get data
            data: "data=" + savedRhythms,                        //you can insert url argumnets here to pass to api.php
            crossDomain: true,
            success: function (data)          //on recieve of reply
            {
                $("#share-beat-link").fadeIn(300).text('Saved here - http://samplestitch.com/?song=' + data + '&sample=' + sampleLoaded);
            }
        });
        // parse   resultData = jQuery.parseJSON( resultData );
        // alert("retrieve your beats at mdaniels.com/samples/?song=" + resultData)
        // var oldRhythms = JSON.stringify(rhythms);
    });*/

    $("#password-clear").click(function () {
        $('#password').hide();
    });

    $("#sample-one").click(function () {
        sampleOnOff("1");
    });

    $("#sample-two").click(function () {
        sampleOnOff("2");
    });

    $("#sample-three").click(function () {
        sampleOnOff("3");
    });

    $("#sample-four").click(function () {
        sampleOnOff("4");
    });

    $("#sample-five").click(function () {
        sampleOnOff("5");
    });

    $("#play-button").click(function () {
        wavesurfer.playPause();
        $("#play-button-icon").toggle();
        $("#pause-button-icon").toggle();
    });

    $("#play-button-two").click(function () {
        wavesurferTwo.playPause();
        $("#play-button-icon-two").toggle();
        $("#pause-button-icon-two").toggle();
    });

    $("#second-play-button").click(function () {
        if (!secondPlaying) {
            wavesurfer.play([0]);
            secondPlaying = true;
        } else {
            wavesurfer.stop();
            secondPlaying = false;
        }
        $("#play-button-icon-second").toggle();
        $("#pause-button-icon-second").toggle();
        $('#second-player-marker').toggle().velocity({translateX: "237px"}, 103000);
    });

    $("#delete-button").click(function () {
        clearAll();
        turnUp("delete-button");
        let delete_button = $('#delete-button');
        delete_button.css('background-color', '#000');
        delete_button.css('color', '#fff');
        setTimeout(function () {
            delete_button.css('background-color', '#fff');
            delete_button.css('color', '#000');
        }, 200);
        updateControls("a_key");
        play();
        play();
    });

    $("#keybutton-return").click(function () {
        $(".note_item").each(function () {
            $(this).removeClass('note_metronome');
            $(this).removeClass('note_metronome_two');
        });
        turnUp("record-button");
        isRecording = !isRecording;
        if (isRecording) {
            $('#keybutton-return').addClass("flashing-red");
            //$('#keybutton-return').css('background-color', 'rgba(0,0,0,1)');
            //$('#keybutton-return').css('color', 'rgba(233,73,83,1)');
            //$('#keybutton-return-text').css('color', 'rgba(233,73,83,1)');


            if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
                $('#notes-helper-recording').velocity({opacity: 1}, {display: "block"}, 0);
            }
            $('#keybutton-return-icon').css('left', '87px');
            $('#keybutton-return-text').text(function (i, oldText) {
                return oldText === 'Record' ? 'Recording' : oldText;
            });
            if (!isPlaying) {
                spaceButton();
                play();
            }
        } else {
            //$('#keybutton-space').removeClass("flashing");
            //$('#keybutton-space').addClass("keybutton-space-background");
            $('#keybutton-return').removeClass("flashing-red");
            $('#notes-helper-recording').velocity({opacity: 0}, {display: "none"}, 0);
            //$('#keybutton-return').css('background-color', 'rgba(236,236,236,1)');
            //$('#keybutton-return').css('color', 'rgba(233,73,83,1)');
            $('#keybutton-return-icon').css('left', '75px');
            //$('#keybutton-return-text').css('color', 'rgba(0,0,0,1)');
            $('#keybutton-return-text').text(function (i, oldText) {
                return oldText === 'Recording' ? 'Record' : oldText;
            });
        }
    });


    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $("#keybutton-space").click(function () {
            if (presetLoaded === true) {
                clearAll();
                presetLoaded = false;
            }
            spaceButton();
            turnUp("space-button");
            play();
        });
    }

    $("#keybutton-space").bind('touchstart', function () {
        if (presetLoaded === true) {
            clearAll();
            presetLoaded = false;
        }
        spaceButton();
        turnUp("space-button");
        play();
    });

    $(document).keydown(function (key) {
        let metronome_button = $('#metronome-button');
        let delete_button = $('#delete-button');
        switch (parseInt(key.which, 10)) {
            case 49:
                key.preventDefault();
                sampleOnOff("1");
                break;
            case 50:
                key.preventDefault();
                sampleOnOff("2");
                break;
            case 51:
                key.preventDefault();
                sampleOnOff("3");
                break;
            case 52:
                key.preventDefault();
                sampleOnOff("4");
                break;
            case 53:
                key.preventDefault();
                sampleOnOff("5");
                break;
            case 16:
                console.log("isMetronome");
                //key.preventDefault();
                isMetronome = !isMetronome;
                //RhythmSample.play();
                console.log(isMetronome);
                if (isMetronome) {
                    metronome_button.css('background-color', '#ED6F32');
                    metronome_button.css('color', '#000');
                    $('#metronome-text').text(function (i, oldText) {
                        return oldText === 'metronome' ? 'metronome Off' : oldText;
                    });
                } else {
                    metronome_button.css('background-color', 'rgba(236,236,236,1)');
                    metronome_button.css('color', '#000');
                    $('#metronome-text').text(function (i, oldText) {
                        return oldText === 'metronome Off' ? 'metronome' : oldText;
                    });
                }
                break;
            case 32: //space button
                if (presetLoaded === true) {
                    clearAll();
                    presetLoaded = false;
                }
                key.preventDefault();
                spaceButton();
                turnUp("space-button");
                play();
                break;
            case 8: //delete button
                key.preventDefault();
                clearAll();
                turnUp("delete-button");
                delete_button.css('background-color', '#000');
                delete_button.css('color', '#fff');
                setTimeout(function () {
                    delete_button.css('background-color', '#fff');
                    delete_button.css('color', '#000');
                }, 200);
                updateControls("a_key");
                play();
                play();
                break;
            case 46: // delete button two
                key.preventDefault();
                clearAll();
                turnUp("delete-button");
                delete_button.css('background-color', '#000');
                delete_button.css('color', '#fff');
                setTimeout(function () {
                    delete_button.css('background-color', '#fff');
                    delete_button.css('color', '#000');
                }, 200);
                updateControls("a_key");
                play();
                play();
                break;
            case 13://return button
                key.preventDefault();
                $(".note_item").each(function () {
                    $(this).removeClass('note_metronome');
                    $(this).removeClass('note_metronome_two');
                });
                turnUp("record-button");
                isRecording = !isRecording;
                if (isRecording) {
                    $('#keybutton-return').addClass("flashing-red");
                    //$('#keybutton-return').css('background-color', 'rgba(0,0,0,1)');
                    //$('#keybutton-return').css('color', 'rgba(233,73,83,1)');
                    //$('#keybutton-return-text').css('color', 'rgba(233,73,83,1)');
                    $('#notes-helper-recording').velocity({opacity: 1}, {display: "block"}, 0);
                    $('#keybutton-return-icon').css('left', '87px');
                    $('#keybutton-return-text').text(function (i, oldText) {
                        return oldText === 'Record' ? 'Recording' : oldText;
                    });
                    if (!isPlaying) {
                        spaceButton();
                        play();
                    }
                } else {
                    //$('#keybutton-space').removeClass("flashing");
                    //$('#keybutton-space').addClass("keybutton-space-background");
                    $('#keybutton-return').removeClass("flashing-red");
                    $('#notes-helper-recording').velocity({opacity: 0}, {display: "none"}, 0);
                    //$('#keybutton-return').css('background-color', 'rgba(236,236,236,1)');
                    //$('#keybutton-return').css('color', 'rgba(233,73,83,1)');
                    $('#keybutton-return-icon').css('left', '75px');
                    //$('#keybutton-return-text').css('color', 'rgba(0,0,0,1)');
                    $('#keybutton-return-text').text(function (i, oldText) {
                        return oldText === 'Recording' ? 'Record' : oldText;
                    });
                }
                break;
            case 65:
                if (!a) {
                    a = true;
                    runSample(sampleLibrary[sampleLoaded]["a_key"]["letter"], sampleLibrary[sampleLoaded]["a_key"]["sample"]);
                    keyDownAnimation();
                    noteFlicker(sampleLibrary[sampleLoaded]["a_key"]["word"]);
                }
                break;
            case 66:
                if (!b) {
                    b = true;
                    runSample(sampleLibrary[sampleLoaded]["b_key"]["letter"], sampleLibrary[sampleLoaded]["b_key"]["sample"]);
                    keyDownAnimation();
                    noteFlicker(sampleLibrary[sampleLoaded]["b_key"]["word"]);
                }
                break;
            case 67:
                if (!c) {
                    c = true;
                    runSample(sampleLibrary[sampleLoaded]["c_key"]["letter"], sampleLibrary[sampleLoaded]["c_key"]["sample"]);
                    keyDownAnimation();
                    noteFlicker(sampleLibrary[sampleLoaded]["c_key"]["word"]);
                }
                break;
            case 68:
                if (!d) {
                    d = true;
                    runSample(sampleLibrary[sampleLoaded]["d_key"]["letter"], sampleLibrary[sampleLoaded]["d_key"]["sample"]);
                    keyDownAnimation();
                    noteScale(sampleLibrary[sampleLoaded]["d_key"]["word"]);
                }
                break;
            case 69:
                if (!e) {
                    e = true;
                    runSample(sampleLibrary[sampleLoaded]["e_key"]["letter"], sampleLibrary[sampleLoaded]["e_key"]["sample"]);
                    keyDownAnimation();
                    noteScale(sampleLibrary[sampleLoaded]["e_key"]["word"]);
                }
                break;
            case 70:
                if (!f) {
                    f = true;
                    runSample(sampleLibrary[sampleLoaded]["f_key"]["letter"], sampleLibrary[sampleLoaded]["f_key"]["sample"]);
                    keyDownAnimation();
                    notePopOut(sampleLibrary[sampleLoaded]["f_key"]["word"]);
                }
                break;
            case 71:
                if (!g) {
                    g = true;
                    runSample(sampleLibrary[sampleLoaded]["g_key"]["letter"], sampleLibrary[sampleLoaded]["g_key"]["sample"]);
                    keyDownAnimation();
                    noteOutline(sampleLibrary[sampleLoaded]["g_key"]["word"]);
                }
                break;
            case 72:
                if (!h) {
                    h = true;
                    runSample(sampleLibrary[sampleLoaded]["h_key"]["letter"], sampleLibrary[sampleLoaded]["h_key"]["sample"]);
                    keyDownAnimation();
                    noteShow("note-abril", sampleLibrary[sampleLoaded]["h_key"]["word"]);
                }
                break;
            case 73:
                if (!ii) {
                    ii = true;
                    runSample(sampleLibrary[sampleLoaded]["ii_key"]["letter"], sampleLibrary[sampleLoaded]["ii_key"]["sample"]);
                    keyDownAnimation();
                    noteBlackout(sampleLibrary[sampleLoaded]["ii_key"]["word"]);
                }
                break;
            case 74:
                if (!j) {
                    j = true;
                    runSample(sampleLibrary[sampleLoaded]["j_key"]["letter"], sampleLibrary[sampleLoaded]["j_key"]["sample"]);
                    keyDownAnimation();
                    noteShow("note-abril", sampleLibrary[sampleLoaded]["j_key"]["word"]);
                }
                break;
            case 75:
                if (!k) {
                    k = true;
                    runSample(sampleLibrary[sampleLoaded]["k_key"]["letter"], sampleLibrary[sampleLoaded]["k_key"]["sample"]);
                    keyDownAnimation();
                    noteShow("note-monoton", sampleLibrary[sampleLoaded]["k_key"]["word"]);
                }
                break;
            case 76:
                if (!l) {
                    l = true;
                    runSample(sampleLibrary[sampleLoaded]["l_key"]["letter"], sampleLibrary[sampleLoaded]["l_key"]["sample"]);
                    keyDownAnimation();
                    noteBlackout(sampleLibrary[sampleLoaded]["l_key"]["word"]);
                }
                break;
            case 77:
                if (!m) {
                    m = true;
                    runSample(sampleLibrary[sampleLoaded]["m_key"]["letter"], sampleLibrary[sampleLoaded]["m_key"]["sample"]);
                    keyDownAnimation();
                    noteShow("note-monoton", sampleLibrary[sampleLoaded]["m_key"]["word"]);
                }
                break;
            case 78:
                if (!n) {
                    n = true;
                    runSample(sampleLibrary[sampleLoaded]["n_key"]["letter"], sampleLibrary[sampleLoaded]["n_key"]["sample"]);
                    keyDownAnimation();
                    noteShow("note-monoton", sampleLibrary[sampleLoaded]["n_key"]["word"]);
                }
                break;
            case 79:
                if (!o) {
                    o = true;
                    runSample(sampleLibrary[sampleLoaded]["o_key"]["letter"], sampleLibrary[sampleLoaded]["o_key"]["sample"]);
                    keyDownAnimation();
                    noteBlackout(sampleLibrary[sampleLoaded]["o_key"]["word"]);
                }
                break;
            case 80:
                if (!p) {
                    p = true;
                    runSample(sampleLibrary[sampleLoaded]["p_key"]["letter"], sampleLibrary[sampleLoaded]["p_key"]["sample"]);
                    keyDownAnimation();
                    noteBlackout(sampleLibrary[sampleLoaded]["p_key"]["word"]);
                }
                break;
            case 81:
                if (!q) {
                    q = true;
                    runSample(sampleLibrary[sampleLoaded]["q_key"]["letter"], sampleLibrary[sampleLoaded]["q_key"]["sample"]);
                    keyDownAnimation();
                    noteFlicker(sampleLibrary[sampleLoaded]["q_key"]["word"]);
                }
                break;
            case 82:
                if (!r) {
                    r = true;
                    runSample(sampleLibrary[sampleLoaded]["r_key"]["letter"], sampleLibrary[sampleLoaded]["r_key"]["sample"]);
                    keyDownAnimation();
                    noteScale(sampleLibrary[sampleLoaded]["r_key"]["word"]);
                }
                break;
            case 83:
                if (!s) {
                    s = true;
                    runSample(sampleLibrary[sampleLoaded]["s_key"]["letter"], sampleLibrary[sampleLoaded]["s_key"]["sample"]);
                    keyDownAnimation();
                    noteOutline(sampleLibrary[sampleLoaded]["s_key"]["word"]);
                }
                break;
            case 84:
                if (!t) {
                    t = true;
                    runSample(sampleLibrary[sampleLoaded]["t_key"]["letter"], sampleLibrary[sampleLoaded]["t_key"]["sample"]);
                    keyDownAnimation();
                    notePopOut(sampleLibrary[sampleLoaded]["t_key"]["word"]);
                }
                break;
            case 85:
                if (!u) {
                    u = true;
                    runSample(sampleLibrary[sampleLoaded]["u_key"]["letter"], sampleLibrary[sampleLoaded]["u_key"]["sample"]);
                    keyDownAnimation();
                    noteOutline(sampleLibrary[sampleLoaded]["u_key"]["word"]);
                }
                break;
            case 86:
                if (!v) {
                    v = true;
                    runSample(sampleLibrary[sampleLoaded]["v_key"]["letter"], sampleLibrary[sampleLoaded]["v_key"]["sample"]);
                    keyDownAnimation();
                    noteOutline(sampleLibrary[sampleLoaded]["v_key"]["word"]);
                }
                break;
            case 87:
                if (!w) {
                    w = true;
                    runSample(sampleLibrary[sampleLoaded]["w_key"]["letter"], sampleLibrary[sampleLoaded]["w_key"]["sample"]);
                    keyDownAnimation();
                    notePopOut(sampleLibrary[sampleLoaded]["w_key"]["word"]);
                }
                break;
            case 88:
                if (!x) {
                    x = true;
                    runSample(sampleLibrary[sampleLoaded]["x_key"]["letter"], sampleLibrary[sampleLoaded]["x_key"]["sample"]);
                    keyDownAnimation();
                    noteFlicker(sampleLibrary[sampleLoaded]["x_key"]["word"]);
                }
                break;
            case 89:
                if (!y) {
                    y = true;
                    runSample(sampleLibrary[sampleLoaded]["y_key"]["letter"], sampleLibrary[sampleLoaded]["y_key"]["sample"]);
                    keyDownAnimation();
                    noteBlackout(sampleLibrary[sampleLoaded]["y_key"]["word"]);
                }
                break;
            case 90:
                if (!z) {
                    z = true;
                    runSample(sampleLibrary[sampleLoaded]["z_key"]["letter"], sampleLibrary[sampleLoaded]["z_key"]["sample"]);
                    keyDownAnimation();
                    notePopOut(sampleLibrary[sampleLoaded]["z_key"]["word"]);
                }
                break;
        }
    });
});


$(document).on("keyup", function (event) {
    switch (event.which) {
        case 65:
            a = false;
            stopTime = audioContext.currentTime
            eighth = keyDownTime + .33;
            quarter = keyDownTime + .67;
            threeEighths = keyDownTime + 1.01;
            halfNote = keyDownTime + 1.35;
            keyUpAnimation("a");
            stopGuitar(aPlaying, "a_key");
            break;
        case 66:
            b = false;
            stopTime = audioContext.currentTime
            eighth = keyDownTime + .33;
            quarter = keyDownTime + .67;
            threeEighths = keyDownTime + 1.01;
            halfNote = keyDownTime + 1.35;
            keyUpAnimation("b");
            stopGuitar(bPlaying, "b_key");
            break;
        case 67:
            c = false;
            stopTime = audioContext.currentTime
            eighth = keyDownTime + .33;
            quarter = keyDownTime + .67;
            threeEighths = keyDownTime + 1.01;
            halfNote = keyDownTime + 1.35;
            keyUpAnimation("c");
            stopGuitar(cPlaying, "c_key");
            break;
        case 68:
            d = false;
            stopTime = audioContext.currentTime
            eighth = keyDownTime + .33;
            quarter = keyDownTime + .67;
            threeEighths = keyDownTime + 1.01;
            halfNote = keyDownTime + 1.35;
            keyUpAnimation("d");
            stopGuitar(dPlaying, "d_key");
            break;
        case 69:
            e = false;
            stopTime = audioContext.currentTime
            eighth = keyDownTime + .33;
            quarter = keyDownTime + .67;
            threeEighths = keyDownTime + 1.01;
            halfNote = keyDownTime + 1.35;
            keyUpAnimation("e");
            stopGuitar(ePlaying, "e_key");
            break;
        case 70:
            f = false;
            stopTime = audioContext.currentTime
            eighth = keyDownTime + .33;
            quarter = keyDownTime + .67;
            threeEighths = keyDownTime + 1.01;
            halfNote = keyDownTime + 1.35;
            keyUpAnimation("f");
            stopGuitar(fPlaying, "f_key");
            break;
        case 71:
            g = false;
            stopTime = audioContext.currentTime
            eighth = keyDownTime + .33;
            quarter = keyDownTime + .67;
            threeEighths = keyDownTime + 1.01;
            halfNote = keyDownTime + 1.35;
            keyUpAnimation("g");
            stopGuitar(gPlaying, "g_key");
            break;
        case 72:
            h = false;
            stopTime = audioContext.currentTime
            eighth = keyDownTime + .33;
            quarter = keyDownTime + .67;
            threeEighths = keyDownTime + 1.01;
            halfNote = keyDownTime + 1.35;
            keyUpAnimation("h");
            stopGuitar(hPlaying, "h_key");
            break;
        case 73:
            ii = false;
            stopTime = audioContext.currentTime
            eighth = keyDownTime + .33;
            quarter = keyDownTime + .67;
            threeEighths = keyDownTime + 1.01;
            halfNote = keyDownTime + 1.35;
            keyUpAnimation("ii");
            stopGuitar(iiPlaying, "ii_key");
            break;
        case 74:
            j = false;
            stopTime = audioContext.currentTime
            eighth = keyDownTime + .33;
            quarter = keyDownTime + .67;
            threeEighths = keyDownTime + 1.01;
            halfNote = keyDownTime + 1.35;
            keyUpAnimation("j");
            stopGuitar(jPlaying, "j_key");
            break;
        case 75:
            k = false;
            stopTime = audioContext.currentTime
            eighth = keyDownTime + .33;
            quarter = keyDownTime + .67;
            threeEighths = keyDownTime + 1.01;
            halfNote = keyDownTime + 1.35;
            keyUpAnimation("k");
            stopGuitar(kPlaying, "k_key");
            break;
        case 76:
            l = false;
            stopTime = audioContext.currentTime
            eighth = keyDownTime + .33;
            quarter = keyDownTime + .67;
            threeEighths = keyDownTime + 1.01;
            halfNote = keyDownTime + 1.35;
            keyUpAnimation("l");
            stopGuitar(lPlaying, "l_key");
            break;
        case 77:
            m = false;
            stopTime = audioContext.currentTime
            eighth = keyDownTime + .33;
            quarter = keyDownTime + .67;
            threeEighths = keyDownTime + 1.01;
            halfNote = keyDownTime + 1.35;
            keyUpAnimation("m");
            stopGuitar(mPlaying, "m_key");
            break;
        case 78:
            n = false;
            stopTime = audioContext.currentTime
            eighth = keyDownTime + .33;
            quarter = keyDownTime + .67;
            threeEighths = keyDownTime + 1.01;
            halfNote = keyDownTime + 1.35;
            keyUpAnimation("n");
            stopGuitar(nPlaying, "n_key");
            break;
        case 79:
            o = false;
            stopTime = audioContext.currentTime
            eighth = keyDownTime + .33;
            quarter = keyDownTime + .67;
            threeEighths = keyDownTime + 1.01;
            halfNote = keyDownTime + 1.35;
            keyUpAnimation("o");
            stopGuitar(oPlaying, "o_key");
            break;
        case 80:
            p = false;
            stopTime = audioContext.currentTime
            eighth = keyDownTime + .33;
            quarter = keyDownTime + .67;
            threeEighths = keyDownTime + 1.01;
            halfNote = keyDownTime + 1.35;
            keyUpAnimation("p");
            stopGuitar(pPlaying, "p_key");
            break;
        case 81:
            q = false;
            stopTime = audioContext.currentTime
            eighth = keyDownTime + .40;
            quarter = keyDownTime + .67;
            threeEighths = keyDownTime + 1.01;
            halfNote = keyDownTime + 1.35;
            keyUpAnimation("q");
            stopGuitar(qPlaying, "q_key");
            break;
        case 82:
            r = false;
            stopTime = audioContext.currentTime
            eighth = keyDownTime + .33;
            quarter = keyDownTime + .67;
            threeEighths = keyDownTime + 1.01;
            halfNote = keyDownTime + 1.35;
            keyUpAnimation("r");
            stopGuitar(rPlaying, "r_key");
            break;
        case 83:
            s = false;
            stopTime = audioContext.currentTime
            eighth = keyDownTime + .38;
            quarter = keyDownTime + .67;
            threeEighths = keyDownTime + 1.01;
            halfNote = keyDownTime + 1.35;
            keyUpAnimation("s");
            stopGuitar(sPlaying, "s_key");
            break;
        case 84:
            t = false;
            stopTime = audioContext.currentTime
            eighth = keyDownTime + .33;
            quarter = keyDownTime + .67;
            threeEighths = keyDownTime + 1.01;
            halfNote = keyDownTime + 1.35;
            keyUpAnimation("t");
            stopGuitar(tPlaying, "t_key");
            break;
        case 85:
            u = false;
            stopTime = audioContext.currentTime
            eighth = keyDownTime + .33;
            quarter = keyDownTime + .67;
            threeEighths = keyDownTime + 1.01;
            halfNote = keyDownTime + 1.35;
            keyUpAnimation("u");
            stopGuitar(uPlaying, "u_key");
            break;
        case 86:
            v = false;
            stopTime = audioContext.currentTime
            eighth = keyDownTime + .33;
            quarter = keyDownTime + .67;
            threeEighths = keyDownTime + 1.01;
            halfNote = keyDownTime + 1.35;
            keyUpAnimation("v");
            stopGuitar(vPlaying, "v_key");
            break;
        case 87:
            w = false;
            stopTime = audioContext.currentTime
            eighth = keyDownTime + .5;
            quarter = keyDownTime + .67;
            threeEighths = keyDownTime + 1.01;
            halfNote = keyDownTime + 1.35;
            keyUpAnimation("w");
            stopGuitar(wPlaying, "w_key");
            break;
        case 88:
            x = false;
            stopTime = audioContext.currentTime
            eighth = keyDownTime + .33;
            quarter = keyDownTime + .67;
            threeEighths = keyDownTime + 1.01;
            halfNote = keyDownTime + 1.35;
            keyUpAnimation("x");
            stopGuitar(xPlaying, "x_key");
            break;
        case 90:
            z = false;
            stopTime = audioContext.currentTime
            eighth = keyDownTime + .33;
            quarter = keyDownTime + .67;
            threeEighths = keyDownTime + 1.01;
            halfNote = keyDownTime + 1.35;
            keyUpAnimation("z");
            stopGuitar(zPlaying, "z_key");
            break;
        case 89:
            y = false;
            stopTime = audioContext.currentTime
            eighth = keyDownTime + .33;
            quarter = keyDownTime + .67;
            threeEighths = keyDownTime + 1.01;
            halfNote = keyDownTime + 1.35;
            keyUpAnimation("y");
            stopGuitar(yPlaying, "y_key");
            break;
    }
});

window.addEventListener("load", init);
// full sample on P
const RhythmSample = {};
RhythmSample.play = function () {
    if (isMetronome) {
        metronomeInterval = setInterval(function () {
            const startTime = audioContext.currentTime;
            const tempo = 89; // BPM (beats per minute)
            //var quarterNoteTime = (60 / tempo);
            //const eighthNoteTime = (60 / tempo) / 2;
            const sixteenthNoteTime = (60 / tempo) / 4;
            const time = startTime;
            playSound(BUFFERS.kick, time);
//      playSound(BUFFERS.hat, time + 2 * sixteenthNoteTime);
            playSound(BUFFERS.hat, time + 4 * sixteenthNoteTime);
//      playSound(BUFFERS.hat, time + 6 * sixteenthNoteTime);
            playSound(BUFFERS.hat, time + 8 * sixteenthNoteTime);
//      playSound(BUFFERS.hat, time + 10 * sixteenthNoteTime);
            playSound(BUFFERS.hat, time + 12 * sixteenthNoteTime);
//      playSound(BUFFERS.hat, time + 14 * sixteenthNoteTime);
        }, 2696.62921348);
        const startTime = audioContext.currentTime;
        const tempo = 89; // BPM (beats per minute)
        //const quarterNoteTime = (60 / tempo);
        //const eighthNoteTime = (60 / tempo) / 2;
        const sixteenthNoteTime = (60 / tempo) / 4;
        const time = startTime;
        playSound(BUFFERS.kick, time);
//    playSound(BUFFERS.hat, time + 2 * sixteenthNoteTime);
        playSound(BUFFERS.hat, time + 4 * sixteenthNoteTime);
//    playSound(BUFFERS.hat, time + 6 * sixteenthNoteTime);
        playSound(BUFFERS.hat, time + 8 * sixteenthNoteTime);
//    playSound(BUFFERS.hat, time + 10 * sixteenthNoteTime);
        playSound(BUFFERS.hat, time + 12 * sixteenthNoteTime);
//    playSound(BUFFERS.hat, time + 14 * sixteenthNoteTime);
    } else {
        clearInterval(metronomeInterval);
    }

    function playSound(buffer, time) {
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        if (current) {
            if (!current.stop) {
                current.stop = current.noteOff;
            }
            current.stop(0);
        }
        if (!source.start)
            source.start = source.noteOn;
        source.start(time);
        metronomePlaying = source;
    }

    // on the 3/8
    //    playSound(BUFFERS.piano, time + 2 * eighthNoteTime);
    // the 7/8
    //	playSound(BUFFERS.piano, time + 6 * eighthNoteTime);
    // Eighth Notes
    //	for (var i = 0; i < 8; ++i) {
    //      playSound(BUFFERS.snare, time + i * eighthNoteTime);
    //    }
    // quarter notes
    //	for (var i = 0; i < 4; ++i) {
    //      playSound(BUFFERS.bell, time + i * quarterNoteTime);
    //    }
};