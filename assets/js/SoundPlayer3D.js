const ROOM_LENGTH = 10;

function SoundPlayer3D() {
	// window.onload = init;
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	this.context = new AudioContext();
	this.context.listener.setPosition(0, 0, 0);
	// camera look up, "up" direction of camera points out from the screen
	this.context.listener.setOrientation(0, 1, 0, 0, 0, -1);

	// List of all Sound3D objects. This list needs to be kept in sync with the list in GUI
	// this.sound3DList = new Array();
	this.sound3DList = rawList;
	// Map of buffers for openal
	this.sourceBufferList = {};
	// Map of panners for openal to control 3D sound effect
	this.pannerList = {};
	// List of openal sound sources
	this.sources = new Array();
	this.startOffset = 0;
	this.startTime = 0;
};

// SoundPlayer3D.prototype.addSoundList = function(soundList, isAppend) {
// 	if (!isAppend) {
// 		this.sound3DList.length = 0;
// 		this.sourceBufferList.length = 0;
// 	}
// 	for (var sound in soundList) {
// 		addSound(sound);
// 	}
// }

SoundPlayer3D.prototype.addSound = function(sound) {
	disableMediaControls();
	this.sound3DList.push(sound);
	var bufferLoader = new BufferLoader(
		this.context, [sound.wavFile,],
		this.appendToBufferMap, 
		this
	);
	bufferLoader.load();
}

// Sound loading finish callback function
// SoundPlayer3D.prototype.replaceBufferMap = function(bufferList) {
// 	this.sourceBufferList = bufferList;
// }

SoundPlayer3D.prototype.appendToBufferMap = function(bufferList) {
	for (var key in bufferList) {
		this.sourceBufferList[key] = bufferList[key];
	}
	enableMediaControls();
}

SoundPlayer3D.prototype.soundPositionChangeHandler = function(sound3DObj) {
	var panner = this.pannerList[sound3DObj.wavFile];
	panner.setPosition(sound3DObj.x * ROOM_LENGTH, sound3DObj.y * ROOM_LENGTH, sound3DObj.z * ROOM_LENGTH);
}

SoundPlayer3D.prototype.listenerOrientationChangeHandler = function(x, y, z) {
	this.context.listener.setOrientation(x, y, z, 0, 0, -1);
}

SoundPlayer3D.prototype.play = function() {
	// Play the sound
	this.sources.length = 0;
	for (var i = 0; i < this.sound3DList.length; i++) {
		var sound = this.sound3DList[i];
		this.startTime = this.context.currentTime;
		var source = this.context.createBufferSource();
		// Connect graph

		source.buffer = this.sourceBufferList[sound.wavFile];
		source.loop = true;

		// source.connect(this.context.destination);

		var panner = this.context.createPanner();
		panner.panningModel = "HRTF";
		panner.setPosition(sound.x * ROOM_LENGTH, sound.y * ROOM_LENGTH, sound.z * ROOM_LENGTH);
		source.connect(panner);
		panner.connect(this.context.destination);

		this.pannerList[sound.wavFile] = panner;

		// Start playback, but make sure we stay in bound of the buffer.
		source.start(0, this.startOffset % source.buffer.duration);
		this.sources.push(source);
	}
}

SoundPlayer3D.prototype.pause = function() {
	for (var i = 0; i < this.sources.length; i++) {
		this.sources[i].stop();
	}
	this.startOffset += this.context.currentTime - this.startTime;
}

SoundPlayer3D.prototype.stop = function() {
	for (var i = 0; i < this.sources.length; i++) {
		this.sources[i].stop();
	}
	this.startOffset = 0;
}

SoundPlayer3D.prototype.isPlaying = function() {
	return $('#btnplaypause').hasClass('pause');
}

function stop() {
	setPlayPauseButtonToPlay();
	soundPlayer.stop();
}

function aud_play_pause() {
	if ($('#btnplaypause').hasClass('play')) {
		setPlayPauseButtonToPause();
		soundPlayer.play();
	} else {
		setPlayPauseButtonToPlay();
		soundPlayer.pause();
	}
}

function setPlayPauseButtonToPlay() {
	$('#btnplaypause').removeClass('pause');
	$('#btnplaypause').addClass('play');
}

function setPlayPauseButtonToPause() {
	$('#btnplaypause').removeClass('play');
	$('#btnplaypause').addClass('pause');
}

function enableMediaControls() {
	$('#btnplaypause').removeAttr("disabled");
}

function disableMediaControls() {
	$('#btnplaypause').attr('disabled','disabled');
}