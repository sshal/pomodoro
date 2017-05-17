import React from 'react';

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.count = (this.props.name === "w") ? 25 : 5;
        this.increaseCount = this.increaseCount.bind(this);
        this.decreaseCount = this.decreaseCount.bind(this);
    }
    increaseCount() {
        this.count += 1;
        this.setState({});
    }
    decreaseCount() {
        (this.count === 1) ? -1 : this.count -= 1;
        this.setState({});
    }
    render() {
        return (
            <span>
                <button className="point minus" onClick={this.decreaseCount}>&#8681;</button>
                <div className="inlblock num">{this.count}</div>
                <button className="point plus" onClick={this.increaseCount}>&#x21e7;</button>
            </span>

        )
    }
}

module.exports = Timer;
