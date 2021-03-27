import { Upgrades } from "../Enums/Upgrades";
import { Colours } from "./Colours";
import { UpgradeInfo } from "./UpgradeInfo";

export class UpgradeManager {
    private upgradeInfo: UpgradeInfo[] = [];
    private unlockedUpgrades: Upgrades[] = [];

    public initialize() {
        //Revealers
        this.upgradeInfo.push(new UpgradeInfo(
            Upgrades.Revealer1,
            "Simple Automatic Revealer",
            "Automatically reveals safe cells around cells with 1 mine nearby.",
            100,
            "RVLR1",
            Colours.green,
            []));
        this.upgradeInfo.push(new UpgradeInfo(
            Upgrades.Revealer2,
            "Basic Automatic Revealer",
            "Automatically reveals safe cells around cells with 2 mines nearby.",
            250,
            "RVLR2",
            Colours.green,
            [Upgrades.Revealer1]));
        this.upgradeInfo.push(new UpgradeInfo(
            Upgrades.Revealer3,
            "Advanced Automatic Revealer",
            "Automatically reveals safe cells around cells with 3 mines nearby.",
            500,
            "RVLR3",
            Colours.green,
            [Upgrades.Revealer2]));
        this.upgradeInfo.push(new UpgradeInfo(
            Upgrades.Revealer4,
            "Enhanced Automatic Revealer",
            "Automatically reveals safe cells around cells with 4 mines nearby.",
            1000,
            "RVLR4",
            Colours.green,
            [Upgrades.Revealer3]));

        //Flaggers
        this.upgradeInfo.push(new UpgradeInfo(
            Upgrades.Flagger1,
            "Simple Automatic Flagger",
            "Automatically flags mines around cells with 1 mine nearby.",
            100,
            "FLGR1",
            Colours.green,
            []));
        this.upgradeInfo.push(new UpgradeInfo(
            Upgrades.Flagger2,
            "Basic Automatic Flagger",
            "Automatically flags mines around cells with 2 mines nearby.",
            250,
            "FLGR2",
            Colours.green,
            [Upgrades.Flagger1]));
        this.upgradeInfo.push(new UpgradeInfo(
            Upgrades.Flagger3,
            "Advanced Automatic Flagger",
            "Automatically flags mines around cells with 3 mines nearby.",
            500,
            "FLGR3",
            Colours.green,
            [Upgrades.Flagger2]));
        this.upgradeInfo.push(new UpgradeInfo(
            Upgrades.Flagger4,
            "Enhanced Automatic Flagger",
            "Automatically flags mines around cells with 4 mines nearby.",
            1000,
            "FLGR4",
            Colours.green,
            [Upgrades.Flagger3]));

        //Revealer speed
        this.upgradeInfo.push(new UpgradeInfo(
            Upgrades.RevealerSpeed1,
            "Solar Powered Revealers",
            "Increases revealer speed by 50%",
            250,
            "RSPD1",
            Colours.green,
            [Upgrades.Revealer1]));
        this.upgradeInfo.push(new UpgradeInfo(
            Upgrades.RevealerSpeed2,
            "Wind Powered Revealers",
            "Increases revealer speed by 50%",
            500,
            "RSPD2",
            Colours.green,
            [Upgrades.RevealerSpeed1]));
        this.upgradeInfo.push(new UpgradeInfo(
            Upgrades.RevealerSpeed3,
            "Coal Powered Revealers",
            "Increases revealer speed by 50%",
            1000,
            "RSPD3",
            Colours.green,
            [Upgrades.RevealerSpeed2]));
        this.upgradeInfo.push(new UpgradeInfo(
            Upgrades.RevealerSpeed4,
            "Nuclear Powered Revealers",
            "Increases revealer speed by 50%",
            2500,
            "RSPD4",
            Colours.green,
            [Upgrades.RevealerSpeed3]));

        //Flagger speed
        this.upgradeInfo.push(new UpgradeInfo(
            Upgrades.FlaggerSpeed1,
            "Solar Powered Flaggers",
            "Increases flagger speed by 50%",
            250,
            "FSPD1",
            Colours.green,
            [Upgrades.Flagger1]));
        this.upgradeInfo.push(new UpgradeInfo(
            Upgrades.FlaggerSpeed2,
            "Wind Powered Flaggers",
            "Increases flagger speed by 50%",
            500,
            "FSPD2",
            Colours.green,
            [Upgrades.FlaggerSpeed1]));
        this.upgradeInfo.push(new UpgradeInfo(
            Upgrades.FlaggerSpeed3,
            "Coal Powered Flaggers",
            "Increases flagger speed by 50%",
            1000,
            "FSPD3",
            Colours.green,
            [Upgrades.FlaggerSpeed2]));
        this.upgradeInfo.push(new UpgradeInfo(
            Upgrades.FlaggerSpeed4,
            "Nuclear Powered Flaggers",
            "Increases flagger speed by 50%",
            2500,
            "FSPD4",
            Colours.green,
            [Upgrades.FlaggerSpeed3]));
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

    public isUpgradeUnlocked(upgrade: Upgrades) {
        return this.unlockedUpgrades.some(x => x === upgrade);
    }

    public getRevealerSpeed(): number {
        let speed = 1;

        if (this.isUpgradeUnlocked(Upgrades.RevealerSpeed1))
            speed *= 1.5;
        if (this.isUpgradeUnlocked(Upgrades.RevealerSpeed2))
            speed *= 1.5;
        if (this.isUpgradeUnlocked(Upgrades.RevealerSpeed3))
            speed *= 1.5;
        if (this.isUpgradeUnlocked(Upgrades.RevealerSpeed4))
            speed *= 1.5;

        return speed;
    }

    public getFlaggerSpeed(): number {
        let speed = 1;

        if (this.isUpgradeUnlocked(Upgrades.FlaggerSpeed1))
            speed *= 1.5;
        if (this.isUpgradeUnlocked(Upgrades.FlaggerSpeed2))
            speed *= 1.5;
        if (this.isUpgradeUnlocked(Upgrades.FlaggerSpeed3))
            speed *= 1.5;
        if (this.isUpgradeUnlocked(Upgrades.FlaggerSpeed4))
            speed *= 1.5;

        return speed;
    }
}
