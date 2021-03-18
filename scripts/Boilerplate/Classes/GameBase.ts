import { Context2D } from "./Context2D";
import { Input } from "./Input";

export abstract class GameBase {
    canvas: HTMLCanvasElement;
    context: Context2D;

    input: Input;

    updateInterval = 1000 / 60;
    drawInterval = 1000 / 60;

    windowWidth: number;
    windowHeight: number;

    constructor() {
        this.canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;

        this.context = this.canvas.getContext2D();

        this.input = new Input(this.canvas);

        this.updateWindowSize();
        window.addEventListener('resize', () => this.updateWindowSize());
    }

    run() {
        this.initialize();
        this.startUpdating();
        this.startDrawing();
    }

    abstract initialize();

    abstract update();

    abstract draw();

    private baseUpdate() {
        this.input.update();
        this.update();
    }

    private baseDraw() {
        this.context.clearRect(0, 0, this.windowWidth, this.windowHeight);
        this.draw();
    }

    private startUpdating() {
        setInterval(() => this.baseUpdate(), this.updateInterval);
    }

    private startDrawing() {
        setInterval(() => this.baseDraw(), this.drawInterval);
    }

    private updateWindowSize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
    }
}
