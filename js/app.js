// Variables
const form = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');

let tweets = [];

eventListeners();
// Event listeners
function eventListeners(){
  // cuando el usuario agrega un nuevo tweet
  form.addEventListener('submit', agegarTweet)

  // cunado el documento esta listo
  document.addEventListener('DOMContentLoaded', () => {
    tweets = JSON.parse(localStorage.getItem('tweets')) || [];

    console.log(tweets);

    crearHTML();
  });
}

//  FUnciones
function agegarTweet(e){
  e.preventDefault();
  // textArea donde el usuario escribe

  const tweet = document.querySelector('#tweet').value;

  // validacion
  if(tweet === ''){
    mostrarError('Un mensaje no debe ir vacio');

    return;
  }

  const tweetObj = {
    id: Date.now(),
    tweet
  }

  // añadir al arreglo de tweets
  tweets = [...tweets, tweetObj];
  console.log(tweets);
  
  // crear el html
  crearHTML();
  
  // reiniciar el formulario
  form.reset();
}

// mostrar mensaje de rror
function mostrarError(error){
  const mensajeError = document.createElement('p');
  mensajeError.textContent = error;
  mensajeError.classList.add('error');

  // inserta en el contenido
  const contenido = document.querySelector('#contenido');
  contenido.appendChild(mensajeError);

  setTimeout(() => {
    // elimina la alerta de 3s
    mensajeError.remove();
  }, 3000);

}

// muestra un listado de los tweets
function crearHTML(){

  limpiarHTML();

  if(tweets.length > 0){
    tweets.forEach(tweet =>{

      // agregar boton de eliminar
      const btnEliminar = document.createElement('a');
      btnEliminar.classList.add('borrar-tweet');
      btnEliminar.innerHTML = 'X';

      // añadir la función de eliminar
      btnEliminar.onclick = ()=>{
        borrarTweet(tweet.id);
      }

      // crear el html
      const li = document.createElement('li');
      // añadir texto
      li.innerHTML = tweet.tweet

      // asignar el boton
      li.appendChild(btnEliminar);

      // insertarlo en el html
      listaTweets.append(li);
    })
  }

  sincronizarStorage();
}

// agrega los tweets actuales al local storage
function sincronizarStorage(){
  localStorage.setItem('tweets', JSON.stringify(tweets));
}

// elimina un tweet
function borrarTweet(id){
  tweets = tweets.filter( tweet => tweet.id !== id);
  crearHTML();
}

// limpiar el html
function limpiarHTML(){
  while(listaTweets.firstChild){
    listaTweets.removeChild(listaTweets.firstChild)
  }
}