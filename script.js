import {podcasts, genres, seasons} from './data.js'; 



const podcastGrid = document.getElementById("podcast-grid");
// render podcast cards
podcasts.forEach((podcast, index) => {
    const podcastCard = document.createElement("div");
podcastCard.className = "podcast-card";
podcastCard.innerHTML = `
    <img src="${podcast.image}" alt="${podcast.title} Cover Art" class="podcast-image"/>
    <h3 class="podcast-title">${podcast.title}</h3>
    <p class="podcast-genre">Genre: ${podcast.genre}</p>
    <p class="podcast-seasons">Seasons: ${podcast.seasons}</p>
    <p>Updated: ${podcast.updated}</p>
`;
   
   
    podcastCard.addEventListener("click", () => openModal(index));
    podcastGrid.appendChild(podcastCard);
    






});