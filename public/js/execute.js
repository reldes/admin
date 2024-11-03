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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
exports.AVRRunner = void 0;
var avr8js_1 = require("avr8js");
// ATmega328p params
var FLASH = 0x8000;
function loadHex(source, target) {
    for (var _i = 0, _a = source.split('\n'); _i < _a.length; _i++) {
        var line = _a[_i];
        if (line[0] === ':' && line.substr(7, 2) === '00') {
            var bytes = parseInt(line.substr(1, 2), 16);
            var addr = parseInt(line.substr(3, 4), 16);
            for (var i = 0; i < bytes; i++) {
                target[addr + i] = parseInt(line.substr(9 + i * 2, 2), 16);
            }
        }
    }
}
var AVRRunner = /** @class */ (function () {
    function AVRRunner() {
        this.program = new Uint16Array(FLASH);
        this.stopped = false;
        this.uploadHex('');
        this.cpu = new avr8js_1.CPU(this.program);
        this.timer = new avr8js_1.AVRTimer(this.cpu, avr8js_1.timer0Config);
        this.portB = new avr8js_1.AVRIOPort(this.cpu, avr8js_1.portBConfig);
        this.portC = new avr8js_1.AVRIOPort(this.cpu, avr8js_1.portCConfig);
        this.portD = new avr8js_1.AVRIOPort(this.cpu, avr8js_1.portDConfig);
    }
    AVRRunner.prototype.uploadHex = function (hex) {
        loadHex(hex, new Uint8Array(this.program.buffer));
    };
    AVRRunner.prototype.execute = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.stopped = false;
                        _a.label = 1;
                    case 1:
                        (0, avr8js_1.avrInstruction)(this.cpu);
                        this.cpu.tick();
                        if (!(this.cpu.cycles % 50000 === 0)) return [3 /*break*/, 3];
                        callback(this.cpu);
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 0); })];
                    case 2:
                        _a.sent();
                        if (this.stopped) {
                            return [3 /*break*/, 4];
                        }
                        _a.label = 3;
                    case 3: return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AVRRunner.prototype.stop = function () {
        this.stopped = true;
    };
    return AVRRunner;
}());
exports.AVRRunner = AVRRunner;
