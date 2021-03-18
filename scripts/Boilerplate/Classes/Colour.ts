export class Colour {
    private r: number;
    private g: number;
    private b: number;
    private hexString: string;

    getR() { return this.r; }
    getG() { return this.g; }
    getB() { return this.b; }
    getHexString() { return this.hexString; }

    constructor(
        r: number,
        g: number,
        b: number
    ) {
        this.r = this.boundValue(r);
        this.g = this.boundValue(g);
        this.b = this.boundValue(b);

        this.setHexString();
    }

    private setHexString() {
        const rHex = this.r.toString(16);
        const gHex = this.g.toString(16);
        const bHex = this.b.toString(16);

        this.hexString = '#';

        if (rHex.length === 1)
            this.hexString += '0';
        this.hexString += rHex;

        if (gHex.length === 1)
            this.hexString += '0';
        this.hexString += gHex;

        if (bHex.length === 1)
            this.hexString += '0';
        this.hexString += bHex;
    }

    private boundValue(value: number) {
        if (value < 0)
            return 0;
        if (value > 255)
            return 255;
        return value;
    }
}
