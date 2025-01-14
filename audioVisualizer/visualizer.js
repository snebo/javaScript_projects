import { base64_file } from "./audio-chunk.js";
// const button1 = document.getElementById('button1')
// let audio1 = new Audio('./audio.mp3');

// let audio1 = new Audio(`data:audio/x-wav;base64,${base64_file}`)
const audio1 = document.getElementById('audio1')
audio1.src = `data:audio/x-wav;base64,${base64_file}`
const audioCtx = new AudioContext()
// button1.addEventListener('click', () => {
//     console.log('click')
//     audio1.play()
//     audio1.addEventListener('playing', () => {
//         console.log('playing')
//     })
//     audio1.addEventListener('ended', () => console.log('ended'))
// })
const container = document.getElementById('container')
const canvas = document.getElementById('canvas1');
canvas.width = window.innerWidth
canvas.height = window.innerHeight

//access to methods to create 2d visualizers
const ctx = canvas.getContext('2d')
let audioSource;
let analyser;

container.addEventListener('click', () => {
    audio1.play()
    audioSource = audioCtx.createMediaElementSource(audio1)
    analyser = audioCtx.createAnalyser() //exposes audio time and freqq data
    audioSource.connect(analyser); // this would expose timing and fewq and give us as a data obj
    analyser.connect(audioCtx.destination) // our default audio output device
    analyser.fftSize = 64; // no of sample bars
    const bufferLength = analyser.frequencyBinCount; //data values (always half of sample bars)
    const dataArray = new Uint8Array(bufferLength); // Uint8Array is a type of array that holds only 8bit values

    const barWidth = canvas.width / bufferLength;
    let barHeight;
    let x = 0;

    function animate() {
        x = 0
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray)

        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i]; // this represents db values
            ctx.fillStyle = `white`
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)
            x += barWidth;
        }
        requestAnimationFrame(animate)
    }
    animate()
})