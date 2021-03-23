import { Grid } from "./Grid";
import { Camera } from "./Camera";
import { Vector2 } from "../../Boilerplate/Classes/Vector2";
import { GameBase } from "../../Boilerplate/Classes/GameBase";
import { Points } from "./Points";
import { Shop } from "./Shop";
import { UpgradeManager } from "./UpgradeManager";
import { Tooltip } from "./Tooltip";

export class Game extends GameBase {
    grid: Grid;
    camera: Camera;
    points: Points;
    shop: Shop;
    upgradeManager: UpgradeManager;
    tooltip: Tooltip;

    initialize() {
        this.grid = new Grid(64, 64);

        this.camera = new Camera();
        const gridCenter = new Vector2();
        gridCenter.x = 64 * ((64 / 2) + 1);
        gridCenter.y = 64 * ((64 / 2) + 1);
        this.camera.centerOnPosition(gridCenter, this.canvas);

        this.points = new Points();

        this.shop = new Shop();

        this.upgradeManager = new UpgradeManager();
        this.upgradeManager.initialize();

        this.tooltip = new Tooltip();
    }

    update() {
        this.tooltip.update();
        this.camera.update(this.input);
        this.shop.update(this.input, this.upgradeManager, this.points, this.tooltip);
        this.points.update(this.context, this.input);
        this.grid.update(this.camera, this.input, this.points, this.upgradeManager);
    }

    draw() {
        this.grid.draw(this.context, this.camera);
        this.points.draw(this.context);
        this.shop.draw(this.context, this.upgradeManager, this.points, this.input);
        this.tooltip.draw(this.context, this.points);
    }
}
