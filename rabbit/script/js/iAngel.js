var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var angular;
var iAngel;
(function (iAngel) {
    var Utils = (function () {
        function Utils() {
        }
        Utils.getClassName = function (clazz, modules) {
            for (var i = 0; i < modules.length; i++) {
                for (var name in modules[i]) {
                    if (modules[i][name] == clazz) {
                        return name;
                    }
                }
            }
            for (var name in window) {
                if (window[name] == clazz) {
                    return name;
                }
            }
            return (clazz.toString().replace(/function\s?/mi, "").split("("))[0];
        };
        return Utils;
    }());
    iAngel.Utils = Utils;
    /**
     * U can use it create angularJS Object. like .controller('|N|name',['|P|$scope',|F|function($scope){...}])
     * The Class Name  => |N|
     */
    var Nut = (function () {
        /**
         * @param module module = angular.module, if U don't have any TypeScript about angular.module U can use type any.
         */
        function Nut(angel) {
            var thas = this;
            this._module = angel.module;
            this._angel = angel;
            var arr = this.getParams();
            if (!arr) {
                arr = [];
            }
            arr[arr.length] = function () {
                var params = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    params[_i] = arguments[_i];
                }
                return thas.onCreate.apply(thas, [this].concat(params));
            };
            this._init(arr, angel.module);
        }
        Object.defineProperty(Nut.prototype, "module", {
            /**
             * return module.
             */
            get: function () {
                return this._module;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Nut.prototype, "angel", {
            get: function () {
                return this._angel;
            },
            enumerable: true,
            configurable: true
        });
        return Nut;
    }());
    var Config = (function (_super) {
        __extends(Config, _super);
        function Config() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Config.prototype._init = function (arr, module) {
            module.config(arr);
        };
        return Config;
    }(Nut));
    iAngel.Config = Config;
    var Directive = (function (_super) {
        __extends(Directive, _super);
        function Directive() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Directive.prototype.getName = function () {
            return this._name;
        };
        Directive.prototype._init = function (arr, module) {
            this._name = Utils.getClassName(this.constructor, this.angel.typeModules);
            module.directive(this.getName(), arr);
        };
        return Directive;
    }(Nut));
    iAngel.Directive = Directive;
    var Controller = (function (_super) {
        __extends(Controller, _super);
        function Controller() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Controller.prototype.getName = function () {
            return this._name;
        };
        Controller.prototype._init = function (arr, module) {
            this._name = Utils.getClassName(this.constructor, this.angel.typeModules);
            module.controller(this.getName(), arr);
        };
        return Controller;
    }(Nut));
    iAngel.Controller = Controller;
    var Service = (function (_super) {
        __extends(Service, _super);
        function Service() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Service.prototype.getName = function () {
            return this._name;
        };
        Service.prototype._init = function (arr, module) {
            this._name = Utils.getClassName(this.constructor, this.angel.typeModules);
            module.service(this.getName(), arr);
        };
        return Service;
    }(Nut));
    iAngel.Service = Service;
    var Angel = (function () {
        /**
         *
         * @param name angularJS's module name
         * @param dep angularJS and typeScript dependencies
         */
        function Angel(name, dep) {
            var strs = [];
            var objs = [];
            for (var value in dep) {
                if (typeof dep[value] == 'string') {
                    strs.push(dep[value]);
                }
                else if (typeof dep[value] == 'object') {
                    objs.push(dep[value]);
                }
            }
            this._module = angular.module(name, strs);
            this._typeModules = objs;
        }
        Object.defineProperty(Angel.prototype, "module", {
            get: function () {
                return this._module;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Angel.prototype, "typeModules", {
            get: function () {
                return this._typeModules;
            },
            enumerable: true,
            configurable: true
        });
        return Angel;
    }());
    iAngel.Angel = Angel;
})(iAngel || (iAngel = {}));
