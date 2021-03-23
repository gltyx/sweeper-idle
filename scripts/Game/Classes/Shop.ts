import { Colour } from "../../Boilerplate/Classes/Colour";
import { Context2D } from "../../Boilerplate/Classes/Context2D";
import { Input } from "../../Boilerplate/Classes/Input";
import { Align } from "../../Boilerplate/Enums/Align";
import { Fonts } from "../../Boilerplate/Enums/Fonts";
import { MouseButton } from "../../Boilerplate/Enums/MouseButton";
import { pointWithinRectangle } from "../../Boilerplate/Functions";
import { Colours } from "./Colours";
import { Points } from "./Points";
import { Tooltip } from "./Tooltip";
import { UpgradeManager } from "./UpgradeManager";

export class Shop {
    private titleRectX = 20;
    private titleRectY = 20;
    private titleRectW = 272
    private titleRectH = 60;
    private mainRectX = 20;
    private mainRectY = 80;
    private mainRectW = 272

    private upgradeWidth = 64;
    private upgradeHeight = 64;
    private upgradeOffset = 20;

    update(input: Input, upgradeManager: UpgradeManager, points: Points, tooltip: Tooltip) {
        const upgrades = upgradeManager.getAvailableUpgrades();

        if (pointWithinRectangle(input.getX(), input.getY(), this.titleRectX, this.titleRectY, this.titleRectW,
            this.titleRectH + this.upgradeOffset + ((upgrades.length - upgrades.length % 3) / 3 + 1) * (this.upgradeHeight + this.upgradeOffset))) {
            if (input.isReleased(MouseButton.Left) && !input.getLeftUsed()) {
                input.setLeftUsed();

                upgrades.forEach((x, i) => {
                    if (pointWithinRectangle(input.getX(), input.getY(),
                        this.mainRectX + this.upgradeOffset + (this.upgradeOffset + this.upgradeWidth) * (i % 3),
                        this.mainRectY + this.upgradeOffset + (this.upgradeOffset + this.upgradeHeight) * ((i - i % 3) / 3),
                        this.upgradeWidth, this.upgradeHeight)) {
                        if (points.getPoints() >= x.cost) {
                            points.subtractPoints(x.cost);
                            upgradeManager.unlockUpgrade(x.upgrade);
                        }
                    }
                });
            }

            if (input.isReleased(MouseButton.Right) && !input.getRightUsed()) {
                input.setRightUsed();
            }

            upgrades.forEach((x, i) => {
                if (pointWithinRectangle(input.getX(), input.getY(),
                    this.mainRectX + this.upgradeOffset + (this.upgradeOffset + this.upgradeWidth) * (i % 3),
                    this.mainRectY + this.upgradeOffset + (this.upgradeOffset + this.upgradeHeight) * ((i - i % 3) / 3),
                    this.upgradeWidth, this.upgradeHeight)) {
                    tooltip.setTooltip(x.name, x.description, input.getX(), input.getY(), x.cost);
                }
            });
        }
    }

    draw(context: Context2D, upgradeManager: UpgradeManager, points: Points, input: Input) {
        const upgrades = upgradeManager.getAvailableUpgrades();

        context.drawBorderedRectangle(this.mainRectX, this.mainRectY, this.mainRectW,
            this.upgradeOffset + ((upgrades.length - upgrades.length % 3) / 3 + 1) * (this.upgradeHeight + this.upgradeOffset),
            Colours.boxUncovered, Colours.boxBorder);
        context.drawBorderedRectangle(this.titleRectX, this.titleRectY, this.titleRectW, this.titleRectH, Colours.boxUncovered, Colours.boxBorder);
        context.drawString('Shop', this.titleRectX + this.titleRectW / 2, this.titleRectY + this.titleRectH / 2 + 4, 48, Fonts.Arial, Colours.boxBorder, Align.Center);

        upgrades.forEach((x, i) => {
            let colour: Colour;

            if (points.getPoints() < x.cost)
                colour = Colours.boxCovered;
            else if (pointWithinRectangle(input.getX(), input.getY(),
                this.mainRectX + this.upgradeOffset + (this.upgradeOffset + this.upgradeWidth) * (i % 3),
                this.mainRectY + this.upgradeOffset + (this.upgradeOffset + this.upgradeHeight) * ((i - i % 3) / 3),
                this.upgradeWidth, this.upgradeHeight))
                colour = Colours.boxUncovered;
            else
                colour = Colours.background;

            context.drawBorderedRectangle(
                this.mainRectX + this.upgradeOffset + (this.upgradeOffset + this.upgradeWidth) * (i % 3),
                this.mainRectY + this.upgradeOffset + (this.upgradeOffset + this.upgradeHeight) * ((i - i % 3) / 3),
                this.upgradeWidth, this.upgradeHeight, colour, Colours.boxBorder);
            context.drawString(x.shortName,
                this.mainRectX + this.upgradeOffset + (this.upgradeOffset + this.upgradeWidth) * (i % 3) + this.upgradeWidth / 2,
                this.mainRectY + this.upgradeOffset + (this.upgradeOffset + this.upgradeHeight) * ((i - i % 3) / 3) + this.upgradeHeight / 2,
                16, Fonts.Arial, x.colour, Align.Center);
        });
    }
}
