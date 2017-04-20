var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;
document.body.appendChild(canvas);

var x = 200;
var y = 200;
var dir = "n";

var main = function () {
	var now = Date.now();
	var delta = now - then;

	then = now;

	move();

	requestAnimationFrame(main);
};

function move() {
	var p = ctx.getImageData(x, y, 10, 10).data;
	var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);

	if (hex == "#ff0000") {
		ctx.fillStyle = "rgb(0,0,255)";
		ctx.fillRect(x, y, 10, 10);
		turn("l");
	} else if (hex == "#0000ff") {
		ctx.fillStyle = "rgb(0,255,0)";
		ctx.fillRect(x, y, 10, 10);
		turn("l");
	} else if (hex == "#00ff00") {
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.fillRect(x, y, 10, 10);
		turn("r");
	} else {
		ctx.fillStyle = "rgb(255,0,0)";
		ctx.fillRect(x, y, 10, 10);
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
			x -= 10;
			break;
		case "s":
			x += 10;
			break;
		case "e":
			y += 10;
			break;
		case "w":
			y -= 10;
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

var then = Date.now();
main();