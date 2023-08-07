import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from "axios";
import PhotosUploader from "../PhotosUploader";

export default function PlacesPage() {
    /* action defined in app.jsx Router section */
    const { action } = useParams();

    /* Form data thats being send to api */
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuest, setMaxGuest] = useState(1);

    /* 
        Functins to avoid copying and pasting too much,
        this adds in forms header and input description */

    function inputHeader(text) {
        return (
            <h2 className="dark:text-white text-2xl mt-4">{text}</h2>
        );
    }

    function inputDescription(text) {
        return (
            <p className="text-gray-500 dark:text-gray-400 text-sm">{text}</p>
        );
    }

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }
    
    return (
        <div className="">
            {/*
            Button to initiate form 'add new place',
            if action is not new then shows button,
            if it's new then the button is hidden and form is shown.*/}

            {action !== 'new' && (
                <div className="text-center">
                    <Link className="inline-flex gap-1 bg-bestColor7-100 hover:bg-bestColor7-200 text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                        Añadir nuevo lugar
                    </Link>
                </div>
            )}

            {action === 'new' && (
                <div className="mx-6">
                    <form action="">
                        {preInput('Title', 'Título para tu lugar. Hazlo corto y conciso.')}
                        <input
                            type="text"
                            value={title}
                            onChange={ev => setTitle(ev.target.value)}
                            placeholder="Título, ej:Mi hermoso depto." />

                        {preInput('Dirección:', 'Dirección para tu lugar.')}
                        <input
                            type="text"
                            value={address}
                            onChange={ev => setAddress(ev.target.value)}
                            placeholder="Dirección." />

                        {preInput('Fotos:', 'Añade imagenes de tu lugar.')}
                        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}></PhotosUploader>

                        {preInput('Descripción:', 'Añade una descripción de tu lugar.')}
                        <textarea
                            value={description}
                            onChange={ev => setDescription(ev.target.value)}></textarea>

                        {preInput('Beneficios:', 'Selecciona todos los beneficios de tu lugar.')}
                        <div className="">
                            <Perks
                                selected={perks}
                                onChange={setPerks}></Perks>
                        </div>

                        {preInput('Información extra:', 'Reglas del hogar, etc.')}
                        <textarea
                            value={extraInfo}
                            onChange={ev => setExtraInfo(ev.target.value)}></textarea>
                        <h2 className="dark:text-white text-2xl mt-4">Check in y out, máximo de invitados:</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Añade hora de entrada y salida, recuerda tener un tiempo para limpieza u otros elementos necesarios.</p>
                        <div className="grid gap-2 sm:grid-cols-3">
                            <div className="">
                                <h3 className="mt-2 -mb-1 dark:text-white">Ingreso:</h3>
                                <input
                                    type="text"
                                    value={checkIn}
                                    onChange={ev => setCheckIn(ev.target.value)}
                                    placeholder="14" />
                            </div>
                            <div className="">
                                <h3 className="mt-2 -mb-1 dark:text-white">Salida:</h3>
                                <input
                                    type="text"
                                    value={checkOut}
                                    onChange={ev => setCheckOut(ev.target.value)}
                                    placeholder="11" />
                            </div>
                            <div className="">
                                <h3 className="mt-2 -mb-1 dark:text-white">Número máximo de invitados:</h3>
                                <input
                                    type="number"
                                    value={maxGuest}
                                    onChange={ev => setMaxGuest(ev.target.value)}
                                    placeholder="5" />
                            </div>
                        </div>

                        <button className="p-2 my-4 w-full text-white rounded-2xl bg-bestColor7-100 hover:bg-bestColor7-200">Guardar.</button>

                    </form>
                </div>
            )}

        </div>
    );
}