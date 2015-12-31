function BufferLoader(context, urlList, callback, obj) {
	this.context = context;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = new Array();
    this.loadCount = 0;
    this.obj = obj;
}

BufferLoader.prototype.loadBuffer = function(url, index) {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    var loader = this;

    // var reader = new FileReader();

    // reader.onload = function(e) {
    //     var resultArrayBuffer = reader.result;    
    // }
    
    // reader.readAsArrayBuffer(url);

    request.onload = function() {
        loader.context.decodeAudioData(
            request.response,
            // file,
            function(buffer) {
                if (!buffer) {
                    alert('error decoding file data: ' + url);
                    return;
                }
                loader.bufferList[index] = buffer;
                if (++loader.loadCount == loader.urlList.length)
                    loader.onload.call(loader.obj, loader.bufferList);
            }    
        );
    }

    request.onerror = function() {
        alert('BufferLoader: XHR error');        
    }

    request.send();
}

BufferLoader.prototype.load = function() {
    for (var i = 0; i < this.urlList.length; ++i)
        // this.loadBuffer(this.urlList[i], i);
        // Make this a map instead of list
        this.loadBuffer(this.urlList[i], this.urlList[i]);
}