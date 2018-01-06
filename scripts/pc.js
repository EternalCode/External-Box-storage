const BOX_PKMN_SIZE = 80;
const BOX_COUNT = 14;
const BOX_SIZE = 30;
let pc_box = [];


/* PC sectors into PC mon blobs */
function pc_sectors_organize() {
    let blob = [];
    for (let i = PC_SAVE_SECTOR_START; i <= PC_SAVE_SECTOR_END; i++) {
        let sector_id = get_sector_by_id(i);
        // create PC Box blob
        let size = sector_properties[i - PC_SAVE_SECTOR_START].size;
        if (i == PC_SAVE_SECTOR_START) {
            blob = blob.concat(save_sectors[sector_id].data.slice(4, size));
        } else if(i == PC_SAVE_SECTOR_END) {
            // don't copy wallpapers
            blob = blob.concat(save_sectors[sector_id].data.slice(0, size - 140));
        } else {
            blob = blob.concat(save_sectors[sector_id].data.slice(0, size));
        }
    }
    return blob;
}

/* Create the PC data from save blobs */
function populate_pc(blob) {
    let this_box = [];
    for (let i = 0; i <= 30 * BOX_COUNT; i ++) {
        if ((i % 30 == 0) && (i > 0)) {
            pc_box.push(this_box);
            this_box = [];
        }
        let pkmn = new PokemonBase(blob.slice(BOX_PKMN_SIZE * i, BOX_PKMN_SIZE * i + BOX_PKMN_SIZE));
        if (pkmn.pid != "0") {
            this_box.push(pkmn);
        } else {
            this_box.push(empty_mon());
        }
    }
}
