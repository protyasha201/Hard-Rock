const search = document.getElementById("search");
search.addEventListener("click", () => {
    const searchText = document.getElementById("search-field").value;
    fetch(`https://api.lyrics.ovh/suggests/${searchText}`)
        .then(res => res.json())
        .then(data => displaySongs(data.data))
        .catch(error => displayError(error))
})

const displaySongs = songs => {
    const songContainer = document.getElementById("songContainer");
    songContainer.innerText = "";
    songs.forEach(song => {
        const songDiv = document.createElement("div");
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="displayLyric('${song.artist.name}', '${song.title}')" id="get-lyric" class="btn btn-success">Get Lyrics</button>
        </div>
        `;
        songContainer.appendChild(songDiv);
    });
}

function displayLyric(artist, title) {
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then(res => res.json())
        .then(data => getLyrics(data.lyrics))
}

const getLyrics = lyrics => {
    const lyricsDiv = document.getElementById("song-lyrics");
    lyricsDiv.innerText = lyrics;
}

const displayError = error => {
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.innerText = error;
}