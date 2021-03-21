import { Grid } from "./Grid";
import { Camera } from "./Camera";
import { Vector2 } from "../../Boilerplate/Classes/Vector2";
import { GameBase } from "../../Boilerplate/Classes/GameBase";
import { Points } from "./Points";

export class Game extends GameBase {
    grid: Grid;
    camera: Camera;
    points: Points;

    initialize() {
        this.grid = new Grid(64, 64);

        this.camera = new Camera();
        const gridCenter = new Vector2();
        gridCenter.x = 64 * ((64 / 2) + 1);
        gridCenter.y = 64 * ((64 / 2) + 1);
        this.camera.centerOnPosition(gridCenter, this.canvas);

        this.points = new Points();
    }

    update() {
        this.camera.update(this.input);
        this.grid.update(this.camera, this.input, this.points);
        this.points.update();
    }

    draw() {
        this.grid.draw(this.context, this.camera);
        this.points.draw(this.context);
    }
}
