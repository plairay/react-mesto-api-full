import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.card.owner === currentUser._id;
    const cardDeleteButtonClassName = isOwn ? 'card__delete-button' : 'card__delete-button_hidden';

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.card.likes.some(i => i === currentUser._id);
    
    const cardLikeButtonClassName = isLiked
        ? 'card__like card__like_active'
        : 'card__like';
    

    function handleClick() {
        props.onCardClick({name: props.card.name, link: props.card.link});
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteCard() {
        props.onDeleteCard(props.card);
    }



    return (
        
        <div className="card">
            <img src ={props.card.link} alt={props.card.name} className="card__image" onClick={handleClick}/>
            <div className="card__name">
                <h2 className="card__title">{props.card.name}</h2>
                <div className="card__like-container">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <p className="card__number-likes">{props.card.likes.length}</p>
                </div>
            </div>
            <button type="button" onClick={handleDeleteCard} className={cardDeleteButtonClassName}></button>  
        </div>

    )
}

export default Card;