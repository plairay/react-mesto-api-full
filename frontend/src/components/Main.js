import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';



function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);
    
    return(
        <main className="content">

            <section className="profile">
                <div className="profile__info">
                    <div className ="profile__avatar-container" onClick={props.onEditAvatar}>
                        <img src={currentUser.avatar} className="profile__image" alt="аватар"/>
                    </div>    
                    <div className="profile__name">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button> 
                        <p className="profile__subtitle">{currentUser.about}</p>
                    </div>             
                </div>
                <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
            </section>
            
            <section className="cards">

                {props.cards.map((item) => {
                    return (  
                        
                        <Card 
                            key={item._id}
                            card={item}
                            onCardClick={props.onCardClick}
                            onCardLike={props.onCardLike} 
                            onDeleteCard={props.onCardDelete}
                        />
                        
                    )
                })}

            </section>

        </main>
    )
}


export default Main;