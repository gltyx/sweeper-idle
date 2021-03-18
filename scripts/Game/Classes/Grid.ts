import { Colour } from "../../Boilerplate/Classes/Colour";
import { Context2D } from "../../Boilerplate/Classes/Context2D";
import { Input } from "../../Boilerplate/Classes/Input";
import { Vector2 } from "../../Boilerplate/Classes/Vector2";
import { Align } from "../../Boilerplate/Enums/Align";
import { Fonts } from "../../Boilerplate/Enums/Fonts";
import { MouseButton } from "../../Boilerplate/Enums/MouseButton";
import { createMultidimensionalArray, randomInt } from "../../Boilerplate/Functions";
import { CellStates } from "../Enums/CellStates";
import { CellTypes } from "../Enums/CellTypes";
import { Camera } from "./Camera";
import { Colours } from "./Colours";
import { Points } from "./Points";

export class Grid {
    private cellValues: number[][];
    private cellTypes: CellTypes[][];
    private cellStates: CellStates[][];
    private width: number;
    private height: number;

    constructor(width: number, height: number) {
        this.cellValues = createMultidimensionalArray(width, height, 0);
        this.cellTypes = createMultidimensionalArray(width, height, CellTypes.Clear);
        this.cellStates = createMultidimensionalArray(width, height, CellStates.Covered);
        this.width = width;
        this.height = height;

        this.cellTypes[4][4] = CellTypes.Mine;

        this.generateMines();

        this.calculateCellValues();
    }

    update(camera: Camera, input: Input, points: Points) {
        if (input.isReleased(MouseButton.Left) && !input.getHasLeftDownPositionChanged() && !input.getLeftUsed()) {
            const mousePos = new Vector2();
            mousePos.x = input.getX();
            mousePos.y = input.getY();
            const worldPos = camera.getCameraToWorldOffset(mousePos);
            const x = Number.parseInt((worldPos.x / 64 - 0.5).toFixed(0));
            const y = Number.parseInt((worldPos.y / 64 - 0.5).toFixed(0));

            if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
                this.cellStates[x][y] = CellStates.Uncovered;

                if (this.cellTypes[x][y] === CellTypes.Clear)
                    points.points += 1 + this.cellValues[x][y];
            }
        }
    }

    draw(context: Context2D, camera: Camera) {
        const position = new Vector2();
        let offset: Vector2;

        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                position.x = x * 64;
                position.y = y * 64;
                offset = camera.getWorldToCameraOffset(position);

                if (this.cellStates[x][y] === CellStates.Covered) {
                    context.drawBorderedRectangle(offset.x, offset.y, 64, 64, Colours.boxCoveredColour, Colours.boxBorderColour);
                }
                else if (this.cellStates[x][y] === CellStates.Uncovered) {
                    context.drawBorderedRectangle(offset.x, offset.y, 64, 64, Colours.boxUncoveredColour, Colours.boxBorderColour);

                    if (this.cellTypes[x][y] === CellTypes.Mine) {
                        context.drawFillRectangle(offset.x + 9, offset.y + 9, 46, 46, Colours.boxBombColour);
                    }
                    else if (this.cellTypes[x][y] === CellTypes.Clear) {
                        const cellValue = this.cellValues[x][y];

                        if (cellValue !== 0)
                            context.drawString(cellValue.toString(), offset.x + 32, offset.y + 32, 30, Fonts.Arial, Colours.magenta, Align.Center);
                    }
                }
            }
        }
    }

    calculateCellValues() {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                this.cellValues[x][y] = this.getCellValue(x, y);
            }
        }
    }

    getCellValue(x: number, y: number): number {
        const checkCells = [
            [x - 1, y - 1],
            [x - 1, y],
            [x - 1, y + 1],
            [x, y - 1],
            [x, y + 1],
            [x + 1, y - 1],
            [x + 1, y],
            [x + 1, y + 1],
        ]

        return checkCells.map(x => this.cellIsMine(x[0], x[1])).filter(x => x === true).length;
    }

    cellIsMine(x: number, y: number): boolean {
        if (x < 0 || x >= this.width || y < 0 || y > this.height)
            return false;

        return this.cellTypes[x][y] === CellTypes.Mine;
    }

    generateMines() {
        let minesLeft = 150;

        for (let x = this.width / 2 - 2; x < this.width / 2 + 2; x++) {
            for (let y = this.height / 2 - 2; y < this.height / 2 + 2; y++) {
                this.cellTypes[x][y] = CellTypes.Mine;
            }
        }

        while (minesLeft > 0) {
            const x = randomInt(0, this.width - 1);
            const y = randomInt(0, this.height - 1);

            if (this.cellTypes[x][y] !== CellTypes.Mine) {
                this.cellTypes[x][y] = CellTypes.Mine;
                minesLeft--;
            }
        }

        for (let x = this.width / 2 - 2; x < this.width / 2 + 2; x++) {
            for (let y = this.height / 2 - 2; y < this.height / 2 + 2; y++) {
                this.cellTypes[x][y] = CellTypes.Clear;
                this.cellStates[x][y] = CellStates.Uncovered;
            }
        }
    }
}
