var accountSid = 'xxxxxxxxxxxxxx';
var authToken = "xxxxxxxxxxxxxx";

var Name, PhoneNumber, Address, Relation;

function submitForms(){
    Name = document.getElementById('name').value;
    PhoneNumber = document.getElementById('phoneNumber').value;
    Address = document.getElementById('address').value;
    Relation = document.getElementById('relation').value;  
    Cookies.set('name', Name, { expires: 365 });
    Cookies.set('phoneNumber', PhoneNumber, { expires: 365 });
    Cookies.set('address', Address, { expires: 365 });
    Cookies.set('relation', Relation, { expires: 365 });
    document.getElementById('wrapper').style.display = "none";
    document.getElementById('homeWrapper').style.display = "block";
}
function addInformation(){
    document.getElementById('homeWrapper').style.display = "none";
    document.getElementById('wrapper').style.display = "block";
    document.getElementById('name').value = Name;
    document.getElementById('phoneNumber').value = PhoneNumber;
    document.getElementById('address').value = Address;
    document.getElementById('Relation').value = Relation;
}
function setSettings(){
    Cookies.set('name', "none", { expires: 365 });
    Cookies.set('phoneNumber', 0, { expires: 365 });
    Cookies.set('address', "none", { expires: 365 });
    Cookies.set('relation', "none", { expires: 365 });
    Cookies.set('loadedBefore', 1, { expires: 365 });
}
function pullthisshiz(){
    if(Cookies.get('loadedBefore') === 1){
        Name = Cookies.get('name');
        PhoneNumber = Cookies.get('phoneNumber');
        Address = Cookies.get('address');
        Relation = Cookies.get('relation');
    }
    else{
        setSettings();
    }
}
function callForHelp(){
    $.ajax({
        type: 'POST',
        url: 'https://api.twilio.com/2010-04-01/Accounts/' + accountSid + '/Messages.json',
        data: {
            "To" : "+" + PhoneNumber,
            "From" : "+xxxxxxxx",
            "Body" : "URGENT " + Name + ": I have recently activated my SOS beacon. Please send help. This is not a joke. "
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Basic " + btoa(accountSid + ':' + authToken));
        },
        success: function(data) {
            console.log(data);
        },
        error: function(data) {
            console.log(data);
        }
    });
}