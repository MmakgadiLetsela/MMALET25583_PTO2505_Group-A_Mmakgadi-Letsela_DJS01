import {podcasts, genres, seasons} from './data.js'; 


function createPodcastCard(podcast) {
    
    const genreTitles = podcast.genres
    .map(id => {
        const genreObj = genres.find(g => g.id === id);
        return genreObj ? genreObj.title : "Unknown";   
    })
    .join(", ");
    // used too lookup genre titles using the ids in the podcast objects
    
    const updatedDate = new Date(podcast.updated).toLocaleDateString();
    // format the updated date to a more readable format

    
    
    const podcastCard = document.createElement("div");
podcastCard.className = "podcast-card";
podcastCard.innerHTML = `
    <img src="${podcast.image}" alt="${podcast.title} Cover Art" class="podcast-image"/>
    <h3 class="podcast-title">${podcast.title}</h3>
    <p class="podcast-genre">Genre: ${genreTitles}</p>
    <p class="podcast-seasons">Seasons: ${podcast.seasons}</p>
    <p>Updated: ${updatedDate}</p>
`; // create podcast card HTML structure    
   
   
    podcastCard.addEventListener("click", () => openModal(id));
    podcastGrid.appendChild(podcastCard);
    

    return podcastCard;
}; // function to handle podcast card creation, including genre titles and updated date formatting



function renderPodcastGrid(){

    const podcastGrid = document.getElementById("podcast-grid");
    podcastGrid.innerHTML = ""; // clear existing content

    podcasts.forEach(podcast => {
        const podcastCard = createPodcastCard(podcast);
        podcastGrid.appendChild(podcastCard);
    });
}







function openModal (id) {
    const podcast = podcasts.find(p => p.id === id) ;

    const podcastModal = document.getElementById("modal");
    podcastModal.querySelector("#modal-title").textContent = podcast.title;
    podcastModal.querySelector("#modal-image").src = podcast.image;
    podcastModal.querySelector("#modal-description-text").textContent = podcast.description;
    podcastModal.querySelector("#modal-genres-text").textContent = `Genres: ${podcast.genres}`;
    podcastModal.querySelector("#modal-last-updated").textContent = `Last Updated: ${podcast.updated}`;
    podcastModal.querySelector("#modal-seasons").textContent = `Seasons: ${podcast.seasons}`;
    
    
    podcastModal.classList.remove("modal-hidden");
}
// open podcast modal with all details


const closeModal =document.getElementById("close-modal");
closeModal.addEventListener("click", () => {
podcastModal.classList.add("modal-hidden");

}); // add event listener to close modal

window.addEventListener("click", (event) => {
    if (event.target === podcastModal) {
        podcastModal.classList.add("modal-hidden");
    }
}); // close modal when clicking outside of it
    

