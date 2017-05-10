/*
 * Picker options
 */
var pickerOptions = {
  /*
   * Required. Provide the AppId for a registered application. Register an
   * app on https://apps.dev.microsoft.com
   */
  "clientId": "71a9aa4d-ae38-45e5-aeff-6c4679120247",

  /*
   * Required. Called when the user finishes picking files and passes
   * an array of file objects to the provided function. Details about the file
   * object and handling the response below.
   */
    success: function (files) {
        clearPickerLog();
        pickerLog(JSON.stringify(files, null, '  '));
    },

  /*
   * Optional. Called if a user cancels the picker.
   */
    cancel: function () {
        clearPickerLog();
        pickerLog("User cancelled!<br />");
    },

  /*
   * Optional. The default is "download" which can be used to get a URL
   * to the file content directly that expires in 1 hour.   You may also use
   * "share", which gets a link that's valid until the user deletes the shared
   * link through OneDrive, or you can use "query" which will just return
   * the metadata from the OneDrive API.
   */
   action: "download",

  /*
   * Optional. The default value is false which allows the user to
   * select a single file, while using true enables the user to select multiple
   * files.
   */
    multiSelect: false
}

/*
 * Saver options
 */
var saverOptions = {
  /*
   * Required. Provide the AppId for a registered application. Register an
   * app on https://apps.dev.microsoft.com
   */
  "clientId": "71a9aa4d-ae38-45e5-aeff-6c4679120247",

  /* Specify the action as saving a file */
  action: "save",

  /*
   * Required. The id of a form input element of type file.
   */
    sourceInputElementId: "inputFile",

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
    pickerOptions.action = document.querySelector('input[name="actionType"]:checked').value;
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

    pickerHtml += "<input id='downloadLink' type='radio' value='download' name='actionType' checked='checked' />";
    pickerHtml += "<label for='downloadLink'>Download link</label><br />";
    pickerHtml += "<input id='webLink' type='radio' value='share' name='actionType'  />";
    pickerHtml += "<label for='webLink'>Sharing link</label><br />";
    pickerHtml += "<input id='queryAction' type='radio' value='query' name='actionType'  />";
    pickerHtml += "<label for='queryAction'>Query only</label>";

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
