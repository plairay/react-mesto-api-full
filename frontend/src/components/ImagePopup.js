import React from 'react';

function ImagePopup(props) {

    return (

        <div className={`popup popup_type_view-image ${props.card.name && "popup__opened"}`} >
            <div className="popup__container-image">
                <img src ={props.card.link} alt={props.card.name} className="popup__card-image"/>
                <figure className="popup__figure">{props.card.name}</figure>
                <button className="popup__close-button" type="button" onClick={props.onClose}></button>
            </div>    
        </div> 

    )
}

export default ImagePopup;