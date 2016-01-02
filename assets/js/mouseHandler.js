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

	// only do mouse move if not selecting a bunch
	if (selected.length == 0 || shift_hold) {
		startDragSelect(mousePos.x, mousePos.y);
		window.addEventListener("mousemove", dragSelectHandler, false);
		window.addEventListener("mouseup", dragSelectRelease, false);
	} else if (selected.length >= 1) {
		startDragMove(mousePos.x, mousePos.y);
		window.addEventListener("mousemove", dragSoundPositionHandler, false);
		window.addEventListener("mouseup", dragSoundPositionRelease, false);
	} 
}

function dragSoundPositionRelease(evt) {
	stopDrag();
	window.removeEventListener("mousemove", dragSoundPositionHandler, false);
	window.removeEventListener("mouseup", dragSoundPositionRelease, false);
}

function dragSoundPositionHandler(evt) {
	var mousePos = getMousePos(canvas, evt);
	updatePosition(mousePos.x, mousePos.y, selected);
	if (soundPlayer.isPlaying())
		soundPlayer.soundPositionChangeHandler(selected);
	draw();
}

function dragSelectRelease(evt) {
	stopDrag();
	draw();
	window.removeEventListener("mousemove", dragSelectHandler, false);
	window.removeEventListener("mouseup", dragSelectRelease, false);
}

function dragSelectHandler(evt) {
	var mousePos = getMousePos(canvas, evt);
	var shift_hold = evt.shiftKey;
	soundboardDragSelectHandler(mousePos.x, mousePos.y, shift_hold);
	draw();
}


function doMouseDrop(evt) {
  evt.stopPropagation();
  evt.preventDefault();

  var files = evt.dataTransfer.files; // FileList object.

  var mousePos = getMousePos(canvas, evt);

  var relPos = getRelativePosition(mousePos.x, mousePos.y);

  for (var i = 0, f; f = files[i]; i++) {
    soundPlayer.addSoundFile(f, relPos.x, relPos.y);
  }
}

function doMouseDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}