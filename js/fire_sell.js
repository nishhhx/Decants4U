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

// reference to the product information table
var prodFormDB = firebase.database().ref('productInfoForm');

// submit eventListener on the prodForm
document.getElementById('prodForm').addEventListener('submit', submitProdForm);

var fileItem;
var fileName;
var fileDict = {};

// display the uploaded photo of the decant on sell_decants.html
function loadFile(e) {
    fileItem = e.target.files[0];
    fileName = fileItem.name;
    var image = document.getElementById('output');
    image.src = URL.createObjectURL(fileItem);
};

// submitProdForm is triggered when the form is submitted
function submitProdForm(e){
    // prevent the default action
    e.preventDefault();

    // get the data from input fields
    var title = getElementVal('title');
    var price = getElementVal('price');
    var tags = getElementVal('tags');
    var details = getElementVal('pdetails');
    var sellerName = getElementVal('sname');
    var contactInfo = getElementVal('scontact_info');
    var imageName = fileName;

    // save the data into the database
    saveProdInfo(title, price, tags, details, sellerName, contactInfo, imageName);

    // reference to the firebase storage to upload the images
    var storageRef = firebase.storage().ref("images/"+fileName);
    
    // put the image into the storage
    storageRef.put(fileItem);
    

    // enable alert message
    document.querySelector(".submitted").style.display = "block";

    // remove alert message
    setTimeout(() => {
        document.querySelector(".submitted").style.display = "none"; 
    }, 3000)
    
    // reset the form
    document.getElementById('prodForm').reset();
    document.querySelector('#output').src = "../image/upload.jpeg";
}

// save the data into the database
const saveProdInfo = (title, price, tags, details, sellerName, contactInfo, imageName) => {
    // push the data into the prodForm database 
    var newProdInfoForm = prodFormDB.push();

    // set the value of parameters as an entry in the database
    newProdInfoForm.set({
        title: title,
        price: price,
        tags: tags,
        details: details,
        sellerName: sellerName,
        contactInfo: contactInfo,
        imageName: imageName,
    });
}

// returns the value of the input field with the given 'id'
const getElementVal = (id) => {
    return document.getElementById(id).value;
}