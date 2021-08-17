//Samples =============================================================

//Instruments
const kickDrum = new Audio('drum-sounds/kick-drum.mp3');
const clap = new Audio('drum-sounds/clap.mp3');
const hiHats = new Audio('drum-sounds/hi-hat.mp3');
const snareDrum = new Audio('drum-sounds/snare.mp3');
const cowBell = new Audio('drum-sounds/cowbell.mp3');

// //Click track
const tick = new Audio('drum-sounds/tick.mp3');
const tock = new Audio('drum-sounds/tock.mp3');

//Helper Functions ====================================================

//Interval function
let intId = 0;
const startInt = function () { intId = setInterval(metronomeUpdate, 300); }

//count variable
let count = 0;


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

});

// body click listeners
$('body').click(function () {

    $('.show-synth').click(function () {
        $('.container').css({ 'flex-direction': 'column-reverse' })
        $('.drum-machine').css({ 'visibility': 'hidden' });
        $('.synth').css({ "visibility": "visible", "z-index": "1" });
    })

    $('.show-drums').click(function () {
        $('.container').css({ 'flex-direction': 'column' })
        $('.drum-machine').css({ 'visibility': 'visible' })
        $('.synth').css({ "visibility": "hidden" });
    })

    $('.drum-machine').
        find('.instrument:checked').
        closest('.pad').
        css({ 'background-color': 'rgb(0, 255, 106)' });

    $('.drum-machine').
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

    $('.synth').
        find('input.key-cell:checked').
        closest('.cell').
        css({ 'background-color': 'rgb(126, 4, 4)' });

    $('.synth').
        find($('input.key-cell:checkbox:not(:checked)')).
        closest('.cell').
        css({ 'background-color': 'rgb(33, 3, 46)' });

});


//Start/Stop Button =======================================================

$('input[name=start]').change(function () {

    if (this.checked) {
        startInt();
    } else {
        count = 0;
        clearInterval(intId);
        $("#display-text").text("Count: " + count);
    }

});

// Audio functions ===================================================

//Metronome
function metronomeUpdate() {

    //Click track
    if ($('#metronome').prop('checked')) {
        if (count == 1 ||
            count == 2 ||
            count == 3 ||
            count == 5 ||
            count == 6 ||
            count == 7 ||
            count == 9 ||
            count == 10 ||
            count == 11 ||
            count == 13 ||
            count == 14 ||
            count == 15) {
            tick.play();
        } if (count == 4 || count == 8 || count == 12 || count == 16) {
            tock.play();
        }
    };

    let radioVariable = Number($(".break:checked").val());
    //Count reset
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
        }
    }   
};


//Kick Drum
setInterval(kickUpdate, 300);

function kickUpdate() {

    for (let i=0; i <= 16; i++) {

        if ($(`#kick-${i}`).prop('checked') && count === i) {
            kickDrum.load();
            kickDrum.play();
        }
    }
}
//Clap
setInterval(clapUpdate, 300);

function clapUpdate() {

    for (let i = 0; i <= 16; i++) {

        if ($(`#clap-${i}`).prop('checked') && count === i) {
            clap.load();
            clap.play();
        }
    }

};

//HiHats
setInterval(hiUpdate, 300);

function hiUpdate() {

    for (let i = 0; i <= 16; i++) {

        if ($(`#hat-${i}`).prop('checked') && count === i) {
            hiHats.load();
            hiHats.play();
        }
    }

};

//snare
setInterval(snareUpdate, 300);

function snareUpdate() {

    for (let i = 0; i <= 16; i++) {

        if ($(`#snare-${i}`).prop('checked') && count === i) {
            snareDrum.load();
            snareDrum.play();
        }
    }

};

//cowbell
setInterval(cowbellUpdate, 300);

function cowbellUpdate() {

    for (let i = 0; i <= 16; i++) {

        if ($(`#cowbell-${i}`).prop('checked') && count === i) {
            cowBell.load();
            cowBell.play();
        }
    }

};
