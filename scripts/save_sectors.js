const PC_SAVE_SECTOR_START = 5;
const PC_SAVE_SECTOR_END = 13;
const sector_count = 32;
let save_sectors = [];

function get_sector_by_id(id) {
    let matching_sectors = [];
    matching_sectors.push({
        ret: -1,
        counter: -1,
    });
    for (let sector = 0; sector < 32; sector++) {
        let sector_id = parseInt(save_sectors[sector].id, 16);
        if (sector_id == id) {
            matching_sectors.push({
                ret: sector,
                counter: save_sectors[sector].counter,
            });
        }
    }

    matching_sectors.sort(function(a, b) {
        if (a.counter < b.counter)
            return -1;
        if (a.counter > b.counter)
            return 1;
        return 0;
    })
    return matching_sectors[matching_sectors.length-1].ret;

}

/* Convert save file into sector objects */
function array_to_sectors(array) {
    for (let sector = 0; sector < sector_count; sector++) {
        let sector_start = sector * 4096;
        save_sectors[sector] =
        {
            data: array.slice(sector_start, sector_start + 4084),
            id: half_word(array.slice(sector_start + 4084, sector_start + 4086)),
            checksum: half_word(array.slice(sector_start + 4086, sector_start + 4088)),
            security: word(array.slice(sector_start + 4088, sector_start + 4092)),
            counter: word(array.slice(sector_start + 4092, sector_start + 4096)),
        }
        console.log(save_sectors[sector]);
    }
}
