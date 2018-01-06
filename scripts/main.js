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
