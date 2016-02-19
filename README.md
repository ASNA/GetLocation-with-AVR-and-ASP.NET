## Add geo location capabilities to your AVR ASP.NET Web apps

This example shows how to use JavaScript's GeoLocation API to report users' locations in your AVR for .NET ASP.NET apps. 

This example's technique is driven by a JavaScript model named `ASNA.HTML5GeoLocation.js.`


This JavaScript module assigns the latitude and longitude using the Geolocation API to two HTML elements with value properies. 

These elements will usually be provided by ASP.NET HiddenField controls, but could also be TextBox controls. If you want the values assigned to other elements, you might need to tweak the savePositionForASPNET() so it is putting the values in the correct DOM element properties. 

See [this link](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation) for more help on the Geolocation API. 
      
This example was tested on Chrome, FireFox, and MS Edge. 

Usage:

	ASNAHelper.HTML5GeoLocation.getGeoLocation();

   Call the getGeoLocation method as shown above to put the geo coordinates
   in the hidden fields. On postback, these values are avialable to the AVR for .NET
   server-side code. 

   This JavaScript has no other JS dependencies. Just drop it in and go.


	<%@ Page Language="AVR" AutoEventWireup="false" CodeFile="Default.aspx.vr" Inherits="_Default" %>
	
	<!DOCTYPE html">
	
	<html xmlns="http://www.w3.org/1999/xhtml" >
	<head runat="server">
	    <title>Untitled Page</title>
	</head>
	<body>
	    <form id="form1" runat="server">
	    <div>
	        <asp:HiddenField ID="longitudeForASPNET" runat="server" />
	        <asp:HiddenField ID="latitudeForASPNET"  runat="server" />
	
	        <asp:Button ID="buttonVerifyGeoLocation" runat="server" Text="Verify geo location" />
	    </div>
	    </form>
	   
	    <script src="ASNA.HTML5GeoLocation.js" type="text/javascript"></script>  
	
	    <script>
	        ASNAHelper.HTML5GeoLocation.getGeoLocation();
	    </script>
	
	</body>
	</html>

<small>Figure 1a. ASPX page markup</small>

	Using System
	Using System.Data
	Using System.Configuration
	Using System.Collections
	Using System.Web
	Using System.Web.Security
	Using System.Web.UI
	Using System.Web.UI.WebControls
	Using System.Web.UI.WebControls.WebParts
	Using System.Web.UI.HtmlControls
	
	BegClass _Default Partial(*Yes) Access(*Public) Extends(System.Web.UI.Page)
	
	    DclFld Longitude  Type(*Packed) Len(28,16)
	    DclFld Latitude   Type(*Packed) Len(28,16)
	
	    BegSr buttonVerifyGeoLocation_Click Access(*Private) Event(*This.buttonVerifyGeoLocation.Click)
	        DclSrParm sender Type(*Object)
	        DclSrParm e Type(System.EventArgs)
	        
	        Longitude = longitudeForASPNET.Value
	        Latitude = latitudeForASPNET.Value
	    EndSr
	EndClass

<small>Figure 1b. AVR code behind</small>


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
 
<small>Figure 1c. ASNAHelpers.HTML5GeoLocation.js module</small>
