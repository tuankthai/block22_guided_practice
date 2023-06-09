
const SONGS_API_URL = "/api/guided-practice/songs";
const BASE_URL = "http://fsa-async-await.herokuapp.com"

const fetchAllSongs = async () => {
    try {
        const response = await fetch(BASE_URL + SONGS_API_URL);
        console.log("after fetch")
        console.log({ response });

        const data = await response.json();
        console.log("after json")
        console.log(data)
        return data;
    } catch (error) {
        console.log(error);
    }
}

function renderSongs(songs) {
    const songContainer = document.querySelector('#song-container');
    songContainer.innerHTML = '';
    songs.forEach((song) => {
        console.log({song})
        const songElement = renderSong(song);
        songContainer.append(songElement);
    });
}

function renderSong(song) {
    const p = document.createElement("p")
    // p.textContent = "The Mona Lisa is a famous painting. "
    p.innerText = "title: "+ song.title + ", release date: " + song.release_date.substr(0,10) ;
    return p;   
}

async function addNewSong(song) {
    const response = await fetch(BASE_URL + '/api/guided-practice/songs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(song),
    });
    const newSong = await response.json();
    return newSong;
}

function renderNewSongForm() {
    const newSongForm = document.querySelector('#new-song-form');
    newSongForm.innerHTML = `
                <form>
                  <label for="title">Title</label>
                  <input type="text" name="title" id="title" />
                  <label for="artist">Artist</label>
                  <input type="text" name="artist" id="artist" />
                  <label for="genre">Genre</label>
                  <input type="text" name="genre" id="genre" />
                  <label for="release-date">Release Date</label>
                  <input type="date" name="release-date" id="release-date" />
                  <button type="submit">Submit</button>
                </form>
              `;
    
    console.log("before add listener")

    newSongForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const artist = document.getElementById('artist').value;
        const genre = document.getElementById('genre').value;
        const releaseDate = document.getElementById('release-date').value;

        const newSong = {
            title: title,
            // artist_id: artist,
            artist_id: 1,
            // genre_id: genre,
            genre_id: 2,
            release_date: releaseDate
            // release_date: "1969-01-01T00:00:00.000Z"
        };
        console.log("listener callback")
        console.log(newSong)

        await addNewSong(newSong);
        const songs = await fetchAllSongs();
        renderSongs(songs);
    });
}


async function init() {
    // Your code here
    const songs = await fetchAllSongs();
    // console.log(songs);
    renderSongs(songs);
    renderNewSongForm();

}


init();
