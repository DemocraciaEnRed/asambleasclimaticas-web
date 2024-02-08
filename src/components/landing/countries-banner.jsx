'use client'
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faPenToSquare, faSquarePollHorizontal } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";



export default function CountriesBanner({countries}) {
    return <div className="country-banner has-text-centered has-background-cream p-6">
        <h1 className="has-text-color-white has-text-centered is-size-2 has-text-weight-bold">¿Cómo Participar?</h1>
        <div className="card-group is-flex is-justify-content-space-evenly is-flex-wrap-wrap my-4 px-6">
            {countries.map(country =>
                <div className="card p-4 my-5" key={country.code}>
                    <div className="image-card is-flex is-justify-content-center pb-4">
                    <figure className="image is-96x96">
                        <img className="" src={country.image}/>
                    </figure>
                        {/* <div className="p-6" style={{backgroundImage:`url('${country.image}')`}}/> */}
                    </div>
                    <div className="card-content py-0 has-text-centered">
                        <p className="title is-size-4 pb-4">
                            {country.name}
                        </p>
                        <div className="content">
                            <ul>
                                <li><strong>Ciudad: </strong>{country.city}</li>
                                <li><strong>Fecha: </strong>{country.date}</li>
                                <li><strong>Tema: </strong>{country.topic}</li>
                            </ul>
                        </div>
                    </div>
                    <footer className="card-footer is-justify-content-center py-4">
                        <button className="button more-button has-background-pink has-text-white has-text-weight-bold is-size-4 ">+</button>
                    </footer>
                </div>
                )}


            
        </div>

    </div>
}