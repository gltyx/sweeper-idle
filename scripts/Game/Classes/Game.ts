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
        this.grid = new Grid(10, 10);

        this.camera = new Camera();
        this.camera.position = new Vector2();
        this.camera.position.x = -100;
        this.camera.position.y = -50;

        this.points = new Points();
    }

    update() {
        this.camera.update(this.input);
        this.grid.update(this.camera, this.input, this.points);
    }

    draw() {
        this.grid.draw(this.context, this.camera);
        this.points.draw(this.context);
    }
}
