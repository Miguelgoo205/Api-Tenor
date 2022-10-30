window.addEventListener("DOMContentLoaded", trending);
const apiKey = "AIzaSyB0AE9ELbvQlu7XZFnuu0rokGDJ_sFTtvI";
const main = document.getElementById("main");
const message = document.getElementById("message");
const inputSearch = document.getElementById("search");
const urlTrending = "https://tenor.googleapis.com/v2/featured?key=AIzaSyB0AE9ELbvQlu7XZFnuu0rokGDJ_sFTtvI&limit=40";

inputSearch.addEventListener("keyup", seeker)

function trending() {
    message.style.display="flex";
    message.textContent= "Top 40 Gifs Of The Day"
    fetch(urlTrending)
    .then(response => response.json())
    .then(data => renderGifs(data));
}

function renderGifs(data) {
    data["results"].map(result =>{
        
        const card= document.createElement('div')
        card.classList.add('card')

        const text= document.createElement('div');
        text.classList.add('text')

        const nameGif = document.createElement('h2');
        nameGif.textContent= result["content_description"];
        nameGif.classList.add('nameGif');
  
        const gif = document.createElement('img');
        gif.setAttribute("src", result["media_formats"]["gif"]["url"]);
        gif.classList.add('image');

        card.appendChild(gif);
        card.appendChild(text);
        text.appendChild(nameGif);
        main.appendChild(card);

    })
}


function seeker(event) {
    main.innerHTML=" ";
    message.style.display="none";
    let newApi = "https://tenor.googleapis.com/v2/search?q=" + event.target.value + "&key=" + apiKey+"&limit=40";
    if (event.target.value=== "") {
        trending();
    }
    else{
        fetch(newApi)
        .then(response => response.json())
        .then(data =>  renderGifs(data))
    }
}
