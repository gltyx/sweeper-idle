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
        this.setFont(font, size);
        this.setAlign(align);
        this.fillText(text, x, y);
    };
    CanvasRenderingContext2D.prototype.measureString = function (text, size, font, align) {
        this.setFont(font, size);
        this.setAlign(align);
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
    CanvasRenderingContext2D.prototype.setAlign = function (align) {
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
    };
    CanvasRenderingContext2D.prototype.setFont = function (font, size) {
        this.font = size + "px " + font;
    };
});
define("Boilerplate/Enums/Scroll", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Scroll = void 0;
    var Scroll;
    (function (Scroll) {
        Scroll[Scroll["None"] = 1] = "None";
        Scroll[Scroll["Up"] = 2] = "Up";
        Scroll[Scroll["Down"] = 3] = "Down";
    })(Scroll = exports.Scroll || (exports.Scroll = {}));
});
define("Boilerplate/Classes/MouseState", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MouseState = void 0;
    var MouseState = /** @class */ (function () {
        function MouseState(x, y, left, right, scroll) {
            this.x = x;
            this.y = y;
            this.left = left;
            this.right = right;
            this.scroll = scroll;
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
define("Boilerplate/Classes/Input", ["require", "exports", "Boilerplate/Classes/MouseState", "Boilerplate/Enums/MouseButton", "Boilerplate/Classes/Vector2", "Boilerplate/Enums/Scroll"], function (require, exports, MouseState_1, MouseButton_1, Vector2_1, Scroll_1) {
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
            this.previousMouseState = new MouseState_1.MouseState(0, 0, false, false, Scroll_1.Scroll.None);
            this.currentMouseState = new MouseState_1.MouseState(0, 0, false, false, Scroll_1.Scroll.None);
            this.runningMouseState = new MouseState_1.MouseState(0, 0, false, false, Scroll_1.Scroll.None);
            canvas.addEventListener('mousedown', function (event) {
                if (event.button === MouseButton_1.MouseButton.Left) {
                    _this.runningMouseState.left = true;
                    _this.leftDownPosition.x = _this.runningMouseState.x;
                    _this.leftDownPosition.y = _this.runningMouseState.y;
                }
                else if (event.button === MouseButton_1.MouseButton.Right) {
                    _this.runningMouseState.right = true;
                    _this.rightDownPosition.x = _this.runningMouseState.x;
                    _this.rightDownPosition.y = _this.runningMouseState.y;
                }
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
            canvas.addEventListener('wheel', function (event) {
                if (event.deltaY < 0)
                    _this.runningMouseState.scroll = Scroll_1.Scroll.Up;
                else if (event.deltaY > 0)
                    _this.runningMouseState.scroll = Scroll_1.Scroll.Down;
            });
        }
        Input.prototype.update = function () {
            this.previousMouseState = this.currentMouseState;
            this.currentMouseState = new MouseState_1.MouseState(this.runningMouseState.x, this.runningMouseState.y, this.runningMouseState.left, this.runningMouseState.right, this.runningMouseState.scroll);
            this.runningMouseState.scroll = Scroll_1.Scroll.None;
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
        Input.prototype.getScroll = function () {
            return this.currentMouseState.scroll;
        };
        return Input;
    }());
    exports.Input = Input;
});
define("Boilerplate/Classes/GameBase", ["require", "exports", "Boilerplate/Classes/Input"], function (require, exports, Input_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GameBase = void 0;
    var GameBase = /** @class */ (function () {
        function GameBase() {
            var _this = this;
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
            setInterval(function () { return _this.baseUpdate(); }, GameBase.updateInterval);
        };
        GameBase.prototype.startDrawing = function () {
            var _this = this;
            setInterval(function () { return _this.baseDraw(); }, GameBase.drawInterval);
        };
        GameBase.prototype.updateWindowSize = function () {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.windowWidth = window.innerWidth;
            this.windowHeight = window.innerHeight;
        };
        GameBase.updatesPerSecond = 60;
        GameBase.drawsPerSecond = 60;
        GameBase.updateInterval = 1000 / 60;
        GameBase.drawInterval = 1000 / 60;
        GameBase.updateTime = 1 / 60;
        GameBase.drawTime = 1 / 60;
        return GameBase;
    }());
    exports.GameBase = GameBase;
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
define("Game/Enums/Upgrades", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Upgrades = void 0;
    var Upgrades;
    (function (Upgrades) {
        Upgrades[Upgrades["Revealer1"] = 1] = "Revealer1";
        Upgrades[Upgrades["Revealer2"] = 2] = "Revealer2";
        Upgrades[Upgrades["Revealer3"] = 3] = "Revealer3";
        Upgrades[Upgrades["Revealer4"] = 4] = "Revealer4";
        Upgrades[Upgrades["Flagger1"] = 5] = "Flagger1";
        Upgrades[Upgrades["Flagger2"] = 6] = "Flagger2";
        Upgrades[Upgrades["Flagger3"] = 7] = "Flagger3";
        Upgrades[Upgrades["Flagger4"] = 8] = "Flagger4";
        Upgrades[Upgrades["RevealerSpeed1"] = 9] = "RevealerSpeed1";
        Upgrades[Upgrades["RevealerSpeed2"] = 10] = "RevealerSpeed2";
        Upgrades[Upgrades["RevealerSpeed3"] = 11] = "RevealerSpeed3";
        Upgrades[Upgrades["RevealerSpeed4"] = 12] = "RevealerSpeed4";
        Upgrades[Upgrades["FlaggerSpeed1"] = 13] = "FlaggerSpeed1";
        Upgrades[Upgrades["FlaggerSpeed2"] = 14] = "FlaggerSpeed2";
        Upgrades[Upgrades["FlaggerSpeed3"] = 15] = "FlaggerSpeed3";
        Upgrades[Upgrades["FlaggerSpeed4"] = 16] = "FlaggerSpeed4";
    })(Upgrades = exports.Upgrades || (exports.Upgrades = {}));
});
define("Game/Classes/Camera", ["require", "exports", "Boilerplate/Classes/Vector2", "Boilerplate/Enums/MouseButton", "Boilerplate/Enums/Scroll"], function (require, exports, Vector2_2, MouseButton_2, Scroll_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Camera = void 0;
    var Camera = /** @class */ (function () {
        function Camera() {
            this.position = new Vector2_2.Vector2();
            this.zoomLevel = 2;
            this.zoomLevels = [0.5, 0.75, 1, 1.5, 2, 3];
            this.cameraStuck = true;
            this.updateZoom();
        }
        Camera.prototype.getWorldToCameraOffset = function (position) {
            var offset = new Vector2_2.Vector2();
            offset.x = (position.x - this.position.x) * this.zoom;
            offset.y = (position.y - this.position.y) * this.zoom;
            return offset;
        };
        Camera.prototype.getCameraToWorldOffset = function (position) {
            var offset = new Vector2_2.Vector2();
            offset.x = this.position.x + position.x / this.zoom;
            offset.y = this.position.y + position.y / this.zoom;
            return offset;
        };
        Camera.prototype.update = function (input) {
            if (input.isDown(MouseButton_2.MouseButton.Left) && (!this.cameraStuck || input.getHasLeftDownPositionChanged())) {
                this.position.x -= input.getChangeX() / this.zoom;
                this.position.y -= input.getChangeY() / this.zoom;
                this.cameraStuck = false;
            }
            else {
                this.cameraStuck = true;
            }
            var scroll = input.getScroll();
            if (scroll === Scroll_2.Scroll.Up) {
                this.zoomLevel = Math.min(this.zoomLevel + 1, this.zoomLevels.length - 1);
            }
            else if (scroll === Scroll_2.Scroll.Down) {
                this.zoomLevel = Math.max(this.zoomLevel - 1, 0);
            }
            if (scroll !== Scroll_2.Scroll.None) {
                var screenPosition = new Vector2_2.Vector2();
                screenPosition.x = input.getX();
                screenPosition.y = input.getY();
                var worldPosition = this.getCameraToWorldOffset(screenPosition);
                this.updateZoom();
                this.alignScreenAndWorld(screenPosition, worldPosition);
            }
        };
        Camera.prototype.centerOnPosition = function (position, canvas) {
            this.position.x = position.x - (canvas.width / 2 / this.zoom);
            this.position.y = position.y - (canvas.height / 2 / this.zoom);
        };
        Camera.prototype.alignScreenAndWorld = function (screenPosition, worldPosition) {
            this.position.x = -((screenPosition.x / this.zoom) - worldPosition.x);
            this.position.y = -((screenPosition.y / this.zoom) - worldPosition.y);
        };
        Camera.prototype.updateZoom = function () {
            this.zoom = this.zoomLevels[this.zoomLevel];
        };
        Camera.prototype.getZoom = function () {
            return this.zoom;
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
        Colours.background = new Colour_1.Colour(64, 64, 64);
        Colours.boxBorder = new Colour_1.Colour(16, 16, 16);
        Colours.boxCovered = new Colour_1.Colour(48, 48, 48);
        Colours.boxUncovered = new Colour_1.Colour(80, 80, 80);
        Colours.boxBomb = new Colour_1.Colour(240, 80, 80);
        Colours.boxFlag = new Colour_1.Colour(80, 240, 80);
        return Colours;
    }());
    exports.Colours = Colours;
});
define("Game/Classes/Points", ["require", "exports", "Boilerplate/Classes/GameBase", "Boilerplate/Enums/Align", "Boilerplate/Enums/Fonts", "Boilerplate/Enums/MouseButton", "Boilerplate/Functions", "Game/Classes/Colours"], function (require, exports, GameBase_1, Align_2, Fonts_1, MouseButton_3, Functions_1, Colours_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Points = void 0;
    var Points = /** @class */ (function () {
        function Points() {
            this.points = 0;
            this.particles = [];
            this.particleLife = 2;
            this.particleSpeed = 75;
        }
        Points.prototype.getPoints = function () {
            return this.points;
        };
        Points.prototype.addPoints = function (points) {
            if (points > 0) {
                this.points += points;
                this.particles.push(new PointTextParticle('+' + points, Colours_1.Colours.green, this.particleLife));
            }
        };
        Points.prototype.subtractPoints = function (points) {
            if (points > 0) {
                this.points -= points;
                this.particles.push(new PointTextParticle('-' + points, Colours_1.Colours.red, this.particleLife));
            }
        };
        Points.prototype.update = function (context, input) {
            this.particles.forEach(function (x) { return x.life -= GameBase_1.GameBase.updateTime; });
            this.particles = this.particles.filter(function (x) { return x.life > 0; });
            this.pointsText = "Points: " + this.points;
            var measurement = context.measureString(this.pointsText, 48, Fonts_1.Fonts.Arial, Align_2.Align.Center);
            this.rectX = 20;
            this.rectY = context.canvas.height - 70;
            this.rectW = measurement.width + 20;
            this.rectH = 50;
            if (input.isReleased(MouseButton_3.MouseButton.Left) && !input.getLeftUsed()
                && Functions_1.pointWithinRectangle(input.getX(), input.getY(), this.rectX, this.rectY, this.rectW, this.rectH)) {
                input.setLeftUsed();
            }
            if (input.isReleased(MouseButton_3.MouseButton.Right) && !input.getRightUsed()
                && Functions_1.pointWithinRectangle(input.getX(), input.getY(), this.rectX, this.rectY, this.rectW, this.rectH)) {
                input.setRightUsed();
            }
        };
        Points.prototype.draw = function (context) {
            var _this = this;
            context.drawBorderedRectangle(this.rectX, this.rectY, this.rectW, this.rectH, Colours_1.Colours.boxUncovered, Colours_1.Colours.boxBorder);
            context.drawString(this.pointsText, this.rectX + this.rectW / 2, this.rectY + this.rectH / 2 + 4, 48, Fonts_1.Fonts.Arial, Colours_1.Colours.boxBorder, Align_2.Align.Center);
            this.particles.forEach(function (x) { return context.drawString(x.text, _this.rectX + _this.rectW / 2, (_this.rectY + _this.rectH / 2) - (_this.particleLife - x.life) * _this.particleSpeed, 48, Fonts_1.Fonts.Arial, x.colour, Align_2.Align.Center); });
        };
        return Points;
    }());
    exports.Points = Points;
    var PointTextParticle = /** @class */ (function () {
        function PointTextParticle(text, colour, life) {
            this.text = text;
            this.colour = colour;
            this.life = life;
        }
        return PointTextParticle;
    }());
});
define("Game/Classes/UpgradeInfo", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UpgradeInfo = void 0;
    var UpgradeInfo = /** @class */ (function () {
        function UpgradeInfo(upgrade, name, description, cost, shortName, colour, requiredUpgrades) {
            this.upgrade = upgrade;
            this.name = name;
            this.description = description;
            this.cost = cost;
            this.shortName = shortName;
            this.colour = colour;
            this.requiredUpgrades = requiredUpgrades;
        }
        return UpgradeInfo;
    }());
    exports.UpgradeInfo = UpgradeInfo;
});
define("Game/Classes/UpgradeManager", ["require", "exports", "Game/Enums/Upgrades", "Game/Classes/Colours", "Game/Classes/UpgradeInfo"], function (require, exports, Upgrades_1, Colours_2, UpgradeInfo_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UpgradeManager = void 0;
    var UpgradeManager = /** @class */ (function () {
        function UpgradeManager() {
            this.upgradeInfo = [];
            this.unlockedUpgrades = [];
        }
        UpgradeManager.prototype.initialize = function () {
            //Revealers
            this.upgradeInfo.push(new UpgradeInfo_1.UpgradeInfo(Upgrades_1.Upgrades.Revealer1, "Simple Automatic Revealer", "Automatically reveals safe cells around cells with 1 mine nearby.", 100, "RVLR1", Colours_2.Colours.green, []));
            this.upgradeInfo.push(new UpgradeInfo_1.UpgradeInfo(Upgrades_1.Upgrades.Revealer2, "Basic Automatic Revealer", "Automatically reveals safe cells around cells with 2 mines nearby.", 250, "RVLR2", Colours_2.Colours.green, [Upgrades_1.Upgrades.Revealer1]));
            this.upgradeInfo.push(new UpgradeInfo_1.UpgradeInfo(Upgrades_1.Upgrades.Revealer3, "Advanced Automatic Revealer", "Automatically reveals safe cells around cells with 3 mines nearby.", 500, "RVLR3", Colours_2.Colours.green, [Upgrades_1.Upgrades.Revealer2]));
            this.upgradeInfo.push(new UpgradeInfo_1.UpgradeInfo(Upgrades_1.Upgrades.Revealer4, "Enhanced Automatic Revealer", "Automatically reveals safe cells around cells with 4 mines nearby.", 1000, "RVLR4", Colours_2.Colours.green, [Upgrades_1.Upgrades.Revealer3]));
            //Flaggers
            this.upgradeInfo.push(new UpgradeInfo_1.UpgradeInfo(Upgrades_1.Upgrades.Flagger1, "Simple Automatic Flagger", "Automatically flags mines around cells with 1 mine nearby.", 100, "FLGR1", Colours_2.Colours.green, []));
            this.upgradeInfo.push(new UpgradeInfo_1.UpgradeInfo(Upgrades_1.Upgrades.Flagger2, "Basic Automatic Flagger", "Automatically flags mines around cells with 2 mines nearby.", 250, "FLGR2", Colours_2.Colours.green, [Upgrades_1.Upgrades.Flagger1]));
            this.upgradeInfo.push(new UpgradeInfo_1.UpgradeInfo(Upgrades_1.Upgrades.Flagger3, "Advanced Automatic Flagger", "Automatically flags mines around cells with 3 mines nearby.", 500, "FLGR3", Colours_2.Colours.green, [Upgrades_1.Upgrades.Flagger2]));
            this.upgradeInfo.push(new UpgradeInfo_1.UpgradeInfo(Upgrades_1.Upgrades.Flagger4, "Enhanced Automatic Flagger", "Automatically flags mines around cells with 4 mines nearby.", 1000, "FLGR4", Colours_2.Colours.green, [Upgrades_1.Upgrades.Flagger3]));
            //Revealer speed
            this.upgradeInfo.push(new UpgradeInfo_1.UpgradeInfo(Upgrades_1.Upgrades.RevealerSpeed1, "Solar Powered Revealers", "Increases revealer speed by 50%", 250, "RSPD1", Colours_2.Colours.green, [Upgrades_1.Upgrades.Revealer1]));
            this.upgradeInfo.push(new UpgradeInfo_1.UpgradeInfo(Upgrades_1.Upgrades.RevealerSpeed2, "Wind Powered Revealers", "Increases revealer speed by 50%", 500, "RSPD2", Colours_2.Colours.green, [Upgrades_1.Upgrades.RevealerSpeed1]));
            this.upgradeInfo.push(new UpgradeInfo_1.UpgradeInfo(Upgrades_1.Upgrades.RevealerSpeed3, "Coal Powered Revealers", "Increases revealer speed by 50%", 1000, "RSPD3", Colours_2.Colours.green, [Upgrades_1.Upgrades.RevealerSpeed2]));
            this.upgradeInfo.push(new UpgradeInfo_1.UpgradeInfo(Upgrades_1.Upgrades.RevealerSpeed4, "Nuclear Powered Revealers", "Increases revealer speed by 50%", 2500, "RSPD4", Colours_2.Colours.green, [Upgrades_1.Upgrades.RevealerSpeed3]));
            //Flagger speed
            this.upgradeInfo.push(new UpgradeInfo_1.UpgradeInfo(Upgrades_1.Upgrades.FlaggerSpeed1, "Solar Powered Flaggers", "Increases flagger speed by 50%", 250, "FSPD1", Colours_2.Colours.green, [Upgrades_1.Upgrades.Flagger1]));
            this.upgradeInfo.push(new UpgradeInfo_1.UpgradeInfo(Upgrades_1.Upgrades.FlaggerSpeed2, "Wind Powered Flaggers", "Increases flagger speed by 50%", 500, "FSPD2", Colours_2.Colours.green, [Upgrades_1.Upgrades.FlaggerSpeed1]));
            this.upgradeInfo.push(new UpgradeInfo_1.UpgradeInfo(Upgrades_1.Upgrades.FlaggerSpeed3, "Coal Powered Flaggers", "Increases flagger speed by 50%", 1000, "FSPD3", Colours_2.Colours.green, [Upgrades_1.Upgrades.FlaggerSpeed2]));
            this.upgradeInfo.push(new UpgradeInfo_1.UpgradeInfo(Upgrades_1.Upgrades.FlaggerSpeed4, "Nuclear Powered Flaggers", "Increases flagger speed by 50%", 2500, "FSPD4", Colours_2.Colours.green, [Upgrades_1.Upgrades.FlaggerSpeed3]));
        };
        UpgradeManager.prototype.getAvailableUpgrades = function () {
            var _this = this;
            return this.upgradeInfo.filter(function (x) { return _this.isUpgradeAvailable(x.upgrade); });
        };
        UpgradeManager.prototype.isUpgradeAvailable = function (upgrade) {
            var _this = this;
            if (this.unlockedUpgrades.some(function (x) { return x === upgrade; }))
                return false;
            var info = this.upgradeInfo.filter(function (x) { return x.upgrade === upgrade; })[0];
            return info.requiredUpgrades.every(function (x) { return _this.unlockedUpgrades.some(function (y) { return y === x; }); });
        };
        UpgradeManager.prototype.unlockUpgrade = function (upgrade) {
            this.unlockedUpgrades.push(upgrade);
        };
        UpgradeManager.prototype.isUpgradeUnlocked = function (upgrade) {
            return this.unlockedUpgrades.some(function (x) { return x === upgrade; });
        };
        UpgradeManager.prototype.getRevealerSpeed = function () {
            var speed = 1;
            if (this.isUpgradeUnlocked(Upgrades_1.Upgrades.RevealerSpeed1))
                speed *= 1.5;
            if (this.isUpgradeUnlocked(Upgrades_1.Upgrades.RevealerSpeed2))
                speed *= 1.5;
            if (this.isUpgradeUnlocked(Upgrades_1.Upgrades.RevealerSpeed3))
                speed *= 1.5;
            if (this.isUpgradeUnlocked(Upgrades_1.Upgrades.RevealerSpeed4))
                speed *= 1.5;
            return speed;
        };
        UpgradeManager.prototype.getFlaggerSpeed = function () {
            var speed = 1;
            if (this.isUpgradeUnlocked(Upgrades_1.Upgrades.FlaggerSpeed1))
                speed *= 1.5;
            if (this.isUpgradeUnlocked(Upgrades_1.Upgrades.FlaggerSpeed2))
                speed *= 1.5;
            if (this.isUpgradeUnlocked(Upgrades_1.Upgrades.FlaggerSpeed3))
                speed *= 1.5;
            if (this.isUpgradeUnlocked(Upgrades_1.Upgrades.FlaggerSpeed4))
                speed *= 1.5;
            return speed;
        };
        return UpgradeManager;
    }());
    exports.UpgradeManager = UpgradeManager;
});
define("Game/Classes/Grid", ["require", "exports", "Boilerplate/Classes/GameBase", "Boilerplate/Classes/Vector2", "Boilerplate/Enums/Align", "Boilerplate/Enums/Fonts", "Boilerplate/Enums/MouseButton", "Boilerplate/Functions", "Game/Enums/CellStates", "Game/Enums/CellTypes", "Game/Enums/Upgrades", "Game/Classes/Colours"], function (require, exports, GameBase_2, Vector2_3, Align_3, Fonts_2, MouseButton_4, Functions_2, CellStates_1, CellTypes_1, Upgrades_2, Colours_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Grid = void 0;
    var Grid = /** @class */ (function () {
        function Grid(width, height) {
            this.cellUncover1Timer = 0;
            this.cellUncover2Timer = 0;
            this.cellUncover3Timer = 0;
            this.cellUncover4Timer = 0;
            this.flagger1Timer = 0;
            this.flagger2Timer = 0;
            this.flagger3Timer = 0;
            this.flagger4Timer = 0;
            this.cellValues = Functions_2.createMultidimensionalArray(width, height, 0);
            this.cellTypes = Functions_2.createMultidimensionalArray(width, height, CellTypes_1.CellTypes.Clear);
            this.cellStates = Functions_2.createMultidimensionalArray(width, height, CellStates_1.CellStates.Covered);
            this.width = width;
            this.height = height;
            this.generateMines();
            this.calculateCellValues();
            this.revealFromCell(this.width / 2, this.height / 2);
        }
        Grid.prototype.update = function (camera, input, points, upgradeManager) {
            if (input.isReleased(MouseButton_4.MouseButton.Left) && !input.getHasLeftDownPositionChanged() && !input.getLeftUsed()) {
                var mousePos = new Vector2_3.Vector2();
                mousePos.x = input.getX();
                mousePos.y = input.getY();
                var worldPos = camera.getCameraToWorldOffset(mousePos);
                var x = Math.round(worldPos.x / 64 - 0.5);
                var y = Math.round(worldPos.y / 64 - 0.5);
                if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
                    if (this.cellTypes[x][y] === CellTypes_1.CellTypes.Clear && this.cellStates[x][y] === CellStates_1.CellStates.Covered)
                        this.revealFromCell(x, y, points);
                    else if (this.cellTypes[x][y] === CellTypes_1.CellTypes.Mine && this.cellStates[x][y] === CellStates_1.CellStates.Covered) {
                        this.cellStates[x][y] = CellStates_1.CellStates.Uncovered;
                        points.subtractPoints(points.getPoints());
                    }
                }
            }
            else if (input.isReleased(MouseButton_4.MouseButton.Right) && !input.getRightUsed()) {
                var mousePos = new Vector2_3.Vector2();
                mousePos.x = input.getX();
                mousePos.y = input.getY();
                var worldPos = camera.getCameraToWorldOffset(mousePos);
                var x = Math.round(worldPos.x / 64 - 0.5);
                var y = Math.round(worldPos.y / 64 - 0.5);
                if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
                    if (this.cellTypes[x][y] === CellTypes_1.CellTypes.Mine && this.cellStates[x][y] === CellStates_1.CellStates.Covered) {
                        this.cellStates[x][y] = CellStates_1.CellStates.Flagged;
                        points.addPoints(20);
                    }
                    else if (this.cellTypes[x][y] === CellTypes_1.CellTypes.Clear && this.cellStates[x][y] === CellStates_1.CellStates.Covered) {
                        this.cellStates[x][y] = CellStates_1.CellStates.Uncovered;
                        this.revealFromCell(x, y);
                        points.subtractPoints(points.getPoints());
                    }
                }
            }
            var flaggerSpeed = upgradeManager.getFlaggerSpeed();
            var revealerSpeed = upgradeManager.getRevealerSpeed();
            //TODO: refactor this thing so that multiple upgrades can be run more efficiently
            if (upgradeManager.isUpgradeUnlocked(Upgrades_2.Upgrades.Revealer1)) {
                if (this.cellUncover1Timer <= 0) {
                    this.cellUncover1Timer += 1;
                    this.runRevealerUpgrade(1, points);
                }
                this.cellUncover1Timer -= GameBase_2.GameBase.updateTime * revealerSpeed;
            }
            if (upgradeManager.isUpgradeUnlocked(Upgrades_2.Upgrades.Revealer2)) {
                if (this.cellUncover2Timer <= 0) {
                    this.cellUncover2Timer += 1;
                    this.runRevealerUpgrade(2, points);
                }
                this.cellUncover2Timer -= GameBase_2.GameBase.updateTime * revealerSpeed;
            }
            if (upgradeManager.isUpgradeUnlocked(Upgrades_2.Upgrades.Revealer3)) {
                if (this.cellUncover3Timer <= 0) {
                    this.cellUncover3Timer += 1;
                    this.runRevealerUpgrade(3, points);
                }
                this.cellUncover3Timer -= GameBase_2.GameBase.updateTime * revealerSpeed;
            }
            if (upgradeManager.isUpgradeUnlocked(Upgrades_2.Upgrades.Revealer4)) {
                if (this.cellUncover4Timer <= 0) {
                    this.cellUncover4Timer += 1;
                    this.runRevealerUpgrade(4, points);
                }
                this.cellUncover4Timer -= GameBase_2.GameBase.updateTime * revealerSpeed;
            }
            if (upgradeManager.isUpgradeUnlocked(Upgrades_2.Upgrades.Flagger1)) {
                if (this.flagger1Timer <= 0) {
                    this.flagger1Timer += 1;
                    this.runFlaggerUpgrade(1, points);
                }
                this.flagger1Timer -= GameBase_2.GameBase.updateTime * flaggerSpeed;
            }
            if (upgradeManager.isUpgradeUnlocked(Upgrades_2.Upgrades.Flagger2)) {
                if (this.flagger2Timer <= 0) {
                    this.flagger2Timer += 1;
                    this.runFlaggerUpgrade(2, points);
                }
                this.flagger2Timer -= GameBase_2.GameBase.updateTime * flaggerSpeed;
            }
            if (upgradeManager.isUpgradeUnlocked(Upgrades_2.Upgrades.Flagger3)) {
                if (this.flagger3Timer <= 0) {
                    this.flagger3Timer += 1;
                    this.runFlaggerUpgrade(3, points);
                }
                this.flagger3Timer -= GameBase_2.GameBase.updateTime * flaggerSpeed;
            }
            if (upgradeManager.isUpgradeUnlocked(Upgrades_2.Upgrades.Flagger4)) {
                if (this.flagger4Timer <= 0) {
                    this.flagger4Timer += 1;
                    this.runFlaggerUpgrade(4, points);
                }
                this.flagger4Timer -= GameBase_2.GameBase.updateTime * flaggerSpeed;
            }
        };
        Grid.prototype.draw = function (context, camera) {
            var zoom = camera.getZoom();
            var position = new Vector2_3.Vector2();
            var offset;
            for (var x = 0; x < this.width; x++) {
                for (var y = 0; y < this.height; y++) {
                    position.x = x * 64;
                    position.y = y * 64;
                    offset = camera.getWorldToCameraOffset(position);
                    if (this.cellStates[x][y] === CellStates_1.CellStates.Covered) {
                        context.drawBorderedRectangle(offset.x, offset.y, 64 * zoom, 64 * zoom, Colours_3.Colours.boxCovered, Colours_3.Colours.boxBorder);
                    }
                    else if (this.cellStates[x][y] === CellStates_1.CellStates.Uncovered) {
                        context.drawBorderedRectangle(offset.x, offset.y, 64 * zoom, 64 * zoom, Colours_3.Colours.boxUncovered, Colours_3.Colours.boxBorder);
                        if (this.cellTypes[x][y] === CellTypes_1.CellTypes.Mine) {
                            context.drawFillRectangle(offset.x + 9 * zoom, offset.y + 9 * zoom, 46 * zoom, 46 * zoom, Colours_3.Colours.boxBomb);
                        }
                        else if (this.cellTypes[x][y] === CellTypes_1.CellTypes.Clear) {
                            var cellValue = this.cellValues[x][y];
                            if (cellValue !== 0)
                                context.drawString(cellValue.toString(), offset.x + 32 * zoom, offset.y + 32 * zoom, 48 * zoom, Fonts_2.Fonts.Arial, Colours_3.Colours.magenta, Align_3.Align.Center);
                        }
                    }
                    else if (this.cellStates[x][y] === CellStates_1.CellStates.Flagged) {
                        context.drawBorderedRectangle(offset.x, offset.y, 64 * zoom, 64 * zoom, Colours_3.Colours.boxCovered, Colours_3.Colours.boxBorder);
                        context.drawFillRectangle(offset.x + 9 * zoom, offset.y + 9 * zoom, 46 * zoom, 46 * zoom, Colours_3.Colours.boxFlag);
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
            var mineAmount = 0.20;
            var minesLeft = Math.round(((this.width * this.height) - 16) * mineAmount);
            for (var x = this.width / 2 - 2; x < this.width / 2 + 2; x++) {
                for (var y = this.height / 2 - 2; y < this.height / 2 + 2; y++) {
                    this.cellTypes[x][y] = CellTypes_1.CellTypes.Mine;
                }
            }
            while (minesLeft > 0) {
                var x = Functions_2.randomInt(0, this.width - 1);
                var y = Functions_2.randomInt(0, this.height - 1);
                if (this.cellTypes[x][y] !== CellTypes_1.CellTypes.Mine) {
                    this.cellTypes[x][y] = CellTypes_1.CellTypes.Mine;
                    minesLeft--;
                }
            }
            for (var x = this.width / 2 - 2; x < this.width / 2 + 2; x++) {
                for (var y = this.height / 2 - 2; y < this.height / 2 + 2; y++) {
                    this.cellTypes[x][y] = CellTypes_1.CellTypes.Clear;
                }
            }
        };
        Grid.prototype.revealFromCell = function (x, y, points) {
            var openCells = [];
            var closedCells = [];
            var totalPoints = 0;
            openCells.push([x, y]);
            while (openCells.length > 0) {
                var cell = openCells.pop();
                closedCells.push(cell);
                this.cellStates[cell[0]][cell[1]] = CellStates_1.CellStates.Uncovered;
                totalPoints += this.cellValues[cell[0]][cell[1]] + 1;
                if (this.cellValues[cell[0]][cell[1]] === 0) {
                    this.getSurroundingCells(cell[0], cell[1])
                        .filter(function (surroundingCell) { return closedCells
                        .every(function (closedCell) { return closedCell[0] !== surroundingCell[0] || closedCell[1] !== surroundingCell[1]; }); })
                        .filter(function (surroundingCell) { return openCells
                        .every(function (openCell) { return openCell[0] !== surroundingCell[0] || openCell[1] !== surroundingCell[1]; }); })
                        .forEach(function (surroundingCell) { return openCells.push(surroundingCell); });
                }
            }
            if (points) {
                points.addPoints(totalPoints);
            }
        };
        Grid.prototype.getSurroundingCells = function (x, y) {
            var _this = this;
            var cells = [
                [x - 1, y - 1],
                [x - 1, y],
                [x - 1, y + 1],
                [x, y - 1],
                [x, y + 1],
                [x + 1, y - 1],
                [x + 1, y],
                [x + 1, y + 1],
            ];
            return cells.filter(function (cell) { return cell[0] >= 0 && cell[0] < _this.width && cell[1] >= 0 && cell[1] < _this.height; });
        };
        Grid.prototype.runRevealerUpgrade = function (cellValue, points) {
            var _this = this;
            //Get all cells have the cellValue, not a mine, and uncovered
            var uncovered = [];
            for (var x = 0; x < this.width; x++) {
                for (var y = 0; y < this.height; y++) {
                    if (this.cellValues[x][y] === cellValue &&
                        this.cellTypes[x][y] === CellTypes_1.CellTypes.Clear &&
                        this.cellStates[x][y] === CellStates_1.CellStates.Uncovered) {
                        uncovered.push([x, y]);
                    }
                }
            }
            //Filter to cells that have the cellValue surrounding exploded or flagged mine
            var safe = uncovered.filter(function (c1) { return _this.getSurroundingCells(c1[0], c1[1])
                .filter(function (c2) { return _this.cellTypes[c2[0]][c2[1]] === CellTypes_1.CellTypes.Mine &&
                (_this.cellStates[c2[0]][c2[1]] === CellStates_1.CellStates.Flagged ||
                    _this.cellStates[c2[0]][c2[1]] === CellStates_1.CellStates.Uncovered); }).length === cellValue; });
            //Get the cells around the safe cell that are covered
            var covered = safe.map(function (c1) { return _this.getSurroundingCells(c1[0], c1[1])
                .filter(function (c2) { return _this.cellTypes[c2[0]][c2[1]] === CellTypes_1.CellTypes.Clear &&
                _this.cellStates[c2[0]][c2[1]] === CellStates_1.CellStates.Covered; }); })
                .reduce(function (a, b) { return a.concat(b); });
            //Pick one at random and reveal it (might need filtering to unique cells)
            if (covered.length > 0) {
                var random = covered[Functions_2.randomInt(0, covered.length - 1)];
                this.revealFromCell(random[0], random[1], points);
            }
        };
        Grid.prototype.runFlaggerUpgrade = function (cellValue, points) {
            var _this = this;
            //Get all cells have the cellValue, not a mine, and uncovered
            var uncovered = [];
            for (var x = 0; x < this.width; x++) {
                for (var y = 0; y < this.height; y++) {
                    if (this.cellValues[x][y] === cellValue &&
                        this.cellTypes[x][y] === CellTypes_1.CellTypes.Clear &&
                        this.cellStates[x][y] === CellStates_1.CellStates.Uncovered) {
                        uncovered.push([x, y]);
                    }
                }
            }
            //Filter to cells that have the cellValue or less covered surrounding cells
            var safe = uncovered.filter(function (c1) { return _this.getSurroundingCells(c1[0], c1[1])
                .filter(function (c2) { return _this.cellStates[c2[0]][c2[1]] === CellStates_1.CellStates.Covered ||
                _this.cellStates[c2[0]][c2[1]] === CellStates_1.CellStates.Flagged; }).length <= cellValue; });
            //Get the cells around the safe cell that are covered
            var covered = safe.map(function (c1) { return _this.getSurroundingCells(c1[0], c1[1])
                .filter(function (c2) { return _this.cellStates[c2[0]][c2[1]] === CellStates_1.CellStates.Covered; }); })
                .reduce(function (a, b) { return a.concat(b); });
            //Pick one at random and flag it (might need filtering to unique cells)
            if (covered.length > 0) {
                var random = covered[Functions_2.randomInt(0, covered.length - 1)];
                this.cellStates[random[0]][random[1]] = CellStates_1.CellStates.Flagged;
                points.addPoints(20);
            }
        };
        return Grid;
    }());
    exports.Grid = Grid;
});
define("Game/Classes/Tooltip", ["require", "exports", "Boilerplate/Enums/Align", "Boilerplate/Enums/Fonts", "Game/Classes/Colours"], function (require, exports, Align_4, Fonts_3, Colours_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Tooltip = void 0;
    var Tooltip = /** @class */ (function () {
        function Tooltip() {
            this.hasTooltip = false;
            this.costPrefix = "Cost: ";
        }
        Tooltip.prototype.update = function () {
            this.hasTooltip = false;
            this.cost = null;
        };
        Tooltip.prototype.draw = function (context, points) {
            if (this.hasTooltip) {
                var titleWidth = context.measureString(this.title, 30, Fonts_3.Fonts.Arial, Align_4.Align.Left).width;
                var textWidth = context.measureString(this.text, 24, Fonts_3.Fonts.Arial, Align_4.Align.Left).width;
                if (this.cost != null)
                    titleWidth += context.measureString(this.costPrefix + this.cost, 24, Fonts_3.Fonts.Arial, Align_4.Align.Right).width + 10;
                var width = Math.max(titleWidth, textWidth) + 20;
                context.drawBorderedRectangle(this.x, this.y, width, 80, Colours_4.Colours.background, Colours_4.Colours.boxBorder);
                context.drawString(this.title, this.x + 10, this.y + 10, 30, Fonts_3.Fonts.Arial, Colours_4.Colours.boxBorder, Align_4.Align.TopLeft);
                context.drawString(this.text, this.x + 10, this.y + 50, 24, Fonts_3.Fonts.Arial, Colours_4.Colours.boxBorder, Align_4.Align.TopLeft);
                if (this.cost != null)
                    context.drawString(this.costPrefix + this.cost, (this.x + width) - 10, this.y + 10, 24, Fonts_3.Fonts.Arial, points.getPoints() < this.cost ? Colours_4.Colours.red : Colours_4.Colours.green, Align_4.Align.TopRight);
            }
        };
        Tooltip.prototype.setTooltip = function (title, text, x, y, cost) {
            if (cost === void 0) { cost = null; }
            this.hasTooltip = true;
            this.title = title;
            this.text = text;
            this.x = x;
            this.y = y;
            this.cost = cost;
        };
        return Tooltip;
    }());
    exports.Tooltip = Tooltip;
});
define("Game/Classes/Shop", ["require", "exports", "Boilerplate/Enums/Align", "Boilerplate/Enums/Fonts", "Boilerplate/Enums/MouseButton", "Boilerplate/Functions", "Game/Classes/Colours"], function (require, exports, Align_5, Fonts_4, MouseButton_5, Functions_3, Colours_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Shop = void 0;
    var Shop = /** @class */ (function () {
        function Shop() {
            this.titleRectX = 20;
            this.titleRectY = 20;
            this.titleRectW = 272;
            this.titleRectH = 60;
            this.mainRectX = 20;
            this.mainRectY = 80;
            this.mainRectW = 272;
            this.upgradeWidth = 64;
            this.upgradeHeight = 64;
            this.upgradeOffset = 20;
        }
        Shop.prototype.update = function (input, upgradeManager, points, tooltip) {
            var _this = this;
            var upgrades = upgradeManager.getAvailableUpgrades();
            if (Functions_3.pointWithinRectangle(input.getX(), input.getY(), this.titleRectX, this.titleRectY, this.titleRectW, this.titleRectH + this.upgradeOffset + ((upgrades.length - upgrades.length % 3) / 3 + 1) * (this.upgradeHeight + this.upgradeOffset))) {
                if (input.isReleased(MouseButton_5.MouseButton.Left) && !input.getLeftUsed()) {
                    input.setLeftUsed();
                    upgrades.forEach(function (x, i) {
                        if (Functions_3.pointWithinRectangle(input.getX(), input.getY(), _this.mainRectX + _this.upgradeOffset + (_this.upgradeOffset + _this.upgradeWidth) * (i % 3), _this.mainRectY + _this.upgradeOffset + (_this.upgradeOffset + _this.upgradeHeight) * ((i - i % 3) / 3), _this.upgradeWidth, _this.upgradeHeight)) {
                            if (points.getPoints() >= x.cost) {
                                points.subtractPoints(x.cost);
                                upgradeManager.unlockUpgrade(x.upgrade);
                            }
                        }
                    });
                }
                if (input.isReleased(MouseButton_5.MouseButton.Right) && !input.getRightUsed()) {
                    input.setRightUsed();
                }
                upgrades.forEach(function (x, i) {
                    if (Functions_3.pointWithinRectangle(input.getX(), input.getY(), _this.mainRectX + _this.upgradeOffset + (_this.upgradeOffset + _this.upgradeWidth) * (i % 3), _this.mainRectY + _this.upgradeOffset + (_this.upgradeOffset + _this.upgradeHeight) * ((i - i % 3) / 3), _this.upgradeWidth, _this.upgradeHeight)) {
                        tooltip.setTooltip(x.name, x.description, input.getX(), input.getY(), x.cost);
                    }
                });
            }
        };
        Shop.prototype.draw = function (context, upgradeManager, points, input) {
            var _this = this;
            var upgrades = upgradeManager.getAvailableUpgrades();
            context.drawBorderedRectangle(this.mainRectX, this.mainRectY, this.mainRectW, this.upgradeOffset + ((upgrades.length - upgrades.length % 3) / 3 + 1) * (this.upgradeHeight + this.upgradeOffset), Colours_5.Colours.boxUncovered, Colours_5.Colours.boxBorder);
            context.drawBorderedRectangle(this.titleRectX, this.titleRectY, this.titleRectW, this.titleRectH, Colours_5.Colours.boxUncovered, Colours_5.Colours.boxBorder);
            context.drawString('Shop', this.titleRectX + this.titleRectW / 2, this.titleRectY + this.titleRectH / 2 + 4, 48, Fonts_4.Fonts.Arial, Colours_5.Colours.boxBorder, Align_5.Align.Center);
            upgrades.forEach(function (x, i) {
                var colour;
                if (points.getPoints() < x.cost)
                    colour = Colours_5.Colours.boxCovered;
                else if (Functions_3.pointWithinRectangle(input.getX(), input.getY(), _this.mainRectX + _this.upgradeOffset + (_this.upgradeOffset + _this.upgradeWidth) * (i % 3), _this.mainRectY + _this.upgradeOffset + (_this.upgradeOffset + _this.upgradeHeight) * ((i - i % 3) / 3), _this.upgradeWidth, _this.upgradeHeight))
                    colour = Colours_5.Colours.boxUncovered;
                else
                    colour = Colours_5.Colours.background;
                context.drawBorderedRectangle(_this.mainRectX + _this.upgradeOffset + (_this.upgradeOffset + _this.upgradeWidth) * (i % 3), _this.mainRectY + _this.upgradeOffset + (_this.upgradeOffset + _this.upgradeHeight) * ((i - i % 3) / 3), _this.upgradeWidth, _this.upgradeHeight, colour, Colours_5.Colours.boxBorder);
                context.drawString(x.shortName, _this.mainRectX + _this.upgradeOffset + (_this.upgradeOffset + _this.upgradeWidth) * (i % 3) + _this.upgradeWidth / 2, _this.mainRectY + _this.upgradeOffset + (_this.upgradeOffset + _this.upgradeHeight) * ((i - i % 3) / 3) + _this.upgradeHeight / 2, 16, Fonts_4.Fonts.Arial, x.colour, Align_5.Align.Center);
            });
        };
        return Shop;
    }());
    exports.Shop = Shop;
});
define("Game/Classes/Game", ["require", "exports", "Game/Classes/Grid", "Game/Classes/Camera", "Boilerplate/Classes/Vector2", "Boilerplate/Classes/GameBase", "Game/Classes/Points", "Game/Classes/Shop", "Game/Classes/UpgradeManager", "Game/Classes/Tooltip"], function (require, exports, Grid_1, Camera_1, Vector2_4, GameBase_3, Points_1, Shop_1, UpgradeManager_1, Tooltip_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Game = void 0;
    var Game = /** @class */ (function (_super) {
        __extends(Game, _super);
        function Game() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Game.prototype.initialize = function () {
            this.grid = new Grid_1.Grid(64, 64);
            this.camera = new Camera_1.Camera();
            var gridCenter = new Vector2_4.Vector2();
            gridCenter.x = 64 * ((64 / 2) + 1);
            gridCenter.y = 64 * ((64 / 2) + 1);
            this.camera.centerOnPosition(gridCenter, this.canvas);
            this.points = new Points_1.Points();
            this.shop = new Shop_1.Shop();
            this.upgradeManager = new UpgradeManager_1.UpgradeManager();
            this.upgradeManager.initialize();
            this.tooltip = new Tooltip_1.Tooltip();
        };
        Game.prototype.update = function () {
            this.tooltip.update();
            this.camera.update(this.input);
            this.shop.update(this.input, this.upgradeManager, this.points, this.tooltip);
            this.points.update(this.context, this.input);
            this.grid.update(this.camera, this.input, this.points, this.upgradeManager);
        };
        Game.prototype.draw = function () {
            this.grid.draw(this.context, this.camera);
            this.points.draw(this.context);
            this.shop.draw(this.context, this.upgradeManager, this.points, this.input);
            this.tooltip.draw(this.context, this.points);
        };
        return Game;
    }(GameBase_3.GameBase));
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
//# sourceMappingURL=Main.js.map