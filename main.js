//Samples =============================================================

//Drums
const kickDrum = new Audio('drum-sounds/kick-drum.mp3');
const clap = new Audio('drum-sounds/clap.mp3');
const hiHats = new Audio('drum-sounds/hi-hat.mp3');
const snareDrum = new Audio('drum-sounds/snare.mp3');
const cowBell = new Audio('drum-sounds/cowbell.mp3');

//Synth
const c = new Audio('synth-sounds/c.mp3');
const cs = new Audio('synth-sounds/cs.mp3');
const d = new Audio('synth-sounds/d.mp3');
const ds = new Audio('synth-sounds/ds.mp3');
const e = new Audio('synth-sounds/e.mp3');
const f = new Audio('synth-sounds/f.mp3');
const fs = new Audio('synth-sounds/fs.mp3');
const g = new Audio('synth-sounds/g.mp3');
const gS = new Audio('synth-sounds/gs.mp3');
const a = new Audio('synth-sounds/a.mp3');
const as = new Audio('synth-sounds/as.mp3');
const b = new Audio('synth-sounds/b.mp3');

//Click track
const tick = new Audio('drum-sounds/tick.mp3');
const tock = new Audio('drum-sounds/tock.mp3');

let count = 0;
let drumTempo = 400;
let intId = 0;
let drumIntid = 0;

const startInt = function () { intId = setInterval(mainInt, drumTempo); }
const startDrumint = function () { drumIntid = setInterval(drumInt, drumTempo); }
const startSeqint = function () { seqIntid = setInterval(seqInt, drumTempo); }

// CSS edits ==========================================================

//On page load
$(document).ready(function () {

    $('.synth').css({
        "visibility": "hidden",
        "position": "absolute",
        "z-index": "-1"
    });
    
    $('#step-16').prop('checked', true);
    $('.drum-machine').
        find('.break:checked').
        closest('.pad').
        css({ 'background-color': 'red' });

    $('#normal').prop('checked', true);
    $('.drum-machine').
        find('.tempo-check:checked').
        closest('.tempo').
        css({ 'border': '3px cyan solid' });

});

//Intrument toggle
$('.show-synth').click(function () {
    $('.container').css({ 'flex-direction': 'column-reverse' })
    $('.drum-machine').css({ 'visibility': 'hidden' });
    $('.synth').css({ "visibility": "visible", "z-index": "1" });
})

$('.show-drums').click(function () {
    $('.container').css({ 'flex-direction': 'column' })
    $('.drum-machine').css({ 'visibility': 'visible' })
    $('.synth').css({ "visibility": "hidden" });
});

// body click listeners
$('body').click(function () {

    //CSS based changes
    $('body').
        find('.instrument:checked').
        closest('.pad').
        css({ 'background-color': 'rgb(0, 255, 106)' });

    $('body').
        find($('.instrument:checkbox:not(:checked)')).
        closest('.pad').
        css({ 'background-color': 'rgb(70, 70, 70)' });

    $('.drum-machine').
        find('.break:radio:not(:checked)').
        closest('.pad').
        css({ 'background-color': 'rgb(70, 70, 70)' });

    $('.drum-machine').
        find('.break:checked').
        closest('.pad').
        css({ 'background-color': 'red' });

    $('.drum-machine').
        find('.tempo-check:checked').
        closest('.tempo').
        css({ 'border': '3px cyan solid' });

    $('.drum-machine').
        find('.tempo-check:radio:not(:checked)').
        closest('.tempo').
        css({ 'border': '.5px black solid' });

    $('.synth').
        find('input.key-cell:checked').
        closest('.cell').
        css({ 'background-color': 'rgb(126, 4, 4)' });

    $('.synth').
        find($('input.key-cell:checkbox:not(:checked)')).
        closest('.cell').
        css({ 'background-color': 'rgb(33, 3, 46)' });

});



//Tempo
$('.tempo-button-row').click(function () {

    drumTempo = Number($(".tempo-check:checked").val());

});

//Start/Stop Button =======================================================

$('#start-button').click(function () {

    if (this.checked) {
        
        startInt();
        startDrumint();
        startSeqint();
        console.log('started program 2');

    } else {
        
        count = 0;
        clearInterval(intId);
        clearInterval(drumIntid);
        clearInterval(seqIntid);
        $("#display-text").text("Count: " + count);
    }
});

// Audio functions ===================================================

//Metronome
function mainInt() {

    //Click track
    if ($('#metronome').prop('checked')) {
        
        if (count == 1 || count == 2 ||count == 3 || count == 5 || count == 6 ||
            count == 7 || count == 9 || count == 10 || count == 11 || count == 13 ||
            count == 14 ||count == 15) {

            tick.play();

        } if (count == 4 || count == 8 || count == 12 || count == 16) {
            
            tock.play();
        }
    };

    let radioVariable = Number($(".break:checked").val());

    if (count >= radioVariable) {
        
        count = 0;
   
    };

    //Count Update
    count += 1;

    //Count display
    $("#display-text").text("Count: " + count);

    // Count animation ===========================================================================
    for (i = 0; i <= 16; i++ ) {

        if (count === i) {

            $('.drum-machine').
                find($(".instrument:checkbox:not(:checked)")).
                closest(`.${i}`).
                css({
                    'background-color': 'DarkTurquoise',
                    'box-shadow': '0 0 20px rgb(191, 255, 255)'
                });
            
            $('.synth').
                find($(".key-cell:checkbox:not(:checked)")).
                closest(`.${i}`).
                css({
                    'background-color': 'rgb(255, 105, 180, 0.5)'
                });

        } if (count != i) {

            $('.drum-machine').
                find($(".instrument:checkbox:not(:checked)")).
                closest(`.${i}`).
                css({ 'background-color': 'rgb(70, 70, 70)' });

            $('.synth').
                find($(".key-cell:checkbox:not(:checked)")).
                closest(`.${i}`).
                css({ 'background-color': 'rgb(33, 3, 46)' });
        };
    };

    $('.tempo-button-row').click(function () {

        if ($('#start-button').prop('checked')) {

        clearInterval(intId);
        drumTempo = Number($(".tempo-check:checked").val());
        intId = setInterval(mainInt, drumTempo);

        };
    });
};



function drumInt() {

    for (let i=0; i <= 16; i++) {

        if ($(`#kick-${i}`).prop('checked') && count === i) {
            kickDrum.load();
            kickDrum.play();
        } if ($(`#clap-${i}`).prop('checked') && count === i) {
            clap.load();
            clap.play();
        } if ($(`#hat-${i}`).prop('checked') && count === i) {
            hiHats.load();
            hiHats.play();
        } if ($(`#snare-${i}`).prop('checked') && count === i) {
            snareDrum.load();
            snareDrum.play();
        } if ($(`#cowbell-${i}`).prop('checked') && count === i) {
            cowBell.load();
            cowBell.play();
        };
    };

    $('.tempo-button-row').click(function () {

        if ($('#start-button').prop('checked')) {

        clearInterval(drumIntid);
        drumTempo = Number($(".tempo-check:checked").val());
        drumIntid = setInterval(drumInt, drumTempo);

        };
    });
};

function seqInt() {

    for (let i = 0; i <= 16; i++) {

        if ($(`#c${i}`).prop('checked') && count === i) {
            c.load();
            c.play();
        } if ($(`#cs${i}`).prop('checked') && count === i) {
            cs.load();
            cs.play();
        } if ($(`#d${i}`).prop('checked') && count === i) {
            d.load();
            d.play();
        } if ($(`#ds${i}`).prop('checked') && count === i) {
            ds.load();
            ds.play();
        } if ($(`#e${i}`).prop('checked') && count === i) {
            e.load();
            e.play();
        } if ($(`#f${i}`).prop('checked') && count === i) {
            f.load();
            f.play();
        } if ($(`#fs${i}`).prop('checked') && count === i) {
            fs.load();
            fs.play();
        } if ($(`#g${i}`).prop('checked') && count === i) {
            g.load();
            g.play();
        } if ($(`#gs${i}`).prop('checked') && count === i) {
            gs.load();
            gs.play();
        } if ($(`#a${i}`).prop('checked') && count === i) {
            a.load();
            a.play();
        } if ($(`#as${i}`).prop('checked') && count === i) {
            as.load();
            as.play();
        } if ($(`#b${i}`).prop('checked') && count === i) {
            b.load();
            b.play();
        }

    };

    $('.tempo-button-row').click(function () {

        if ($('#start-button').prop('checked')) {

        clearInterval(seqIntid)
        drumTempo = Number($(".tempo-check:checked").val());
        seqIntid = setInterval(seqInt, drumTempo);
        
        }
    });
};
