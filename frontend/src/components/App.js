import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api }  from '../utils/api';
import { useState, useEffect, useCallback} from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header.js';
import Hamburger from './Hamburger';
import Main from './Main.js';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import { InfoTooltip, InfoTooltipLog } from './InfoTooltip';
import * as auth from '../utils/auth';


function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setIsSelectedCard] = useState({name: '' , link: ''});
    const [currentUser, setCurrentUser] = useState({name: '', about: ''});;
    const [cards, setCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [tooltipStatusReg, setTooltipStatusReg] = useState('');
    const [tooltipStatusLog, setTooltipStatusLog] = useState('');
    const [hamburgerMenu, setHamburgerMenu] = useState(false);
    const history = useHistory();


    function onRegister(email, password) {
        auth.register(email, password)
          .then(res => {
            if (res._id) {
            setTooltipStatusReg('success');
            history.push('/signin')
           }
          })
          .catch(err => setTooltipStatusReg('fail'));
    }

    function onLogin({  email, password }) {
        auth.authorize({  email, password })
          .then(data => {
            if (data.token) {
              setEmail(email);
              localStorage.setItem('jwt', data.token);
              setLoggedIn(true);
              setTooltipStatusLog('success')
              history.push('/');
            }
          })
          .catch(err => setTooltipStatusLog('fail'));
    }

    function onSignOut() {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
        setHamburgerMenu(false);
        history.push('/signin');
    }

    const tokenCheck = useCallback(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
          auth.getContent(token)
            .then(res => {
              if (res) {
                setEmail(res.email);
                setLoggedIn(true);
                history.push('/');
              }
            })
            .catch(err => {
              console.log(err);
            })
        }
      }, [history])
    
      useEffect(() => {
        tokenCheck();
      }, [tokenCheck]);

    function handleHamburgerMenuClick() {
        setHamburgerMenu(prevHamburgerMenuState => !prevHamburgerMenuState);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }


    function handleCardClick(cardData) {
        setIsSelectedCard(cardData);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsSelectedCard({name: '', link: ''});
        setTooltipStatusReg('');
        setTooltipStatusLog('');
    }

    useEffect(() => {
        api.getUserInfo().then((userData) => {
          setCurrentUser(userData);
        })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        api
            .getInitialCards()
            .then((cardsData) => {
              setCards(cardsData);
            })
            .catch((err) => console.log(err));
    }, []);


    function handleUpdateUser(formData) {
        api.setUserInfo(formData).then((formData) => {
          setCurrentUser(formData);
          closeAllPopups();
        })
            .catch((err) => console.log(err));
    }

    function handleUpdateAvatar(formData) {
        api.setUserAvatar(formData).then((formData) => {
          setCurrentUser(formData);
          closeAllPopups();
        })
            .catch((err) => console.log(err));
    }

    function handleAddPlaceSubmit(newCard) {
        api.createCard(newCard).then((newCard) => {
          setCards([newCard, ...cards]);
          closeAllPopups();
        })
            .catch((err) => console.log(err));
      }

    function handleCardDelete(removedCard) {
        api.removeCard(removedCard._id).then(() => {
          const newArr = cards.filter(card => card._id !== removedCard._id);
          setCards(newArr);
        })
            .catch((err) => console.log(err));
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);
        console.log(card._id)
        api.changeLikeCardStatus(card._id, !isLiked)
          .then(newCard => {
            const newCards = cards.map(c => c._id === card._id ? newCard : c);
            setCards(newCards);
          })
          .catch(err => console.log(err));
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="page__container">
                    <Hamburger
                        isOpen={hamburgerMenu}
                        onHamburgerMenuClick={handleHamburgerMenuClick}
                        email={email}
                        onSignOut={onSignOut}
                    />
                    <Header
                        onHamburgerMenuClick={handleHamburgerMenuClick}
                        onSignOut={onSignOut}
                        email={email}
                        hamburgerMenuStatus={hamburgerMenu}
                    />
                    
                        <Switch>
                            <ProtectedRoute
                                exact
                                path="/"
                                loggedIn={loggedIn}
                                component={Main}
                                cards={cards}
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onEditAvatar={handleEditAvatarClick}
                                onCardClick={handleCardClick}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete}
                            />

                            <Route path="/signin">
                                <Login onLogin={onLogin} />
                            </Route>

                            <Route path="/signup">
                                <Register onRegister={onRegister} />
                            </Route>
                            
                            <Route>
                                {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
                            </Route>
                        </Switch>    


                        <Footer/>

                        
                        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}  onAddPlace={handleAddPlaceSubmit} /> 
                        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}  onUpdateUser={handleUpdateUser} /> 
                        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}  onUpdateAvatar={handleUpdateAvatar} /> 
                        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

                        <InfoTooltip status={tooltipStatusReg} onClose={closeAllPopups} />
                        <InfoTooltipLog status={tooltipStatusLog} onClose={closeAllPopups} />
                </div>
            </div>    
        </CurrentUserContext.Provider>            
    );
}


export default App;
