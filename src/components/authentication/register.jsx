import axiosServices from "@/utils/axios"
import { useEffect, useState } from "react"

export default function Register({ changeLogin }) {
    const [countryList, setCountryList] = useState([])
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    //const [lastName, setLastName] = useState('')
    const [country, setCountry] = useState('')
    const [lang, setLang] = useState('esp')
    const [city, setCity] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')


    async function fetchCountry(){
        const resp = await axiosServices.get('/misc/countries')
        const countries = await resp.data
        setCountryList(countries)
    }

    useEffect(()=>{
        fetchCountry()
    },[])

    function handleChangeRePassword(event){
        if(event.target.value !== password){
            document.getElementsByName('re-password')[0].classList.add('is-danger')
            document.getElementById('password-warning').style.display = 'block'
        }else{
            document.getElementsByName('re-password')[0].classList.remove('is-danger')
            document.getElementById('password-warning').style.display = 'none'
        };
        setRePassword(event.target.value)
    }


    async function handleRegister(event) {
        event.preventDefault()
        if (document.getElementById('terms-and-conditions').checked && rePassword === password) {
            const body = {
                email,
                name:firstName,
                //lastName,
                lang,
                country,
                city,
                password,
                rePassword
            }
            document.getElementById('tyc-warning').style.display = 'none'
            try{
                const response = await axiosServices.post('/auth/register', 
                    JSON.stringify(body)
                   )
                if (response.status === 200) changeLogin()
            }catch(err){
                console.log(err);
            }
        }else{
            document.getElementById('tyc-warning').style.display = 'block'
        }

    }

    return (
        <div className="register-form-wrapper w-50 my-6">

            <h1 className="is-size-4 is-uppercase has-text-centered mb-6">  Registro con correo electrónico </h1>
            <form action="POST" onSubmit={handleRegister}>
                <div className="login-form mt-6">
                    <div className="field">
                        <label className="label has-text-weight-normal">Correo electrónico  <span className="ml-2 has-text-weight-light is-italic is-size-7"> * E-mail</span></label>
                        <div className="control">
                            <input className="input" name="email" type="text" onChange={(event) => setEmail(event.target.value)} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label has-text-weight-normal">Tu nombre  <span className="ml-2 has-text-weight-light is-italic is-size-7"> *Seu nome</span></label>
                        <div className="control">
                            <input className="input" name="name" type="text" onChange={(event) => setFirstName(event.target.value)} />
                        </div>
                    </div>
                    {/* <div className="field">
                        <label className="label has-text-weight-normal">Tu apellido  <span className="ml-2 has-text-weight-light is-italic is-size-7"> *Seu nome</span></label>
                        <div className="control">
                            <input className="input" name="lastname" type="text" onChange={(event) => setLastName(event.target.value)} />
                        </div>
                    </div> */}
                    <div className="field">
                        <label className="label has-text-weight-normal">País  <span className="ml-2 has-text-weight-light is-italic is-size-7"> *país</span></label>
                        <div className="control">
                            <div className="select w-100">
                                <select className="w-100" name="coutry" defaultValue={''} onChange={(event)=> setCountry(event.target.value)}>
                                    <option value="" selected disabled > Elegí un pais </option>
                                    {countryList.map(country => <option value={country._id} key={country._id}> {country.name} {country.emoji} </option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label has-text-weight-normal">lenguaje  <span className="ml-2 has-text-weight-light is-italic is-size-7"> *linguagem</span></label>
                        <div className="control">
                            <div className="set-lang">
                                <button className={`button is-rounded ${lang === 'esp' ? 'active': ''}`}  onClick={()=>setLang('esp')}>Español</button>  
                                <button className={`button is-rounded ${lang === 'prt' ? 'active': ''}`}  onClick={()=>setLang('prt')}>Portugues</button>  

                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label has-text-weight-normal">Ciudad  <span className="ml-2 has-text-weight-light is-italic is-size-7"> *cidade</span></label>
                        <div className="control">
                            <input className="input" name="city" type="text" onChange={(event) => setCity(event.target.value)} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label has-text-weight-normal">Contraseña <span className="ml-2 has-text-weight-light is-italic is-size-7"> *senha</span></label>
                        <div className="control">
                            <input className="input" name="password" type="password" onChange={(event) => setPassword(event.target.value)}/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label has-text-weight-normal is-flex is-justify-content-space-between">
                            <p>Reingresa la contraseña  
                                <span className="ml-2 has-text-weight-light is-italic is-size-7"> 
                                *digite a senha novamente
                                </span>
                            </p>
                            <span className="ml-2 has-text-weight-light is-italic is-size-7 has-text-danger" id="password-warning" style={{display:'none'}}> 
                                *las contraseñas deben ser iguales
                            </span>
                        </label>
                        <div className="control">
                            <input className="input" name="re-password" type="password" onChange={handleChangeRePassword}/>
                        </div>
                    </div>
                    <div className="field has-text-centered">
                        <label className="checkbox mt-4">
                            <input type="checkbox" id="terms-and-conditions"/>
                            <span className="ml-2">
                                Acepto los términos y condiciones
                            </span>
                            <span className="ml-2 has-text-weight-light is-italic is-size-7 is-block">
                                *Concordo com os termos e condições
                            </span>
                            <span className="ml-2 has-text-weight-light is-italic is-size-7 has-text-danger" id="tyc-warning" style={{display:'none'}}> 
                                *necesitas aceptar los terminos y condiciones
                            </span>
                        </label>
                    </div>
                </div>
                <div className="actions mt-6 is-flex is-flex-direction-column is-align-items-center">
                    <button className="button is-rounded confirm-button mb-3 is-uppercase w-50" type="submit">Ingresar</button>
                </div>
            </form>
                <hr className="w-25" />
                <div className="go-to-login-wrapper has-text-centered w-100 is-flex is-flex-direction-column is-align-items-center">
                    <h3 className=" has-text-weight-normal is-size-5">Si ya tenés una cuenta</h3>
                    <h4 className=" has-text-weight-normal is-size-7">*Se já tiver uma conta</h4>
                    <button className="button is-rounded register-button mt-3 w-50" onClick={changeLogin}>ingresá acá</button>
                    <span className="has-text-weight-light is-size-7 ">*acesse aqui</span>
                </div>

        </div>
    )
}