function truncateString(s, length) {
	var newString = s;

	if (newString.length > length) {
		newString = newString.substring(0, length - 3);
		newString += "...";
	}

	return newString;
}

function getFileNameFromPath(path) {
	return path.split("/").pop();
}