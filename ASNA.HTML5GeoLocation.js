var ASNAHelper = ASNAHelper || {};

/* 
   This JavaScript module assigns the latitude and longitude using 
   the Geolocation API to two HTML elements with value properies. 
   These elements will usually be provided by ASP.NET HiddenField controls, but 
   could also be TextBox controls. If you want the values assigned to other elements, 
   you might need to tweak the savePositionForASPNET() so it is putting the values
   in the correct DOM element properties. 

   See this link for more help on the Geolocation API. 
   https://developer.mozilla.org/en-US/docs/Web/API/Geolocation   

   This example was tested on Chrome, FireFox, and MS Edge. 

   Usage:

       ASNAHelper.HTML5GeoLocation.getGeoLocation();

   Call the getGeoLocation method as shown above to put the geo coordinates
   in the hidden fields. On postback, these values are avialable to the AVR for .NET
   server-side code. 

   This JavaScript has no other JS dependencies. Just drop it in and go.
 */

ASNAHelper.HTML5GeoLocation = function () {

    // The ids of the two target HTML elements. 
    // *** Watched for ASP.NET munged IDs!*** 
    latitudeHiddenElementId = "latitudeForASPNET";
    longitudeHiddenElementId = "longitudeForASPNET";

    function getGeoLocation() {
        if (navigator.geolocation) {
            // Error timeout value. 
            var errorTimeOut = (10 * 1000) * 100;

            navigator.geolocation.getCurrentPosition(
                savePositionForASPNET,
                displayError,
                { enableHighAccuracy: true, timeout: errorTimeOut, maximumAge: 0 }
            );
        }
        else {
            console.log("Geolocation is not supported by this browser");
        }
    }

    // Operational note: 
    // The getCurrentPosition API is asynchronous. Beware that the call to this function
    // callback doesn't occur immediately after calling this module's getGeoLocation() method. Although
    // the callback isn't immediate, it generally occurs very quickly (in just a second or two). 
    function savePositionForASPNET(position) {
        document.getElementById(latitudeHiddenElementId).value = position.coords.latitude;
        document.getElementById(longitudeHiddenElementId).value = position.coords.longitude;
    }

    function displayError(error) {
        var errors = {
            1: 'Permission denied',
            2: 'Position unavailable',
            3: 'Request timeout'
        };
        console.log("Error: " + errors[error.code]);
    }

    return {
        getGeoLocation: getGeoLocation
    };
}();