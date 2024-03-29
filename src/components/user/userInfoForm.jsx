"use client";
import { useState, useEffect, useRef, forwardRef, useImperativeHandle} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faAngleDoubleRight, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { fetchCountries } from '@/utils/get-data';

const UserInfoForm = forwardRef(({userInfo}, ref) => {

  const [userData, setUserData] = useState(userInfo);
  const [countries, setCountries] = useState([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);
  const [countriesFetchFailed, setCountriesFetchFailed] = useState(false);
  const [languages, setLanguages] = useState({'es': 'Español', 'pt': 'Português'});


  useEffect(() => {
    getCountries()
  },[]);

  useImperativeHandle(ref, () => ({
    getUserInfo: () => {
      return {
        bio: userData.bio,
        name: userData.name,
        countryCode: userData.country.code,
        lang: userData.lang
      }
    }
  }));

  async function getCountries() {
    try {
      console.log('help')
      setIsLoadingCountries(true)
      setTimeout(async () => {
        const res = await fetchCountries('/misc/countries')
        setCountries(res)
        setIsLoadingCountries(false)
      }, 3000);
    } catch (error) {
      setCountriesFetchFailed(true)
      setIsLoadingCountries(false)
      console.error(error)
    }
  }

  if(isLoadingCountries) {
    return <div className="has-text-centered">
    <p>Cargando...</p>
    <progress className="progress is-small is-primary mt-3" max="100">15%</progress>
  </div>
  }

  // Define handlers for inputs
  const handleNameChange = (e) => {
    setUserData({...userData, name: e.target.value});
  }

  const handleEmailChange = (e) => {
    setUserData({...userData, email: e.target.value});
  }

  const handleCountryChange = (e) => {
    const country = countries.find(country => country.code === e.target.value);
    setUserData({...userData, country: country});
  }

  const handleLanguage = (e) => {
    setUserData({...userData, lang: e.target.value});
  }

  const handleBioChange = (e) => {
    setUserData({...userData, bio: e.target.value});
  }

  return (
    <div className="">
      <div className="my-3">
        <div className="field">
          <label className="label">Bio del usuario</label>
          <div className="control">
                <textarea className={`textarea`} value={userData.bio} onChange={handleBioChange} />
          </div>
        </div>
      </div>
      <div className="columns is-multiline">
        <div className="column is-6">
          <div className="field">
            <label className="label">Nombre completo</label>
            <div className="control">
              <input className={`input`} type="text" value={userData.name} onChange={handleNameChange} />
              <span className="help">Nombre y apellido. De ser una organizacion, use el nombre de la misma.</span>
            </div>
          </div>
        </div>
        <div className="column is-6">
          <div className="field">
            <label className="label">Correo electrónico</label>
            <div className="control">
              <input className={`input is-static`} type="text" defaultValue={userData.email} />
              <span className="help">Para modificar el correo, seleccione la sección especifica en el menú</span>
            </div>
          </div>
        </div>
        <div className="column is-6">
          <div className="field">
            <div className="label">Lenguaje</div>
            <div className="control">
              <div className="select is-fullwidth" value={userData.lang} onChange={handleLanguage}>
                <select name='lang' value={userData.lang} onChange={handleLanguage}>
                  <option value="es">Español</option>
                  <option value="pt">Português</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-6">
          <div className="field">
            <label className="label">País</label>
            <div className="control">
                <div className={`select is-fullwidth ${isLoadingCountries ? 'is-loading' : ''}`}>
                  <select name='country' value={userData.country.code} onChange={handleCountryChange}>
                    {countries.map((country, index) => (
                      <option key={index} value={country.code}>{country.name}</option>
                    ))}
                  </select>
                  {
                    countriesFetchFailed && <p className="help is-danger">Error al cargar los países</p>
                  }
                </div>
            </div>
          </div>
        </div>
      </div>    
    </div>
  );
});

UserInfoForm.displayName = 'UserInfoForm'; // Add display name to the component

export default UserInfoForm;