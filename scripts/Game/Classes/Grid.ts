import { Context2D } from "../../Boilerplate/Classes/Context2D";
import { GameBase } from "../../Boilerplate/Classes/GameBase";
import { Input } from "../../Boilerplate/Classes/Input";
import { Vector2 } from "../../Boilerplate/Classes/Vector2";
import { Align } from "../../Boilerplate/Enums/Align";
import { Fonts } from "../../Boilerplate/Enums/Fonts";
import { MouseButton } from "../../Boilerplate/Enums/MouseButton";
import { createMultidimensionalArray, randomInt } from "../../Boilerplate/Functions";
import { CellStates } from "../Enums/CellStates";
import { CellTypes } from "../Enums/CellTypes";
import { Upgrades } from "../Enums/Upgrades";
import { Camera } from "./Camera";
import { Colours } from "./Colours";
import { Points } from "./Points";
import { UpgradeManager } from "./UpgradeManager";

export class Grid {
    private cellValues: number[][];
    private cellTypes: CellTypes[][];
    private cellStates: CellStates[][];
    private width: number;
    private height: number;

    private cellUncover1Timer = 0;
    private cellUncover2Timer = 0;
    private cellUncover3Timer = 0;
    private cellUncover4Timer = 0;

    private flagger1Timer = 0;
    private flagger2Timer = 0;
    private flagger3Timer = 0;
    private flagger4Timer = 0;

    constructor(width: number, height: number) {
        this.cellValues = createMultidimensionalArray(width, height, 0);
        this.cellTypes = createMultidimensionalArray(width, height, CellTypes.Clear);
        this.cellStates = createMultidimensionalArray(width, height, CellStates.Covered);
        this.width = width;
        this.height = height;

        this.generateMines();

        this.calculateCellValues();

        this.revealFromCell(this.width / 2, this.height / 2)
    }

    update(camera: Camera, input: Input, points: Points, upgradeManager: UpgradeManager) {
        if (input.isReleased(MouseButton.Left) && !input.getHasLeftDownPositionChanged() && !input.getLeftUsed()) {
            const mousePos = new Vector2();
            mousePos.x = input.getX();
            mousePos.y = input.getY();
            const worldPos = camera.getCameraToWorldOffset(mousePos);
            const x = Math.round(worldPos.x / 64 - 0.5);
            const y = Math.round(worldPos.y / 64 - 0.5);

            if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
                if (this.cellTypes[x][y] === CellTypes.Clear && this.cellStates[x][y] === CellStates.Covered)
                    this.revealFromCell(x, y, points);
                else if (this.cellTypes[x][y] === CellTypes.Mine && this.cellStates[x][y] === CellStates.Covered) {
                    this.cellStates[x][y] = CellStates.Uncovered;
                    points.subtractPoints(points.getPoints());
                }
            }
        }
        else if (input.isReleased(MouseButton.Right) && !input.getRightUsed()) {
            const mousePos = new Vector2();
            mousePos.x = input.getX();
            mousePos.y = input.getY();
            const worldPos = camera.getCameraToWorldOffset(mousePos);
            const x = Math.round(worldPos.x / 64 - 0.5);
            const y = Math.round(worldPos.y / 64 - 0.5);

            if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
                if (this.cellTypes[x][y] === CellTypes.Mine && this.cellStates[x][y] === CellStates.Covered) {
                    this.cellStates[x][y] = CellStates.Flagged;
                    points.addPoints(20);
                }
                else if (this.cellTypes[x][y] === CellTypes.Clear && this.cellStates[x][y] === CellStates.Covered) {
                    this.cellStates[x][y] = CellStates.Uncovered;
                    this.revealFromCell(x, y);
                    points.subtractPoints(points.getPoints());
                }
            }
        }

        const flaggerSpeed = upgradeManager.getFlaggerSpeed();
        const revealerSpeed = upgradeManager.getRevealerSpeed();

        //TODO: refactor this thing so that multiple upgrades can be run more efficiently
        if (upgradeManager.isUpgradeUnlocked(Upgrades.Revealer1)) {
            if (this.cellUncover1Timer <= 0) {
                this.cellUncover1Timer += 1;

                this.runRevealerUpgrade(1, points);
            }

            this.cellUncover1Timer -= GameBase.updateTime * revealerSpeed;
        }
        if (upgradeManager.isUpgradeUnlocked(Upgrades.Revealer2)) {
            if (this.cellUncover2Timer <= 0) {
                this.cellUncover2Timer += 1;

                this.runRevealerUpgrade(2, points);
            }

            this.cellUncover2Timer -= GameBase.updateTime * revealerSpeed;
        }
        if (upgradeManager.isUpgradeUnlocked(Upgrades.Revealer3)) {
            if (this.cellUncover3Timer <= 0) {
                this.cellUncover3Timer += 1;

                this.runRevealerUpgrade(3, points);
            }

            this.cellUncover3Timer -= GameBase.updateTime * revealerSpeed;
        }
        if (upgradeManager.isUpgradeUnlocked(Upgrades.Revealer4)) {
            if (this.cellUncover4Timer <= 0) {
                this.cellUncover4Timer += 1;

                this.runRevealerUpgrade(4, points);
            }

            this.cellUncover4Timer -= GameBase.updateTime * revealerSpeed;
        }

        if (upgradeManager.isUpgradeUnlocked(Upgrades.Flagger1)) {
            if (this.flagger1Timer <= 0) {
                this.flagger1Timer += 1;

                this.runFlaggerUpgrade(1, points);
            }

            this.flagger1Timer -= GameBase.updateTime * flaggerSpeed;
        }

        if (upgradeManager.isUpgradeUnlocked(Upgrades.Flagger2)) {
            if (this.flagger2Timer <= 0) {
                this.flagger2Timer += 1;

                this.runFlaggerUpgrade(2, points);
            }

            this.flagger2Timer -= GameBase.updateTime * flaggerSpeed;
        }

        if (upgradeManager.isUpgradeUnlocked(Upgrades.Flagger3)) {
            if (this.flagger3Timer <= 0) {
                this.flagger3Timer += 1;

                this.runFlaggerUpgrade(3, points);
            }

            this.flagger3Timer -= GameBase.updateTime * flaggerSpeed;
        }

        if (upgradeManager.isUpgradeUnlocked(Upgrades.Flagger4)) {
            if (this.flagger4Timer <= 0) {
                this.flagger4Timer += 1;

                this.runFlaggerUpgrade(4, points);
            }

            this.flagger4Timer -= GameBase.updateTime * flaggerSpeed;
        }
    }

    draw(context: Context2D, camera: Camera) {
        const zoom = camera.getZoom();
        const position = new Vector2();
        let offset: Vector2;

        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                position.x = x * 64;
                position.y = y * 64;
                offset = camera.getWorldToCameraOffset(position);

                if (this.cellStates[x][y] === CellStates.Covered) {
                    context.drawBorderedRectangle(offset.x, offset.y, 64 * zoom, 64 * zoom, Colours.boxCovered, Colours.boxBorder);
                }
                else if (this.cellStates[x][y] === CellStates.Uncovered) {
                    context.drawBorderedRectangle(offset.x, offset.y, 64 * zoom, 64 * zoom, Colours.boxUncovered, Colours.boxBorder);

                    if (this.cellTypes[x][y] === CellTypes.Mine) {
                        context.drawFillRectangle(offset.x + 9 * zoom, offset.y + 9 * zoom, 46 * zoom, 46 * zoom, Colours.boxBomb);
                    }
                    else if (this.cellTypes[x][y] === CellTypes.Clear) {
                        const cellValue = this.cellValues[x][y];

                        if (cellValue !== 0)
                            context.drawString(cellValue.toString(), offset.x + 32 * zoom, offset.y + 32 * zoom, 48 * zoom, Fonts.Arial, Colours.magenta, Align.Center);
                    }
                }
                else if (this.cellStates[x][y] === CellStates.Flagged) {
                    context.drawBorderedRectangle(offset.x, offset.y, 64 * zoom, 64 * zoom, Colours.boxCovered, Colours.boxBorder);
                    context.drawFillRectangle(offset.x + 9 * zoom, offset.y + 9 * zoom, 46 * zoom, 46 * zoom, Colours.boxFlag);
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
        const mineAmount = 0.20;

        let minesLeft = Math.round(((this.width * this.height) - 16) * mineAmount);

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
            }
        }
    }

    revealFromCell(x: number, y: number, points?: Points) {
        const openCells: number[][] = [];
        const closedCells: number[][] = [];
        let totalPoints = 0;

        openCells.push([x, y]);

        while (openCells.length > 0) {
            const cell = openCells.pop();
            closedCells.push(cell);

            this.cellStates[cell[0]][cell[1]] = CellStates.Uncovered;

            totalPoints += this.cellValues[cell[0]][cell[1]] + 1;

            if (this.cellValues[cell[0]][cell[1]] === 0) {
                this.getSurroundingCells(cell[0], cell[1])
                    .filter(surroundingCell => closedCells
                        .every(closedCell => closedCell[0] !== surroundingCell[0] || closedCell[1] !== surroundingCell[1]))
                    .filter(surroundingCell => openCells
                        .every(openCell => openCell[0] !== surroundingCell[0] || openCell[1] !== surroundingCell[1]))
                    .forEach(surroundingCell => openCells.push(surroundingCell));
            }
        }

        if (points) {
            points.addPoints(totalPoints);
        }
    }

    getSurroundingCells(x: number, y: number) {
        let cells = [
            [x - 1, y - 1],
            [x - 1, y],
            [x - 1, y + 1],
            [x, y - 1],
            [x, y + 1],
            [x + 1, y - 1],
            [x + 1, y],
            [x + 1, y + 1],
        ];

        return cells.filter(cell => cell[0] >= 0 && cell[0] < this.width && cell[1] >= 0 && cell[1] < this.height);
    }

    runRevealerUpgrade(cellValue: number, points: Points) {
        //Get all cells have the cellValue, not a mine, and uncovered
        const uncovered: number[][] = [];
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                if (this.cellValues[x][y] === cellValue &&
                    this.cellTypes[x][y] === CellTypes.Clear &&
                    this.cellStates[x][y] === CellStates.Uncovered) {
                    uncovered.push([x, y]);
                }
            }
        }

        //Filter to cells that have the cellValue surrounding exploded or flagged mine
        const safe = uncovered.filter(c1 => this.getSurroundingCells(c1[0], c1[1])
            .filter(c2 => this.cellTypes[c2[0]][c2[1]] === CellTypes.Mine &&
                (this.cellStates[c2[0]][c2[1]] === CellStates.Flagged ||
                    this.cellStates[c2[0]][c2[1]] === CellStates.Uncovered)).length === cellValue);

        //Get the cells around the safe cell that are covered
        const covered = safe.map(c1 => this.getSurroundingCells(c1[0], c1[1])
            .filter(c2 => this.cellTypes[c2[0]][c2[1]] === CellTypes.Clear &&
                this.cellStates[c2[0]][c2[1]] === CellStates.Covered))
            .reduce((a, b) => a.concat(b));

        //Pick one at random and reveal it (might need filtering to unique cells)
        if (covered.length > 0) {
            const random = covered[randomInt(0, covered.length - 1)];

            this.revealFromCell(random[0], random[1], points);
        }
    }

    runFlaggerUpgrade(cellValue: number, points: Points) {
        //Get all cells have the cellValue, not a mine, and uncovered
        const uncovered: number[][] = [];
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                if (this.cellValues[x][y] === cellValue &&
                    this.cellTypes[x][y] === CellTypes.Clear &&
                    this.cellStates[x][y] === CellStates.Uncovered) {
                    uncovered.push([x, y]);
                }
            }
        }

        //Filter to cells that have the cellValue or less covered surrounding cells
        const safe = uncovered.filter(c1 => this.getSurroundingCells(c1[0], c1[1])
            .filter(c2 => this.cellStates[c2[0]][c2[1]] === CellStates.Covered ||
                this.cellStates[c2[0]][c2[1]] === CellStates.Flagged).length <= cellValue);

        //Get the cells around the safe cell that are covered
        const covered = safe.map(c1 => this.getSurroundingCells(c1[0], c1[1])
            .filter(c2 => this.cellStates[c2[0]][c2[1]] === CellStates.Covered))
            .reduce((a, b) => a.concat(b));

        //Pick one at random and flag it (might need filtering to unique cells)
        if (covered.length > 0) {
            const random = covered[randomInt(0, covered.length - 1)];

            this.cellStates[random[0]][random[1]] = CellStates.Flagged;
            points.addPoints(20);
        }
    }
}
