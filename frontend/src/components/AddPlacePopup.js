import PopupWithForm from './PopupWithForm';
import { useState } from 'react';


function AddPlacePopup(props) {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleAddName(e) {
        setName(e.target.value);
    }

    function handleAddLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name,
            link
        });
        setName('');
        setLink('');
    }

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            name="add-image"
            title="Новое место"
            button="Создать"
            onSubmit={handleSubmit}
        >
            <label className="popup__label"> 
                <input 
                    type="text" 
                    className="popup__input popup__add-place" 
                    name="name" 
                    value={name}
                    minLength="2"
                    maxLength="40" 
                    placeholder="Название" 
                    onChange={handleAddName}
                    required
                />
                <span className="popup__error" id="name-error"></span>
            </label>
            <label className="popup__label">     
                <input 
                    type="url" 
                    className="popup__input popup__add-url" 
                    name="link" 
                    value={link}
                    minLength="2"
                    maxLength="200"
                    placeholder="Ссылка на картинку" 
                    onChange={handleAddLink}
                    required
                /> 
                <span className="popup__error" id="link-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default AddPlacePopup;