// firebase realtime database configration
const firebaseConfig = {
    apiKey: "AIzaSyCTGfbRZMB2SfDyyiGi9tg20q4bVzXldPk",
    authDomain: "decants4u.firebaseapp.com",
    databaseURL: "https://decants4u-default-rtdb.firebaseio.com",
    projectId: "decants4u",
    storageBucket: "decants4u.appspot.com",
    messagingSenderId: "29528182542",
    appId: "1:29528182542:web:5125d69ad6bcb10ab1d15f",
    measurementId: "G-YWD3FW28Y3"
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// reference to the contact messages table
var contactFormDB = firebase.database().ref('contactForm');

// submit eventListener on the prodForm
document.getElementById('contForm').addEventListener('submit', submitForm);

// submitForm is triggered when the form is submitted
function submitForm(e){
    // prevent the default action
    e.preventDefault();

    // get the data from input fields
    var name = getElementVal('contactName');
    var email = getElementVal('contactEmail');
    var msgContent = getElementVal('cmessage');

    let status = 0;

    if (!validate(name)) {
        status = 0
        return false
    }else { status = 1 }

    if (!validate(email)) {
        status = 0
        return false
    }else { status = 1 }

    if (!validate(msgContent)) {
        status = 0
        return false
    }else { status = 1 }
        
    // save the data into the database
    saveMessages(name, email, msgContent);

    // enable alert message
    document.querySelector(".submitted").style.display = "block";

    // remove alert message
    setTimeout(() => {
        document.querySelector(".submitted").style.display = "none"; 
    }, 3000)
    
    // reset the form
    document.getElementById('contForm').reset();
}

// save the data into the database
const saveMessages = (name, email, msgContent) => {
    // push the data into the contactForm database 
    var newContactForm = contactFormDB.push();
    // set the value of parameters as an entry in the database
    newContactForm.set({
        name: name,
        email: email,
        msgContent: msgContent,
    });
}

// returns the value of the input field with the given 'id'
const getElementVal = (id) => {
    return document.getElementById(id).value;
}



  