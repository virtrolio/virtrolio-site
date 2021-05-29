export class Font {
    fontFamily: string;
    backupFont: string;

    constructor(fontFamily, backupFont) {
        this.fontFamily = fontFamily;
        this.backupFont = backupFont;
    }
}

export interface Fonts {
    [key: string]: Font;
}
