
package pt.jumia.exercise.service;


import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.FileList;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.io.OutputStream;
import java.security.GeneralSecurityException;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class FileManager {

	private GoogleDriveManager googleDriveManager;

	public List<File> listEverything() throws IOException, GeneralSecurityException {
		// Print the names and IDs for up to 10 files.
		FileList result = googleDriveManager.getInstance().files().list()
				.setPageSize(10)
				.setFields("nextPageToken, files(id, name)")
				.execute();
		return result.getFiles();
	}


	public void downloadFile(String id, OutputStream outputStream) throws IOException, GeneralSecurityException {
		if (id != null) {
			String fileId = id;
			googleDriveManager.getInstance().files().get(fileId).executeMediaAndDownloadTo(outputStream);
		}
	}


}

