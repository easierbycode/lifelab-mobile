declare var StateMachine: any;

import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';


var r, o, s;
r = function() {
    function t() {}
    return t['random'] = function(t, e, n) {
        var i, r, o, s;
        if (n > t * e)
            throw new Error("IT CANNOT BE DONE!!!!");
        for (i = this.emptyBoard(t, e),
        r = 0; n > r; )
            o = ~~(Math.random() * t),
            s = ~~(Math.random() * e),
            i[o][s] || (i[o][s] = !0,
            r++);
        return i
    }
    ,
    t['emptyBoard'] = function(t, e) {
        var n, i, r;
        return n = function() {
            var n, o, s;
            for (s = [],
            i = n = 0,
            o = t; o >= 0 ? o > n : n > o; i = o >= 0 ? ++n : --n)
                s.push(function() {
                    var t, n, i;
                    for (i = [],
                    r = t = 0,
                    n = e; n >= 0 ? n > t : t > n; r = n >= 0 ? ++t : --t)
                        i.push(!1);
                    return i
                }());
            return s
        }()
    }
    ,
    t['equals'] = function(t, e) {
        var n, i, r, o, s, a, u, l;
        for (l = n = 0,
        r = t.length; r > n; l = ++n)
            for (s = t[l],
            u = i = 0,
            o = s.length; o > i; u = ++i)
                if (a = s[u],
                a !== e[l][u])
                    return !1;
        return !0
    }
    ,
    t['hasAllAnswers'] = function(t, e) {
        var n, i, r, o, s, a, u, l;
        for (l = n = 0,
        r = t.length; r > n; l = ++n)
            for (s = t[l],
            u = i = 0,
            o = s.length; o > i; u = ++i)
                if (a = s[u],
                a !== e[l][u] && e[l][u] === !1)
                    return !1;
        return !0
    }
    ,
    t['numFalsePositives'] = function(t, e) {
        var n, i, r, o, s, a, u, l, c;
        for (s = 0,
        c = n = 0,
        r = t.length; r > n; c = ++n)
            for (a = t[c],
            l = i = 0,
            o = a.length; o > i; l = ++i)
                u = a[l],
                u !== e[c][l] && e[c][l] === !0 && s++;
        return s
    }
    ,
    t
}(),
s = function() {
    function t(t) {
        var e, n;
        this.actualAnswers = t,
        this.userAnswers = function() {
            var t, i, r, o;
            for (r = this.actualAnswers,
            o = [],
            t = 0,
            i = r.length; i > t; t++)
                e = r[t],
                o.push(function() {
                    var t, i, r;
                    for (r = [],
                    t = 0,
                    i = e.length; i > t; t++)
                        n = e[t],
                        r.push(!1);
                    return r
                }());
            return o
        }
        .call(this),
        this.blankBoard = r.emptyBoard(this.actualAnswers.length, this.actualAnswers[0].length),
        this.squares = this.actualAnswers
    }
    return t.prototype.clickedSquare = function(t, e) {
        return this.userAnswers[e][t] === !0 ? 0 : (this.userAnswers[e][t] = !0,
        this.userAnswers[e][t] !== this.actualAnswers[e][t] ? -1 : 0)
    }
    ,
    t.prototype.checkWinCondition = function() {
        return r.hasAllAnswers(this.actualAnswers, this.userAnswers)
    }
    ,
    t.prototype.numFalsePositives = function() {
        return r.numFalsePositives(this.actualAnswers, this.userAnswers)
    }
    ,
    t
}(),
o = function() {
    
    var t = setTimeout;
    
    function n() {
        this.remainingLives = 3,
        this.stageNum = 1,
        this.score = 0,
        this.combo = 1,
        this.blockTileClicks = !0,
        this.highestStage = 0,
        this.initStage(),
        this.fsm = StateMachine.create({
            initial: "splash",
            events: [{
                name: "start",
                from: "splash",
                to: "preflip"
            }, {
                name: "showanswers",
                form: "preflip",
                to: "flipped"
            }, {
                name: "hideanswers",
                from: "flipped",
                to: "usertest"
            }, {
                name: "endlevel",
                from: "usertest",
                to: "levelrecap"
            }, {
                name: "endlevelrecap",
                from: "levelrecap",
                to: "postrecap"
            }, {
                name: "closelevelrecap",
                from: "postrecap",
                to: "preflip"
            }, {
                name: "endgame",
                form: "usertest",
                to: "gameover"
            }],
            callbacks: {
                onpreflip: function(e) {
                    return function() {
                        return e.initStage(),
                        t(function() {
                            return e.fsm.showanswers()
                        }, 500)
                    }
                }(this),
                onflipped: function(e) {
                    return function() {
                        return t(function() {
                            return e.fsm.hideanswers()
                        }, 1200)
                    }
                }(this),
                onlevelrecap: function(e) {
                    return function(n, i, r, o) {
                        return t(function() {
                            return e.fsm.endlevelrecap(o)
                        }, 500)
                    }
                }(this),
                onendlevelrecap: function(e) {
                    return function(n, i, r, o) {
                        return t(function() {
                            return e.fsm.closelevelrecap(o)
                        }, 500)
                    }
                }(this),
                onbeforecloselevelrecap: function(t) {
                    return function(e, n, i, r) {
                        return r ? t.stageNum++ : (t.remainingLives--,
                        t.outOfLives() ? (t.fsm.endgame(),
                        !1) : t.stageNum = Math.max(1, t.stageNum - 1))
                    }
                }(this)
            }
        })
    }
    return n.prototype.classesForSquare = function(t, e) {
        return {
            active: this.isActive(t, e),
            error: this.isError(t, e)
        }
    }
    ,
    n.prototype.isActive = function(t, e) {
        return this.getDisplaySquares()[e][t] === !0
    }
    ,
    n.prototype.isError = function(t, e) {
        switch (this.fsm.current) {
        case "usertest":
        case "levelrecap":
            return this.stage.userAnswers[e][t] === !0 && this.stage.actualAnswers[e][t] === !1;
        default:
            return !1
        }
    }
    ,
    n.prototype.getDisplaySquares = function() {
        switch (this.fsm.current) {
        case "flipped":
            return this.stage.actualAnswers;
        case "usertest":
        case "levelrecap":
            return this.stage.userAnswers;
        default:
            return this.stage.blankBoard
        }
    }
    ,
    n.prototype.initStage = function() {
        var t, e, n;
        return this.highestStage = Math.max(this.highestStage, this.stageNum),
        e = this.getDimForStage(),
        t = 2 + this.stageNum,
        n = r.random(e, e, t),
        this.stage = new s(n)
    }
    ,
    n.prototype.clickedSquare = function(t, e) {
        var n, i;
        if ("usertest" === this.fsm.current && this.stage.userAnswers[e][t] !== !0)
            return i = this.stage.clickedSquare(t, e),
            0 === i ? (n = this.combo * this.stageNum,
            this.lastClickScore = n,
            this.score += n,
            this.combo++) : this.combo = 1,
            this.stage.numFalsePositives() >= 3 ? this.fsm.endlevel(!1) : this.stage.checkWinCondition() ? this.fsm.endlevel(!0) : void 0
    }
    ,
    n.prototype.outOfLives = function() {
        return this.remainingLives <= 0
    }
    ,
    n.prototype.getDimForStage = function() {
        return ~~Math.sqrt(9 + 3 * this.stageNum)
    }
    ,
    n.prototype.individualSquareWidth = function() {
        var t;
        return t = Math.floor(this.maxWidthForDevice() / this.getDimForStage() - 1),
        {
            width: t + "px",
            height: t + "px",
            borderWidth: t / 16 + "px",
            borderRadius: t / 8 + "px"
        }
    }
    ,
    n.prototype.maxWidthForDevice = function() {
        return Math.min(440, window.innerWidth - 50)
    }
    ,
    n.prototype.save = function() {
        var t;
        return this.saving = !0,
        t = {
            score: this.score,
            highest_level: this.highestStage
        }
    }
    ,
    n
}()


@Component({
  selector: 'page-memory-test',
  templateUrl: 'memory-test.html'
})
export class MemoryTest {

  testManager;
  
  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {
    this.testManager = new o;
  }

  dismiss() {
    this.viewCtrl.dismiss()
  }

}
