import { Upgrades } from "../Enums/Upgrades";
import { Colours } from "./Colours";
import { UpgradeInfo } from "./UpgradeInfo";

export class UpgradeManager {
    private upgradeInfo: UpgradeInfo[] = [];
    private unlockedUpgrades: Upgrades[] = [];

    public initialize() {
        this.upgradeInfo.push(new UpgradeInfo(
            Upgrades.CellUncover1,
            "Crude Automatic Revealer",
            "Automatically reveals safe cells around cells with 1 mine nearby.",
            100,
            "RVLR1",
            Colours.green,
            []));
        this.upgradeInfo.push(new UpgradeInfo(
            Upgrades.CellUncover2,
            "Basic Automatic Revealer",
            "Automatically reveals safe cells around cells with 2 mines nearby.",
            250,
            "RVLR2",
            Colours.green,
            [Upgrades.CellUncover1]));
        this.upgradeInfo.push(new UpgradeInfo(
            Upgrades.CellUncover3,
            "Advanced Automatic Revealer",
            "Automatically reveals safe cells around cells with 3 mines nearby.",
            500,
            "RVLR3",
            Colours.green,
            [Upgrades.CellUncover2]));
        this.upgradeInfo.push(new UpgradeInfo(
            Upgrades.CellUncover3,
            "Enhanced Automatic Revealer",
            "Automatically reveals safe cells around cells with 4 mines nearby.",
            1000,
            "RVLR4",
            Colours.green,
            [Upgrades.CellUncover4]));
    }

    public getAvailableUpgrades() {
        return this.upgradeInfo.filter(x => this.isUpgradeAvailable(x.upgrade));
    }

    private isUpgradeAvailable(upgrade: Upgrades) {
        if (this.unlockedUpgrades.some(x => x === upgrade))
            return false;

        const info = this.upgradeInfo.filter(x => x.upgrade === upgrade)[0];

        return info.requiredUpgrades.every(x => this.unlockedUpgrades.some(y => y === x));
    }

    public unlockUpgrade(upgrade: Upgrades) {
        this.unlockedUpgrades.push(upgrade);
    }
}
