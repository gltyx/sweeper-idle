import { Align } from "../Enums/Align";
import { Fonts } from "../Enums/Fonts";
import { Colour } from "./Colour";

export type Context2D = CanvasRenderingContext2D;

declare global {
    interface CanvasRenderingContext2D {
        drawString(text: string, x: number, y: number, size: number, font: Fonts, colour: Colour, align: Align): void;
        measureString(text: string, size: number, font: Fonts, align: Align): TextMetrics;
        setAlign(align: Align): void;
        setFont(font: Fonts, size: number): void;
        drawFillRectangle(x: number, y: number, w: number, h: number, colour: Colour): void;
        drawStrokeRectangle(x: number, y: number, w: number, h: number, colour: Colour, lineWidth: number): void;
        drawBorderedRectangle(x: number, y: number, w: number, h: number, fillColour: Colour, borderColour: Colour): void;
    }

    interface HTMLCanvasElement {
        getContext2D(): Context2D;
    }
}

HTMLCanvasElement.prototype.getContext2D = function () {
    return this.getContext('2d') as Context2D;
}

CanvasRenderingContext2D.prototype.drawString = function (text: string, x: number, y: number, size: number, font: Fonts, colour: Colour, align: Align) {
    this.fillStyle = colour.getHexString();

    this.setFont(font, size);

    this.setAlign(align);

    this.fillText(text, x, y);
}

CanvasRenderingContext2D.prototype.measureString = function (text: string, size: number, font: string, align: Align) {
    this.setFont(font, size);

    this.setAlign(align);

    return this.measureText(text);
}

CanvasRenderingContext2D.prototype.drawFillRectangle = function (x: number, y: number, w: number, h: number, colour: Colour) {
    this.fillStyle = colour.getHexString();
    this.fillRect(x, y, w, h);
}

CanvasRenderingContext2D.prototype.drawStrokeRectangle = function (x: number, y: number, w: number, h: number, colour: Colour, lineWidth: number = 2) {
    this.strokeStyle = colour.getHexString();
    this.lineWidth = lineWidth;
    this.strokeRect(x, y, w, h);
}

CanvasRenderingContext2D.prototype.drawBorderedRectangle = function (x: number, y: number, w: number, h: number, fillColour: Colour, borderColour: Colour, lineWidth: number = 2) {
    this.drawFillRectangle(x, y, w, h, fillColour);
    this.drawStrokeRectangle(x, y, w, h, borderColour, lineWidth);
}

CanvasRenderingContext2D.prototype.setAlign = function (align: Align) {
    if (align === Align.Bottom
        || align === Align.BottomLeft
        || align === Align.BottomRight)
        this.textBaseline = "bottom";
    else if (align === Align.Top
        || align === Align.TopLeft
        || align === Align.TopRight)
        this.textBaseline = "top";
    else
        this.textBaseline = "middle";

    if (align === Align.Left
        || align === Align.TopLeft
        || align === Align.BottomLeft)
        this.textAlign = "left"
    else if (align === Align.Right
        || align === Align.TopRight
        || align === Align.BottomRight)
        this.textAlign = "right"
    else
        this.textAlign = "center";
}

CanvasRenderingContext2D.prototype.setFont = function (font: Fonts, size: number) {
    this.font = `${size}px ${font}`;
}
