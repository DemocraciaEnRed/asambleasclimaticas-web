import Link from 'next/link'
import ProfileSideMenu from '@/components/perfil/sideMenu'

export default function Layout({ children }) {

  return (
    <div id="admin-layout" className="hero is-light is-fullheight">
      <div className="hero-body is-align-items-flex-start">

      <div className="container">
        <div className="columns">
          <div className="column is-3">
            <div className="card">
              <div className="card-content px-3">  
                <ProfileSideMenu />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="card">
                <div className="card-content">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}