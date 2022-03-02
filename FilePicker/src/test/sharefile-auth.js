/*!
* ShareFile Authorization JavaScript File
* 
* Version 1.0
* Last Modified: 2014-06-30
*/
(function () {
    var FilePicker = (function () {

        // Authorization URL for retrieving access token
        var authServerUri = "btmcompliancellc.sf-api.com/sf/v3";

        // encode and merge url parameters to one string
        var bundleUrlParams = function (params) {
            // if browser doesn't support Object.keys function to return keys array from json object then following utility will be used
            Object.keys = Object.keys || function (obj) {
                var result = [];
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        result.push(key);
                    }
                }
                return result;
            };
            
            var
                // get keys from parameter object
                keys = Object.keys(params),
                // all url query parameter string object
                queryParams = "";

            // read all key & values and concatenate in string
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var value = params[key];
                if (i > 0) {
                    queryParams += "&";
                }
                queryParams += encodeURIComponent(key) + "=" + encodeURIComponent(value);
            }

            return queryParams;
        }

        // validate parameter object with require information
        var validateParameters = function (paramObj) {
            // array to hold all missing parameters for notifying user
            var missingParamList = [];
                   
            // missing redirect URI parameter
            if (!paramObj.redirectUri) {
                // add missing Redirect Uri in messages array
                missingParamList.push("\"redirectUri\" (Redirect Uri)");
            }

            // missing redirect URI parameter
            if (!paramObj.clientId) {
                // add missing Client Id in messages array
                missingParamList.push("\"clientId\" (Client ID)");
            }

            // if authorization url is provided then overwrite default one
            if (paramObj.authorizationUrl) {
                authServerUri = paramObj.authorizationUrl;
            }

            // if any of parameter is missing then prompt user
            if (missingParamList.length > 0) {
                alert("Some of information is missing, please provide the following parameters to continue:\n    " + missingParamList.join(", "));
                return false;
            }
            // no missing parameter, parameter object validated
            return true;
        }

        return {
            /*
            * secure login function for authorization, after successful login to sharefile server, page will be redirected to redirecUri with access-token
            * mandatory parameter required for login in object form containing redirectUri & clientId attributes
            */
            secureLogin: function (options) {

                // if parameters provided are invalid then initialize as empty object
                if (!options || typeof options != "object") {
                    options = {};
                }

                // if parameters not validated then exit function
                if (!validateParameters(options)) {
                    //return;
                }
                
                var
                    // Login URL with parameters
                    replacementUri,
                    // redirect url
                    redirectUri = "https://secure.sharefile.com/oauth/oauthcomplete.aspx",
                    // client id key
                    clientId = "xWUmlZdzLOwOEyyOwgB8tuW6PnJ2xN0l",
                    // authentication parameter object
                    authParams = {
                        response_type: "token", // response type parameter will be token
                        client_id: clientId,
                        redirect_uri: redirectUri,
                        state: "" // set additional information if required
                    };
                
                // build login url by appending url parameters
                replacementUri = authServerUri + "?" + bundleUrlParams(authParams);

                // open secure login url
                window.open(replacementUri, "_blank", "location=no, width=800, height=600, menubar=no, resizable=yes, scrollbars=yes, status=no, titlebar=no, toolbar=no");
            }
        };

    })();

    // set FilePicker to the entry object
    window["FilePicker"] = FilePicker;
})(this);