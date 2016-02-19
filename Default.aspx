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
