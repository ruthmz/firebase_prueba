$(document).ready(function() {
  var config = {
    apiKey: 'AIzaSyCGeKRr1SZzlRGpK_MZnTrzyfcqWc5W0Y4',
    authDomain: 'speak-up-b8f55.firebaseapp.com',
    databaseURL: 'https://speak-up-b8f55.firebaseio.com',
    projectId: 'speak-up-b8f55',
    storageBucket: 'speak-up-b8f55.appspot.com',
    messagingSenderId: '963815969017'
  };
  firebase.initializeApp(config);
  // login - proveedor del servicio
  var provider = new firebase.auth.GoogleAuthProvider();

  $('#login').click(function() {
    firebase.auth()
      .signInWithPopup(provider)
      .then(function(result) {
        console.log(result.user);
        guardaDatos(result.user)
        $('#login').hide();
        $('#root').append('<img src=\'' + result.user.photoURL + '\' />');
      });
  });
  //Función que guarda datos automaticamente
  function guardaDatos(user){
    var usuario = {
      uid:user.uid,
      nombre:user.displayName,
      email:user.email,
      foto:user.photoURL
    }
    firebase.database().ref('datos/' + user.uid)
    .set(usuario)
  }

  $('#guardar').click(function() {
    firebase.database().ref('info')
      .set({
        nombre: 'Ruth',
        edad: '20',
        sexo: 'femenino2'
      });
  });
  //aquí estoy leyendo la BD
  firebase.database().ref('datos')
  .on('child_added', function(s){
    var user = s.val();
    $('#root').append('<img width ="100px" src=\'' + user.foto + '\' />');
  })
});
