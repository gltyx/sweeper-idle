import { Input } from "../../Boilerplate/Classes/Input";
import { Vector2 } from "../../Boilerplate/Classes/Vector2"
import { MouseButton } from "../../Boilerplate/Enums/MouseButton";

export class Camera {
    public position: Vector2;
    private cameraStuck = true;

    constructor() { }

    getWorldToCameraOffset(position: Vector2): Vector2 {
        const offset = new Vector2();
        offset.x = position.x - this.position.x;
        offset.y = position.y - this.position.y;
        return offset;
    }

    getCameraToWorldOffset(position: Vector2): Vector2 {
        const offset = new Vector2();
        offset.x = position.x + this.position.x;
        offset.y = position.y + this.position.y;
        return offset;
    }

    update(input: Input) {
        if (input.isDown(MouseButton.Left) && (!this.cameraStuck || input.getHasLeftDownPositionChanged())) {
            this.position.x -= input.getChangeX();
            this.position.y -= input.getChangeY();
            this.cameraStuck = false;
        }
        else {
            this.cameraStuck = true;
        }
    }
}
