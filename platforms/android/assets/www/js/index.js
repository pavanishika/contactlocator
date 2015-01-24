document.addEventListener("deviceready", onDeviceReady, false);

var v="no location found or turn on gps";

function onDeviceReady() {
    var options = new ContactFindOptions();
    options.filter = "";
    options.multiple = true;
    var fields = ["displayName", "name"];
    navigator.contacts.find(fields, onSuccess, onError, options);
    var networkState = navigator.connection.type;

    if (networkState == Connection.NONE)
    {
      alert('No Internet');
    }

    navigator.geolocation.getCurrentPosition(function(position){
      //pos = position;
      v = 'Latitude: ' + position.coords.latitude + '\n' +
      'Longitude: ' + position.coords.longitude;

    },getError);
}

function getError(error) {
  alert('code: '    + error.code    + '\n' +
  'message: ' + error.message + '\n');
}

function onSuccess(contacts) {
    var element = document.getElementById('cont');
    var html="";
    for (var i=0; i<contacts.length; i++)
    {
        html+='<div  class="panel panel-default"><div class="panel-heading">' + contacts[i].name.formatted+"</div>";
        if (contacts[i].phoneNumbers) {
                html += '<div class="panel-body">';
                html += '<b>Phone Numbers</b>';
                for (var j = 0; j < contacts[i].phoneNumbers.length; j++) {
                    html += "<li id='"+contacts[i].phoneNumbers[j].value+"' onclick='getcon(this.id)'>Type: " + contacts[i].phoneNumbers[j].type + "<br/>" +
                    "Value: " + contacts[i].phoneNumbers[j].value + "<br/></li>";
                }
                html += "</div>";
            }
        html+="</div>";
    }
    element.innerHTML=html;
}

function getcon(contval) {
  var r = confirm("Send your location to " + contval);

  if (r == true) {
    window.location = "sms:+"+contval+";body=" + encodeURIComponent(v);
    window.open ("sms:"+contval+"?body=" + v,"_system");
  } else {
    alert('You pressed Cancel!');
  }
}
function onError(contactError) {
    alert('onError!');
}
