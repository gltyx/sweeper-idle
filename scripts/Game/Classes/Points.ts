import { Colour } from "../../Boilerplate/Classes/Colour";
import { Context2D } from "../../Boilerplate/Classes/Context2D";
import { GameBase } from "../../Boilerplate/Classes/GameBase";
import { Align } from "../../Boilerplate/Enums/Align";
import { Fonts } from "../../Boilerplate/Enums/Fonts";
import { Colours } from "./Colours";

export class Points {
    private points: number = 0;
    private particles: PointTextParticle[] = [];
    private particleLife = 2;
    private particleSpeed = 75;

    getPoints() {
        return this.points;
    }

    addPoints(points: number) {
        this.points += points;
        this.particles.push(new PointTextParticle('+' + points, Colours.green, this.particleLife));
    }

    subtractPoints(points: number) {
        this.points -= points;
        this.particles.push(new PointTextParticle('-' + points, Colours.red, this.particleLife));
    }

    update() {
        this.particles.forEach(x => x.life -= GameBase.updateTime);
        this.particles = this.particles.filter(x => x.life > 0);
    }

    draw(context: Context2D) {
        const pointsText = `Points: ${this.points}`;
        const measurement = context.measureString(pointsText, 48, Fonts.Arial, Align.Center);

        const rectX = 20;
        const rectY = context.canvas.height - 80;
        const rectW = measurement.width + 20;
        const rectH = 50;

        context.drawBorderedRectangle(rectX, rectY, rectW, rectH, Colours.boxUncoveredColour, Colours.boxBorderColour);
        context.drawString(pointsText, rectX + rectW / 2, rectY + rectH / 2 + 4, 48, Fonts.Arial, Colours.boxBorderColour, Align.Center);

        this.particles.forEach(x => context.drawString(x.text, rectX + rectW / 2, (rectY + rectH / 2) - (this.particleLife - x.life) * this.particleSpeed, 48, Fonts.Arial, x.colour, Align.Center))
    }
}

class PointTextParticle {
    constructor(
        public text: string,
        public colour: Colour,
        public life: number
    ) { }
}