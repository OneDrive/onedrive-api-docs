// Fix IE's lack of indexOf on arrays
if(!Array.indexOf) {
    Array.prototype.indexOf = function(obj){
        for(var i=0; i<this.length; i++){
            if(this[i]==obj){
                return i;
            }
        }
        return -1;
    }
}

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position) {
    position = position || 0;
    return this.lastIndexOf(searchString, position) === position;
  };
}

function NewApiRunner() {
  this.baseUrl = "https://api.onedrive.com/v1.0";
  this.requests = [];
  var supportedHttpVerbs = ["GET", "POST", "PUT", "PATCH", "DELETE"];

  var pendingRequest = null;
  var tokenFetcher = createTokenFetcher();
  tokenFetcher.hasToken = function() {
    // We have a token now, do something with is.
    if (pendingRequest != null) {
      execRequest(pendingRequest);
    }
  };

  // Scan the current page to find request/response pairs and convert them into
  // internal reqeusts
  this.parsePage = function() {
    var codeElements = document.getElementsByTagName("code");

    for(var i=0; i<codeElements.length; i++) {
      var codeBlock = codeElements[i];
      if (codeBlock.className != "http")
      {
        continue;
      }

      var content = codeBlock.textContent;
      if (content)
      {
        var method = getFirstWord(content);
        if (supportedHttpVerbs.indexOf(method) != -1)
        {
          // Process the request
          requests[requests.length] = newRequest(content, codeBlock);
        }
        else if (method == "HTTP/1.1")
        {
          // Process the response
          if (requests.length > 0) {
            requests[requests.length - 1].responseSourceElement = codeBlock;
            addParameterTableAndActionButton(requests[requests.length - 1]);
          }

          // Convert to expand/collapse block
          var preBlock = codeBlock.parentElement;
          if (preBlock.tagName.toUpperCase() == "PRE") {
            preBlock.className += preBlock.className ? " withExpandCollapseButton" : "withExpandCollapseButton";
            codeBlock.className += codeBlock.className ? " collapsed" : "collapsed";


            var aBlock = document.createElement("a");
            aBlock.href = "#";
            aBlock.onclick = toggleExpandCollapse;
            aBlock.className = "expandCollapseButton expand";
            preBlock.parentElement.insertBefore(aBlock, preBlock.nextSibling);
          }
        }
      }
    }
  };

  var toggleExpandCollapse = function(evt) {
    var aBlock = evt.srcElement;
    var preBlock = aBlock.previousSibling;
    var codeBlock = preBlock.firstChild;

    var nextState = getLastWord(aBlock.className);

    if (nextState == "expand")
    {
      aBlock.className = replaceLastWord(aBlock.className, "collapse");
      codeBlock.className = replaceLastWord(codeBlock.className, "expanded")
    }
    else // nextState == "collapse"
    {
      aBlock.className = replaceLastWord(aBlock.className, "expand");
      codeBlock.className = replaceLastWord(codeBlock.className, "collapsed")
    }
    return false;
  }

  var getFirstWord = function(str)
  {
    if (str == undefined || str == null) return null;

    var n = str.indexOf(" ");
    return str.substring(0, n);
  };

  var getLastWord = function(str)
  {
    if (str == undefined || str == null) return null;

    var n = str.lastIndexOf(" ");
    return str.substring(n+1);
  }

  var replaceLastWord = function(str, newWord)
  {
    if (str == undefined || str == null) return null;

    var n = str.lastIndexOf(" ");

    return str.substring(0, n) + " " + newWord;
  }

  this.tryItPressed = function(evt) {
    var button = evt.srcElement;
    var request = button.request;

    execRequest(request)
  }

  this.execRequest = function(request) {
    // Check for authentication first, since we need that
    // to make API calls

    var token = tokenFetcher.getStoredToken();
    if (token == null || token.length == 0)
    {
        pendingRequest = request;
        tokenFetcher.getToken();
        return;
    }

    var requestTemplate = convertToRequestTemplate(request);
    populateTemplateWithParameters(requestTemplate, request.variables);

    var http = createXHRFromTemplate(requestTemplate, token);

    http.onload = function(e) {
      if (http.readyState == 4) {
        console.log(http.responseText);

        var responseElement = request.responseSourceElement;

        responseElement.innerText = "HTTP/1.1 " + http.status + " " + http.statusText + "\n" +
        http.getAllResponseHeaders() + "\n";

        var responseJson = http.responseText;
        if (http.getResponseHeader("content-type").startsWith("application/json"))
        {
          var dataObj = JSON.parse(responseJson);
          responseJson = JSON.stringify(dataObj, null, 2);
        }
        responseElement.innerText += responseJson;
      }
    };
    http.onerror = function(e) {
      console.error(http.statusText)
    };

    http.send(requestTemplate.body);
  };

  var createXHRFromTemplate = function(template, token) {
    var http = new XMLHttpRequest();

    var fullUrl = this.baseUrl + template.pathAndQueryString;
    http.open(template.method, fullUrl, true);
    for(var i=0; i<template.headers.length; i++) {
      http.setRequestHeader(template.headers[0].name, template.headers[0].value);
    }
    http.setRequestHeader("Authorization", "bearer "  + token)
    return http;
  };

  var populateTemplateWithParameters = function(template, variables) {
    var str = template.pathAndQueryString;

    for(var i=0; i<variables.length; i++) {
      var name = variables[i].name;
      var value = variables[i].value();

      str = str.replace("{" + name + "}", value);
    }
    template.pathAndQueryString = str;
  };

  var readRequestParameters = function(index) {
    var request = this.requests[index];
    for(var i=0; i<request.variables.length; i++)
    {
      var variable = request.variables[i];
      var element = document.getElementById("request." + index + "." + i);
      if (element) {
        variable.value = element.value;
      }
    }
    return request;
  };

  var convertToRequestTemplate = function(request) {
    // GET /drives/{drive-id}
    // Header: header
    //
    // {body}
    var text = request.rawRequestText;
    var n = text.indexOf(" ");
    var httpMethod = text.substring(0, n);
    var eol = text.indexOf("\n");
    var pathAndQueryString = "";
    if (eol == -1) {
      pathAndQueryString = text.substring(n+1);
    } else {
      pathAndQueryString = text.substring(n+1, eol);
    }

    return {
      "method": httpMethod,
      "pathAndQueryString": pathAndQueryString,
      "headers": [],
      "body": null
    };
  };

  // Adds a table to the DOM immedately after the request elements
  // that provides a place for the user to enter values for the variables
  // in this request. Also adds the "try it" button.
  var addParameterTableAndActionButton = function(request) {
    var container = document.createElement("div");
    if (request.variables.length > 0) {
      var header = document.createElement("h3");
      header.appendChild(document.createTextNode("Parameters"));
      container.appendChild(header);

      var table = document.createElement("table");
      table.className = "requestParameters";
      var tHeader = document.createElement("thead");
      tHeader.innerHTML = "<th>Name</th><th>Type</th><th>Values</th><th>Notes</th>";
      table.appendChild(tHeader);
      for(var i=0; i<request.variables.length; i++)
      {
        // Add each variable
        var variable = request.variables[i];
        var row = document.createElement("tr");
        row.appendChild(tdWithContent(variable.name));
        row.appendChild(tdWithContent(variable.type));

        var inputField = document.createElement("input");
        inputField.type = "text";
        inputField.value = variable.value();
        variable.inputField = inputField;
        var inputCell = document.createElement("td");
        inputCell.appendChild(inputField);
        row.appendChild(inputCell);
        row.appendChild(tdWithContent(variable.notes));
        table.appendChild(row);
      }
      container.appendChild(table);
    }
    var buttonContainer = document.createElement("div");
    buttonContainer.className = "buttonContainer";

    var tryItButton = document.createElement("button");
    tryItButton.type = "button";
    tryItButton.className = "btn btn-default";
    tryItButton.textContent = "Try It";

    tryItButton.request = request;
    tryItButton.onclick = tryItPressed;
    buttonContainer.appendChild(tryItButton);
    container.appendChild(buttonContainer);

    var previousElement = request.requestSourceElement.parentElement;
    previousElement.parentElement.insertBefore(container, previousElement.nextSibling);
  };

  var tdWithContent = function(content) {
    var cell = document.createElement("td");
    cell.textContent = content;
    return cell;
  }

  var newRequest = function(httpRequestText, sourceElement)
  {
    this.rawRequestText = httpRequestText;
    this.requestSourceElement = sourceElement;

    this.variables = [];
    if (sourceElement.dataset != undefined && sourceElement.dataset.variables != undefined)
    {
      var values = sourceElement.dataset.variables.split(",");
      if (values.length == 4) {
        var variable = newVariable(values[0], values[1], values[2], values[3]);
        this.variables[this.variables.length] = variable;
      }
    }
    this.responseSourceElement = null;
    return this;
  }

  var newVariable = function(name, type, defaultValue, notes)
  {
    this.name = name;
    this.type = type;
    this.defaultValue = defaultValue;
    this.value = function() {
      if (this.inputField == undefined)
        return this.defaultValue;

      return this.inputField.value;
    };
    this.notes = notes;
    return this;
  }


  return this;
}

var apiRunner = NewApiRunner();
apiRunner.parsePage();
