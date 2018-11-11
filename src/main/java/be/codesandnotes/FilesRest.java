package be.codesandnotes;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/files")
public class FilesRest {

    private byte[] fileAsBytes;
    private String fileAsText;

    @RequestMapping(value = "/json", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity downloadFileAsJson() {
        FileJson json = new FileJson();
        json.setFileData(fileAsText);
        return ResponseEntity.ok(json);
    }

    @RequestMapping(value = "/bytes", method = RequestMethod.GET, produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity downloadFileAsBytes() {
        return ResponseEntity.ok(fileAsBytes);
    }

    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity storeFileAsText(@RequestBody FileJson json) {
        fileAsText = json.fileData;
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity storeFileAsBytes(@RequestBody byte[] bytes) {
        fileAsBytes = bytes;
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    public static class FileJson {
        String fileData;

        public String getFileData() {
            return fileData;
        }

        public void setFileData(String fileData) {
            this.fileData = fileData;
        }
    }
}
