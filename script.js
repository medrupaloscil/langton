var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

var size = parseInt(prompt("Enter a size:"));
var speed = parseInt(prompt("Enter the ant speed (normal is 1):"));

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

var x = 400;
var y = 400;
var dir = "n";

var main = function () {

	for (var i = 0; i < speed; i++) {
		move()
	}
	requestAnimationFrame(main);
};

function move() {
	var p = ctx.getImageData(x, y, size, size).data;
	var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);

	if (hex == "#ff0000") {
		ctx.fillStyle = "rgb(0,0,255)";
		ctx.fillRect(x, y, size, size);
		turn("r");
	} else if (hex == "#0000ff") {
		ctx.fillStyle = "rgb(0,255,0)";
		ctx.fillRect(x, y, size, size);
		turn("l");
	} else if (hex == "#00ff00") {
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.fillRect(x, y, size, size);
		turn("r");
	} else {
		ctx.fillStyle = "rgb(255,0,0)";
		ctx.fillRect(x, y, size, size);
		turn("r");
	}
}

function turn(where) {
	switch(dir) {
		case "n":
			if (where == "l") {
				dir = "w";
			} else {
				dir = "e";
			}
			break;
		case "s":
			if (where == "l") {
				dir = "e";
			} else {
				dir = "w";
			}
			break;
		case "e":
			if (where == "l") {
				dir = "n";
			} else {
				dir = "s";
			}
			break;
		case "w":
			if (where == "l") {
				dir = "s";
			} else {
				dir = "n";
			}
			break;
	}

	switch(dir) {
		case "n":
			x = x - size >= 0 ? x - size : 0;
			break;
		case "s":
			x = x + size <= canvas.width ? x + size : canvas.width;
			break;
		case "e":
			y = y + size <= canvas.height ? y + size : canvas.height;
			break;
		case "w":
			y = y - size >= 0 ? y - size : 0;
			break;
	}
}

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

main();