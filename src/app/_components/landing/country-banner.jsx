

export default function CountryBanner({ dict, country }) {
    return (<div className=" has-text-centered is-relative" id={country.code} style={{ backgroundImage: `url('/images/country-background/${country.code}.svg')` }}>
        <div className="is-overlay"></div>
        <div className="country mx-auto is-relative">
            <h1 className="is-size-2 has-text-weight-bold">{country.name}</h1>
            <div className="content ">
                <p><strong className="is-uppercase" >{dict.countriesBanner.city}: </strong>{country.city}</p>
                <p><strong className="is-uppercase" >{dict.countriesBanner.leader_organization}: </strong>{country.leader}</p>
                <p><strong className="is-uppercase" >{dict.countriesBanner.start_date}: </strong>{country.date}</p>
                <p dangerouslySetInnerHTML={{__html: country.description}}></p>
            </div>

        </div>
    </div>
    )
}