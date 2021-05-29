import success from '../images/success.svg';
import fail from '../images/fail.svg';

export function InfoTooltip(props) {

    return (
        <div className={`popup ${props.status && 'popup__opened'}`}>
            <div className="popup__container">
                <img
                    className="popup__img-status"
                    src={`${props.status === 'success' ? success : fail}`} alt={`${props.status === 'success' ? 'Успешная регистрация' : 'Что-то пошло не так'}`} />
                <h2 className="popup__title popup__title-auth">{`${props.status === 'success' ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}`}</h2>
                <button
                    className="popup__close-button"
                    type="button"
                    aria-label="Закрыть попап"
                    onClick={props.onClose}
                >
                </button>  
            </div>


        </div>
    )
}

export function InfoTooltipLog(props) {

    return (
        <div className={`popup ${props.status && 'popup__opened'}`}>
            <div className="popup__container">
                <img
                    className="popup__img-status"
                    src={`${props.status === 'success' ? success : fail}`} alt={`${props.status === 'success' ? 'Успешная регистрация' : 'Что-то пошло не так'}`} />
                <h2 className="popup__title popup__title-auth">{`${props.status === 'success' ? 'Вы успешно вошли!' : 'Что-то пошло не так! Попробуйте еще раз.'}`}</h2>
                <button
                    className="popup__close-button"
                    type="button"
                    aria-label="Закрыть попап"
                    onClick={props.onClose}
                >
                </button>  
            </div>


        </div>
    )
}



