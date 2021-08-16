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

//Onload
// $(document).ready(function () {
//     $('.synth').css({"visibility": "hidden"})
// });

// body click listeners
$('body').click(function () {

    $('body').
        find('.instrument:checked').
        closest('.pad').
        css({ 'background-color': 'rgb(0, 255, 106)' });

    $('body').
        find($("input:checkbox:not(:checked)")).
        closest('.pad').
        css({ 'background-color': 'rgb(70, 70, 70)' });

    $('.show-synth').click(function () {
        $('.container').css({ 'flex-direction': 'column-reverse' })
        $('.drum-machine').css({ 'visibility': 'hidden' });
        $('.synth').css({ "visibility": "visible" });
    })

    $('.show-drums').click(function () {
        $('.container').css({ 'flex-direction': 'column' })
        $('.drum-machine').css({ 'visibility': 'visible'})
        $('.synth').css({ "visibility": "hidden" });
    })

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
            count == 7) {
            tick.play();
        } if (count == 4 || count == 8) {
            tock.play();
        }
    };

    //Count reset
    if (count >= 8) {
        count = 0;
    };

    //Count Update
    count += 1;

    //Count display
    $("#display-text").text("Count: " + count);

    // Count animation ===========================================================================

    //Column 1
    if (count == 1) {

        $('body').
            find($("input:checkbox:not(:checked)")).
            closest('.one').
            css({
                'background-color': 'rgb(242, 255, 73)',
                'box-shadow': '0 0 20px rgb(191, 255, 255)'
            });

    } if (count != 1) {

        $('body').
            find($("input:checkbox:not(:checked)")).
            closest('.one').
            css({ 'background-color': 'rgb(70, 70, 70)' });

        //Column 2
    } if (count == 2) {

        $('body').
            find($("input:checkbox:not(:checked)")).
            closest('.two').
            css({
                'background-color': 'rgb(89, 165, 216)',
                'box-shadow': '0 0 20px rgb(191, 255, 255)'
            });

    } if (count != 2) {

        $('body').
            find($("input:checkbox:not(:checked)")).
            closest('.two').
            css({ 'background-color': 'rgb(70, 70, 70)' });

        //Column 3
    } if (count == 3) {

        $('body').
            find($("input:checkbox:not(:checked)")).
            closest('.three').
            css({
                'background-color': 'rgb(132, 210, 246)',
                'box-shadow': '0 0 20px rgb(191, 255, 255)'
            });

    } if (count != 3) {

        $('body').
            find($("input:checkbox:not(:checked)")).
            closest('.three').
            css({ 'background-color': 'rgb(70, 70, 70)' });

        //Column 4
    }; if (count == 4) {

        $('body').
            find($("input:checkbox:not(:checked)")).
            closest('.four').
            css({
                'background-color': 'rgb(145, 229, 246)',
                'box-shadow': '0 0 20px rgb(191, 255, 255)'
            });

    } if (count != 4) {

        $('body').
            find($("input:checkbox:not(:checked)")).
            closest('.four').
            css({ 'background-color': 'rgb(70, 70, 70)' });

        //Column 5
    } if (count == 5) {

        $('body').
            find($("input:checkbox:not(:checked)")).
            closest('.five').
            css({
                'background-color': 'rgb(242, 255, 73)',
                'box-shadow': '0 0 20px rgb(191, 255, 255)'
            });

    } if (count != 5) {

        $('body').
            find($("input:checkbox:not(:checked)")).
            closest('.five').
            css({ 'background-color': 'rgb(70, 70, 70)' });

        //Column 6
    } if (count == 6) {

        $('body').
            find($("input:checkbox:not(:checked)")).
            closest('.six').
            css({
                'background-color': 'rgb(89, 165, 216)',
                'box-shadow': '0 0 20px rgb(191, 255, 255)'
            });

    } if (count != 6) {

        $('body').
            find($("input:checkbox:not(:checked)")).
            closest('.six').
            css({ 'background-color': 'rgb(70, 70, 70)' });

        //Column 7
    } if (count == 7) {

        $('body').
            find($("input:checkbox:not(:checked)")).
            closest('.seven').
            css({
                'background-color': 'rgb(132, 210, 246)',
                'box-shadow': '0 0 20px rgb(191, 255, 255)'
            });

    } if (count != 7) {

        $('body').
            find($("input:checkbox:not(:checked)")).
            closest('.seven').
            css({ 'background-color': 'rgb(70, 70, 70)' });

        //Column 8
    } if (count == 8) {

        $('body').
            find($("input:checkbox:not(:checked)")).
            closest('.eight').
            css({
                'background-color': 'rgb(145, 229, 246)',
                'box-shadow': '0 0 20px rgb(191, 255, 255)'
            });


    } if (count != 8) {

        $('body').
            find($("input:checkbox:not(:checked)")).
            closest('.eight').
            css({ 'background-color': 'rgb(70, 70, 70)' });
    };

};


//Kick Drum
setInterval(kickUpdate, 300);

function kickUpdate() {

    for (let i=0; i <= 8; i++) {

        if ($(`#kick-${i}`).prop('checked') && count === i) {
            kickDrum.load();
            kickDrum.play();
        }
    }
}
//Clap
setInterval(clapUpdate, 300);

function clapUpdate() {

    if ($('#clap-1').prop('checked') && count == 1) {
        clap.load();
        clap.play();
    } if ($('#clap-2').prop('checked') && count == 2) {
        clap.load();
        clap.play();
    } if ($('#clap-3').prop('checked') && count == 3) {
        clap.load();
        clap.play();
    } if ($('#clap-4').prop('checked') && count == 4) {
        clap.load();
        clap.play();
    } if ($('#clap-5').prop('checked') && count == 5) {
        clap.load();
        clap.play();
    } if ($('#clap-6').prop('checked') && count == 6) {
        clap.load();
        clap.play();
    } if ($('#clap-7').prop('checked') && count == 7) {
        clap.load();
        clap.play();
    } if ($('#clap-8').prop('checked') && count == 8) {
        clap.load();
        clap.play();
    }

};

//HiHats
setInterval(hiUpdate, 300);

function hiUpdate() {

    if ($('#hat-1').prop('checked') && count == 1) {
        hiHats.load();
        hiHats.play();
    } if ($('#hat-2').prop('checked') && count == 2) {
        hiHats.load();
        hiHats.play();
    } if ($('#hat-3').prop('checked') && count == 3) {
        hiHats.load();
        hiHats.play();
    } if ($('#hat-4').prop('checked') && count == 4) {
        hiHats.load();
        hiHats.play();
    } if ($('#hat-5').prop('checked') && count == 5) {
        hiHats.load();
        hiHats.play();
    } if ($('#hat-6').prop('checked') && count == 6) {
        hiHats.load();
        hiHats.play();
    } if ($('#hat-7').prop('checked') && count == 7) {
        hiHats.load();
        hiHats.play();
    } if ($('#hat-8').prop('checked') && count == 8) {
        hiHats.load();
        hiHats.play();
    }

};

//snare
setInterval(snareUpdate, 300);

function snareUpdate() {

    if ($('#snare-1').prop('checked') && count == 1) {
        snareDrum.load();
        snareDrum.play();
    } if ($('#snare-2').prop('checked') && count == 2) {
        snareDrum.load();
        snareDrum.play();
    } if ($('#snare-3').prop('checked') && count == 3) {
        snareDrum.load();
        snareDrum.play();
    } if ($('#snare-4').prop('checked') && count == 4) {
        snareDrum.load();
        snareDrum.play();
    } if ($('#snare-5').prop('checked') && count == 5) {
        snareDrum.load();
        snareDrum.play();
    } if ($('#snare-6').prop('checked') && count == 6) {
        snareDrum.load();
        snareDrum.play();
    } if ($('#snare-7').prop('checked') && count == 7) {
        snareDrum.load();
        snareDrum.play();
    } if ($('#snare-8').prop('checked') && count == 8) {
        snareDrum.load();
        snareDrum.play();
    }

};

//cowbell
setInterval(cowbellUpdate, 300);

function cowbellUpdate() {

    if ($('#cowbell-1').prop('checked') && count == 1) {
        cowBell.load();
        cowBell.play();
    } if ($('#cowbell-2').prop('checked') && count == 2) {
        cowBell.load();
        cowBell.play();
    } if ($('#cowbell-3').prop('checked') && count == 3) {
        cowBell.load();
        cowBell.play();
    } if ($('#cowbell-4').prop('checked') && count == 4) {
        cowBell.load();
        cowBell.play();
    } if ($('#cowbell-5').prop('checked') && count == 5) {
        cowBell.load();
        cowBell.play();
    } if ($('#cowbell-6').prop('checked') && count == 6) {
        cowBell.load();
        cowBell.play();
    } if ($('#cowbell-7').prop('checked') && count == 7) {
        cowBell.load();
        cowBell.play();
    } if ($('#cowbell-8').prop('checked') && count == 8) {
        cowBell.load();
        cowBell.play();
    }

};
