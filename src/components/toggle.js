import React, { Component } from 'react';

class Toggle extends Component {

    constructor(props) {
        super(props)
        this.state = {
            feeds: []
        }

    }
    updateFeed = (feed, index) => {
        console.log(this.state.feeds[0].isActive);
        feed.isActive = !feed.isActive;

        fetch('http://localhost:3000/feeds/' + feed._id, {
            body: JSON.stringify(feed),
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(updatedFeed => updatedFeed.json())
            .then(jsonedFeed => {
                console.log(jsonedFeed);
                fetch('http://localhost:3000/feeds/')
                    .then(response => response.json())
                    .then(feeds => {
                        this.setState({ feeds: feeds })
                    })
            })
    }

    componentDidMount() {
        fetch('http://localhost:3000/feeds')
            .then(response => response.json())
            .then(feeds => {
                this.setState({
                    feeds: feeds
                });
            })
    }

    render() {
        return (
            <table>
                <tbody>
                    {this.state.feeds.map(feed => {
                        return (
                            <tr>
                                <td> {feed.name} |</td>
                                <td onClick={() => this.updateFeed(feed)}> {feed.isActive ? "active" : "inactive"} </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }
}

export default Toggle;

