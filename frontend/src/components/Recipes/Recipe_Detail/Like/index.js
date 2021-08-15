import React from 'react';
import {HeartOutlined, HeartFilled} from '@ant-design/icons';
import './style.css'

class LikeButton extends React.Component{
    state = {
        isChecked: false,
        notice: ' ',
    };

    onClick = () => {
        this.state.isChecked ?
        this.setState({
            isChecked: false,            
            notice: '좋아요',
        })
        :
        this.setState({
            isChecked: true,
            notice: '좋아요 취소',
        });
    }
    render(){
        return(
            <React.Fragment>
                <span className="icons-list">
                    {this.state.isChecked ?  
                    <HeartFilled className="button red" onClick={this.onClick}/> :
                    <HeartOutlined className="button" onClick={this.onClick}/>}
                    <h3>{this.state.notice}</h3>
                </span>
            </React.Fragment> 
        )
    }
}

export default LikeButton;