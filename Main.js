var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("Boilerplate/Enums/Align", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Align = void 0;
    var Align;
    (function (Align) {
        Align[Align["Default"] = 0] = "Default";
        Align[Align["TopLeft"] = 1] = "TopLeft";
        Align[Align["Top"] = 2] = "Top";
        Align[Align["TopRight"] = 3] = "TopRight";
        Align[Align["Left"] = 4] = "Left";
        Align[Align["Center"] = 5] = "Center";
        Align[Align["Right"] = 6] = "Right";
        Align[Align["BottomLeft"] = 7] = "BottomLeft";
        Align[Align["Bottom"] = 8] = "Bottom";
        Align[Align["BottomRight"] = 9] = "BottomRight";
    })(Align = exports.Align || (exports.Align = {}));
});
define("Boilerplate/Enums/Fonts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Fonts = void 0;
    var Fonts;
    (function (Fonts) {
        Fonts["Arial"] = "Arial";
        Fonts["LucidaConsole"] = "Lucida Console";
    })(Fonts = exports.Fonts || (exports.Fonts = {}));
});
define("Boilerplate/Classes/Colour", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Colour = void 0;
    var Colour = /** @class */ (function () {
        function Colour(r, g, b) {
            this.r = this.boundValue(r);
            this.g = this.boundValue(g);
            this.b = this.boundValue(b);
            this.setHexString();
        }
        Colour.prototype.getR = function () { return this.r; };
        Colour.prototype.getG = function () { return this.g; };
        Colour.prototype.getB = function () { return this.b; };
        Colour.prototype.getHexString = function () { return this.hexString; };
        Colour.prototype.setHexString = function () {
            var rHex = this.r.toString(16);
            var gHex = this.g.toString(16);
            var bHex = this.b.toString(16);
            this.hexString = '#';
            if (rHex.length === 1)
                this.hexString += '0';
            this.hexString += rHex;
            if (gHex.length === 1)
                this.hexString += '0';
            this.hexString += gHex;
            if (bHex.length === 1)
                this.hexString += '0';
            this.hexString += bHex;
        };
        Colour.prototype.boundValue = function (value) {
            if (value < 0)
                return 0;
            if (value > 255)
                return 255;
            return value;
        };
        return Colour;
    }());
    exports.Colour = Colour;
});
define("Boilerplate/Classes/Context2D", ["require", "exports", "Boilerplate/Enums/Align"], function (require, exports, Align_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    HTMLCanvasElement.prototype.getContext2D = function () {
        return this.getContext('2d');
    };
    CanvasRenderingContext2D.prototype.drawString = function (text, x, y, size, font, colour, align) {
        this.fillStyle = colour.getHexString();
        this.font = size + "px " + font;
        if (align === Align_1.Align.Bottom
            || align === Align_1.Align.BottomLeft
            || align === Align_1.Align.BottomRight)
            this.textBaseline = "bottom";
        else if (align === Align_1.Align.Top
            || align === Align_1.Align.TopLeft
            || align === Align_1.Align.TopRight)
            this.textBaseline = "top";
        else
            this.textBaseline = "middle";
        if (align === Align_1.Align.Left
            || align === Align_1.Align.TopLeft
            || align === Align_1.Align.BottomLeft)
            this.textAlign = "left";
        else if (align === Align_1.Align.Right
            || align === Align_1.Align.TopRight
            || align === Align_1.Align.BottomRight)
            this.textAlign = "right";
        else
            this.textAlign = "center";
        this.fillText(text, x, y);
    };
    CanvasRenderingContext2D.prototype.measureString = function (text, size, font) {
        this.font = size + "px " + font;
        return this.measureText(text);
    };
    CanvasRenderingContext2D.prototype.drawFillRectangle = function (x, y, w, h, colour) {
        this.fillStyle = colour.getHexString();
        this.fillRect(x, y, w, h);
    };
    CanvasRenderingContext2D.prototype.drawStrokeRectangle = function (x, y, w, h, colour, lineWidth) {
        if (lineWidth === void 0) { lineWidth = 2; }
        this.strokeStyle = colour.getHexString();
        this.lineWidth = lineWidth;
        this.strokeRect(x, y, w, h);
    };
    CanvasRenderingContext2D.prototype.drawBorderedRectangle = function (x, y, w, h, fillColour, borderColour, lineWidth) {
        if (lineWidth === void 0) { lineWidth = 2; }
        this.drawFillRectangle(x, y, w, h, fillColour);
        this.drawStrokeRectangle(x, y, w, h, borderColour, lineWidth);
    };
});
define("Boilerplate/Classes/MouseState", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MouseState = void 0;
    var MouseState = /** @class */ (function () {
        function MouseState(x, y, left, right) {
            this.x = x;
            this.y = y;
            this.left = left;
            this.right = right;
        }
        return MouseState;
    }());
    exports.MouseState = MouseState;
});
define("Boilerplate/Enums/MouseButton", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MouseButton = void 0;
    var MouseButton;
    (function (MouseButton) {
        MouseButton[MouseButton["Left"] = 0] = "Left";
        MouseButton[MouseButton["Middle"] = 1] = "Middle";
        MouseButton[MouseButton["Right"] = 2] = "Right";
        MouseButton[MouseButton["Back"] = 3] = "Back";
        MouseButton[MouseButton["Forward"] = 4] = "Forward";
    })(MouseButton = exports.MouseButton || (exports.MouseButton = {}));
});
define("Boilerplate/Classes/Vector2", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Vector2 = void 0;
    var Vector2 = /** @class */ (function () {
        function Vector2() {
        }
        return Vector2;
    }());
    exports.Vector2 = Vector2;
});
define("Boilerplate/Classes/Input", ["require", "exports", "Boilerplate/Classes/MouseState", "Boilerplate/Enums/MouseButton", "Boilerplate/Classes/Vector2"], function (require, exports, MouseState_1, MouseButton_1, Vector2_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Input = void 0;
    var Input = /** @class */ (function () {
        function Input(canvas) {
            var _this = this;
            this.leftUsed = false;
            this.rightUsed = false;
            this.leftDownPosition = new Vector2_1.Vector2();
            this.rightDownPosition = new Vector2_1.Vector2();
            this.mouseStickiness = 32; //TODO: tweak this
            this.previousMouseState = new MouseState_1.MouseState(0, 0, false, false);
            this.currentMouseState = new MouseState_1.MouseState(0, 0, false, false);
            this.runningMouseState = new MouseState_1.MouseState(0, 0, false, false);
            canvas.addEventListener('mousedown', function (event) {
                if (event.button === MouseButton_1.MouseButton.Left) {
                    _this.runningMouseState.left = true;
                    _this.leftDownPosition.x = _this.runningMouseState.x;
                    _this.leftDownPosition.y = _this.runningMouseState.y;
                }
                else if (event.button === MouseButton_1.MouseButton.Right)
                    _this.runningMouseState.right = true;
                _this.rightDownPosition.x = _this.runningMouseState.x;
                _this.rightDownPosition.y = _this.runningMouseState.y;
            });
            canvas.addEventListener('mouseup', function (event) {
                if (event.button === MouseButton_1.MouseButton.Left) {
                    _this.runningMouseState.left = false;
                    _this.leftUsed = false;
                }
                else if (event.button === MouseButton_1.MouseButton.Right) {
                    _this.runningMouseState.right = false;
                    _this.rightUsed = false;
                }
            });
            canvas.addEventListener('mousemove', function (event) {
                var target = event.currentTarget;
                var rect = target.getBoundingClientRect();
                _this.runningMouseState.x = event.clientX - rect.left;
                _this.runningMouseState.y = event.clientY - rect.top;
            });
            canvas.addEventListener('contextmenu', function (event) { return event.preventDefault(); });
        }
        Input.prototype.update = function () {
            this.previousMouseState = this.currentMouseState;
            this.currentMouseState = new MouseState_1.MouseState(this.runningMouseState.x, this.runningMouseState.y, this.runningMouseState.left, this.runningMouseState.right);
        };
        Input.prototype.getX = function () {
            return this.currentMouseState.x;
        };
        Input.prototype.getY = function () {
            return this.currentMouseState.y;
        };
        Input.prototype.getChangeX = function () {
            return this.currentMouseState.x - this.previousMouseState.x;
        };
        Input.prototype.getChangeY = function () {
            return this.currentMouseState.y - this.previousMouseState.y;
        };
        Input.prototype.getHasPositionChanged = function () {
            return Math.abs(this.getChangeX()) > this.mouseStickiness
                || Math.abs(this.getChangeY()) > this.mouseStickiness;
        };
        Input.prototype.getLeftUsed = function () {
            return this.leftUsed;
        };
        Input.prototype.getRightUsed = function () {
            return this.rightUsed;
        };
        Input.prototype.setLeftUsed = function () {
            this.leftUsed = true;
        };
        Input.prototype.setRightUsed = function () {
            this.rightUsed = true;
        };
        Input.prototype.getLeftDownPosition = function () {
            return this.leftDownPosition;
        };
        Input.prototype.getRightDownPosition = function () {
            return this.rightDownPosition;
        };
        Input.prototype.getHasLeftDownPositionChanged = function () {
            return Math.abs(this.leftDownPosition.x - this.currentMouseState.x) > this.mouseStickiness
                || Math.abs(this.leftDownPosition.y - this.currentMouseState.y) > this.mouseStickiness;
        };
        Input.prototype.getHasRightDownPositionChanged = function () {
            return this.rightDownPosition.x !== this.currentMouseState.x
                || this.rightDownPosition.y !== this.currentMouseState.y;
        };
        Input.prototype.isUp = function (mouseButton) {
            if (mouseButton === MouseButton_1.MouseButton.Left)
                return !this.currentMouseState.left;
            if (mouseButton === MouseButton_1.MouseButton.Right)
                return !this.currentMouseState.right;
            return false;
        };
        Input.prototype.isDown = function (mouseButton) {
            if (mouseButton === MouseButton_1.MouseButton.Left)
                return this.currentMouseState.left;
            if (mouseButton === MouseButton_1.MouseButton.Right)
                return this.currentMouseState.right;
            return false;
        };
        Input.prototype.isClicked = function (mouseButton) {
            if (mouseButton === MouseButton_1.MouseButton.Left)
                return this.currentMouseState.left && !this.previousMouseState.left;
            if (mouseButton === MouseButton_1.MouseButton.Right)
                return this.currentMouseState.right && !this.previousMouseState.right;
            return false;
        };
        Input.prototype.isReleased = function (mouseButton) {
            if (mouseButton === MouseButton_1.MouseButton.Left)
                return !this.currentMouseState.left && this.previousMouseState.left;
            if (mouseButton === MouseButton_1.MouseButton.Right)
                return !this.currentMouseState.right && this.previousMouseState.right;
            return false;
        };
        return Input;
    }());
    exports.Input = Input;
});
define("Boilerplate/Functions", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.randomInt = exports.createMultidimensionalArray = exports.pointWithinRectangle = void 0;
    function pointWithinRectangle(px, py, rx, ry, rw, rh) {
        return px >= rx
            && px <= rx + rw
            && py >= ry
            && py <= ry + rh;
    }
    exports.pointWithinRectangle = pointWithinRectangle;
    function createMultidimensionalArray(width, height, defaultValue) {
        var multiArray = [];
        for (var x = 0; x < width; x++) {
            var array = [];
            for (var y = 0; y < height; y++) {
                array.push(defaultValue);
            }
            multiArray.push(array);
        }
        return multiArray;
    }
    exports.createMultidimensionalArray = createMultidimensionalArray;
    function randomInt(lower, upper) {
        var difference = (upper + 1) - lower;
        var random = Math.random() * difference;
        return Math.ceil(random + lower) - 1;
    }
    exports.randomInt = randomInt;
});
define("Game/Enums/CellStates", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CellStates = void 0;
    var CellStates;
    (function (CellStates) {
        CellStates[CellStates["Covered"] = 1] = "Covered";
        CellStates[CellStates["Uncovered"] = 2] = "Uncovered";
        CellStates[CellStates["Flagged"] = 3] = "Flagged";
    })(CellStates = exports.CellStates || (exports.CellStates = {}));
});
define("Game/Enums/CellTypes", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CellTypes = void 0;
    var CellTypes;
    (function (CellTypes) {
        CellTypes[CellTypes["Clear"] = 1] = "Clear";
        CellTypes[CellTypes["Mine"] = 2] = "Mine";
    })(CellTypes = exports.CellTypes || (exports.CellTypes = {}));
});
define("Game/Classes/Camera", ["require", "exports", "Boilerplate/Classes/Vector2", "Boilerplate/Enums/MouseButton"], function (require, exports, Vector2_2, MouseButton_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Camera = void 0;
    var Camera = /** @class */ (function () {
        function Camera() {
            this.cameraStuck = true;
        }
        Camera.prototype.getWorldToCameraOffset = function (position) {
            var offset = new Vector2_2.Vector2();
            offset.x = position.x - this.position.x;
            offset.y = position.y - this.position.y;
            return offset;
        };
        Camera.prototype.getCameraToWorldOffset = function (position) {
            var offset = new Vector2_2.Vector2();
            offset.x = position.x + this.position.x;
            offset.y = position.y + this.position.y;
            return offset;
        };
        Camera.prototype.update = function (input) {
            if (input.isDown(MouseButton_2.MouseButton.Left) && (!this.cameraStuck || input.getHasLeftDownPositionChanged())) {
                this.position.x -= input.getChangeX();
                this.position.y -= input.getChangeY();
                this.cameraStuck = false;
            }
            else {
                this.cameraStuck = true;
            }
        };
        return Camera;
    }());
    exports.Camera = Camera;
});
define("Game/Classes/Colours", ["require", "exports", "Boilerplate/Classes/Colour"], function (require, exports, Colour_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Colours = void 0;
    var Colours = /** @class */ (function () {
        function Colours() {
        }
        Colours.red = new Colour_1.Colour(255, 0, 0);
        Colours.yellow = new Colour_1.Colour(255, 255, 0);
        Colours.green = new Colour_1.Colour(0, 255, 0);
        Colours.cyan = new Colour_1.Colour(0, 255, 255);
        Colours.blue = new Colour_1.Colour(0, 0, 255);
        Colours.magenta = new Colour_1.Colour(255, 0, 255);
        Colours.boxBorderColour = new Colour_1.Colour(16, 16, 16);
        Colours.boxCoveredColour = new Colour_1.Colour(48, 48, 48);
        Colours.boxUncoveredColour = new Colour_1.Colour(80, 80, 80);
        Colours.boxBombColour = new Colour_1.Colour(240, 80, 80);
        return Colours;
    }());
    exports.Colours = Colours;
});
define("Game/Classes/Points", ["require", "exports", "Boilerplate/Enums/Align", "Boilerplate/Enums/Fonts", "Game/Classes/Colours"], function (require, exports, Align_2, Fonts_1, Colours_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Points = void 0;
    var Points = /** @class */ (function () {
        function Points() {
            this.points = 0;
        }
        Points.prototype.draw = function (context) {
            var pointsText = "Points: " + this.points;
            var measurement = context.measureString(pointsText, 30, Fonts_1.Fonts.Arial);
            var rectX = 20;
            var rectY = context.canvas.height - 70;
            var rectW = measurement.width + 20;
            var rectH = 50;
            context.drawBorderedRectangle(20, context.canvas.height - (20 + 50), measurement.width + 20, 50, Colours_1.Colours.boxUncoveredColour, Colours_1.Colours.boxBorderColour);
            context.drawString(pointsText, rectX + rectW / 2, rectY + rectH / 2, 30, Fonts_1.Fonts.Arial, Colours_1.Colours.boxBorderColour, Align_2.Align.Center);
        };
        return Points;
    }());
    exports.Points = Points;
});
define("Game/Classes/Grid", ["require", "exports", "Boilerplate/Classes/Vector2", "Boilerplate/Enums/Align", "Boilerplate/Enums/Fonts", "Boilerplate/Enums/MouseButton", "Boilerplate/Functions", "Game/Enums/CellStates", "Game/Enums/CellTypes", "Game/Classes/Colours"], function (require, exports, Vector2_3, Align_3, Fonts_2, MouseButton_3, Functions_1, CellStates_1, CellTypes_1, Colours_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Grid = void 0;
    var Grid = /** @class */ (function () {
        function Grid(width, height) {
            this.cellValues = Functions_1.createMultidimensionalArray(width, height, 0);
            this.cellTypes = Functions_1.createMultidimensionalArray(width, height, CellTypes_1.CellTypes.Clear);
            this.cellStates = Functions_1.createMultidimensionalArray(width, height, CellStates_1.CellStates.Covered);
            this.width = width;
            this.height = height;
            this.cellTypes[4][4] = CellTypes_1.CellTypes.Mine;
            this.generateMines();
            this.calculateCellValues();
        }
        Grid.prototype.update = function (camera, input, points) {
            if (input.isReleased(MouseButton_3.MouseButton.Left) && !input.getHasLeftDownPositionChanged() && !input.getLeftUsed()) {
                var mousePos = new Vector2_3.Vector2();
                mousePos.x = input.getX();
                mousePos.y = input.getY();
                var worldPos = camera.getCameraToWorldOffset(mousePos);
                var x = Number.parseInt((worldPos.x / 64 - 0.5).toFixed(0));
                var y = Number.parseInt((worldPos.y / 64 - 0.5).toFixed(0));
                if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
                    this.cellStates[x][y] = CellStates_1.CellStates.Uncovered;
                    if (this.cellTypes[x][y] === CellTypes_1.CellTypes.Clear)
                        points.points += 1 + this.cellValues[x][y];
                }
            }
        };
        Grid.prototype.draw = function (context, camera) {
            var position = new Vector2_3.Vector2();
            var offset;
            for (var x = 0; x < this.width; x++) {
                for (var y = 0; y < this.height; y++) {
                    position.x = x * 64;
                    position.y = y * 64;
                    offset = camera.getWorldToCameraOffset(position);
                    if (this.cellStates[x][y] === CellStates_1.CellStates.Covered) {
                        context.drawBorderedRectangle(offset.x, offset.y, 64, 64, Colours_2.Colours.boxCoveredColour, Colours_2.Colours.boxBorderColour);
                    }
                    else if (this.cellStates[x][y] === CellStates_1.CellStates.Uncovered) {
                        context.drawBorderedRectangle(offset.x, offset.y, 64, 64, Colours_2.Colours.boxUncoveredColour, Colours_2.Colours.boxBorderColour);
                        if (this.cellTypes[x][y] === CellTypes_1.CellTypes.Mine) {
                            context.drawFillRectangle(offset.x + 9, offset.y + 9, 46, 46, Colours_2.Colours.boxBombColour);
                        }
                        else if (this.cellTypes[x][y] === CellTypes_1.CellTypes.Clear) {
                            var cellValue = this.cellValues[x][y];
                            if (cellValue !== 0)
                                context.drawString(cellValue.toString(), offset.x + 32, offset.y + 32, 30, Fonts_2.Fonts.Arial, Colours_2.Colours.magenta, Align_3.Align.Center);
                        }
                    }
                }
            }
        };
        Grid.prototype.calculateCellValues = function () {
            for (var x = 0; x < this.width; x++) {
                for (var y = 0; y < this.height; y++) {
                    this.cellValues[x][y] = this.getCellValue(x, y);
                }
            }
        };
        Grid.prototype.getCellValue = function (x, y) {
            var _this = this;
            var checkCells = [
                [x - 1, y - 1],
                [x - 1, y],
                [x - 1, y + 1],
                [x, y - 1],
                [x, y + 1],
                [x + 1, y - 1],
                [x + 1, y],
                [x + 1, y + 1],
            ];
            return checkCells.map(function (x) { return _this.cellIsMine(x[0], x[1]); }).filter(function (x) { return x === true; }).length;
        };
        Grid.prototype.cellIsMine = function (x, y) {
            if (x < 0 || x >= this.width || y < 0 || y > this.height)
                return false;
            return this.cellTypes[x][y] === CellTypes_1.CellTypes.Mine;
        };
        Grid.prototype.generateMines = function () {
            var minesLeft = 150;
            for (var x = this.width / 2 - 2; x < this.width / 2 + 2; x++) {
                for (var y = this.height / 2 - 2; y < this.height / 2 + 2; y++) {
                    this.cellTypes[x][y] = CellTypes_1.CellTypes.Mine;
                }
            }
            while (minesLeft > 0) {
                var x = Functions_1.randomInt(0, this.width - 1);
                var y = Functions_1.randomInt(0, this.height - 1);
                if (this.cellTypes[x][y] !== CellTypes_1.CellTypes.Mine) {
                    this.cellTypes[x][y] = CellTypes_1.CellTypes.Mine;
                    minesLeft--;
                }
            }
            for (var x = this.width / 2 - 2; x < this.width / 2 + 2; x++) {
                for (var y = this.height / 2 - 2; y < this.height / 2 + 2; y++) {
                    this.cellTypes[x][y] = CellTypes_1.CellTypes.Clear;
                    this.cellStates[x][y] = CellStates_1.CellStates.Uncovered;
                }
            }
        };
        return Grid;
    }());
    exports.Grid = Grid;
});
define("Boilerplate/Classes/GameBase", ["require", "exports", "Boilerplate/Classes/Input"], function (require, exports, Input_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GameBase = void 0;
    var GameBase = /** @class */ (function () {
        function GameBase() {
            var _this = this;
            this.updateInterval = 1000 / 60;
            this.drawInterval = 1000 / 60;
            this.canvas = document.getElementById('gameCanvas');
            this.context = this.canvas.getContext2D();
            this.input = new Input_1.Input(this.canvas);
            this.updateWindowSize();
            window.addEventListener('resize', function () { return _this.updateWindowSize(); });
        }
        GameBase.prototype.run = function () {
            this.initialize();
            this.startUpdating();
            this.startDrawing();
        };
        GameBase.prototype.baseUpdate = function () {
            this.input.update();
            this.update();
        };
        GameBase.prototype.baseDraw = function () {
            this.context.clearRect(0, 0, this.windowWidth, this.windowHeight);
            this.draw();
        };
        GameBase.prototype.startUpdating = function () {
            var _this = this;
            setInterval(function () { return _this.baseUpdate(); }, this.updateInterval);
        };
        GameBase.prototype.startDrawing = function () {
            var _this = this;
            setInterval(function () { return _this.baseDraw(); }, this.drawInterval);
        };
        GameBase.prototype.updateWindowSize = function () {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.windowWidth = window.innerWidth;
            this.windowHeight = window.innerHeight;
        };
        return GameBase;
    }());
    exports.GameBase = GameBase;
});
define("Game/Classes/Game", ["require", "exports", "Game/Classes/Grid", "Game/Classes/Camera", "Boilerplate/Classes/Vector2", "Boilerplate/Classes/GameBase", "Game/Classes/Points"], function (require, exports, Grid_1, Camera_1, Vector2_4, GameBase_1, Points_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Game = void 0;
    var Game = /** @class */ (function (_super) {
        __extends(Game, _super);
        function Game() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Game.prototype.initialize = function () {
            this.grid = new Grid_1.Grid(32, 32);
            this.camera = new Camera_1.Camera();
            this.camera.position = new Vector2_4.Vector2();
            this.camera.position.x = -100;
            this.camera.position.y = -50;
            this.points = new Points_1.Points();
        };
        Game.prototype.update = function () {
            this.camera.update(this.input);
            this.grid.update(this.camera, this.input, this.points);
        };
        Game.prototype.draw = function () {
            this.grid.draw(this.context, this.camera);
            this.points.draw(this.context);
        };
        return Game;
    }(GameBase_1.GameBase));
    exports.Game = Game;
});
define("Main", ["require", "exports", "Game/Classes/Game", "Boilerplate/Classes/Context2D"], function (require, exports, Game_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var game = new Game_1.Game();
    game.run();
});
//Copied from old project, sort out if it is needed in the future
var ImageNames;
(function (ImageNames) {
    ImageNames["Test"] = "test";
})(ImageNames || (ImageNames = {}));
function setupImages() {
    var imageDiv = document.getElementById('images');
    for (var imageName in ImageNames) {
        var image = new Image();
        image.src = 'images/' + ImageNames[imageName] + '.png';
        imageDiv.append(image);
        images[ImageNames[imageName]] = image;
    }
}
var images = {};
//class Tooltip {
//    constructor(
//        public title: string,
//        public text: string,
//        public x: number,
//        public y: number,
//        public cost: number = null,
//    ) { }
//    draw(context: Context) {
//        const height = this.getHeight();
//        const top = this.getTop();
//        const width = this.getWidth(context);
//        context.drawRect(this.x, top, width, height, game.colours.background, true);
//        context.drawRect(this.x, top, width, height, game.colours.boxNormal, false);
//        context.drawString(this.title, this.x + 5, top + 30, 30, game.fonts.default, game.colours.textNormal, Align.Default);
//        context.drawString(this.text, this.x + 5, top + 55, 22, game.fonts.default, game.colours.textNormal, Align.Default);
//        if (this.cost != null) {
//            context.drawString(this.getCostPrefix(), this.x + 5, top + 80, 22, game.fonts.default, game.colours.textNormal, Align.Default);
//            context.drawString(this.cost.toString(), this.x + 5 + this.getCostPrefixWidth(context), top + 80, 22,
//                game.fonts.default, this.cost <= game.points.points ? game.colours.textGood : game.colours.textBad, Align.Default);
//        }
//    }
//    getHeight() {
//        return this.cost == null ? 60 : 90;
//    }
//    getTop() {
//        return this.y - this.getHeight();
//    }
//    getCostPrefix() {
//        return 'Cost: ';
//    }
//    getCostPrefixWidth(context: Context) {
//        return context.measureText(this.getCostPrefix()).width;
//    }
//    getWidth(context: Context) {
//        const titleWidth = context.measureString(this.title, 30, game.fonts.default).width;
//        const textWidth = context.measureString(this.text, 22, game.fonts.default).width;
//        if (this.cost == null) {
//            return Math.max(titleWidth, textWidth) + 10;
//        }
//        const costWidth = context.measureString(this.getCostPrefix() + this.cost.toString(), 22, game.fonts.default).width;
//        return Math.max(titleWidth, textWidth, costWidth) + 10;
//    }
//}
//# sourceMappingURL=Main.js.map