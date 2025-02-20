import Header from "./Header";

export default function HomePage() {
    return (
        <>
            <Header />

            <div className="container-fluid main-content h-100 padding">
                <h1 className="blueText">Healthcare</h1>
                <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                        <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="https://static.vecteezy.com/system/resources/previews/000/382/288/original/vector-healthcare-and-medical-banner-template-background.jpg" className="d-block w-100" alt="..." />

                        </div>
                        <div className="carousel-item">
                            <img src="https://th.bing.com/th/id/R.82237fe9cb402e76e90e338c63094a04?rik=BXZJjeUYCbb2vw&riu=http%3a%2f%2furoomsurf.com%2fwp-content%2fuploads%2f2020%2f05%2fHospital-Banner-Template-Example.jpg&ehk=IzHdc5lrAssfUf7Svgep6k%2btS%2fvOMX6v2nkO%2fRj84H8%3d&risl=&pid=ImgRaw&r=0" className="d-block w-100" alt="..." />

                        </div>
                        <div className="carousel-item">
                            <img src="https://i.pinimg.com/originals/dd/77/d2/dd77d2b74cc81a8e61299c35194b0f3b.jpg" className="d-block w-100" alt="..." />

                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-target="#carouselExampleCaptions" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-target="#carouselExampleCaptions" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </button>
                </div>
            </div>
        </>
    )
}