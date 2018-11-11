jQuery(document).ready(function ($) {

    $('#uploadAsJson').click(function () {
        readFile(function (arrayBuffer) {
            console.info(arrayBuffer);
            $.ajax({
                contentType: 'application/json',
                data: JSON.stringify({
                    fileData: b64.fromByteArray(new Uint8Array(arrayBuffer))
                }),
                method: 'POST',
                url: '/api/files'
            });
        });
    });

    $('#downloadAsJson').click(function () {
        $.ajax({
            method: 'GET',
            url: '/api/files/json',
            success: function (json) {
                if (json && json.fileData && json.fileData.length > 0) {
                    console.info(json.fileData);
                    $('#image').attr('src', 'data:*/*;base64,' + json.fileData);
                }
            },
            error: function (jqXHR, status, error) {
                console.error(jqXHR, status, error);
            }
        });
    });

    $('#uploadAsBytes').click(function () {
        readFile(function (arrayBuffer) {
            console.info(arrayBuffer);
            $.ajax({
                contentType: 'application/octet-stream',
                data: arrayBuffer,
                method: 'POST',
                processData: false,
                url: '/api/files'
            });
        });
    });

    $('#downloadAsBytes').click(function () {
        // To stay with jQuery it's a bit more complex... check https://www.henryalgus.com/reading-binary-files-using-jquery-ajax/
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/files/bytes', true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function() {
            if (this.response && this.response.constructor === ArrayBuffer) {
                console.info(this.response);
                $('#image').attr('src', 'data:*/*;base64,' + b64.fromByteArray(new Int8Array(this.response)));
            }
        };
        xhr.onerror = function () {
            console.error(this.response);
        };
        xhr.send();
    });

    var readFile = function (uploadFunction) {
        var files = $('#fileInput')[0].files;
        if (files.length > 0) {

            var reader = new FileReader();

            reader.onload = function (event) {
                uploadFunction(event.target.result);
            };
            reader.onabort = function (event) {
                console.error('Aborted because: ', event);
            };
            reader.onerror = function (event) {
                console.error('Error because: ', event);
            };

            reader.readAsArrayBuffer(files[0]);
        }
    };
});
