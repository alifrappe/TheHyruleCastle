"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAction = exports.opponentAttack = exports.heal = exports.attack = exports.displayHP = void 0;
var lib_1 = require("./lib");
// fonction pour afficher niveau de vie
function displayHP(currentCharacter) {
    try {
        var currentHP = currentCharacter.currenthp;
        var maxHP = currentCharacter.maxhp;
        // change de couleur à <50% de maxHP, puis à <30% de maxHP
        var format = "";
        if (currentHP >= maxHP * 0.5) {
            format = lib_1.colors.green("{bar}") + " {value}/{total} HP";
        }
        else if (currentHP > maxHP * 0.3 && currentHP < maxHP * 0.5) {
            format = lib_1.colors.yellow("{bar}") + " {value}/{total} HP";
        }
        else {
            format = lib_1.colors.red("{bar}") + " {value}/{total} HP";
        }
        // definition de la barre de vie
        var lifeBar = new lib_1.cliProgress.SingleBar({
            format: format,
            barCompleteChar: "\u2588",
            barIncompleteChar: "\u2591",
            hideCursor: true,
        });
        // initialisation de la bar
        lifeBar.start(maxHP, 0, {
            speed: "N/A",
        });
        // maj de la valeur avec currentHP
        lifeBar.increment();
        lifeBar.update(currentHP);
        lifeBar.stop();
        console.log("");
    }
    catch (_a) {
        console.error("Error: struggling to display HP");
    }
}
exports.displayHP = displayHP;
// fonction attack : deals damage to the opponent equal to the STR stat of the character
function attack(listOfFighters) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (listOfFighters[1].currenthp > listOfFighters[0].str) {
                console.log("You attacked the ".concat(listOfFighters[1].name, " and dealt ").concat(listOfFighters[0].str, " damages!"));
                listOfFighters[1].currenthp -= listOfFighters[0].str;
            }
            else {
                listOfFighters[1].currenthp = 0;
            }
            return [2 /*return*/, listOfFighters];
        });
    });
}
exports.attack = attack;
// fonction heal : will heal the character by half of his maximum HP
function heal(listOfFighters) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (listOfFighters[0].currenthp < 0.5 * listOfFighters[0].maxhp) {
                console.log("You used heal and gain ".concat(0.5 * listOfFighters[0].maxhp, " HP!"));
                listOfFighters[0].currenthp += 0.5 * listOfFighters[0].maxhp;
            }
            else {
                listOfFighters[0].currenthp = listOfFighters[0].maxhp;
            }
            return [2 /*return*/, listOfFighters];
        });
    });
}
exports.heal = heal;
// fonction d'attaque de l'opposant
function opponentAttack(listOfFighters) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (listOfFighters[0].currenthp > listOfFighters[1].str) {
                console.log("The ".concat(listOfFighters[1].name, " attacked and dealt ").concat(listOfFighters[1].str, " damages!"));
                listOfFighters[0].currenthp -= listOfFighters[1].str;
            }
            else {
                listOfFighters[0].currenthp = 0;
            }
            return [2 /*return*/, listOfFighters];
        });
    });
}
exports.opponentAttack = opponentAttack;
//fonction qui permet de choisir des options entre attack et heal
function getAction() {
    return __awaiter(this, void 0, void 0, function () {
        var askAction, action;
        return __generator(this, function (_a) {
            askAction = new lib_1.Enquirer.Select({
                name: "action",
                message: "What do you do :",
                choices: ["Attack", "Heal"],
            });
            action = askAction.run();
            return [2 /*return*/, action];
        });
    });
}
exports.getAction = getAction;
