const button = document.getElementById('button');
const audioElement = document.getElementById('audio');



//Disable/Enable button
function toggleButton() {
    button.disabled = !button.disabled;
}

//Passing our Joke to VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: '1ea3b89627a04a3c96a7eb976cbac90a',
        src: joke,
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

//Get Jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        //Text-to-speach
        tellMe(joke);
        //Disable button
        toggleButton();
    }
    catch (error) {
        //Catch Errors Here
        console.log('whoops', error);
    }
}

//Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton)
