function Sound3D(x, y, z) {
	this.wavFile = "assets/sound/opera.mp3";
	this.id = guid();
	// current x, y, z
	this.x = x;
	this.y = y;
	this.z = z;
	// original x, y, z
	this.oX = x;
	this.oY = y;
	this.oZ = z;

	this.rotate = function(thetaX, thetaY, thetaZ) {
		this.x = (this.oX * Math.cos(thetaX) - this.oY * Math.sin(thetaX));
		this.y = (this.oX * Math.sin(thetaX) + this.oY * Math.cos(thetaX));

		this.z = (this.y * Math.sin(thetaZ) + this.oZ * Math.cos(thetaZ));
		this.y = (this.y * Math.cos(thetaZ) - this.oZ * Math.sin(thetaZ));

		var tempZ = this.z;
		this.z = (-this.x * Math.sin(thetaY) + this.z * Math.cos(thetaY));
		this.x = (this.x * Math.cos(thetaY) - tempZ * Math.sin(thetaY));
	};

	this.update = function(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.oX = x;
		this.oY = y;
		this.oZ = z;
	}

	function guid() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			s4() + '-' + s4() + s4() + s4();
	}
}