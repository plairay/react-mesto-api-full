import PopupWithForm from './PopupWithForm';
import {useState, useEffect} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import React from 'react';


function EditProfilePopup(props) {

    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleAboutChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            name="popup-edit"
            title="Редактировать профиль"
            button="Сохранить"
            onSubmit={handleSubmit}
        >
            <label className="popup__label">
                <input 
                    type="text" 
                    className="popup__input popup__edit-name" 
                    name="title" 
                    value={name || ''} 
                    placeholder="Имя" 
                    minLength="2"
                    maxLength="40"
                    onChange={handleNameChange} 
                    required 
                />
                <span className="popup__error" id="title-error"></span>
            </label>
            <label className="popup__label">   
                <input 
                    type="text" 
                    className="popup__input popup__edit-profession" 
                    name="profession" 
                    value={description || ''} 
                    placeholder="О себе" 
                    minLength="2"
                    maxLength="200"
                    onChange={handleAboutChange}
                    required
                />
                <span className="popup__error" id="profession-error"></span>
            </label> 
        </PopupWithForm>
    );
}

export default EditProfilePopup;