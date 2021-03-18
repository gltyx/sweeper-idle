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
