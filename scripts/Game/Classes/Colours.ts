import { Colour } from "../../Boilerplate/Classes/Colour";

export class Colours {
    public static red = new Colour(255, 0, 0);
    public static yellow = new Colour(255, 255, 0);
    public static green = new Colour(0, 255, 0);
    public static cyan = new Colour(0, 255, 255);
    public static blue = new Colour(0, 0, 255);
    public static magenta = new Colour(255, 0, 255);

    public static background: Colour = new Colour(64, 64, 64);

    public static boxBorder: Colour = new Colour(16, 16, 16);
    public static boxCovered: Colour = new Colour(48, 48, 48);
    public static boxUncovered: Colour = new Colour(80, 80, 80);
    public static boxBomb: Colour = new Colour(240, 80, 80);
    public static boxFlag: Colour = new Colour(80, 240, 80);
}
