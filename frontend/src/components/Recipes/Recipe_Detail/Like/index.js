import React, { useContext, useState } from 'react';
import {HeartOutlined, HeartFilled} from '@ant-design/icons';
import './style.css'
import { CommonContext } from '../../../../context/CommonContext';
import axios from 'axios';

const LikeButton =()=> {
    const {recipeId} = useContext(CommonContext);
    const [heart, setHeart] = useState({
        isChecked: false,
        notice: ''
    })
    // state = {
    //     isChecked: false,
    //     notice: ' ',
    // };

    const onClick = () => {
        {
            heart.isChecked ?
            setHeart({...heart, isChecked: false, notice:'좋아요 취소'})
            :
            setHeart({...heart, isChecked: true, notice:'좋아요'})
        }
        axios.get(`/user/likes/${recipeId.recipe_info_id}`)
            .then(res=>{
                console.log(res.data, 'heart');
            })
            .catch(err=>{
                console.log(err.response,'heart');
            })
        console.log(heart)
        // this.state.isChecked ?
        // this.setState({
        //     isChecked: false,            
        //     notice: '좋아요',
        // })
        // :
        // this.setState({
        //     isChecked: true,
        //     notice: '좋아요 취소',
        // });
    }
    return(
        <React.Fragment>
            <span className="icons-list">
                {heart.isChecked ?  
                    <HeartFilled className="button red" onClick={onClick}/> :
                    <HeartOutlined className="button" onClick={onClick}/>
                    }
                <h3>{heart.notice}</h3>
            </span>
        </React.Fragment> 
    )
}

export default LikeButton;