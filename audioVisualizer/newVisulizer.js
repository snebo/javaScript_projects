import { base64_file } from "./audio-chunk.js";

const audio1 = document.getElementById('audio1');
audio1.src = `data:audio/x-wav;base64,${base64_file}`
const container = document.getElementById('container');
const canvas = document.getElementById('canvas1');

canvas.width = window.innerWidth * 0.8;
canvas.height = 200;

const ctx = canvas.getContext('2d');
let audioContext, audioSource, analyser;

container.addEventListener('click', () => {
    if (!audioContext) {
        audioContext = new AudioContext();
        audioSource = audioContext.createMediaElementSource(audio1);
        analyser = audioContext.createAnalyser();

        audioSource.connect(analyser);
        analyser.connect(audioContext.destination);

        analyser.fftSize = 64;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const barWidth = 8;
        const gap = 4;
        const totalBarWidth = barWidth + gap;
        const scale = 0.5;
        const cornerRadius = 3; // Adjust this value to change the roundness of corners

        function roundedRect(ctx, x, y, width, height, radius) {
            if (height < radius * 2) {
                radius = height / 2;
            }
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + width - radius, y);
            ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
            ctx.lineTo(x + width, y + height - radius);
            ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
            ctx.lineTo(x + radius, y + height);
            ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.closePath();
            ctx.fill();
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            analyser.getByteFrequencyData(dataArray);

            const centerY = canvas.height / 2;
            const centerX = canvas.width / 2;

            // Draw from center outwards
            for (let i = 0; i < bufferLength / 2; i++) {
                // Left side (going outwards from center)
                const leftX = centerX - ((i + 1) * totalBarWidth);
                const leftBarHeight = (dataArray[i] * scale);

                ctx.fillStyle = 'blue';
                // Upper bar
                roundedRect(ctx, leftX, centerY - leftBarHeight / 2,
                    barWidth, leftBarHeight / 2, cornerRadius);
                // Lower bar
                roundedRect(ctx, leftX, centerY,
                    barWidth, leftBarHeight / 2, cornerRadius);

                // Right side (going outwards from center)
                const rightX = centerX + (i * totalBarWidth);
                const rightBarHeight = (dataArray[i] * scale); // Now using same index as left side

                // Upper bar
                roundedRect(ctx, rightX, centerY - rightBarHeight / 2,
                    barWidth, rightBarHeight / 2, cornerRadius);
                // Lower bar
                roundedRect(ctx, rightX, centerY,
                    barWidth, rightBarHeight / 2, cornerRadius);
            }

            requestAnimationFrame(animate);
        }

        animate();
    }

    audio1.play();
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth * 0.8;
});