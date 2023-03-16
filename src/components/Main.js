import React, { useEffect, useState } from "react";
import Card from './Card.js';
import api from '../utils/api.js';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {

  const [userName, setUserName] = useState("")
	const [userDescription, setUserDescription] = useState("")
	const [userAvatar, setUserAvatar] = useState("")
	const [cards, getCardsList] = useState([])


  useEffect(() => {
		api
			.getUserInfo()
			.then((profileUserInfo) => {
				setUserName(profileUserInfo.name)
				setUserDescription(profileUserInfo.about)
				setUserAvatar(profileUserInfo.avatar)
			})
			.catch((error) => console.log(`Ошибка: ${error}`))
		api
			.getCardsList()
			.then((cardsData) => {
				getCardsList(cardsData)
			})
			.catch((error) => console.log(`Ошибка: ${error}`))
	}, [])

    return (
        <main>
        <section className="profile">
            <img className="profile__avatar" src={userAvatar} alt="аватар" />
            <button className="profile__avatar-btn" type="button" onClick={onEditAvatar}></button>
            <div className="profile__info">
                <div className="profile__text">
                    <h1 className="profile__title">{userName}</h1>
                    <button className="profile__button-edit" type="button"  onClick={onEditProfile}></button>
                </div>
                <p className="profile__subtitle">{userDescription}</p>
            </div>
            <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
        </section>
            <ul className="cards">
            {
              cards.map((card) => { 
                return (
                <Card card={card} key={card._id} likes={card.likes} name={card.name} link={card.link} onCardClick={onCardClick} />
              )})}
            </ul>
    </main>
    );
  }

export default Main