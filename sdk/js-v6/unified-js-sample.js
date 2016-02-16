/*
 * Picker options
 */
var pickerOptions = {
    /*
	 * Required. Called when the user finishes picking files and passes
	 * an array of file objects to the provided function. Details about the file
	 * object and handling the response below.
	 */
    success: function (files) {
        clearPickerLog();
        // Handle returned file object(s)
        if (files.values.length > 1 && files.link != null) { // only returned for webViewLink
            pickerLog("Files Link: <a href='" + files.link + "' target='_blank'>" + files.link + "</a>");
        }

        for (var i = 0; i < files.values.length; i++) {
            pickerLog("<p>");
            var count = i + 1;
            pickerLog("File #" + count + "<br />");
            pickerLog("Filename: " + files.values[i].fileName + "<br />");
            pickerLog("File Link: <a href='" + files.values[i].link + "' target='_blank'>" + files.values[i].link + "</a><br />");
            pickerLog("Size: " + files.values[i].size + " bytes<br />");
            pickerLog("Link Type: " + files.values[i].linkType + "<br />");

			if(files.values[i].thumbnails !== undefined) {
				pickerLog("Thumbnail Count: " + files.values[i].thumbnails.length + "<br />");

				for (var j = 0; j < files.values[i].thumbnails.length; j++) {
					var thcount = j + 1;
					pickerLog("Thumbnail #" + thcount + ": <a href='" + files.values[i].thumbnails[j] + "' target='_blank'>" + files.values[i].thumbnails[j] + "</a><br />");
				}
			}
            pickerLog("</p>");
        }
    },

    /*
	 * Optional. Called if a user cancels the picker.
	 */
    cancel: function () {
        clearPickerLog();
        pickerLog("User cancelled!<br />");
    },

    /*
	 * Optional. The default is the downloadLink which can be used to get a URL
	 * to the file content directly that expires in 1 hour.   You may also use
	 * webLink, which gets a link that's valid until the user deletes the shared
	 * link through OneDrive.
	 */
    linkType: "downloadLink",

    /*
	 * Optional. The default value is false which allows the user to
	 * select a single file, while using true enables the user to select multiple
	 * files.
	 */
    multiSelect: false // or true
}

/*
 * Saver options
 */
saverOptions = {

    /*
	 * Required. The id of a form input element of type file.
	 */
    file: "inputFile",

    /* Optional. Called when the file has completed uploading to server. */
    success: function saverSuccess() {
        saverLog("Upload complete!<br />");
    },

    /*
	 * Optional. Called at various points with a float between 0.0 and 100.0
	 * to indicate the progress of the upload. This is will be called at least
	 * once with 100.0
	 */
    progress: function progress(p) {
        saverLog("Uploaded " + p + "%.<br />")
    },

    /* Optional. Called when the user cancels the saver. */
    cancel: function () {
        clearSaverLog();
        saverLog("User cancelled!<br />");
    },

    /*
	 * Optional. Called when an error occurred on our server. Also called if the
	 * user is out of quota, or doesn't have permission to upload to the chosen location.
	 */
    error: function error(e) {
        clearSaverLog();
        saverLog("There was an error saving your file.<br />");
    },

}

function launchOneDrivePicker() {
    pickerOptions.multiSelect = document.getElementById("multiSelect").checked;
    pickerOptions.linkType = document.querySelector('input[name="linkType"]:checked').value;
    OneDrive.open(pickerOptions);
}

function pickerLog(message) {
    document.getElementById('pickerConsole').innerHTML += message;
}

function clearPickerLog() {
    document.getElementById('pickerConsole').innerHTML = "";
}

function launchOneDriveSaver() {
	if(document.getElementById("fileName").value !== "") {
		saverOptions.fileName =  document.getElementById("fileName").value;
	}

    OneDrive.save(saverOptions);
    clearSaverLog();
}

function saverLog(message) {
    document.getElementById('saverConsole').innerHTML += message;
}

function clearSaverLog() {
    document.getElementById('saverConsole').innerHTML = "";
}

function initializeDemo() {
  var openPickerHeader = document.getElementById("open-demo");
  if (openPickerHeader)
  {
    var pickerHtml = "";
    pickerHtml += "<div class='pickerDemo hidden-xs visible-sm visible-md visible-lg'><div class='row'>";
    pickerHtml += "<span class='cell heading'>Options</span>";
    pickerHtml += "<span class='cell'>";
    pickerHtml += "<input id='multiSelect' type='checkbox' name='multiSelect' />";
    pickerHtml += "<label for='multiSelect'>Enable multiselect</label>";
    pickerHtml += "</span>";
    pickerHtml += "</div>";
    pickerHtml += "<div class='row'>";
    pickerHtml += "<span class='cell heading'>Link Type</span>";
    pickerHtml += "<span class='cell'>";
    pickerHtml += "<input id='downloadLink' type='radio' value='downloadLink' name='linkType' checked='checked' />";
    pickerHtml += "<label for='downloadLink'>Download link</label><br />";
    pickerHtml += "<input id='webLink' type='radio' value='webLink' name='linkType'  />";
    pickerHtml += "<label for='webLink'>Web Link</label>";
    pickerHtml += "</span>";
    pickerHtml += "</div>";
    pickerHtml += "<div class='row'>";
    pickerHtml += "<span class='cell heading'>Button</span>";
    pickerHtml += "<span class='cell'>";
    pickerHtml += "<button onClick='javascript:launchOneDrivePicker();' title='Open from OneDrive'>";
    pickerHtml += "<img src='https://js.live.net/v5.0/images/SkyDrivePicker/SkyDriveIcon_white.png' style='vertical-align: middle; height: 16px;'>";
    pickerHtml += "<span class='oneDriveButton'>Open from OneDrive</span>";
    pickerHtml += "</button>";
    pickerHtml += "</span>";
    pickerHtml += "</div>";
    pickerHtml += "<div>&nbsp;</div>";
    pickerHtml += "<div class='row'>";
    pickerHtml += "<span class='cell heading' style='vertical-align: top;'>Result</span>";
    pickerHtml += "<span class='cell'>";
    pickerHtml += "<div id='pickerConsole' class='console'>Pick a file to OneDrive to see the return result</div>";
    pickerHtml += "</span>";
    pickerHtml += "</div>";
    pickerHtml += "</div>";
    var pickerSampleDiv = document.createElement("div");
    pickerSampleDiv.innerHTML = pickerHtml;
    openPickerHeader.parentElement.insertBefore(pickerSampleDiv, openPickerHeader.nextElementSibling);
  }

  var saverPickerHeader = document.getElementById("save-demo");
  if (null != saverPickerHeader)
  {
    var saverHtml = "";
    saverHtml += "<div class='pickerDemo hidden-xs visible-sm visible-md visible-lg'><div class='row'>";
    saverHtml += "<span class='cell heading'>File</span>";
    saverHtml += "<span class='cell'>";
    saverHtml += "<input id='inputFile' name='file' type='file' />";
    saverHtml += "</span>";
    saverHtml += "</div>";
    saverHtml += "<div class='row'>";
    saverHtml += "<span class='cell heading'>File name</span>";
    saverHtml += "<span class='cell'>";
    saverHtml += "<input id='fileName' type='textbox' name='fileName' />";
    saverHtml += "<label>Default: the file's local name</label>";
    saverHtml += "</span>";
    saverHtml += "</div>";
    saverHtml += "<div class='row'>";
    saverHtml += "<span class='cell heading'>Button</span>";
    saverHtml += "<span class='cell'>";
    saverHtml += "<button onClick='javascript:launchOneDriveSaver();' title='Save to OneDrive'>";
    saverHtml += "<img src='https://js.live.net/v5.0/images/SkyDrivePicker/SkyDriveIcon_white.png' style='vertical-align: middle; height: 16px;'>";
    saverHtml += "<span class='oneDriveButton'>Save to OneDrive</span>";
    saverHtml += "</button>";
    saverHtml += "</span>";
    saverHtml += "</div>";
    saverHtml += "<div>&nbsp;</div>";
    saverHtml += "<div class='row'>";
    saverHtml += "<span class='cell heading' style='vertical-align: top;'>Result</span>";
    saverHtml += "<span class='cell'>";
    saverHtml += "<div id='saverConsole' class='console'>Save a file to OneDrive to see the return result</div>";
    saverHtml += "</span>";
    saverHtml += "</div></div>";


    var saverSampleDiv = document.createElement("div");
    saverSampleDiv.innerHTML = saverHtml;
    saverPickerHeader.parentElement.insertBefore(saverSampleDiv, saverPickerHeader.nextElementSibling);
  }
}

initializeDemo();
