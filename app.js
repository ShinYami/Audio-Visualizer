const audioPlayer = document.querySelector('audio');

audioPlayer.addEventListener('play', () => {

    const contextAudio = new AudioContext();
    const src = contextAudio.createMediaElementSource(audioPlayer);
    const analyseur = contextAudio.createAnalyser();
    const canvas = document.getElementById('canvas');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    src.connect(analyseur);
    analyseur.connect(contextAudio.destination);

    analyseur.fftSize = 1024; 

    const audioFrequences = analyseur.frequencyBinCount;
    const arrayFrequences = new Uint8Array(audioFrequences);
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    const widthBar = (WIDTH / arrayFrequences.length) + 2;
    let heightBar;
    let x;

    function barReturn() {
        requestAnimationFrame(barReturn)

        x = 0;

        analyseur.getByteFrequencyData(arrayFrequences)

        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, WIDTH, HEIGHT)

        for (let i = 0; i < audioFrequences; i++) {

            barHeight = arrayFrequences[i];

            let r = 50;
            let g = 180;
            let b = i;

            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            ctx.fillRect(x, HEIGHT, widthBar, -barHeight);

            x += widthBar + 1;

        }
    }
    barReturn();
})