

export default function CountryBanner({country}){
    return(<div className="p-6 has-text-centered" style={{backgroundImage: `url('/images/country-background/${country.code}.png')`}}>
            <h1 className="is-size-2 has-text-weight-bold">{country.name}</h1>
            <div className="content w-50  mx-auto">
                <p><strong>CIUDAD: </strong>{country.name}</p>
                <p><strong>ORGANIZACION LÍDER: </strong>{country.leader}</p>
                <p><strong>FECHA DE COMIENZO: </strong>{country.date}</p>
                <p>{country.description}</p>
            </div>
        </div>
        )
}