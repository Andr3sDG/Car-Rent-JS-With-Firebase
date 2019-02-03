var config = {
    apiKey: "AIzaSyBrle_XdA0OC5YqqGELN39mbg35IqA1MM0",
    authDomain: "sevenx-a6962.firebaseapp.com",
    databaseURL: "https://sevenx-a6962.firebaseio.com",
    projectId: "sevenx-a6962",
    storageBucket: "sevenx-a6962.appspot.com",
    messagingSenderId: "901029796656"
  };
  firebase.initializeApp(config);

  function logout(){
    firebase.auth().signOut();
  }

firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
      console.log(firebaseUser);
  } else {
      console.log("not logged in");
  }
});