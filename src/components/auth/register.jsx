"use client"
import { useEffect, useState } from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import axiosServices from "@/utils/axios"
import {
    faTriangleExclamation,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Emoji from "@/components/common/emoji"
import { fetchCountries } from "@/utils/get-data"
import { useAlert } from "@/context/alert-context"

export default function RegisterForm() {

    const router = useRouter();

    const { addAlert } = useAlert();

    const [countryList, setCountryList] = useState([]);
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [country, setCountry] = useState("");
    const [lang, setLang] = useState("es");
    const [city, setCity] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [acceptTyC, setAcceptTyC] = useState(false);
    const [emailHelper, setEmailHelper] = useState(false);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        fetchCountry();
    }, []);

    async function fetchCountry() {
        setCountryList(await fetchCountries());
    }

    function handleChangeRePassword(event) {
        if (event.target.value !== password) {
            document.getElementsByName("re-password")[0].classList.add("is-danger");
            document.getElementById("password-warning").style.display = "block";
        } else {
            document
                .getElementsByName("re-password")[0]
                .classList.remove("is-danger");
            document.getElementById("password-warning").style.display = "none";
        }
        setRePassword(event.target.value);
    }

    async function handleRegister(event) {
        event.preventDefault();
        if (acceptTyC && rePassword === password) {
            const body = {
                email,
                name: firstName,
                //lastName,
                lang,
                country,
                city,
                password,
                rePassword,
            };
            try {
                const response = await axiosServices.post("/auth/register", body);
                if (response.status === 200)
                    return router.push(`/auth/verify?email=${email}`);
            } catch (err) {
                addAlert(err.response.data.message, "danger");
                setErrors(err.response.data.errors);
            }
        } else {
            const tycError = {
                field: "terms-and-cond",
                message: "*necesitas aceptar los terminos y condiciones",
            };
            setErrors((prevErr) => (prevErr ? [...prevErr, tycError] : [tycError]));
        }
    }

    return (
        <>
            <form action="POST" onSubmit={handleRegister}>
                <div className="register-form-wrapper mt-6 mx-auto">
                    <div className="field">
                        <div className="is-flex is-justify-content-space-between">
                            <label className="label has-text-weight-normal">
                                Correo electrónico
                                <span className="ml-2 has-text-weight-light is-italic is-size-7">
                                    * E-mail
                                </span>
                            </label>
                            <p
                                className="has-text-success is-clickable"
                                onClick={() => setEmailHelper(true)}
                            >
                                No tengo email*
                            </p>
                        </div>
                        <div className="control">
                            <input tabIndex={1}
                                className={`input ${errors && errors.some((error) => error.field === "email")
                                    ? "is-danger"
                                    : ""
                                    }`}
                                name="email"
                                autoCapitalize="none"
                                type="text"
                                onChange={(event) => setEmail(event.target.value)}
                            />
                            {errors && errors.some((error) => error.field === "email") && (
                                <p className="help is-danger">
                                    {errors.find((error) => error.field === "email").message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="field">
                        <label className="label has-text-weight-normal">
                            Tu nombre
                            <span className="ml-2 has-text-weight-light is-italic is-size-7">
                                *Seu nome
                            </span>
                        </label>
                        <div className="control">
                            <input tabIndex={2}
                                className={`input ${errors && errors.some((error) => error.field === "name")
                                    ? "is-danger"
                                    : ""
                                    }`}
                                name="name"
                                type="text"
                                onChange={(event) => setFirstName(event.target.value)}
                            />
                            {errors && errors.some((error) => error.field === "name") && (
                                <p className="help is-danger">
                                    {errors.find((error) => error.field === "name").message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="field">
                        <label className="label has-text-weight-normal">
                            País
                            <span className="ml-2 has-text-weight-light is-italic is-size-7">
                                *país
                            </span>
                        </label>
                        <div className="control">
                            <div className="select w-100">
                                <select tabIndex={3}
                                    className="w-100"
                                    name="coutry"
                                    value={country}
                                    onChange={(event) => setCountry(event.target.value)}
                                >
                                    <option value="" disabled>
                                        Elegí un pais
                                    </option>
                                    {countryList.map((country) => (
                                        <option value={country._id} key={country._id}>
                                            {country.name} <Emoji emoji={country.emoji} />
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label has-text-weight-normal">
                            lenguaje
                            <span className="ml-2 has-text-weight-light is-italic is-size-7">
                                *linguagem
                            </span>
                        </label>
                        <div className="control">
                            <div className="set-lang" >
                                <button tabIndex={4}
                                    type="button"
                                    className={`button is-rounded ${lang === "es" ? "active" : ""
                                        }`}
                                    onClick={() => setLang("es")}
                                >
                                    Español
                                </button>
                                <button tabIndex={5}
                                    type="button"
                                    className={`button is-rounded ${lang === "pt" ? "active" : ""
                                        }`}
                                    onClick={() => setLang("pt")}
                                >
                                    Portugués
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label has-text-weight-normal">
                            Ciudad
                            <span className="ml-2 has-text-weight-light is-italic is-size-7">
                                *cidade
                            </span>
                        </label>
                        <div className="control">
                            <input tabIndex={6}
                                className="input"
                                name="city"
                                type="text"
                                onChange={(event) => setCity(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label has-text-weight-normal">
                            Contraseña
                            <span className="ml-2 has-text-weight-light is-italic is-size-7">
                                *senha
                            </span>
                        </label>
                        <div className="control">
                            <input tabIndex={7}
                                className={`input ${errors && errors.some((error) => error.field === "password")
                                    ? "is-danger"
                                    : ""
                                    }`}
                                name="password"
                                type="password"
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            {errors && errors.some((error) => error.field === "password") && (
                                <p className="help is-danger">
                                    {errors.find((error) => error.field === "password").message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="field">
                        <label className="label has-text-weight-normal is-flex is-justify-content-space-between">
                            <p>
                                Reingresa la contraseña
                                <span className="ml-2 has-text-weight-light is-italic is-size-7">
                                    *digite a senha novamente
                                </span>
                            </p>
                            <span
                                className="ml-2 has-text-weight-light is-italic is-size-7 has-text-danger"
                                id="password-warning"
                                style={{ display: "none" }}
                            >
                                *las contraseñas deben ser iguales
                            </span>
                        </label>
                        <div className="control">
                            <input tabIndex={8}
                                className={`input ${errors && errors.some((error) => error.field === "password")
                                    ? "is-danger"
                                    : ""
                                    }`}
                                name="re-password"
                                type="password"
                                onChange={handleChangeRePassword}
                            />
                            {errors && errors.some((error) => error.field === "password") && (
                                <p className="help is-danger">
                                    {errors.find((error) => error.field === "password").message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="field has-text-centered">
                        <label className="checkbox mt-4">
                            <input tabIndex={9}
                                type="checkbox"
                                onChange={(event) => setAcceptTyC(event.target.checked)}
                                value={acceptTyC}
                                id="terms-and-conditions"
                            />
                            <span className="ml-2">Acepto los términos y condiciones</span>
                            <span className="ml-2 has-text-weight-light is-italic is-size-7 is-block">
                                *Concordo com os termos e condições
                            </span>
                            {errors &&
                                errors.some((error) => error.field === "terms-and-cond") && (
                                    <p className="help is-danger">
                                        {
                                            errors.find((error) => error.field === "terms-and-cond")
                                                .message
                                        }
                                    </p>
                                )}
                        </label>
                    </div>
                </div>
                <div className="actions mt-6 is-flex is-flex-direction-column is-align-items-center">
                    <button tabIndex={10}
                        className="button is-rounded confirm-button mb-3 is-uppercase w-50"
                        type="submit"
                    >
                        Ingresar
                    </button>
                </div>
            </form>
            <hr className="w-25 mx-auto" />
            <div className="go-to-login-wrapper has-text-centered w-100 is-flex is-flex-direction-column is-align-items-center">
                <h3 className=" has-text-weight-normal is-size-5">
                    Si ya tenés una cuenta
                </h3>
                <h4 className=" has-text-weight-normal is-size-7">
                    *Se já tiver uma conta
                </h4>
                <Link
                    className="button is-rounded register-button mt-3 w-50"
                    href="/auth/login"
                >
                    ingresá acá
                </Link>
                <span className="has-text-weight-light is-size-7 ">*acesse aqui</span>
            </div>
            <div className={`modal ${emailHelper ? "is-active" : ""}`}>
                <div
                    className="modal-background"
                    onClick={() => setEmailHelper(false)}
                ></div>
                <div className="modal-content">
                    <div className="box">
                        <div className="is-flex is-justify-content-end">
                            <FontAwesomeIcon
                                className="is-clickable"
                                onClick={() => setEmailHelper(false)}
                                icon={faXmark}
                            />
                        </div>
                        <div className="content has-text-centered">
                            <div className="title mb-6">
                                <FontAwesomeIcon icon={faTriangleExclamation} size="3x" />
                                <h1 className="mb-0 my-3 is-uppercase is-size-2 is-size-3-touch has-text-weight-light">
                                    ¿No tenes email?
                                </h1>
                                <span className="has-text-weight-light is-italic is-size-4">
                                    ¿No disponho de email?
                                </span>
                            </div>
                            <div className="box-content">
                                <div className="mb-5">
                                    <p className="mb-0 has-text-weight-bold">
                                        No te preocupes te guiamos sobre el proceso de como crearte
                                        un mail. Es muy sencillo y rapido
                                    </p>
                                    <span className="has-text-weight-light is-italic is-size-7">
                                        * Não se preocupe, nós te orientamos sobre o processo de
                                        como criar um e-mail. É muito simples e rápido
                                    </span>
                                </div>
                                <div>
                                    <div>
                                        <Link
                                            className="has-text-success"
                                            href="argentina.gob.ar/miargentina/crear-mi-cuenta/como-generar-un-correo-electronico/gmail"
                                            target="_blank"
                                        >
                                            Español
                                        </Link>
                                    </div>
                                    <div>
                                        <Link
                                            className="has-text-success"
                                            href="https://www.ufpb.br/efopli/contents/videos/tutorial-efopli-01-como-criar-um-conta-gmail"
                                            target="_blank"
                                        >
                                            Portugues
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}