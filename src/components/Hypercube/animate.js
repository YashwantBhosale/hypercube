import dimensions from "./dimensions";
import { drawtesseract, tesseractwithrotation } from "./hypercube";
import mouse from "./mouse";

var color = "white",
	lasttime,
	freeze


export function fixdim(canvas) {
	dimensions.update()

	var displaywidth = Math.sqrt(dimensions.width) * 18 //dimensions.width > 900 ? 900 : 450

	var doc = document.documentElement;
	var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

	if (!freeze) {
		var displayheight = displaywidth * 4 / 15 //dimensions.width > 900 ? 250 : 125
		canvas.width = displayheight * window.devicePixelRatio
		canvas.style.width = displayheight + 'px'
		canvas.height = displayheight * window.devicePixelRatio
		canvas.style.height = displayheight + 'px'
	}
}

var gh = .12;

export function main(time, canvas, ctx) {

	if (canvas) {
	
		fixdim(canvas)
	
	var t = time / 10000
	
	ctx.strokeStyle = ctx.fillStyle = color
	var sm = 1
	
	var m = tesseractwithrotation(t, t * 2, t * 3, mouse.x / 100, mouse.y / 100, 0)
	drawtesseract(ctx, m, {
		x: canvas.width / 2,
		y: canvas.height / 2,
		size: gh * canvas.height,
		line_width: 2,
	})
}

lasttime = time
requestAnimationFrame(main)
}



