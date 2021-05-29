import React from 'react';

function PopupWithForm(props) {

    return (

        <div className={`popup popup_type_${props.name}} ${props.isOpen && 'popup__opened'}`}>
          <div className="popup__container">
              <h3 className="popup__title">{props.title}</h3>
              <form action="#" className="popup__form" name={props.name} onSubmit={props.onSubmit}>   
                  {props.children} 
                  <button type="submit" className="popup__button">{props.button}</button>
              </form>
              <button aria-label="Закрыть попап" className="popup__close-button" type="button" onClick={props.onClose}></button>
          </div>
        </div>
    
    );
}

export default PopupWithForm;