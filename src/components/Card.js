import React from "react";

function Card(card) {
  function handleCardClick() {
		card.onCardClick(card)
	}

  return (
    <template id="card-template">
      <li className="card">
              <img className="card__image" alt={card.alt} src={card.src} onClick={handleCardClick} />
          <div className="card__content">
              <h2 className="card__title">{card.name}</h2>
              <div className="card__likes">
                  <button className="card__button" type="button"></button>
                  <span className="card__likes-counter">{card.likes.length}</span>
              </div>
          </div>
          <button className="card__button-delet" type="button"></button>
      </li>
    </template>
  )
}

export default Card
