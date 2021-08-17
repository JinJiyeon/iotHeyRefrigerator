import React, { useContext, useState, useEffect } from 'react';
import {HeartOutlined, HeartFilled, ConsoleSqlOutlined} from '@ant-design/icons';
import './style.css'
import { CommonContext } from '../../../../context/CommonContext';
import axios from 'axios';

const LikeButton =()=> {
    const {recipeId, recipe} = useContext(CommonContext);
    const [isHeart, setIsHeart] = useState(false);
    useEffect(()=>{
        console.log('useEffect')
        if (recipe.isLiked) {
            setIsHeart(true)
        }
    }, [])

    const onClick = () => {
        {
            isHeart ?
            setIsHeart(false)
            :
            setIsHeart(true)
        }
        axios.get(`/user/likes/${recipeId.recipe_info_id}`)
            .then(res=>{
                console.log(res.data, 'like-axios');
            })
            .catch(err=>{
                console.log(err.response,'heart');
            })
        // console.log(heart)
    }
    return(
        <React.Fragment>
            <span className="icons-list">
                {
                isHeart ?  
                    <HeartFilled className="button red" onClick={onClick}/> :
                    <HeartOutlined className="button" onClick={onClick}/>
                }
                <button onClick={()=>{
                    console.log(recipe.isLiked)
                }}>
                    recipeId 콘솔
                </button>
            </span>
        </React.Fragment> 
    )
}

export default LikeButton;