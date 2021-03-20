import { Context2D } from "../../Boilerplate/Classes/Context2D";
import { Align } from "../../Boilerplate/Enums/Align";
import { Fonts } from "../../Boilerplate/Enums/Fonts";
import { Colours } from "./Colours";

export class Points {
    points: number = 0;

    draw(context: Context2D) {
        const pointsText = `Points: ${this.points}`;
        const measurement = context.measureString(pointsText, 30, Fonts.Arial, Align.Center);

        const rectX = 20;
        const rectY = context.canvas.height - 70;
        const rectW = measurement.width + 20;
        const rectH = 50;

        context.drawBorderedRectangle(20, context.canvas.height - (20 + 50), measurement.width + 20, 50, Colours.boxUncoveredColour, Colours.boxBorderColour);
        context.drawString(pointsText, rectX + rectW / 2, rectY + rectH / 2, 30, Fonts.Arial, Colours.boxBorderColour, Align.Center);
    }
}
