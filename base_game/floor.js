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
exports.launchAllFloors = exports.launchFloorFights = exports.launchFight = exports.initFloor = void 0;
var basic_game_customisation_1 = require("../basic_game_customisation/basic_game_customisation");
var action_1 = require("./action");
var end_1 = require("./end");
var start_1 = require("./start");
var bosses_1 = require("./bosses");
// fonction pour initialiser un floor
function initFloor(player, mode) {
    var enemies = (0, start_1.getJson)("./json/enemies.json");
    var listOfFighters = [];
    var opponent = (0, start_1.getCharacter)(enemies, "enemi");
    if (player) {
        listOfFighters.push(player);
    } // get random character
    if (opponent) {
        listOfFighters.push(opponent);
    } // get random opponent
    if (mode === "Difficult") {
        listOfFighters = (0, basic_game_customisation_1.difficultMode)(listOfFighters);
    }
    else if (mode === "Insane") {
        listOfFighters = (0, basic_game_customisation_1.difficultMode)(listOfFighters);
    }
    // display life bar
    console.log("".concat(listOfFighters[0].name));
    (0, action_1.displayHP)(listOfFighters[0]);
    console.log(listOfFighters[1].name);
    (0, action_1.displayHP)(listOfFighters[1]);
    return listOfFighters;
}
exports.initFloor = initFloor;
//fonction combat
function launchFight(listOfFighters, nbFloor) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, action_1.getAction)()];
                case 1:
                    if (!((_a.sent()) === "Attack")) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, action_1.attack)(listOfFighters)];
                case 2:
                    listOfFighters = _a.sent();
                    return [3 /*break*/, 6];
                case 3: return [4 /*yield*/, (0, action_1.getAction)()];
                case 4:
                    if (!((_a.sent()) === "Heal")) return [3 /*break*/, 6];
                    return [4 /*yield*/, (0, action_1.heal)(listOfFighters)];
                case 5:
                    listOfFighters = _a.sent();
                    _a.label = 6;
                case 6: return [4 /*yield*/, (0, action_1.opponentAttack)(listOfFighters)];
                case 7:
                    // attaque opponent
                    listOfFighters = _a.sent();
                    // display life bar
                    console.log("".concat(listOfFighters[0].name));
                    (0, action_1.displayHP)(listOfFighters[0]);
                    console.log(listOfFighters[1].name);
                    (0, action_1.displayHP)(listOfFighters[1]);
                    return [2 /*return*/, listOfFighters];
            }
        });
    });
}
exports.launchFight = launchFight;
//fonction qui lance un niveau (i.e. floor)
function launchFloorFights(listOfFighters) {
    return __awaiter(this, void 0, void 0, function () {
        var hp_player, hp_opponent, nbRound;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    hp_player = listOfFighters[0].currenthp;
                    hp_opponent = listOfFighters[1].currenthp;
                    nbRound = 1;
                    _a.label = 1;
                case 1: return [4 /*yield*/, launchFight(listOfFighters, nbRound)];
                case 2:
                    listOfFighters = _a.sent();
                    hp_player = listOfFighters[0].currenthp;
                    hp_opponent = listOfFighters[1].currenthp;
                    nbRound++;
                    _a.label = 3;
                case 3:
                    if (hp_opponent > 0 && hp_player > 0) return [3 /*break*/, 1];
                    _a.label = 4;
                case 4: return [2 /*return*/, listOfFighters];
            }
        });
    });
}
exports.launchFloorFights = launchFloorFights;
// fonction qui lance tous les floors
function launchAllFloors(mode) {
    return __awaiter(this, void 0, void 0, function () {
        var characters, player, i, listOfFighters, choice, listOfFighters, situation, choice;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    characters = (0, start_1.getJson)("./json/players.json");
                    player = (0, start_1.getCharacter)(characters, "player");
                    i = 9;
                    _a.label = 1;
                case 1:
                    if (!(i < 11)) return [3 /*break*/, 9];
                    console.log("=========== FLOOR ".concat(i + 1, " ==========="));
                    if (!player) return [3 /*break*/, 4];
                    listOfFighters = initFloor(player, mode);
                    return [4 /*yield*/, launchFloorFights(listOfFighters)];
                case 2:
                    listOfFighters = _a.sent();
                    if (!((0, end_1.fightEndMessage)(listOfFighters) == "end")) return [3 /*break*/, 4];
                    console.clear();
                    return [4 /*yield*/, (0, end_1.askEndGame)(listOfFighters)];
                case 3:
                    choice = _a.sent();
                    (0, end_1.endGame)(choice);
                    return [3 /*break*/, 9];
                case 4:
                    if (!(i == 10)) return [3 /*break*/, 8];
                    listOfFighters = (0, bosses_1.initBoss)(mode);
                    return [4 /*yield*/, (0, bosses_1.displayBoss)(listOfFighters)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, launchFloorFights(listOfFighters)];
                case 6:
                    listOfFighters = _a.sent();
                    situation = (0, end_1.fightEndMessage)(listOfFighters);
                    if (!((0, end_1.fightEndMessage)(listOfFighters) == "end")) return [3 /*break*/, 8];
                    console.clear();
                    return [4 /*yield*/, (0, end_1.askEndGame)(listOfFighters)];
                case 7:
                    choice = _a.sent();
                    (0, end_1.endGame)(choice);
                    _a.label = 8;
                case 8:
                    i++;
                    return [3 /*break*/, 1];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.launchAllFloors = launchAllFloors;
