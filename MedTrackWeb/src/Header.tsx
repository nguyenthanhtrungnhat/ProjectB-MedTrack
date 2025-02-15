import logo from './images/logo.png'
export default function Header() {
    return (
        <div className="header dropShadow fixed-top">
            <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
                <img src={logo} className="logo" />
                <a className="navbar-brand " href="/"><h4 className='whiteText'> MedTrack</h4></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-link active " href="#"><h5 className='whiteText hasHomeIcon'>Home</h5> <span className="sr-only">(current)</span></a>
                        <a className="nav-link whiteText " href="/"><h5 className='whiteText hasProfileIcon'>Profile</h5></a>
                    </div>
                </div>
            </nav>
        </div>
    )
}