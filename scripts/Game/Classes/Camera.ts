import { Input } from "../../Boilerplate/Classes/Input";
import { Vector2 } from "../../Boilerplate/Classes/Vector2"
import { MouseButton } from "../../Boilerplate/Enums/MouseButton";
import { Scroll } from "../../Boilerplate/Enums/Scroll";

export class Camera {
    public position = new Vector2();

    private zoomLevel = 2;
    private zoomLevels = [0.5, 0.75, 1, 1.5, 2, 3]
    private zoom: number;

    private cameraStuck = true;

    constructor() {
        this.updateZoom();
    }

    getWorldToCameraOffset(position: Vector2): Vector2 {
        const offset = new Vector2();
        offset.x = (position.x - this.position.x) * this.zoom;
        offset.y = (position.y - this.position.y) * this.zoom;
        return offset;
    }

    getCameraToWorldOffset(position: Vector2): Vector2 {
        const offset = new Vector2();
        offset.x = this.position.x + position.x / this.zoom;
        offset.y = this.position.y + position.y / this.zoom;
        return offset;
    }

    update(input: Input) {
        if (input.isDown(MouseButton.Left) && (!this.cameraStuck || input.getHasLeftDownPositionChanged())) {
            this.position.x -= input.getChangeX() / this.zoom;
            this.position.y -= input.getChangeY() / this.zoom;
            this.cameraStuck = false;
        }
        else {
            this.cameraStuck = true;
        }

        const scroll = input.getScroll();
        if (scroll === Scroll.Up) {
            this.zoomLevel = Math.min(this.zoomLevel + 1, this.zoomLevels.length - 1);
        }
        else if (scroll === Scroll.Down) {
            this.zoomLevel = Math.max(this.zoomLevel - 1, 0);
        }

        if (scroll !== Scroll.None) {
            const screenPosition = new Vector2();
            screenPosition.x = input.getX();
            screenPosition.y = input.getY();
            const worldPosition = this.getCameraToWorldOffset(screenPosition);

            this.updateZoom();

            this.alignScreenAndWorld(screenPosition, worldPosition);
        }
    }

    centerOnPosition(position: Vector2, canvas: HTMLCanvasElement) {
        this.position.x = position.x - (canvas.width / 2 / this.zoom);
        this.position.y = position.y - (canvas.height / 2 / this.zoom);
    }

    alignScreenAndWorld(screenPosition: Vector2, worldPosition: Vector2) {
        this.position.x = -((screenPosition.x / this.zoom) - worldPosition.x);
        this.position.y = -((screenPosition.y / this.zoom) - worldPosition.y);
    }

    updateZoom() {
        this.zoom = this.zoomLevels[this.zoomLevel];
    }

    getZoom() {
        return this.zoom;
    }
}
