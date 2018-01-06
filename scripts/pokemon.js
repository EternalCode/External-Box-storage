function empty_mon() {
    let empty = [];
    empty.length = 80;
    empty.fill(0);
    let mon = new PokemonBase(empty.fill(0));
    mon.nickname = "";
    mon.otname = "";
    return mon;
}

class PokemonBase {
    constructor(array) {
        this.pid = word(array.slice(0, 4));
        this.otid = word(array.slice(4, 8));
        this.nickname = pstr_ascii(array.slice(8, 18));
        this.font = array[18];
        this.sanity = array[19];
        this.otname = pstr_ascii(array.slice(20, 27));
        let marking = array[27];
        this.circle_mark = (marking & 1) | 0;
        this.square_mark = (marking & 2) | 0;
        this.triangle_mark = (marking & 4) | 0;
        this.heart_mark = (marking & 8) | 0;
        this.checksum = half_word(array.slice(28, 30));
        this.unused = array.slice(30, 32);
        this.data = array.slice(32, 80);
    }
}
