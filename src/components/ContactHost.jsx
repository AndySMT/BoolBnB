import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import style from "../components/ContactHost.module.css";

/* const newPost = {
  nome: "",
  email: "",
  message: "",
}; */

const schema = yup.object().shape({
  nome: yup.string().required("Per favore inserisci un nome"),
  email: yup
    .string()
    .email()
    .required("Per favore inserisci il tuo indirizzo email"),
  message: yup.string().required("Per favore inserisci una descrizione"),
});
/* const validateForm = () => {
  let newErrors = {};
  const requiredFields = ["name", "email", "message"];
}; */

function PaginaContact() {
  const [messageSent, setMessageSent] = useState(false);
  /* const [formData, setFormData] = useState(); */
  /* const [formError, setFormError] = useState(""); */

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  /* const handleSubmit = (e) => {
    e.preventDefault(); */

  // Controllo del nome
  /* if (!formData.nome.trim()) {
      setFormError("Per favore inserisci un nome");
      setTimeout(() => setFormError(""), 2000);
      return;
    } */

  // Controllo dell'email
  /* const email = formData.email;
    if (!email || email.trim() === "") {
      setFormError("Per favore inserisci una email");
      return;
    }
    if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
      setFormError("Per favore inserisci una email valida");
      setTimeout(() => setFormError(""), 2000);
      return;
    }
    const [localPart, domainPart] = email.split("@");
    if (
      !localPart ||
      !domainPart ||
      localPart.trim() === "" ||
      domainPart.trim() === ""
    ) {
      setFormError("Per favore inserisci una email valida");
      setTimeout(() => setFormError(""), 2000);
      return;
    }
    if (domainPart.indexOf(".") === -1) {
      setFormError("Per favore inserisci una email valida");
      setTimeout(() => setFormError(""), 2000);
      return;
    }
    const [domainName, extension] = domainPart.split(".");
    if (
      !domainName ||
      !extension ||
      domainName.trim() === "" ||
      extension.trim() === ""
    ) {
      setFormError("Per favore inserisci una email valida");
      setTimeout(() => setFormError(""), 2000);
      return;
    }

    // Controllo del messaggio
    if (!formData.message.trim()) {
      setFormError("Per favore inserisci un messaggio");
      setTimeout(() => setFormError(""), 2000);
      return;
    } */

  /* setFormError("");
    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
    }, 2000);
    setFormData(newPost); */
  /* }; */

  const onSubmit = (data) => {
    console.log("Dati inviati:", data);
    setMessageSent(true);
    setTimeout(() => setMessageSent(false), 3000);
    reset(); // Reset del form dopo invio
  };

  /*  const handleInvalid = (e) => {
    e.preventDefault();
    if (!formError) {
      setFormError("Per favore completa tutti i campi.");
    }
  }; */

  return (
    <div className={`{style.formCard1} md:w-1/2 w-full md:h-auto boxShad`}>
      <div className={style.formCard2}>
        <form
          className={style.form}
          onSubmit={handleSubmit(onSubmit)} // Usato onSubmit di React Hook Form
          noValidate
          /* onInvalid={handleInvalid} */
        >
          <div className="m-auto mt-2  p-2">
            <p style={{ fontSize: "1.5rem" }}>Contattaci </p>
          </div>

          <div className={style.formField}>
            <input
              {...register("nome")} // Usato register per il campo nome
              placeholder="Nome"
              className={style.inputField}
              type="text"
            />
            {errors.nome && (
              <span className="text-red-500">{errors.nome.message}</span> // Gestito errore nome
            )}
          </div>

          <div className={style.formField}>
            <input
              required
              placeholder="Email"
              className={style.inputField}
              type="email"
              {...register("email")} // Usato register per il campo email
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span> // Gestito errore email
            )}
          </div>

          <div className={style.formField}>
            <textarea
              required
              placeholder="Messaggio"
              cols="30"
              rows="3"
              {...register("message")} // Usato register per il campo messaggio
              className={style.inputField}
            ></textarea>
            {errors.message && (
              <span className="text-red-500">{errors.message.message}</span> // Gestito errore messaggio
            )}
          </div>

          <button type="submit" className={style.sendMessageBtn}>
            Invia Messaggio
          </button>
          {/* messagio di errore  */}
          {/* {formError && (
            <div className="text-red-500 mt-4">
              <div className="relative w-full m-auto max-w-80 flex flex-wrap items-center justify-center py-1 pl-4 pr-14 rounded-lg text-base font-medium [transition:all_0.5s_ease] border-solid border border-[#f85149] text-[#b22b2b] [&_svg]:text-[#b22b2b] group bg-[linear-gradient(#f851491a,#f851491a)]">
                <p className="flex flex-row items-center mr-auto gap-x-2">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    height="28"
                    width="28"
                    className="h-7 w-7"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                    <path d="M12 9v4"></path>
                    <path d="M12 17h.01"></path>
                  </svg>
                  {formError}
                </p>
              </div>
            </div>
          )} */}
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
