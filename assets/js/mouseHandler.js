function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
	  x: (evt.clientX-rect.left)/(rect.right-rect.left)*canvas.width,
	  y: (evt.clientY-rect.top)/(rect.bottom-rect.top)*canvas.height
	};
}

function doMouseDown(evt) {
	var mousePos = getMousePos(canvas, evt);
	var shift_hold = evt.shiftKey;
	soundboardClickHandler(mousePos.x, mousePos.y, shift_hold);
	draw();
	window.addEventListener("mousemove", doMouseMove, false);
	window.addEventListener("mouseup", doMouseUp, false);
}

function doMouseMove(evt) {
	var mousePos = getMousePos(canvas, evt);
	soundboardDragHandler(mousePos.x, mousePos.y);
	draw();
}

function doMouseUp(evt) {
	window.removeEventListener("mousemove", doMouseMove, false);
	window.removeEventListener("mouseup", doMouseUp, false);
}

function soundboardDragHandler(x, y) {
	updatePosition(x, y, currentSound);
	if (soundPlayer.isPlaying())
		soundPlayer.soundPositionChangeHandler(currentSound);
}