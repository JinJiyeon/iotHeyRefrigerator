import React, { useContext, useState, useEffect } from 'react';
import {HeartOutlined, HeartFilled} from '@ant-design/icons';
import './style.css'
import { CommonContext } from '../../../../context/CommonContext';
import axios from 'axios';



const LikeButton =()=> {
    const {recipeId, recipe} = useContext(CommonContext);
    const [isHeart, setIsHeart] = useState(false);
    useEffect(()=>{
        console.log('useEffect')
        if (recipe.isLiked) {
            setIsHeart(true);
        } else{
            setIsHeart(false);
        }

    }, [recipe])

    const onClick = () => {
        setIsHeart(!isHeart);
        axios.get(`/user/likes/${recipeId.recipe_info_id}`)
            .then(res=>{
                console.log(res.data, 'like-axios');
            })
            .catch(err=>{
                console.log(err.response,'heart');
            })
    }
    return(
            <span className="icons-list" display="inline">
                {
                isHeart ?  
                    <HeartFilled className="button red" onClick={onClick}/> :
                    <HeartOutlined className="button" onClick={onClick}/>
                }
            </span>
    )
}

export default LikeButton;