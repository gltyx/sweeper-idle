import { Colour } from "../../Boilerplate/Classes/Colour";
import { Context2D } from "../../Boilerplate/Classes/Context2D";
import { GameBase } from "../../Boilerplate/Classes/GameBase";
import { Input } from "../../Boilerplate/Classes/Input";
import { Align } from "../../Boilerplate/Enums/Align";
import { Fonts } from "../../Boilerplate/Enums/Fonts";
import { MouseButton } from "../../Boilerplate/Enums/MouseButton";
import { pointWithinRectangle } from "../../Boilerplate/Functions";
import { Colours } from "./Colours";

export class Points {
    private points: number = 0;
    private particles: PointTextParticle[] = [];
    private particleLife = 2;
    private particleSpeed = 75;

    private rectX: number;
    private rectY: number;
    private rectW: number;
    private rectH: number;
    private pointsText: string;

    getPoints() {
        return this.points;
    }

    addPoints(points: number) {
        if (points > 0) {
            this.points += points;
            this.particles.push(new PointTextParticle('+' + points, Colours.green, this.particleLife));
        }
    }

    subtractPoints(points: number) {
        if (points > 0) {
            this.points -= points;
            this.particles.push(new PointTextParticle('-' + points, Colours.red, this.particleLife));
        }
    }

    update(context: Context2D, input: Input) {
        this.particles.forEach(x => x.life -= GameBase.updateTime);
        this.particles = this.particles.filter(x => x.life > 0);

        this.pointsText = `Points: ${this.points}`;
        const measurement = context.measureString(this.pointsText, 48, Fonts.Arial, Align.Center);

        this.rectX = 20;
        this.rectY = context.canvas.height - 70;
        this.rectW = measurement.width + 20;
        this.rectH = 50;

        if (input.isReleased(MouseButton.Left) && !input.getLeftUsed()
            && pointWithinRectangle(input.getX(), input.getY(), this.rectX, this.rectY, this.rectW, this.rectH)) {
            input.setLeftUsed();
        }
        if (input.isReleased(MouseButton.Right) && !input.getRightUsed()
            && pointWithinRectangle(input.getX(), input.getY(), this.rectX, this.rectY, this.rectW, this.rectH)) {
            input.setRightUsed();
        }
    }

    draw(context: Context2D) {
        context.drawBorderedRectangle(this.rectX, this.rectY, this.rectW, this.rectH, Colours.boxUncovered, Colours.boxBorder);
        context.drawString(this.pointsText, this.rectX + this.rectW / 2, this.rectY + this.rectH / 2 + 4, 48, Fonts.Arial, Colours.boxBorder, Align.Center);

        this.particles.forEach(x => context.drawString(x.text, this.rectX + this.rectW / 2, (this.rectY + this.rectH / 2) - (this.particleLife - x.life) * this.particleSpeed, 48, Fonts.Arial, x.colour, Align.Center))
    }
}

class PointTextParticle {
    constructor(
        public text: string,
        public colour: Colour,
        public life: number
    ) { }
}