const BOX_PKMN_SIZE = 80;
const BOX_COUNT = 14;
const BOX_SIZE = 30;
let pc_box = [];
let pc_box_properties = [];


/* PC sectors into PC mon blobs */
function pc_sectors_organize() {
    let blob = [];
    for (let i = PC_SAVE_SECTOR_START; i <= PC_SAVE_SECTOR_END; i++) {
        let sector_id = get_sector_by_id(i);
        // create PC Box blob
        let size = sector_properties[i - PC_SAVE_SECTOR_START].size;
        if (i == PC_SAVE_SECTOR_START) {
            blob = blob.concat(save_sectors[sector_id].data.slice(4, size));
        } else if (i == PC_SAVE_SECTOR_END) {
            // don't copy wallpapers
            blob = blob.concat(save_sectors[sector_id].data.slice(0, size - 140));
            pc_box_properties = save_sectors[sector_id].data.slice(size - 140, size);
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
            let box_name = pstr_ascii(pc_box_properties.slice(pc_box.length * 9, (pc_box.length * 9) + 9));
            let wallpaper = pc_box_properties[pc_box_properties.length - (BOX_COUNT - pc_box.length)];
            pc_box.push(new PCBox(box_name, wallpaper, this_box));
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


class PCBox {
    constructor(name, wallpaper, data) {
        this.name = name;
        this.wallpaper = wallpaper;
        this.data = data;
    }

    get print() {
        console.log(this.name);
        console.log(this.data);
    }

}
