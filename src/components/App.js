import React, { useEffect, useState } from 'react';

import api from '../utils/api.js';

import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ConfirmationPopup from './ConfirmationPopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [selectedCard, setSelectedCard] = React.useState({});
    const [isConfirmationPopupOpen, setConfirmationPopupOpen] = useState(null);

  const [isLoading, setLoading] = useState(false);

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = useState([]);
  const [removedCardId, setRemovedCardId] = useState('');

  useEffect(() => {
		Promise.all([api.getUserInfo(), api.getCardsList()]).then(([profileInfo, card]) => {
			setCurrentUser(profileInfo);
			setCards(card);
		}).catch((err) => {
			console.error(err);
		})
	}, [])

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }


  function handleCardLike(card) {
		const isLiked = card.likes.some((i) => i._id === currentUser._id);

		if (!isLiked) {
			api.setLike(card._id).then((newCard) => {
				setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
			}).catch((err) => {
				console.error(err);
			});
		} else {
			api.deleteLike(card._id).then((newCard) => {
				setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
			}).catch((err) => {
				console.error(err);
			});
		}
	}

  function handleUpdateUser(data) {
		setLoading(true);
		api.editUserInfo(data).then((newUser) => {
			setCurrentUser(newUser);
			closeAllPopups();
		}).catch((err) => {
			console.error(err);
		})
			.finally(() => { setLoading(false) });
	}

	function handleUpdateAvatar(data) {
		setLoading(true);
		api.editAvatar(data).then((newAvatar) => {
			setCurrentUser(newAvatar);
			closeAllPopups();
		}).catch((err) => {
			console.error(err);
		}).finally(() => { setLoading(false) });
	}


	function handleAddPlaceSubmit(data) {
		setLoading(true);
		api.creatCard(data).then((newCard) => {
			setCards([newCard, ...cards]);
			closeAllPopups();
		}).catch((err) => {
			console.error(err);
		}).finally(() => { setLoading(false) });
	}

	function handleConfimationClick(card) {
		setConfirmationPopupOpen(card);
		setRemovedCardId(card);
	}

	function handleCardDelete(card) {
		api.deleteCard(card._id).then(() => {
			setCards((items) => items.filter((c) => c._id !== card._id && c));
		}).catch((err) => {
			console.error(err);
		});
		// api.deleteCard(card._id).then(res => console.log(res))
	}

	function closeAllPopups() {
		setIsEditProfilePopupOpen(false)
		setIsAddPlacePopupOpen(false)
		setIsEditAvatarPopupOpen(false)
		setSelectedCard({})
		setConfirmationPopupOpen(null);
	}

	function closePopupWithEsc(event) {
		if (event.key === 'Escape') {
			closeAllPopups();
		}
	}

	function closePopupWithClickOnOverlay(event) {
		if (event.target.classList.contains('popup_opened')) {
			closeAllPopups();
		}
	}

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
          <div className ="page">  
              <Header />
              <Main
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              cards={cards}
              onConfirmCardDelete={handleConfimationClick}
              />
              <Footer />

              <EditProfilePopup 
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopups}
                  onCloseEsc={closePopupWithEsc}
                  onCloseOverlay={closePopupWithClickOnOverlay}
                  onUpdateUser={handleUpdateUser}
                  isLoading={isLoading}
              />

              <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onCloseEsc={closePopupWithEsc}
                onCloseOverlay={closePopupWithClickOnOverlay}
                onUpdateAvatar={handleUpdateAvatar}
                isLoading={isLoading}
              />

              <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onCloseEsc={closePopupWithEsc}
                onCloseOverlay={closePopupWithClickOnOverlay}
                onAddPlace={handleAddPlaceSubmit}
                isLoading={isLoading}
              />

              <ConfirmationPopup
                isOpen={isConfirmationPopupOpen}
                onClose={closeAllPopups}
                onCloseEsc={closePopupWithEsc}
                onCloseOverlay={closePopupWithClickOnOverlay}
                onCardDelete={handleCardDelete}
                isLoading={isLoading}
                onSubmit={handleCardDelete}
                card={removedCardId}
              />  
              <ImagePopup card={selectedCard} onClose={closeAllPopups} /> 

        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
