var canvas = document.getElementById("soundSourcesCanvas");

const FONT_FACE = "Arial";
const FONT_SIZE = 20;
const FILENAME_LENGTH = 15;

var bgImg = new Image();
bgImg.src = "assets/res/imgs/target_large.png";
bgImg.onload = drawBackground;

var circle = new Image();
circle.src = "assets/res/imgs/Circle.png";
circle.onload = drawSoundSources;

var arrowImg = new Image();
arrowImg.src = "assets/res/imgs/arrow_up.png";
arrowImg.onload = drawArrow;

// list to hold all sound sources positions
var rawList = new Array();
// list to hold all currently selected sound sources
var selected = new Array();
// the currently click/dragged sound source
var currentSound;

// the angle which the user is facing
angle = 0;

function updateAngle(newAngle) {
	angle = newAngle;
}

function draw() {
	var context = canvas.getContext("2d");
	context.clearRect(0, 0, canvas.width, canvas.height);

	drawBackground()

	drawSoundSources();

	drawArrow();
}


function drawBackground() {
	// draw background
	var context = canvas.getContext("2d");
	context.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
}

function drawArrow() {
	var context = canvas.getContext("2d");
	// draw arrow
	var arrowWidth = arrowImg.width * canvas.width / bgImg.width;
	var arrowHeight = arrowImg.height * canvas.height / bgImg.height

	// save the unrotated context of the canvas so we can restore it later
	// the alternative is to untranslate & unrotate after drawing
	context.save();

	// move to the center of the canvas
	context.translate(canvas.width / 2, canvas.height / 2);

	// rotate the canvas to the specified radians
	context.rotate(angle);

	context.drawImage(arrowImg, -arrowWidth / 2, -arrowHeight / 2, arrowWidth, arrowHeight);

	// we're done with the rotating so restore the unrotated context
	context.restore();
}

function drawSoundSources() {
	var context = canvas.getContext("2d");
	for (var i = 0; i < rawList.length; i++) {
		var pos = rawList[i];
		// Calculate the absolute position of each sound source 
		var x = ((1 - pos.x) * canvas.width / 2) - circle.width / 2;
		var y = ((1 - pos.y) * canvas.height / 2) - circle.height / 2;

		// Draw a circle representing a sound source
		context.drawImage(circle, x, y);
		// Draw the numbering of the sound source
		context.font = FONT_SIZE + "px " + FONT_FACE;
		context.fillText("" + (i + 1), x - FONT_SIZE / 4 + circle.width / 2, y + FONT_SIZE / 3 + circle.height / 2);
		//x - FONT_SIZE / 4 + circle.width / 2, y	+ FONT_SIZE / 3 + circle.height / 2);

		//Draw the name of the sound source
		if (pos.wavFile != null) {
			context.fillText(
					truncateString(pos.wavFile.split("/").pop(), FILENAME_LENGTH),
					x - FONT_SIZE, y);
		}

		// Draw a dashed rectangle around selected items
		if (selected.indexOf(pos) != -1) {
			context.setLineDash([2, 3]);
			context.strokeRect(x, y, circle.width, circle.height);
		}
	}
}

function truncateString(s, length) {
	var newString = s;

	if (newString.length > length) {
		newString = newString.substring(0, length - 3);
		newString += "...";
	}

	return newString;
}

function isWithinSetPosition(x, y) {
	for (var i = 0; i < rawList.length; i++) {
		var pos = rawList[i];
		var posx = (1 - pos.x) * canvas.width / 2;
		var posy = (1 - pos.y) * canvas.height / 2;
		if (Math.abs(x - posx) < circle.width / 2 && Math.abs(y - posy) < circle.height / 2)
			return i;
	}
	return -1;
}

function updatePosition(x, y, rawPos) {
	// Calculate the relative position of the source to the centre of the image
	rawPos.x = 1 - x * 2 / canvas.width;
	rawPos.y = 1 - y * 2 / canvas.height;
}

function soundboardClickHandler(x, y, shift_hold) {
	var index = isWithinSetPosition(x, y);
	if (index < 0) {
		return;
		// disable adding new sound sources for now
		// var newRawPos = new Sound3D(0, 0, 0);
		// rawList.push(newRawPos);
		// index = rawList.length - 1;
		// updatePosition(x, y, newRawPos);
	}

	currentSound = rawList[index];

	if (shift_hold)
		if (selected.indexOf(currentSound) == -1)
			selected.push(currentSound);
		else {
			var index = selected.indexOf(currentSound)
			selected.splice(index, 1);
		} else {
		if (selected.indexOf(currentSound) == -1) {
			selected.length = 0;
			selected.push(currentSound);
		} else
			selected.length = 0;
	}
}