// Insert the ability to quickly get your own access_token on
// the msa_oauth page when rendered on the website.
//
// Adds a new section just above ## Register your app that makes
// this possible.

function createTokenFetcher()
{
  var appInfo = {
    "clientId": "0000000044148889",
    "scopes": "onedrive.readwrite wl.signin",
    "redirectUri": "https://dev.onedrive.com/auth/callback.htm"
  };
    
  this.addToPage = function(afterElementId) {

    if (!this.isPageSecure) {
      return;
    }

    var elementAfter = document.getElementById(afterElementId);
    if (elementAfter === undefined) {
      return;
    }

    var tokenDiv = document.createElement("div");
    tokenDiv.innerHTML = "<h2>Try it now</h2>\
    <p>To experiment with calling OneDrive API without registering a new application you can\
    request a developer token, valid for 1 hour, for your signed-in account. This\
    token can then be used to make API calls using your favorite HTTP client without\
    the need to implement the OAuth pattern.</p>\
    <button id=\"get-token-button\" onclick=\"tokenFetcher.getToken()\" type=\"button\" class=\"btn btn-default\">Get Token</button>\
    <pre id=\"get-token-container\" style=\"display: none\"><code id=\"get-token-response\"></code></pre>";

    elementAfter = document.getElementById(afterElementId);
    var parent = elementAfter.parentElement;
    parent.insertBefore(tokenDiv, elementAfter);
  };

  this.getToken = function() {
    var token = getTokenFromCookie();
    if (token) {
      onAuthenticated(token);
    }
    else
    {
      challengeForAuth();
    }
  };

  this.getStoredToken = function() {
    return getTokenFromCookie();
  };

  this.isPageSecure = function() {
    return window.location.protocol == "https:";
  };

  this.onAuthCallback = function() {
      var authInfo = getAuthInfoFromUrl();
      var token = authInfo["access_token"];
      var expiry = parseInt(authInfo["expires_in"]);
      setCookie(token, expiry);
      window.opener.tokenFetcher.onAuthenticated(token, window);
  };

  this.onAuthenticated = function(token, authWindow) {
    if (token) {
      if (authWindow) {
        authWindow.close();
      }
      this.hasToken(token);
    }
  };

  this.hasToken = function(token)
  {
    var tokenElement = document.getElementById("get-token-response");
    var tokenContainer = document.getElementById("get-token-container");
    var tokenButton = document.getElementById("get-token-button");

    if (tokenElement != undefined && tokenContainer != undefined && tokenButton != undefined)
    {
      tokenButton.style.display = "none";
      tokenContainer.style.display = "block";
      tokenElement.textContent = "Authorization: bearer " + token;
    }
  };

  var getAuthInfoFromUrl = function () {
    if (window.location.hash) {
      var authResponse = window.location.hash.substring(1);
      var authInfo = JSON.parse(
        '{"' + authResponse.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
        function(key, value) { return key === "" ? value : decodeURIComponent(value); });
      return authInfo;
    }
    else {
      alert("failed to receive auth token");
    }
  };


  var challengeForAuth = function() {
    var url =
      "https://login.live.com/oauth20_authorize.srf" +
      "?client_id=" + appInfo.clientId +
      "&scope=" + encodeURIComponent(appInfo.scopes) +
      "&response_type=token" +
      "&redirect_uri=" + encodeURIComponent(appInfo.redirectUri);
    popup(url);
  };

  var popup = function (url) {
    var width = 525,
        height = 525,
        screenX = window.screenX,
        screenY = window.screenY,
        outerWidth = window.outerWidth,
        outerHeight = window.outerHeight;

    var left = screenX + Math.max(outerWidth - width, 0) / 2;
    var top = screenY + Math.max(outerHeight - height, 0) / 2;

    var features = [
                "width=" + width,
                "height=" + height,
                "top=" + top,
                "left=" + left,
                "status=no",
                "resizable=yes",
                "toolbar=no",
                "menubar=no",
                "scrollbars=yes"];
    var popup = window.open(url, "oauth", features.join(","));
    if (!popup) {
      alert("failed to pop up auth window");
    }

    popup.focus();
  };

  var setCookie = function(token, expiresInSeconds) {
    var expiration = new Date();
    expiration.setTime(expiration.getTime() + expiresInSeconds * 1000);
    var cookie = "odauth=" + token +"; path=/; expires=" + expiration.toUTCString();

    if (document.location.protocol.toLowerCase() == "https") {
      cookie = cookie + ";secure";
    }

    document.cookie = cookie;
  };

  var getTokenFromCookie = function() {
    var cookies = document.cookie;
    var name = "odauth=";
    var start = cookies.indexOf(name);
    if (start >= 0) {
      start += name.length;
      var end = cookies.indexOf(';', start);
      if (end < 0) {
        end = cookies.length;
      }
      else {
        postCookie = cookies.substring(end);
      }

      var value = cookies.substring(start, end);
      return value;
    }

    return "";
  };

  return this;
}

var tokenFetcher = createTokenFetcher();
