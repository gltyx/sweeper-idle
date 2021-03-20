import { Scroll } from "../Enums/Scroll";

export class MouseState {
    constructor(
        public x: number,
        public y: number,
        public left: boolean,
        public right: boolean,
        public scroll: Scroll
    ) { }
}
