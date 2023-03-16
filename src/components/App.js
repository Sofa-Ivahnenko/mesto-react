import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = React.useState(false);
	const [selectedCard, setSelectedCard] = React.useState({});

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

  function handleDeleteCardClick() {
    setDeleteCardPopupOpen(true);
  }

	function closeAllPopups() {
		setIsEditProfilePopupOpen(false)
		setIsAddPlacePopupOpen(false)
		setIsEditAvatarPopupOpen(false)
    setDeleteCardPopupOpen(false)
		setSelectedCard({})
	}

  return (
    <div className="root">
        <div className ="page">  
            <Header />
            <Main
             onEditProfile={handleEditProfileClick}
             onEditAvatar={handleEditAvatarClick}
             onAddPlace={handleAddPlaceClick}
             onCardClick={handleCardClick}
             onDeleteCard={handleDeleteCardClick}
            />
            <Footer />
            <PopupWithForm
              name="Edit"
              title="Редактировать профиль"
              buttonText="Сохранить"
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}>
              <>
               <label className="popup__form">
                  <input
                    id = "person"
                    name ="user"
                    type="text"
                    className=" popup__input popup__input_type_name"
                    placeholder="Имя"
                    value="Жак-Ив Кусто"   
                    minlength="2"
                    maxlength="40"
                    required/>
                  <span className="person-error popup__error"></span>
                  </label>
                  <label className="popup__form">
                    <input
                      id = "about"
                      name="job"
                      type="text"
                      placeholder="О себе"
                      className="popup__input popup__input_type_composition"
                      value="Исследователь океана"
                      minlength="2"
                      maxlength="200"
                      required/>
                    <span className="about-error popup__error "></span>
                    </label>
              </>
              </PopupWithForm>
              <PopupWithForm
                name="Card"
                title="Новое место"
                buttonText="Создать"
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}>
                <>
                <label className="popup__form">
                  <input
                    id = "name"
                    name = "name"
                    type="text"
                    className=" popup__input popup__input_type_card-name"
                    placeholder="Название"
                    value=""
                    required
                    minlength="2"
                    maxlength="30" />
                  <span className="name-error popup__error"></span>
                  </label>
                  <label className="popup__form">
                    <input
                      id = "link"
                      name="link"
                      type="url"
                      placeholder="Ссылка на картинку"
                      value=""
                      className="popup__input popup__input_type_link"
                      required />
                  <span className="link-error popup__error"></span>
                  </label>
                </>
              </PopupWithForm>

              <PopupWithForm
                name="Delet"
                title="Вы уверены?"
                isOpen={isDeleteCardPopupOpen}
                onClose={closeAllPopups}
                buttonText="Да">
              <></>
              </PopupWithForm>

				      <PopupWithForm
                name="Avatar"
                title="Обновить аватар"
                buttonText="Сохранить"
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}>
                <>
                <label class="popup__form">
                <input
                  type="url"
                  name="avatar"
                  id="avatar"
                  placeholder="Ссылка на картинку"
                  className="popup__input popup__input_type_avatar"
                  required />
                <span className="avatar-error popup__error"></span>
                </label>
               </>
              </PopupWithForm>

              <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </div>
  )
}

export default App;
