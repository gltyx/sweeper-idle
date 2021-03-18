import { Grid } from "./Grid";
import { Camera } from "./Camera";
import { Vector2 } from "../../Boilerplate/Classes/Vector2";
import { GameBase } from "../../Boilerplate/Classes/GameBase";

export class Game extends GameBase {
    grid: Grid;
    camera: Camera;

    initialize() {
        this.grid = new Grid(10, 10);
        this.camera = new Camera();
        this.camera.position = new Vector2();
        this.camera.position.x = -100;
        this.camera.position.y = -50;
    }

    update() {
        this.camera.update(this.input);
        this.grid.update(this.camera, this.input);
    }

    draw() {
        this.grid.draw(this.context, this.camera);
    }
}
