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
   
   
    podcastCard.addEventListener("click", () => openModal(podcast.id));
    

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







function openModal (podcastId) {
    const podcast = podcasts.find(p => p.id === podcastId) ;

    const podcastModal = document.getElementById("modal");
    podcastModal.querySelector("#modal-title").textContent = podcast.title;
    podcastModal.querySelector("#modal-image").src = podcast.image;
    podcastModal.querySelector("#modal-description").textContent = podcast.description;
   
    podcastModal.querySelector("#modal-genres").textContent = 
    "Genres: " + podcast.genres.map(id => {
        const genreObj = genres.find(g => g.id === id);
        return genreObj ? genreObj.title : "Unknown";
    })
    .join(", ");
    
    podcastModal.querySelector("#modal-last-updated").textContent =
    "Last Updated: " + new Date(podcast.updated).toLocaleDateString();

    podcastModal.querySelector("#modal-seasons").textContent =
    `Seasons: ${podcast.seasons}`;

    const seasonObj = seasons.find(s => s.id === podcastId);
    const seasonList = seasonObj.seasonDetails.map(season => 
    `$Seasons ${season.seasonNumber}: ${season.episodes} episodes`).join("\n");

    
    const modalSeasons = podcastModal.querySelector("#modal-seasons-list");
    modalSeasons.textContent = seasonList;
    
    podcastModal.classList.remove("modal-hidden");
}
// open podcast modal with all details




const closeModal = document.getElementById("close-modal");
closeModal.addEventListener("click", () => {
podcastModal.classList.add("modal-hidden");

}); // add event listener to close modal

window.addEventListener("click", (event) => {
    if (event.target === podcastModal) {
        podcastModal.classList.add("modal-hidden");
    }
}); // close modal when clicking outside of it
    

renderPodcastGrid(); // initial rendering of podcast grid