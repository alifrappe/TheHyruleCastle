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
exports.displayBoss = exports.initBoss = void 0;
var action_1 = require("./action");
var start_1 = require("./start");
var lib_1 = require("./lib");
var basic_game_customisation_1 = require("../basic_game_customisation/basic_game_customisation");
// fonction pour initialiser le niveau avec boss
function initBoss(mode) {
    var characters = (0, start_1.getJson)("./json/players.json");
    var boss = (0, start_1.getJson)("./json/bosses.json");
    var listOfFighters = [];
    var player = (0, start_1.getCharacter)(characters, "player");
    var opponent = (0, start_1.getCharacter)(boss, "boss");
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
    return listOfFighters;
}
exports.initBoss = initBoss;
//
function displayBoss(listOfFighters) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("=========================================");
                    return [4 /*yield*/, lib_1.figlet.text("".concat(listOfFighters[1].name), function (err, endMessage) {
                            if (err) {
                                console.log("Error with end message");
                                console.dir(err);
                                return;
                            }
                            console.log(lib_1.colors.red(endMessage));
                            console.log("\n");
                        })];
                case 1:
                    _a.sent();
                    // display life bar
                    console.log("".concat(listOfFighters[0].name));
                    (0, action_1.displayHP)(listOfFighters[0]);
                    console.log(listOfFighters[1].name);
                    (0, action_1.displayHP)(listOfFighters[1]);
                    return [2 /*return*/];
            }
        });
    });
}
exports.displayBoss = displayBoss;
