function BufferLoader(context, sound3DObj, audioFileUrl, callback, obj) {
	this.context = context;
    this.sound3DObj = sound3DObj;
    this.audioFileUrl = audioFileUrl;
    this.onload = callback;
    this.obj = obj;
}

BufferLoader.prototype.loadBuffer = function(fileToLoad) {
    var msg = "Loading file ";
    if (fileToLoad instanceof Sound3D) {
        this.loadBufferFromUrl(fileToLoad.wavFile);
        displayStatusMessage("Loading file " + getFileNameFromPath(fileToLoad.wavFile));
    } else if (fileToLoad instanceof File) {
        this.loadBufferFromLocalFile(fileToLoad);
        displayStatusMessage("Loading file " + fileToLoad.name);
    }
}

BufferLoader.prototype.loadBufferFromLocalFile = function(file) {
    var reader = new FileReader();

    var loader = this;
    reader.onload = function(e) {
        var buffer = reader.result;    

        loader.context.decodeAudioData(
            buffer,
            function(buffer) {
                loader.onload.call(loader.obj, buffer, loader.sound3DObj);
                displayStatusMessage("Finished loading file " + file.name);
            },
            function(e){
                displayStatusMessage("Error loading file " + file.name);
            }
        );
    }
    
    reader.readAsArrayBuffer(file);
}

BufferLoader.prototype.loadBufferFromUrl = function(url) {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    var loader = this;

    request.onload = function() {
        loader.context.decodeAudioData(
            request.response,
            // file,
            function(buffer) {
                loader.onload.call(loader.obj, buffer, loader.sound3DObj);
                displayStatusMessage("Finished loading file " + getFileNameFromPath(url));
            },
            function(e){
                displayStatusMessage("Error loading file " + getFileNameFromPath(url) + " (format not supported)");
            }
        );
    }

    request.onerror = function() {
        alert('BufferLoader: XHR error');        
    }

    request.send();
}

BufferLoader.prototype.load = function() {
    this.loadBuffer(this.audioFileUrl);
}