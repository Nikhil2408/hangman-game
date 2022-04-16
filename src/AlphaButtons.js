import React, {Component} from "react";


class AlphaButtons extends Component{

    generateAlphaButtons(){
        let buttons = "abcdefghijklmnopqrstuvwxyz".split("").map(alpha => {
            return <button class="AlphaButtons-btn" key = {alpha} value = {alpha} onClick={this.props.click}>
                        {alpha}
                   </button>
        });
        
        return buttons;
    }

    render(){
        return (
            <div>
                {this.generateAlphaButtons()}
            </div>
        )
    }
}

export default AlphaButtons;