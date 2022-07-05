import { Context2D } from "../../Boilerplate/Classes/Context2D";
import { Align } from "../../Boilerplate/Enums/Align";
import { Fonts } from "../../Boilerplate/Enums/Fonts";
import { Colours } from "./Colours";
import { Points } from "./Points";

export class Tooltip {
    private hasTooltip = false;
    private title: string;
    private text: string;
    private x: number;
    private y: number;
    private cost: number;
    private costPrefix = "Cost: ";

    update() {
        this.hasTooltip = false;
        this.cost = null;
    }

    draw(context: Context2D, points: Points) {
        if (this.hasTooltip) {
            let titleWidth = context.measureString(this.title, 30, Fonts.Arial, Align.Left).width;
            const textWidth = context.measureString(this.text, 24, Fonts.Arial, Align.Left).width;

            if (this.cost != null)
                titleWidth += context.measureString(this.costPrefix + this.cost, 24, Fonts.Arial, Align.Right).width + 10;

            const width = Math.max(titleWidth, textWidth) + 20;

            context.drawBorderedRectangle(this.x, this.y, width, 80, Colours.background, Colours.boxBorder);
            context.drawString(this.title, this.x + 10, this.y + 10, 30, Fonts.Arial, Colours.boxBorder, Align.TopLeft);
            context.drawString(this.text, this.x + 10, this.y + 50, 24, Fonts.Arial, Colours.boxBorder, Align.TopLeft);

            if (this.cost != null)
                context.drawString(this.costPrefix + this.cost, (this.x + width) - 10, this.y + 10, 24, Fonts.Arial,
                    points.getPoints() < this.cost ? Colours.red : Colours.green, Align.TopRight);
        }
    }

    setTooltip(title: string, text: string, x: number, y: number, cost: number = null) {
        this.hasTooltip = true;
        this.title = title;
        this.text = text;
        this.x = x;
        this.y = y;
        this.cost = cost;
    }
}
