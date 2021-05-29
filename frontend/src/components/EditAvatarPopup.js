import PopupWithForm from './PopupWithForm';
import { useRef } from 'react';


function EditAvatarPopup(props) {

    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value
        });
        avatarRef.current.value = '';
    }

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            name="edit-avatar"
            title="Обновить аватар"
            button="Сохранить"
            onSubmit={handleSubmit}
        >
            <label className="popup__label">     
                <input 
                    type="url" 
                    className="popup__input popup__add-url" 
                    name="avatar" 
                    ref={avatarRef}
                    placeholder="Ссылка на аватар" 
                    required
                /> 
                <span className="popup__error" id="avatar-error"></span>
            </label>  
        </PopupWithForm>
    );
}

export default EditAvatarPopup;