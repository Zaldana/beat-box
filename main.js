//Audio Files =============================================================

//Drums Audio
const kickDrum = new Audio('drum-sounds/kick-drum.mp3');
const clap = new Audio('drum-sounds/clap.mp3');
const hiHats = new Audio('drum-sounds/hi-hat.mp3');
const snareDrum = new Audio('drum-sounds/snare.mp3');
const cowBell = new Audio('drum-sounds/cowbell.mp3');

//Sequencer Audio
const c = new Audio('synth-sounds/c.mp3');
const cS = new Audio('synth-sounds/cs.mp3');
const d = new Audio('synth-sounds/d.mp3');
const dS = new Audio('synth-sounds/ds.mp3');
const e = new Audio('synth-sounds/e.mp3');
const f = new Audio('synth-sounds/f.mp3');
const fS = new Audio('synth-sounds/fs.mp3');
const g = new Audio('synth-sounds/g.mp3');
const gS = new Audio('synth-sounds/gs.mp3');
const a = new Audio('synth-sounds/a.mp3');
const aS = new Audio('synth-sounds/as.mp3');
const b = new Audio('synth-sounds/b.mp3');

//Synth Audio
const kC =new Audio('synth-sounds/kc.mp3');
const kCs = new Audio('synth-sounds/kcs.mp3');
const kD = new Audio('synth-sounds/kd.mp3');
const kDs = new Audio('synth-sounds/kds.mp3');
const kE = new Audio('synth-sounds/ke.mp3');
const kF = new Audio('synth-sounds/kf.mp3');
const kFs = new Audio('synth-sounds/kfs.mp3');
const kG = new Audio('synth-sounds/kg.mp3');
const kGs = new Audio('synth-sounds/kgs.mp3');
const kA = new Audio('synth-sounds/ka.mp3');
const kAs = new Audio('synth-sounds/kas.mp3');
const kB = new Audio('synth-sounds/kb.mp3');
const kC2 = new Audio('synth-sounds/kc2.mp3');
const kCs2 = new Audio('synth-sounds/kcs2.mp3'); 
const kD2 = new Audio('synth-sounds/kd2.mp3');
const kDs2 = new Audio('synth-sounds/kds2.mp3');
const kE2 = new Audio('synth-sounds/ke2.mp3');

//Click track
const tick = new Audio('drum-sounds/tick.mp3');
const tock = new Audio('drum-sounds/tock.mp3');

// Starting variables ========================================================================

let count = 0;
let drumTempo = 350;
let intId = 0;
let drumIntid = 0;
let seqIntid = 0;

// Interval Functions ========================================================================

const startInt = function () { intId = setInterval(mainInt, drumTempo); }
const startDrumint = function () { drumIntid = setInterval(drumInt, drumTempo); }
const startSeqint = function () { seqIntid = setInterval(seqInt, drumTempo); }

// Repetetive Functions =====================================================================

// Drum pad css change
const lightUpdrums = function () {
     $('body').find('.instrument:checked').closest('.pad').
    css({ 'background-color': 'rgb(0, 255, 106)' }); 
};

// Sequencer cell css change
const lightUpseq = function () {
    $('.synth').find('input.key-cell:checked').closest('.cell').
     css({ 'background-color': 'rgb(126, 4, 4)' });
};

// Measure selector pad css change
const lightUpstep = function () {
    $('.drum-machine').find('.break:checked').closest('.pad').
    css({ 'background-color': 'red' });
};

// Tempo switches css change
const lightUptempo = function () {
    $('.drum-machine').find('.tempo-check:checked').closest('.tempo').
    css({ 'border': '3px cyan solid' });
}

// Update count display
const drumDisplay = function () {
    $("#display-text").text("Count: " + count);
}

// Local Storage =========================================================================

// Empty array for ids 
let storageArray = [];

// Local storage initial value
let initialValue = JSON.parse(localStorage.getItem('checked'));
if (initialValue === null) {
    initialValue = [];
};

//Load preiviously checked pads and cells
for (i=0; i<=initialValue.length; i++) {
     $('body').find(`#${initialValue[i]}`).attr('checked', true);
}

// On page load function ===================================================================
$(document).ready(function () {

    // Hide Sequencer and place behind drum machine
    $('.synth').css({
        "visibility": "hidden",
        "position": "absolute",
        "z-index": "-1"
    });
    
    // Start with step selector on beat 16 clicked and lightup
    $('#step-16').prop('checked', true);
    lightUpstep();

    // Start tempo switch at normal and light up
    $('#normal').prop('checked', true);
    lightUptempo();

    // Light up selected drum pads from local storage
    lightUpdrums();
    
    // Light up selected sequencer cells from local storage
    lightUpseq();
});

//Header Row Buttons =====================================================================

// START BUTTON
$('#start-button').click(function () {

    if (this.checked) {
        startInt();
        startDrumint();
        startSeqint();

    } else {
        count = 0;
        clearInterval(intId);
        clearInterval(drumIntid);
        clearInterval(seqIntid);
        drumDisplay();
    }
});

// Show sequencer on click
$('.show-synth').click(function () {
    $('.container').css({ 'flex-direction': 'column-reverse' })
    $('.drum-machine').css({ 'visibility': 'hidden' });
    $('.synth').css({ "visibility": "visible", "z-index": "1" });
})

// Show drum machine on click
$('.show-drums').click(function () {
    $('.container').css({ 'flex-direction': 'column' })
    $('.drum-machine').css({ 'visibility': 'visible' })
    $('.synth').css({ "visibility": "hidden" });
});

// Body click listener function =============================================================

$('body').click(function () {

    // Local storage update
    // Clear local storage
    storageArray = []

    // Add ids of clicked pads to storage array
    $('.drum-machine').
        find(".instrument:checked").
    each(function () { storageArray.push($(this).attr("id")); });

    // Add ids of clicked cells to storage array
    $('.synth').
        find(".key-cell:checked").
        each(function () { storageArray.push($(this).attr("id")); });

    // Update local storage array
    localStorage.setItem('checked', JSON.stringify(storageArray));

    // Light up drums on check
    lightUpdrums();

    // Light up sequencer cells on check
    lightUpseq();

    // Light up step selector on check
    lightUpstep();

    // Light up tempo selector on check
    lightUptempo();

    // Return pad to normal color on uncheck
    $('body').
        find($('.instrument:checkbox:not(:checked)')).closest('.pad').
        css({ 'background-color': 'rgb(70, 70, 70)' });

    // Return step selector to normal color on uncheck
    $('.drum-machine').
        find('.break:radio:not(:checked)').closest('.pad').
        css({ 'background-color': 'rgb(70, 70, 70)' });

    // Return tempo selector to normal color on uncheck
    $('.drum-machine').
        find('.tempo-check:radio:not(:checked)').closest('.tempo').
        css({ 'border': '.5px black solid' });

    // Return sequencer selector to normal color on uncheck
    $('.synth').
        find($('input.key-cell:checkbox:not(:checked)')).closest('.cell').
        css({ 'background-color': 'rgb(33, 3, 46)' });
      
});

// Audio functions ==================================================================

//Main interval function
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

    // step selector value
    let radioVariable = Number($(".break:checked").val());

    // Reset count based on the step selector
    if (count >= radioVariable) { count = 0; };

    //Count Update
    count += 1;

    //Count display
    drumDisplay();

    // Count animation ====================================================================
    
    for (i = 0; i <= 16; i++ ) {

        if (count === i) {

            // Drum machine column light up
            $('.drum-machine').
                find($(".instrument:checkbox:not(:checked)")).
                closest(`.${i}`).
                css({
                    'background-color': 'DarkTurquoise',
                    'box-shadow': '0 0 20px rgb(191, 255, 255)'
                });
            
            // Sequencer column light up
            $('.synth').
                find($(".key-cell:checkbox:not(:checked)")).
                closest(`.${i}`).
                css({
                    'background-color': 'rgb(255, 105, 180, 0.5)'
                });

        } if (count != i) {

            // Drum machine column light off
            $('.drum-machine').
                find($(".instrument:checkbox:not(:checked)")).
                closest(`.${i}`).
                css({ 'background-color': 'rgb(70, 70, 70)' });

            // Sequencer column light off
            $('.synth').
                find($(".key-cell:checkbox:not(:checked)")).
                closest(`.${i}`).
                css({ 'background-color': 'rgb(33, 3, 46)' });
        };
    };

    //Tempo =====================================================================

    //Set tempo based on the value of the selected radio button
    $('.tempo-button-row').click(function () {

        if ($('#start-button').prop('checked')) {

        clearInterval(intId);
        drumTempo = Number($(".tempo-check:checked").val());
        intId = setInterval(mainInt, drumTempo);

        };
    });
};

// Audio functions =============================================

// Play when pad checked and equal to count
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

    //Tempo change function based on radio value 
    $('.tempo-button-row').click(function () {

        if ($('#start-button').prop('checked')) {

        clearInterval(drumIntid);
        drumTempo = Number($(".tempo-check:checked").val());
        drumIntid = setInterval(drumInt, drumTempo);

        };
    });
};

// Play when cell checked and equal to count
function seqInt() {

    for (let i = 0; i <= 16; i++) {

        if ($(`#c${i}`).prop('checked') && count === i) {
            c.load();
            c.play();
        } if ($(`#cs${i}`).prop('checked') && count === i) {
            cS.load();
            cS.play();
        } if ($(`#d${i}`).prop('checked') && count === i) {
            d.load();
            d.play();
        } if ($(`#ds${i}`).prop('checked') && count === i) {
            dS.load();
            dS.play();
        } if ($(`#e${i}`).prop('checked') && count === i) {
            e.load();
            e.play();
        } if ($(`#f${i}`).prop('checked') && count === i) {
            f.load();
            f.play();
        } if ($(`#fs${i}`).prop('checked') && count === i) {
            fS.load();
            fS.play();
        } if ($(`#g${i}`).prop('checked') && count === i) {
            g.load();
            g.play();
        } if ($(`#gs${i}`).prop('checked') && count === i) {
            gS.load();
            gS.play();
        } if ($(`#a${i}`).prop('checked') && count === i) {
            a.load();
            a.play();
        } if ($(`#as${i}`).prop('checked') && count === i) {
            aS.load();
            aS.play();
        } if ($(`#b${i}`).prop('checked') && count === i) {
            b.load();
            b.play();
        }

    };

    //Tempo change function based on radio value 
    $('.tempo-button-row').click(function () {

        if ($('#start-button').prop('checked')) {

        clearInterval(seqIntid)
        drumTempo = Number($(".tempo-check:checked").val());
        seqIntid = setInterval(seqInt, drumTempo);
        
        }
    });
};

// Switch Case for playing with keyboard
$('body').keydown("keydown", function (event) {

    switch (event.key) { case "q": kC.load(); kC.play(); break; } 
    switch (event.key) { case "2": kCs.load(); kCs.play(); break; }
    switch (event.key) { case "w": kD.load(); kD.play(); break; }
    switch (event.key) { case "3": kDs.load(); kDs.play(); break; }
    switch (event.key) { case "e": kE.load(); kE.play(); break; }
    switch (event.key) { case "r": kF.load(); kF.play(); break; }
    switch (event.key) { case "5": kFs.load(); kFs.play(); break; }
    switch (event.key) { case "t": kG.load(); kG.play(); break; }
    switch (event.key) { case "6": kGs.load(); kGs.play(); break; }
    switch (event.key) { case "y": kA.load(); kA.play(); break; }
    switch (event.key) { case "7": kAs.load(); kAs.play(); break; }
    switch (event.key) { case "u": kB.load(); kB.play(); break; }
    switch (event.key) { case "i": kC2.load(); kC2.play(); break; } 
    switch (event.key) { case "9": kCs2.load(); kCs2.play(); break; }
    switch (event.key) { case "o": kD2.load(); kD2.play(); break; }
    switch (event.key) { case "0": kDs2.load(); kDs2.play(); break; }
    switch (event.key) { case "p": kE2.load(); kE2.play(); break; }

})

// Mouse click on keyboard to play
$('#kc').click(function () { kC.load(); kC.play(); });
$('#kcs').click(function () { kCs.load(); kCs.play(); });
$('#kd').click(function () { kD.load(); kD.play(); });
$('#kds').click(function () { kDs.load(); kDs.play(); });
$('#ke').click(function () { kE.load(); kE.play(); });
$('#kf').click(function () { kF.load(); kF.play(); });
$('#kfs').click(function () { kFs.load(); kFs.play(); });
$('#kg').click(function () { kG.load(); kG.play(); });
$('#kgs').click(function () { kGs.load(); kGs.play(); });
$('#ka').click(function () { kA.load(); kA.play(); });
$('#kas').click(function () { kAs.load(); kAs.play(); });
$('#kb').click(function () { kB.load(); kB.play(); });
$('#kc2').click(function () { kC2.load(); kC2.play(); });
$('#kcs2').click(function () { kCs2.load(); kCs2.play(); });
$('#kd2').click(function () { kD2.load(); kD2.play(); });
$('#kds2').click(function () { kDs2.load(); kDs2.play(); });
$('#ke2').click(function () { kE2.load(); kE2.play(); });