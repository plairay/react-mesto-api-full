class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }

    getUserInfo() {
        return fetch(`${this._url}users/me`, {
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}. Данные пользователя с сервера не получены`);
            })
    }

    getInitialCards() {
        return fetch(`${this._url}cards`, {
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}. Карточки с сервера не загружены`);
            })
    }

    setUserInfo(formData) {
        return fetch(`${this._url}users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: formData.name,
                about: formData.about,
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}. Данные пользователя не отправлены на сервер`);
            })
    }

    createCard(formData) {
        return fetch(`${this._url}cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: formData.name,
                link: formData.link
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}. Карточка на сервер не добавлена`);
            })
    }

    removeCard(id) {
        return fetch(`${this._url}cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}. Карточку не удалось удалить`);
            })
    }

    changeLikeCardStatus(cardId, isLiked) {
        console.log(isLiked)
        console.log(cardId)
        return fetch(`${this._url}cards/${cardId}/likes`, {
            method: isLiked ? 'PUT' : 'DELETE',
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}. Лайк не поставлен`);
            })
    }


    unLikeCard(id) {
        return fetch(`${this._url}cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}. Лайк не удален`);
            })
    }

    setUserAvatar(formData) {
        return fetch(`${this._url}users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: formData.avatar
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}. Аватар не обновлен`);
            })
    }
}    

export const api = new Api({
    url: 'https://api.plairay.nomoredomains.icu/',
    headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
    }
});