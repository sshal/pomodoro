import React from 'react';
import Timer from './Timer.jsx';

class ClockApp extends React.Component {
    constructor(props) {
        super(props);
        this.init = {
            work: 25,
            rest: 5
        };
        this.time = {
            id: 0,
            min: 0,
            sec: 59,
            worktime: true
        };
        this.view = 25;
        this.startCounter = this.startCounter.bind(this);
        this.pauseCounter = this.pauseCounter.bind(this);
        this.initCounts = this.initCounts.bind(this);
    }
    startCounter() {
        document.getElementById('start').classList.add('hide');
        document.getElementById('pause').classList.remove('hide');
        document.getElementById('defence').classList.remove('hide');
        if (!this.time.id) {
            this.time.min = this.init.work - 1;
            this.view = `${this.time.min} : ${this.time.sec}`;
        }
        (function countTime(obj) {
            obj.time.id = setInterval(function() {
                var sec = Number.parseInt(obj.time.sec);
                if (sec === 0 && obj.time.min === 0) {
                    var style = document.getElementById('timeview').classList;
                    (obj.time.worktime) ?
                        (obj.time.min = obj.init.rest, obj.time.worktime = false,
                            style.remove('working'), style.add('holiday')) :
                        (obj.time.min = obj.init.work, obj.time.worktime = true,
                            style.add('working'), style.remove('holiday'));
                } else if (sec === 0 && obj.time.min !== 0) {
                    obj.time.min -= 1;
                    obj.time.sec = 59;
                } else {
                    sec -= 1;
                    obj.time.sec = (sec < 10) ? "0" + sec : sec;
                }
                obj.view = `${obj.time.min} : ${obj.time.sec}`;
                obj.setState({});
            }, 1000);
        }(this));
        this.setState({});
    }
    pauseCounter() {
        document.getElementById('pause').classList.add('hide');
        document.getElementById('start').classList.remove('hide');
        document.getElementById('defence').classList.add('hide');
        clearInterval(this.time.id);
    }
    initCounts() {
        this.time = {
            id: 0,
            min: 0,
            sec: 59,
            worktime: true
        };
        this.init.work = this.refs.job.count;
        this.init.rest = this.refs.relax.count;
        this.view = this.init.work;
        document.getElementById('timeview').classList.remove('holiday');
        document.getElementById('timeview').classList.add('working');
        this.setState({});
    }
    render() {
        return (
            <div className="rel">
                <div id="head">Pomodoro</div>
                <div id="timeview" className="working">{this.view}</div>
                <div id="work" className="half inlblock" onClick={this.initCounts}>
                    <div className="title">work hard</div>
                    <Timer ref="job" name="w"/>
                </div>
                <div id="rest" className="half inlblock" onClick={this.initCounts}>
                    <div className="title">take a break</div>
                    <Timer ref="relax"/>
                </div>
                <div>
                    <button id="start" onClick={this.startCounter}>start</button>
                    <button id="pause" className="hide" onClick={this.pauseCounter}>pause</button>
                </div>
                <div id="defence" className="hide"></div>
            </div>
        )
    }
}

module.exports = ClockApp;
