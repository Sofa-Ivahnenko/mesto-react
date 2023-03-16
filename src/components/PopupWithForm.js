import React from "react";

function PopupWithForm ({name, title, buttonText, children, isOpen, onClose}) {
    
    return(
        <section className={`popup popup${name} ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <form className="popup__content" name={name} method="get">
                    <h2 className="popup__heading">{title}</h2>
                        {children}
                    <button type="submit" className="popup__save-button">{buttonText || "Сохранить"}</button>
                    </form>
                    <button type="button" className="popup__close-button popupEdit__close-button" onClick={onClose}></button>
            </div>
        </section>
    )
}

export default PopupWithForm