import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAddPropertyQuery } from "../hooks/useDataQuery";
import { toast } from "react-toastify";
import { useDroppable, DndContext } from "@dnd-kit/core";
import { BiImageAdd } from "react-icons/bi";
import { CiImageOn } from "react-icons/ci";
import { FaXmark } from "react-icons/fa6";
import PreviewFormCard from "./PreviewFormCard";

function AddPropertyForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm({ resolver: yupResolver(schema) });

    const fileInputRef = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [showPreview, setShowPreview] = useState(false);
    const navigate = useNavigate();

    const formData = watch(); // Ottieni i valori del form in tempo reale

    const handleFiles = (files) => {
        setSelectedFiles((prev) => [...prev, ...Array.from(files)]);
    };

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        } else {
            console.error("fileInputRef.current è null!");
        }
    };

    const handleFileChange = (event) => {
        event.preventDefault();
        const files = Array.from(event.target.files);
        setSelectedFiles((prev) => [...prev, ...files]);
        setValue("files", [...selectedFiles, ...files], { shouldValidate: true });
    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const files = Array.from(event.dataTransfer.files);
        setSelectedFiles((prev) => [...prev, ...files]);
        setValue("files", [...selectedFiles, ...files], { shouldValidate: true });
    };

    const { setNodeRef } = useDroppable({
        id: "file-drop-area",
    });

    const { mutate, isSuccess, isError } = useAddPropertyQuery();

    const onSubmit = (data) => {
        console.log(data)
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });
        if (selectedFiles.length > 0) {
            Array.from(selectedFiles).forEach((file) => {
                formData.append("files", file);
            });
        }
        mutate(formData);
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Annuncio pubblicato con successo!");
            navigate("/");
        } else if (isError) {
            toast.error("Errore nell'invio del form, riprova");
        }
    }, [isSuccess, isError]);

    return (
        <>
            <h1 className="text-2xl font-bold text-gray-700 text-center mt-14 sm:mt-8 p-3">
                Inserisci qui i dettagli della tua inserzione. Al resto ci penseremo noi!
            </h1>
            <form className="px-6 sm:px-12 lg:px-48">
                <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
                    <h2 className="mt-2 col-span-full text-xl text-slate-950 font-semibold">Dati Proprietario</h2>
                    <div>
                        <label className="text-gray-700">Nome</label>
                        <input
                            {...register("first_name")}
                            type="text"
                            className={`w-full p-2 border rounded ${errors.name
                                ? "border-red-500 placeholder:text-red-500"
                                : "border-gray-300"
                                }`}
                            placeholder={
                                errors.name ? `${errors.name.message}` : "Es: Marcolino"
                            }
                        />
                    </div>
                    <div>
                        <label className="text-gray-700">Cognome</label>
                        <input
                            {...register("last_name")}
                            type="text"
                            className={`w-full p-2 border rounded ${errors.surname
                                ? "border-red-500 placeholder:text-red-500"
                                : "border-gray-300"
                                }`}
                            placeholder={
                                errors.surname ? `${errors.surname.message}` : "Es: Rossi"
                            }
                        />
                    </div>
                    <div>
                        <label className="text-gray-700">Email</label>
                        <input
                            {...register("email")}
                            type="email"
                            className={`w-full p-2 border rounded ${errors.email
                                ? "border-red-500 placeholder:text-red-500"
                                : "border-gray-300"
                                }`}
                            placeholder={
                                errors.email
                                    ? `${errors.email.message}`
                                    : "Es: marcolino@example.com"
                            }
                        />
                    </div>
                    <h2 className="mt-2 col-span-full text-xl text-slate-950 font-semibold">Posizione Inserzione</h2>
                    <div>
                        <label className="text-gray-700">Indirizzo</label>
                        <input
                            {...register("address")}
                            type="text"
                            className={`w-full p-2 border rounded ${errors.address
                                ? "border-red-500 placeholder:text-red-500"
                                : "border-gray-300"
                                }`}
                            placeholder={
                                errors.address
                                    ? `${errors.address.message}`
                                    : "Es: Via Milano 1"
                            }
                        />
                    </div>
                    <div>
                        <label className="text-gray-700">Città</label>
                        <input
                            {...register("city")}
                            type="text"
                            className={`w-full p-2 border rounded ${errors.city
                                ? "border-red-500 placeholder:text-red-500"
                                : "border-gray-300"
                                }`}
                            placeholder={
                                errors.city ? `${errors.city.message}` : "Es: Milano"
                            }
                        />
                    </div>
                    <div>
                        <label className="text-gray-700">Codice postale</label>
                        <input
                            {...register("zipcode")}
                            type="number"
                            className={`w-full p-2 border rounded ${errors.zipcode
                                ? "border-red-500 placeholder:text-red-500"
                                : "border-gray-300"
                                }`}
                            placeholder={
                                errors.zipcode ? `${errors.zipcode.message}` : "Es: 20124"
                            }
                            min={1}
                        />
                    </div>
                    <h2 className="mt-2 col-span-full text-xl text-slate-950 font-semibold">Dati Inserzione</h2>
                    <div>
                        <label className="text-gray-700">Titolo inserzione</label>
                        <input
                            {...register("title")}
                            type="text"
                            className={`w-full p-2 border rounded ${errors.title
                                ? "border-red-500 placeholder:text-red-500"
                                : "border-gray-300"
                                }`}
                            placeholder={
                                errors.title
                                    ? `${errors.title.message}`
                                    : "Es: Perfect house in Milan"
                            }
                        />
                    </div>
                    <div>
                        <label className="text-gray-700">Metratura</label>
                        <input
                            {...register("square_meters")}
                            type="number"
                            className={`w-full p-2 border rounded ${errors.square_meters
                                ? "border-red-500 placeholder:text-red-500"
                                : "border-gray-300"
                                }`}
                            placeholder={
                                errors.square_meters
                                    ? `${errors.square_meters.message}`
                                    : "Es: 100"
                            }
                            min={1}
                        />
                    </div>
                    <div>
                        <label className="text-gray-700">Stanze da letto</label>
                        <select
                            {...register("n_bedrooms")}
                            className={`w-full p-2 border rounded ${errors.n_bedrooms
                                ? "border-red-500 text-red-500"
                                : "border-gray-300"
                                }`}
                        >
                            <option value="" hidden>
                                {errors.n_bedrooms
                                    ? errors.n_bedrooms.message
                                    : "Numero stanze da letto"}
                            </option>
                            {[1, 2, 3, 4].map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                            <option value="5">5+</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-gray-700 whitespace-nowrap">
                            Bagni
                        </label>
                        <select
                            {...register("n_bathrooms")}
                            className={`w-full p-2  border rounded ${errors.n_bathrooms
                                ? "border-red-500 text-red-500"
                                : "border-gray-300"
                                }`}
                        >
                            <option className="" value="" hidden>
                                {errors.n_bathrooms
                                    ? errors.n_bathrooms.message
                                    : "Numero bagni"}
                            </option>
                            {[1, 2, 3].map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                            <option value="4">4+</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-gray-700">Letti</label>
                        <select
                            {...register("n_beds")}
                            className={`w-full p-2  border rounded ${errors.n_beds
                                ? "border-red-500 text-red-500"
                                : "border-gray-300"
                                }`}
                        >
                            <option value="" hidden>
                                {errors.n_beds
                                    ? errors.n_beds.message
                                    : "Numero letti"}
                            </option>
                            {[1, 2, 3, 4].map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                            <option value="5">5+</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-gray-700">Proprietà</label>
                        <select
                            {...register("property_type")}
                            className={`w-full p-2 border rounded
                                    ${errors.property_type ? "border-red-500 text-red-500" : "border-gray-300"}`}
                        >
                            <option value="" hidden>
                                {errors.property_type
                                    ? errors.property_type.message
                                    : "Tipo di proprietà"}
                            </option>
                            <option value="baita">Baita</option>
                            <option value="villetta a schiera">Villa a schiera</option>
                            <option value="casa indipendente">Indipendente</option>
                            <option value="villa">Villa</option>
                            <option value="attico">Attico</option>
                            <option value="appartamento">Appartamento</option>
                            <option value="chalet">Chalet</option>
                        </select>
                    </div>
                </div>

                <div className="my-4">
                    <h2 className="mt-2 col-span-full text-xl text-slate-950 font-semibold">Inserimento immagini</h2>
                    <DndContext>
                        <div
                            ref={setNodeRef} // Assegniamo il riferimento dell'area di drop
                            className="relative my-1 p-3 flex flex-col items-center justify-center font-bold 
            bg-gray-50 border-2 border-dashed hover:border-transparent hover:border-3 rounded-lg cursor-pointer
            hover:[background:linear-gradient(theme(colors.gray.100),theme(colors.gray.100))_padding-box,conic-gradient(from_var(--border-angle),theme(colors.gray.200)_80%,#90aa72_86%,#90aa72_90%,#90aa72_94%,theme(colors.green.700))_border-box] 
            [animation:border-rotate_4s_linear_infinite]"
                            onClick={handleClick}
                            onDragOver={(e) => e.preventDefault()} // Evita comportamento default
                            onDrop={handleDrop} // Gestisce il drop dei file
                        >
                            <p className="text-gray-500 flex items-center justify-center text-3xl">
                                {selectedFiles.length > 0 ? (
                                    "File caricati! Aggiungine altri..."
                                ) : (
                                    <>
                                        <BiImageAdd /> Trascina o clicca per caricare
                                    </>
                                )}
                            </p>

                            {/* Input nascosto */}
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />

                            {/* Lista dei file caricati */}
                            {selectedFiles.length > 0 && (
                                <div className="mt-4">
                                    <h4 className="font-semibold text-start mb-2">File selezionati:</h4>
                                    <ul className="relative grid grid-cols-2 sm:grid-cols-6 gap-4 pr-12  border border-gray-500 rounded-lg p-2">
                                        {selectedFiles.map((file, index) => (
                                            <li
                                                key={index}
                                                className="text-sm text-gray-700 flex items-center gap-1"
                                            >
                                                <CiImageOn />
                                                <span>{file.name}</span>
                                                <FaXmark className="text-lg hover:scale-125" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedFiles(curr => curr.filter((_, i) => i !== index)) }} />
                                            </li>
                                        ))}
                                        <li onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedFiles([]) }} className="absolute p-1 text-sm border rounded-lg cursor-pointer hover:bg-slate-800 hover:text-white transition-all right-1 bottom-1">Pulisci</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </DndContext>
                    {errors.files && (
                        <span className="text-red-500">{errors.files.message}</span>
                    )}
                </div>
            </form>
            <div className="mt-6 px-6 sm:px-12 lg:px-48">
                <button
                    onClick={() => setShowPreview(true)}
                    className="w-full bg-[#b6cf97d4] hover:bg-[#90aa72] text-stone-600 hover:text-white py-2 rounded-lg transition-all cursor-pointer"
                >
                    Visualizza l'anteprima
                </button>
            </div>

            {showPreview && (
                <section className="px-6 sm:px-12 lg:px-48">
                    <PreviewFormCard
                        property={{ ...formData, files: selectedFiles }}
                        onConfirm={() => {
                            handleSubmit(onSubmit)(); // Esegui il submit del form
                        }}
                        onEdit={() => setShowPreview(false)}
                    />
                </section>
            )}
        </>
    );
}

export default AddPropertyForm;

const schema = yup.object().shape({
    first_name: yup.string().required("Il nome è obbligatorio!"),
    last_name: yup.string().required("Il cognome è obbligatorio!"),
    title: yup.string().required("Il titolo è obbligatorio!"),
    address: yup.string().required("L'indirizzo è obbligatorio!"),
    city: yup.string().required("La città è obbligatoria!"),

    zipcode: yup
        .number()
        .transform((value, originalValue) =>
            originalValue === "" ? undefined : value
        )
        .required("Il codice postale è obbligatorio!")
        .min(1)
        .moreThan(0, "Inserire formato corretto!")
        .integer("Inserire formato corretto!"),

    square_meters: yup
        .number()
        .transform((value, originalValue) =>
            originalValue === "" ? undefined : value
        )
        .required("La metratura è obbligatoria!")
        .moreThan(0, "Inserire un valore valido!")
        .min(1)
        .integer("Inserire un valore valido!"),

    n_bedrooms: yup
        .number()
        .transform((value, originalValue) =>
            originalValue === "" ? undefined : value
        )
        .required("Le stanze da letto sono obbligatorie!")
        .min(1, "Almeno una stanza da letto!")
        .positive("Almeno una stanza da letto!"),

    n_bathrooms: yup
        .number()
        .transform((value, originalValue) =>
            originalValue === "" ? undefined : value
        )
        .required("I bagni sono obbligatori!")
        .min(1, "Almeno un bagno!"),

    n_beds: yup
        .number()
        .transform((value, originalValue) =>
            originalValue === "" ? undefined : value
        )
        .required("I letti sono obbligatori!")
        .min(1, "Almeno un letto!"),

    property_type: yup.string().required("Il tipo di proprietà è obbligatorio!"),
    email: yup.string().email("Invalid email").required("La email è obbligatoria!"),
    files: yup
        .array()
        .min(1, "Inserisci almeno un'immagine!")
        .required("Inserisci almeno un'immagine!")
        .test("fileSize", "File troppo grande!", (files) =>
            files.every((file) => file.size <= 5 * 1024 * 1024)
        )
        .test("fileType", "Estensione file non valida!", (files) =>
            files.every((file) =>
                ["image/jpeg", "image/png", "image/gif"].includes(file.type)
            )
        ),
});
