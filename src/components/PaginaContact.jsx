import React, { useState } from "react";
import style from "../components/PaginaContact.module.css";

const newPost = {
  nome: "",
  email: "",
  message: "",
};

function PaginaContact() {
  const [messageSent, setMessageSent] = useState(false);
  const [formData, setFormData] = useState(newPost);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
    }, 3000);
    setFormData(newPost);
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  return (
    <div className={style.formCard1}>
      <div className={style.formCard2}>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className="m-auto mt-2  p-2">
            <p style={{ fontSize: "1.5rem" }}>Contattaci </p>
          </div>

          <div className={style.formField}>
            <input
              required
              placeholder="Nome"
              className={style.inputField}
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
            />
          </div>

          <div className={style.formField}>
            <input
              required
              placeholder="Email"
              className={style.inputField}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className={style.formField}>
            <textarea
              required
              placeholder="Messaggio"
              cols="30"
              rows="3"
              className={style.inputField}
              name="message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit" className={style.sendMessageBtn}>
            Invia Messaggio
          </button>

          {/* Messaggio di conferma */}
          {messageSent && (
            <section>
              <div className="space-y-2 p-4">
                <div
                  role="alert"
                  className="bg-green-100 dark:bg-green-900 border-l-4 border-green-500 dark:border-green-700 text-green-900 dark:text-green-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-green-200 dark:hover:bg-green-800 transform hover:scale-105"
                >
                  <svg
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5 flex-shrink-0 mr-2 text-green-600"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                  <p className="text-xs font-semibold">
                    Messaggio inviato con successo!
                  </p>
                </div>
              </div>
            </section>
          )}
        </form>
      </div>
    </div>
  );
}

export default PaginaContact;
