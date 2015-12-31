// add event listeners
var canvas = document.getElementById("soundSourcesCanvas");
canvas.addEventListener('mousedown', doMouseDown, false);

var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);



var soundPlayer = new SoundPlayer3D();
// var sound = new Sound3D(0, 0, 0);
// sound.wavFile = "assets/sound/opera.wav";
 
var sound1 = new Sound3D(-0.2924037, 0.8573388, 0);
sound1.wavFile = 'assets/sound/01_Kick.wav';
var sound2 = new Sound3D(0.02393341, 0.8847737, 0);
sound2.wavFile = 'assets/sound/02_Overheads.wav';
var sound3 = new Sound3D(0.015608728, 0.5720165, 0);
sound3.wavFile = 'assets/sound/03_BassDI.wav';
var sound4 = new Sound3D(0.53381896, -0.23731136, 0);
sound4.wavFile = 'assets/sound/04_BassAmp.wav';
var sound5 = new Sound3D(-0.5712799, -0.37174213, 0);
sound5.wavFile = 'assets/sound/05_PianoInsideMics.wav';
var sound6 = new Sound3D(0.18418312, 0.45404667, 0);
sound6.wavFile = 'assets/sound/06_PianoOutsideMics.wav';
var sound7 = new Sound3D(0, 0.1522634, 0);
sound7.wavFile = 'assets/sound/07_LeadVox.wav';

soundPlayer.addSound(sound1);
soundPlayer.addSound(sound2);
soundPlayer.addSound(sound3);
soundPlayer.addSound(sound4);
soundPlayer.addSound(sound5);
soundPlayer.addSound(sound7);
soundPlayer.addSound(sound6);

// rawList.push(sound1);
// rawList.push(sound2);
// rawList.push(sound3);
// rawList.push(sound4);
// rawList.push(sound5);
// rawList.push(sound6);
// rawList.push(sound7);

drawSoundSources();