const simplexDown = new SimplexNoise(Math.random());
const simplexUp = new SimplexNoise(Math.random());

//Button functions----------------------------------
function openNav() {
  document.getElementById("sidenav").style.width = "260px";
}

function closeNav() {
  document.getElementById("sidenav").style.width = "0";
}

//Firebase config----------------------------------

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyA-yQMyiHwM3A62g3Nja1tEHU-ZmS4JP_g",
  authDomain: "thesis-3f5f3.firebaseapp.com",
  databaseURL: "https://thesis-3f5f3.firebaseio.com",
  projectId: "thesis-3f5f3",
  storageBucket: "thesis-3f5f3.appspot.com",
  messagingSenderId: "257641398756",
  appId: "1:257641398756:web:31f806dc78d2f2966887f1",
  measurementId: "G-BTRK28PTYX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
let deviceCount = 0;

var database = firebase.database();
//Login/signout code----------------------------------
firebase.auth().onAuthStateChanged(function (user) {

  if (user) {
    console.log(user);

    $('#preload').fadeOut();

  } else {

  }
});

function login() {
  var userEmail = document.getElementById("Email").value;
  var userPassword = document.getElementById("Password").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...

    window.alert("Error: " + errorMessage);
    // ...
  });

}

function signOut() {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
    document.getElementById("sidenav").style.width = "0";
    $('#preload').fadeIn();
  }).catch(function (error) {
    window.alert("Error: " + error);
  });
}
//Sign up code----------------------------------
function shift() {
  document.getElementById("login").style.display = "none";
  document.getElementById("signUp").style.display = "initial";
}

function goBack() {
  document.getElementById("login").style.display = "initial";
  document.getElementById("signUp").style.display = "none";
}

function signUp() {
  var signUpEmail = document.getElementById("signUpEmail").value;
  var signUpPassword = document.getElementById("signUpPassword").value;

  firebase.auth().createUserWithEmailAndPassword(signUpEmail, signUpPassword).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error: " + errorMessage);
    // ...
  });

  window.alert("Thank you for signing in! Please login using your new information");
  document.getElementById("signUp").style.display = "none";
  document.getElementById("login").style.display = "initial";

}
//User code----------------------------------
var user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified;

if (user != null) {
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
  uid = user.uid;
}


function addDevice(name, category, icon){
  let closeBtn = $('<button class="btn btn-danger"></button>');
  let a = $('<a class="nav-link" data-toggle="pill" href="#deviceTab" role="tab" aria-controls="' + category + '" aria-selected="false"><i class="' + icon + '"></i> ' + name + '</a>')
  //a.append(closeBtn);
  $("#v-pills-tab").prepend(a);
  closeBtn.click(function(){
    a.remove();
    deviceCount -= 1;
  });

  a.click(function(){
    $("#deviceTab h2").html(name);
  });

  deviceCount += 1;
  $("#onlineCount").html(deviceCount + "/" + deviceCount);

}

$(document).ready(function () {


  database.ref('/devices/').once('value').then(function (data) {
    for(var item in data.val()){
      let category = data.val()[item].category;
      let icon = data.val()[item].icon;
      $("#" + category).append('<li class="list-group-item" data-name="' + item + '" data-icon="' + icon + '" data-category="' + category + '"><i class="' + icon + '"></i> ' + item + '</li>')
      
    }

    $("#speaker li").click(function(){
      addDevice($(this).data("name"), $(this).data("category"), $(this).data("icon"));
    });
  
    $("#light li").click(function(){
      addDevice($(this).data("name"), $(this).data("category"), $(this).data("icon"));
    });
  
    $("#camera li").click(function(){
      addDevice($(this).data("name"), $(this).data("category"), $(this).data("icon"));
    });
  
    $("#lock li").click(function(){
      addDevice($(this).data("name"), $(this).data("category"), $(this).data("icon"));
    });
  
    $("#thermostat li").click(function(){
      addDevice($(this).data("name"), $(this).data("category"), $(this).data("icon"));
    });
    
  });

  var ctx = document.getElementById('myChart').getContext('2d');
  var mychart = new MyChart(ctx);
  mychart.init();

  var devctx = document.getElementById('deviceChart').getContext('2d');
  var deviceChart = new MyChart(devctx);
  deviceChart.init();

});

function getTimeOfDay(offset = 0) {
    let d = new Date();
    if (offset > 0) d = new Date(d.getTime() + offset * 60000);
    let s = d.getSeconds().toString();
    let m = d.getMinutes().toString();
    let h = d.getHours().toString();
    if (s.length == 1) s = "0" + s;
    if (m.length == 1) m = "0" + m;
    return h + ":" + m + ":" + s;
}

function map(x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}