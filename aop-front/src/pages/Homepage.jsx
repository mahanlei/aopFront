import React from 'react'

class Homepage extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            current: '',
        }

    }
    render(){
        return <h1>HomePage</h1>
    }
}
export default Homepage