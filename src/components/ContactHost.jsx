import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import PopUp from "../pages/PopUp";
import { baseUrl, contactEndpoint } from "../globals/apiUrls";

function PaginaContact({ showContactForm, propertyId }) {
    const [messageSent, setMessageSent] = useState(false);
    const [error, setError] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ resolver: yupResolver(schema) }); // schema si trova sotto

    const onSubmit = (data) => {
        reset(); // Reset del form dopo invio
        axios.post(baseUrl + contactEndpoint, {
            propertyId: propertyId,
            userMail: data.email,
            text: data.message,
            name: data.nome
        })
            .then(response => {
                setMessageSent(true);
                setTimeout(() => setMessageSent(false), 2000);
            })
            .catch(error => {
                setError(true);
                setTimeout(() => setError(false), 1000);
            });
    };

    const handleInvalid = (e) => {
        e.preventDefault();
        if (!formError) {
            setError("Per favore completa tutti i campi.");
        }
    };

    return (
        <div className={`${showContactForm ? 'block sm:block' : 'hidden sm:block'} md:w-1/2 w-full md:h-auto boxShad`}>
            <form
                className="flex flex-col gap-6 px-8 py-4"
                onSubmit={handleSubmit(onSubmit)} // Usato onSubmit di React Hook Form
                noValidate
                onInvalid={handleInvalid}
            >
                <div className="m-auto mt-2 p-2">
                    <p style={{ fontSize: "1.5rem" }}>Contattaci </p>
                </div>

                <div className="flex flex-col">
                    {errors.nome ? (
                        <span className="text-red-600">
                            {errors.nome.message}
                        </span> // Gestito errore nome
                    ) : (
                        <span className="opacity-0">placeholder</span>
                    )}
                    <input
                        {...register("nome")} // Usato register per il campo nome
                        placeholder="Nome"
                        className="p-1 border-b border-b-[#bace94] rounded-lg  focus:outline-0 focus:border-b-2"
                        type="text"
                    />
                </div>
                <div className="flex flex-col">
                    {errors.email ? (
                        <span className="text-red-600">
                            {errors.email.message}
                        </span> // Gestito errore message
                    ) : (
                        <span className="opacity-0">placeholder</span>
                    )}
                    <input
                        {...register("email")} // Usato register per il campo message
                        placeholder="Email"
                        className="p-1 border-b border-b-[#bace94] rounded-lg  focus:outline-0 focus:border-b-2"
                        type="email"
                    />
                </div>
                <div className="flex flex-col">
                    {errors.message ? (
                        <span className="text-red-600">
                            {errors.message.message}
                        </span> // Gestito errore messaggio
                    ) : (
                        <span className="opacity-0">placeholder</span>
                    )}
                    <textarea
                        required
                        placeholder="Messaggio"
                        cols="30"
                        rows="3"
                        {...register("message")} // Usato register per il campo messaggio
                        className="p-1 border-b border-b-[#bace94] rounded-lg  focus:outline-0 focus:border-b-2"
                    ></textarea>
                </div>

                <button type="submit" className="border rounded-xl py-2 cursor-pointer bg-[#b6cf978c] active:bg-[#6d8a4d] hover:bg-[#90aa72] text-stone-600 hover:text-white transition-all">
                    Invia Messaggio
                </button>

                {error && (
                    <section>
                        <div className="space-y-2 p-4">
                            <div
                                role="alert"
                                className="bg-red-100 dark:bg-red-950 border-l-4 border-red-500 dark:border-red-700 text-red-900 dark:text-red-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-red-200 dark:hover:bg-red-800 transform hover:scale-105"
                            >
                                <svg
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="h-5 w-5 flex-shrink-0 mr-2 text-red-600"
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
                                    Errore nell'invio dell'email riprova più tardi!
                                </p>
                            </div>
                        </div>
                    </section>
                )}
            </form>
            <PopUp
                isOpen={messageSent}
                onClose={() => setMessageSent(false)}
            >
                <h2 className="text-green-600 text-lg font-bold">
                    ✅ Messaggio inviato con successo!
                </h2>
            </PopUp>

            {/* Pop-up di errore */}
            <PopUp
                isOpen={error}
                onClose={() => setError(false)}
            >
                <h2 className="text-red-600 text-lg font-bold">
                    ❌ Errore nell'invio del messaggio. Riprova più tardi.
                </h2>
            </PopUp>
        </div>
    );
}

const schema = yup.object().shape({
    nome: yup.string().required("Inserisci un nome"),
    email: yup
        .string()
        .email("Inserisci una mail valida")
        .required("Inserisci il tuo indirizzo email"),
    message: yup.string().required("Inserisci una descrizione"),
});

export default PaginaContact;



{/* Messaggio di conferma */ }
{/* {messageSent && (
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
                )} */}
