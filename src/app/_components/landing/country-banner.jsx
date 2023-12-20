

export default function CountryBanner({ country }) {
    return (<div className=" has-text-centered is-relative" id={country.code} style={{ backgroundImage: `url('/images/country-background/${country.code}.svg')` }}>
        <div className="is-overlay"></div>
        <div className="country mx-auto is-relative">
            <h1 className="is-size-2 has-text-weight-bold">{country.name}</h1>
            <div className="content ">
                <p><strong>CIUDAD: </strong>{country.name}</p>
                <p><strong>ORGANIZACION LÍDER: </strong>{country.leader}</p>
                <p><strong>FECHA DE COMIENZO: </strong>{country.date}</p>
                <p>{country.description}</p>
            </div>

        </div>
    </div>
    )
}