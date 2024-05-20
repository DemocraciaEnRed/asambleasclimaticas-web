'use client'
import { PopupButton } from '@typeform/embed-react';
import Image from 'next/image';


const TypeformCardHome = ({ typeformId }) => {
  // Your component logic here

  return (
        <div
          className="card m-3 py-4 is-flex is-flex-direction-column"
    >
          <div className="card-image pt-5 has-text-centered">
              <Image
                  src={`/icon/mail-pink.svg`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="icon-card"
                  alt=""
              />
          </div>
          <div className="card-content py-0 has-text-centered has-text-white is-flex-grow-1 is-flex is-flex-direction-column is-justify-content-space-evenly">
              <div className="title is-size-3 is-size-4-touch">
                Completá nuestra encuesta
                <h5 className="is-size-5 is-italic"> 
                  {/* PT */}
                  Complete nossa pesquisa
                </h5>
              </div>
              <div className="card-description">
                <p className="has-text-weight-bold is-size-5">
                  Queremos saber más sobre la crisis climática en la región y su impacto en las personas
                </p>
                <p className="is-size-6 is-italic">
                  {/* PT */}
                  Queremos saber mais sobre a crise climática na região e seu impacto nas pessoas
                </p>
              </div>
          </div>
          <footer className="card-footer is-justify-content-center py-4">
            <div>

            <PopupButton id={typeformId} className="button is-rounded has-background-pink has-text-white is-uppercase">
              {/* Both Es & PT */}
              Completar encuesta
              </PopupButton>
              <br />
              <span className="is-size-7">*Preencha a pesquisa</span>
            </div>
          </footer>
      </div>
    
  );
};

export default TypeformCardHome;