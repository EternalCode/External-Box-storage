let wallpaper_tiles = new Image();
wallpaper_tiles.src = "images/wallpaper.PNG";

let canvas = document.getElementById("ingame_pc");
let context = canvas.getContext("2d");
let viewing_box = 0;

$(document).ready( function() {

    canvas.width = 240;
    canvas.height = 160;
    draw_pc(canvas, context);
});


function draw_pc() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(wallpaper_tiles, 0, 0, 240, 160, 0, 0, 240, 160);
    // check if user PC has been added
    if (pc_box.length == 0) {
        context.fillStyle = "#000000";
    	context.font = "20px Roboto Mono";
    	font_len = context.measureText("Load a save first").width
    	context.fillText("Load a save first", canvas.width - font_len - 20, 100);
    } else {

    }

    requestAnimationFrame(draw_pc);
}


/* Read save file */
function import_button_read_file(event) {
    if (event.target.id == 'import_button')
        read_file();
}

function read_file() {
    let file = document.getElementById('saveFileInput').files[0];
    if (file !== null) {
        let reader = new FileReader();
        reader.onload = function(e) {
            let save_file_contents = new Uint8Array(e.target.result);
             let result = [];
             for (let i = 0; i < save_file_contents.length; i++) {
                 result.push(save_file_contents[i].toString(16));
             }
            array_to_sectors(result);
            populate_pc(pc_sectors_organize());
        };
        reader.readAsArrayBuffer(file);
    }
}

function handleFileSelect(evt) {
    // don't process non-sav extension files
    let file = event.target.files[0];
    if (!file.name.match('.*\.sav')) {
        alert("Upload only works on .sav files.");
    }
}
