const firebaseConfig = {
    apiKey: "AIzaSyBmRb0aKxPiB7EV2LQYb7U5SjEyfUMr-ig",
    authDomain: "smsproject-ecd2d.firebaseapp.com",
    projectId: "smsproject-ecd2d",
    storageBucket: "smsproject-ecd2d.appspot.com",
    messagingSenderId: "263965204952",
    appId: "1:263965204952:web:8f4ee00d7db469338092ad",
    measurementId: "G-SED0D8TV4G"
    };

firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();
var rno=document.getElementById("rnoValue");
var names=document.getElementById("nameValue");
var branch=document.getElementById("branchValue");
var year=document.getElementById("yearValue");
var email=document.getElementById("emailValue");
var phone=document.getElementById("phoneValue");
var msg=document.getElementById("msgValue");
document.getElementById("sub").addEventListener('click',setItems);


function setItems(e){
    e.preventDefault(); 
    if(rno.value===''||branch.value===''||year.value===''||names.value===''||email.value===''||phone.value===''||msg.value===''){
        alert("Please fill all the fields");
        return;
    }
    db.collection('contactus').add({
        Rno:rno.value,
        Name:names.value,
        Year:year.value,
        Branch:branch.value,
        Email:email.value,
        Phone:phone.value,
        Message:msg.value
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        alert('Your Query is recorded with us. Our team will get back to you soon.');
    })
    .catch(function(error) {
        console.error("Error adding document: ", error.message);
    }
    );
}