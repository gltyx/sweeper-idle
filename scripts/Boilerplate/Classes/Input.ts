import { MouseState } from "./MouseState";
import { MouseButton } from "../Enums/MouseButton";
import { Vector2 } from "./Vector2";
import { Scroll } from "../Enums/Scroll";

export class Input {
    private previousMouseState: MouseState;
    private currentMouseState: MouseState;
    private runningMouseState: MouseState

    private leftUsed = false;
    private rightUsed = false;
    private leftDownPosition = new Vector2();
    private rightDownPosition = new Vector2();

    private mouseStickiness = 32; //TODO: tweak this

    constructor(canvas: HTMLCanvasElement) {
        this.previousMouseState = new MouseState(0, 0, false, false, Scroll.None);
        this.currentMouseState = new MouseState(0, 0, false, false, Scroll.None);
        this.runningMouseState = new MouseState(0, 0, false, false, Scroll.None);

        canvas.addEventListener('mousedown', (event) => {
            if (event.button === MouseButton.Left) {
                this.runningMouseState.left = true;
                this.leftDownPosition.x = this.runningMouseState.x;
                this.leftDownPosition.y = this.runningMouseState.y;
            }
            else if (event.button === MouseButton.Right) {
                this.runningMouseState.right = true;
                this.rightDownPosition.x = this.runningMouseState.x;
                this.rightDownPosition.y = this.runningMouseState.y;
            }
        });

        canvas.addEventListener('mouseup', (event) => {
            if (event.button === MouseButton.Left) {
                this.runningMouseState.left = false;
                this.leftUsed = false;
            }
            else if (event.button === MouseButton.Right) {
                this.runningMouseState.right = false;
                this.rightUsed = false;
            }
        });

        canvas.addEventListener('mousemove', (event) => {
            const target = event.currentTarget as Element;
            const rect = target.getBoundingClientRect();
            this.runningMouseState.x = event.clientX - rect.left;
            this.runningMouseState.y = event.clientY - rect.top;
        });

        canvas.addEventListener('contextmenu', (event) => event.preventDefault());

        canvas.addEventListener('wheel', (event) => {
            if (event.deltaY < 0)
                this.runningMouseState.scroll = Scroll.Up;
            else if (event.deltaY > 0)
                this.runningMouseState.scroll = Scroll.Down;
        });
    }

    update() {
        this.previousMouseState = this.currentMouseState;
        this.currentMouseState = new MouseState(
            this.runningMouseState.x,
            this.runningMouseState.y,
            this.runningMouseState.left,
            this.runningMouseState.right,
            this.runningMouseState.scroll);

        this.runningMouseState.scroll = Scroll.None;
    }

    getX() {
        return this.currentMouseState.x;
    }

    getY() {
        return this.currentMouseState.y;
    }

    getChangeX() {
        return this.currentMouseState.x - this.previousMouseState.x;
    }

    getChangeY() {
        return this.currentMouseState.y - this.previousMouseState.y;
    }

    getHasPositionChanged() {
        return Math.abs(this.getChangeX()) > this.mouseStickiness
            || Math.abs(this.getChangeY()) > this.mouseStickiness;
    }

    getLeftUsed() {
        return this.leftUsed;
    }

    getRightUsed() {
        return this.rightUsed;
    }

    setLeftUsed() {
        this.leftUsed = true;
    }

    setRightUsed() {
        this.rightUsed = true;
    }

    getLeftDownPosition() {
        return this.leftDownPosition;
    }

    getRightDownPosition() {
        return this.rightDownPosition;
    }

    getHasLeftDownPositionChanged() {
        return Math.abs(this.leftDownPosition.x - this.currentMouseState.x) > this.mouseStickiness
            || Math.abs(this.leftDownPosition.y - this.currentMouseState.y) > this.mouseStickiness;
    }

    getHasRightDownPositionChanged() {
        return this.rightDownPosition.x !== this.currentMouseState.x
            || this.rightDownPosition.y !== this.currentMouseState.y;
    }

    isUp(mouseButton: MouseButton) {
        if (mouseButton === MouseButton.Left)
            return !this.currentMouseState.left;
        if (mouseButton === MouseButton.Right)
            return !this.currentMouseState.right;
        return false;
    }

    isDown(mouseButton: MouseButton) {
        if (mouseButton === MouseButton.Left)
            return this.currentMouseState.left;
        if (mouseButton === MouseButton.Right)
            return this.currentMouseState.right;
        return false;
    }

    isClicked(mouseButton: MouseButton) {
        if (mouseButton === MouseButton.Left)
            return this.currentMouseState.left && !this.previousMouseState.left
        if (mouseButton === MouseButton.Right)
            return this.currentMouseState.right && !this.previousMouseState.right;
        return false;
    }

    isReleased(mouseButton: MouseButton) {
        if (mouseButton === MouseButton.Left)
            return !this.currentMouseState.left && this.previousMouseState.left
        if (mouseButton === MouseButton.Right)
            return !this.currentMouseState.right && this.previousMouseState.right;
        return false;
    }

    getScroll() {
        return this.currentMouseState.scroll;
    }
}
