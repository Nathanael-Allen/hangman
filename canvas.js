$(document).ready(()=>{
    console.log('hello')
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    // ctx.fillStyle = 'rgb(23 124 234)';
    // ctx.fillRect(150, 150, 100, 100)

    // ctx.fillStyle = 'rgb(234 23 23 / 50%)';
    // ctx.fillRect(160, 160, 100, 100)

    // Circles
    // ctx.beginPath();
    // ctx.arc(200, 200, 50, 0, Math.PI * 2);
    // ctx.moveTo(180, 150);
    // ctx.arc(150, 150, 30, 0, Math.PI * 2);
    // ctx.stroke();   

    ctx.strokeStyle = 'rgb(0 0 0)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.lineTo(100, 175);
    ctx.stroke();
})