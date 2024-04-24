import React, { useRef, useState, useEffect } from 'react'
import './Hypercube.css'
import mouse from './mouse'
import { main, fixdim, freeze } from './animate'
import { app1, app2, tesseractwithrotation, tesseractedges, project, drawtesseract } from './hypercube'

export const Hypercube = () => {

    const canvasRef = useRef(null);
    const ctx = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        ctx.current = canvas.getContext('2d');

        canvas.style.border = 'none';
        canvas.style.backgroundColor = 'black';

        document.addEventListener("touchstart", mouse.down, true);
        document.addEventListener("touchend", mouse.up, true);
        document.addEventListener("touchmove", mouse.coords, true);

        document.addEventListener("mousedown", mouse.down, true);
        document.addEventListener("mouseup", mouse.up, true);
        document.addEventListener("mousemove", mouse.coords, true);


        const drawHypercube = () => {
            const tesseract = tesseractwithrotation(0, 0, 0, 0, 0, 0);
            const opts = {
                x: canvas.width / 2,
                y: canvas.height / 2,
                // size: 200, // Adjust size as needed
                // corner_radius: 5,
                line_width: 2,
            };
            drawtesseract(ctx.current, tesseract, opts);
        };
        const tesseract = tesseractwithrotation(0, 0, 0, 0, 0, 0);
        let gh = .12;
        let lasttime;
        drawtesseract(ctx.current, tesseract, {
            x: canvas.width / 2,
            y: canvas.height / 2,
            size: gh * canvas.height,
            line_width: 2,
        });
        drawHypercube();

        const animate = (now) => {
            main(now, canvas, ctx.current);
            drawHypercube();
            requestAnimationFrame(animate);
        };

        const init = (t) => {
            // fixdim(canvas, ctx, 0, 0, 0);
            requestAnimationFrame(animate);
        };

        requestAnimationFrame(init);
    }, []);


    return (
        <div className='home-main'>
            <canvas ref={canvasRef} width='500px' height='500px'/>
        </div>
    )
}
