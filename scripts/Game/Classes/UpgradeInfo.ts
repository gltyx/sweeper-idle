import { Colour } from "../../Boilerplate/Classes/Colour";
import { Upgrades } from "../Enums/Upgrades";

export class UpgradeInfo {
    constructor(
        public upgrade: Upgrades,
        public name: string,
        public description: string,
        public cost: number,
        public shortName: string,
        public colour: Colour,
        public requiredUpgrades: Upgrades[]
    ) { }
}
