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
function addOnloadEvent(load) {
    var oldload = window.onload;
    if (typeof oldload != 'function') {
        window.onload = load;
        return;
    }
    window.onload = function () {
        oldload();
        load();
    };
}
var home;
(function (home) {
    var Title;
    (function (Title) {
        Title[Title["Default"] = 0] = "Default";
        Title[Title["Home"] = 1] = "Home";
        Title[Title["Love"] = 2] = "Love";
        Title[Title["Connect"] = 3] = "Connect";
        Title[Title["Dinner"] = 4] = "Dinner";
        Title[Title["Picture"] = 5] = "Picture";
    })(Title || (Title = {}));
    var MainController = (function (_super) {
        __extends(MainController, _super);
        function MainController() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._title = MainController.TITLES[0];
            _this._tag = Title.Default;
            return _this;
        }
        MainController.prototype.getParams = function () {
            return ['$scope'];
        };
        Object.defineProperty(MainController.prototype, "title", {
            get: function () {
                return this._title;
            },
            set: function (t) {
                this._title = t;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MainController.prototype, "tag", {
            get: function () {
                return this._tag;
            },
            set: function (t) {
                this._title = MainController.TITLES[t];
                this._tag = t;
            },
            enumerable: true,
            configurable: true
        });
        MainController.prototype.back = function () {
            var h = history;
            h.back(-1);
        };
        MainController.prototype.getTagClass = function (t) {
            return t == this.tag ? 'action' : null;
        };
        MainController.prototype.onCreate = function (thas, $scope) {
            $scope.mainCtrl = this;
        };
        return MainController;
    }(iAngel.Controller));
    MainController.TITLES = [
        "Title",
        'Home',
        'Love',
        'Connect',
        'Dinner',
        'Gallery'
    ];
    home.MainController = MainController;
    var HomeController = (function (_super) {
        __extends(HomeController, _super);
        function HomeController(angel, main) {
            var _this = _super.call(this, angel) || this;
            _this._main = main;
            return _this;
        }
        HomeController.prototype.goHref = function (url) {
            location.href = url;
        };
        HomeController.prototype.alert = function () {
            alert('Author');
        };
        HomeController.prototype.getParams = function () {
            return ['$scope'];
        };
        HomeController.prototype.onCreate = function (thas, $scope) {
            this._main.tag = Title.Home;
            $scope.ctrl = this;
        };
        return HomeController;
    }(iAngel.Controller));
    home.HomeController = HomeController;
    var LoveController = (function (_super) {
        __extends(LoveController, _super);
        function LoveController(angel, main) {
            var _this = _super.call(this, angel) || this;
            _this._main = main;
            return _this;
        }
        LoveController.prototype.getParams = function () {
            return ['$scope'];
        };
        LoveController.prototype.onCreate = function (thas, $scope) {
            this._main.tag = Title.Love;
            $scope.ctrl = this;
        };
        return LoveController;
    }(iAngel.Controller));
    home.LoveController = LoveController;
    var PicController = (function (_super) {
        __extends(PicController, _super);
        function PicController(angel, main) {
            var _this = _super.call(this, angel) || this;
            _this._main = main;
            return _this;
        }
        PicController.prototype.getParams = function () {
            return ['$scope'];
        };
        PicController.prototype.onCreate = function (thas, $scope) {
            this._main.tag = Title.Picture;
            $scope.ctrl = this;
            var stage = document.getElementById('stage');
            var showPic = function (witchPic) {
                var href = witchPic.getAttribute('href');
                if (!href)
                    return false;
                if (stage.nodeName !== 'IMG')
                    return false;
                stage.src = href;
                return true;
            };
            var gallery = document.getElementById('gallery');
            var links = gallery.getElementsByTagName('a');
            for (var i = 0; i < links.length; i++) {
                links[i].onclick = function () {
                    return !showPic(this);
                };
            }
        };
        return PicController;
    }(iAngel.Controller));
    home.PicController = PicController;
    var ConnectController = (function (_super) {
        __extends(ConnectController, _super);
        function ConnectController(angel, main) {
            var _this = _super.call(this, angel) || this;
            _this._main = main;
            return _this;
        }
        ConnectController.prototype.getParams = function () {
            return ['$scope'];
        };
        ConnectController.prototype.onCreate = function (thas, $scope) {
            this._main.tag = Title.Connect;
            $scope.ctrl = this;
        };
        return ConnectController;
    }(iAngel.Controller));
    home.ConnectController = ConnectController;
    var DinnerController = (function (_super) {
        __extends(DinnerController, _super);
        function DinnerController(angel, main) {
            var _this = _super.call(this, angel) || this;
            _this._main = main;
            return _this;
        }
        DinnerController.prototype.getParams = function () {
            return ['$scope'];
        };
        DinnerController.prototype.onCreate = function (thas, $scope) {
            this._main.tag = Title.Dinner;
            $scope.ctrl = this;
        };
        return DinnerController;
    }(iAngel.Controller));
    home.DinnerController = DinnerController;
})(home || (home = {}));
var utils;
(function (utils) {
    var utilTitle = (function (_super) {
        __extends(utilTitle, _super);
        function utilTitle() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        utilTitle.prototype.getParams = function () { return null; };
        utilTitle.prototype.onCreate = function () {
            return {
                templateUrl: './view/title.html'
            };
        };
        return utilTitle;
    }(iAngel.Directive));
    utils.utilTitle = utilTitle;
    var utilFoot = (function (_super) {
        __extends(utilFoot, _super);
        function utilFoot() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        utilFoot.prototype.getParams = function () { return null; };
        utilFoot.prototype.onCreate = function () {
            return {
                templateUrl: './view/foot.html'
            };
        };
        return utilFoot;
    }(iAngel.Directive));
    utils.utilFoot = utilFoot;
})(utils || (utils = {}));
function init() {
    document.body.addEventListener('touchstart',function(){});
}
addOnloadEvent(init);
var angel = new iAngel.Angel('rabbit', ['ui.router', home, utils]);
var home_main = new home.MainController(angel);
var home_home = new home.HomeController(angel, home_main);
var home_love = new home.LoveController(angel, home_main);
var home_dinner = new home.DinnerController(angel, home_main);
var home_connect = new home.ConnectController(angel, home_main);
var home_pic = new home.PicController(angel, home_main);
var utils_title = new utils.utilTitle(angel);
var utils_foot = new utils.utilFoot(angel);
var app = angel.module;
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");
    $stateProvider
        .state('home', {
        url: "/home",
        templateUrl: "./home.html",
        controller: 'HomeController'
    })
        .state('love', {
        url: "/love",
        templateUrl: "./love.html",
        controller: 'LoveController'
    })
        .state('connect', {
        url: "/connect",
        templateUrl: "./connect.html",
        controller: 'ConnectController'
    })
        .state('dinner', {
        url: "/dinner",
        templateUrl: "./dinner.html",
        controller: 'DinnerController'
    })
        .state('picture', {
        url: "/picture",
        templateUrl: "./picture.html",
        controller: 'PicController'
    });
});
