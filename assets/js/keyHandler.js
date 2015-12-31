window.addEventListener("keydown", doKeyDown, true);

var dX = 0;
var rotationVector = new Sound3D(0, 1, 0);
const KEYBOARD_SENSITIVITY = 0.05;

function doKeyDown(e) {

	if ( e.keyCode == 87 || e.keyCode == 38 ) {
		// up
	}

	if ( e.keyCode == 83 || e.keyCode == 40 ) {
		// down
	}

	if ( e.keyCode == 65 || e.keyCode == 37) {
		// left
		dX -= KEYBOARD_SENSITIVITY
	}

	if ( e.keyCode == 68 || e.keyCode == 39 ) {
		// right
		dX += KEYBOARD_SENSITIVITY
	}


	rotationVector.rotate(dX, 0, 0);
	var angle = 0;
	if (rotationVector.y >= 0)
		angle = -Math.atan(rotationVector.x/rotationVector.y);
	else
		angle = Math.PI + (Math.atan(-rotationVector.x/rotationVector.y));

	updateAngle(angle);
	draw();
	if (soundPlayer.isPlaying())
		soundPlayer.listenerOrientationChangeHandler(rotationVector.x, rotationVector.y, rotationVector.z);
}

