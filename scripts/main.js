const PC_SAVE_SECTOR_START = 5;
const PC_SAVE_SECTOR_END = 13;
const sector_count = 32;
let save_sectors = [];
let pc_box = [];



/* Read save file */
function import_button_read_file(event) {
    if (event.target.id == 'import_button')
        read_file();
}

function read_file() {
    let file = document.getElementById('saveFileInput').files[0];
    // if file type could be detected
    if (file !== null) {
        let reader = new FileReader();
        reader.onload = function(e) {
            let save_file_contents = new Uint8Array(e.target.result);
             let result = [];
             for (let i = 0; i < save_file_contents.length; i++) {
                 result.push(save_file_contents[i].toString(16).toUpperCase());
             }
            array_to_sectors(result);
            //document.getElementById('raw_save').textContent = save_file_contents;//save_file_contents;
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