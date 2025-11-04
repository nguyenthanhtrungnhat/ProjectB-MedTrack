import banner1 from './images/banner1.webp';
import banner2 from './images/banner2.webp';
import banner3 from './images/banner3.webp';
import prom1 from './images/Asset-1.webp';
import prom2 from './images/Asset-3.webp';
import prom3 from './images/Asset-4.webp';
import prom4 from './images/Asset-5.webp';
import Introduce from './Introduce';
import { useEffect, useState } from 'react';
export default function HomePage() {
    const banners = [banner1, banner2, banner3, banner3];

    const [visibleCount, setVisibleCount] = useState(4);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreen = () => {
            const mobile = window.innerWidth <= 576;
            setIsMobile(mobile);
            setVisibleCount(mobile ? 2 : 4);
        };

        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    const handleToggle = () => {
        setVisibleCount((prev) =>
            prev === (isMobile ? 2 : 4) ? banners.length : isMobile ? 2 : 4
        );
    };

    const showToggleBtn = banners.length > (isMobile ? 2 : 4);
    return (
        <>
            <div className="container-fluid pt-5 p-0 h-100 padding">
                <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        {/* <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button> */}
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src='https://marketplace.canva.com/EAGgZ8Npo0w/1/0/1600w/canva-blue-and-white-simple-medical-center-banner-hPVBVEoLtMY.jpg' className="d-block w-100" loading="lazy" alt="Slide 1" />
                        </div>
                        <div className="carousel-item">
                            <img src='https://marketplace.canva.com/EAGKRVPLHsU/1/0/1600w/canva-green-and-white-modern-gradient-health-banner-fWIvneHZsvs.jpg' className="d-block w-100" loading="lazy" alt="Slide 2" />
                        </div>
                        {/* <div className="carousel-item">
                            <img src={banner3} className="d-block w-100 bannerImg" loading="lazy" alt="Slide 3" />
                        </div> */}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className="container papdding mt-5">
                <div className="row p-3">
                    <div className="col-12">
                        {/* <h2 className="headd1">EASY STEPS FOR YOUR CARE</h2> */}
                        <h2 className="headd1">Easy steps for your care</h2>
                        <hr />

                        <div className="row">
                            <div className="col-lg-3 col-sm-6 mb-2">
                                <div className="card hover-shadow center" >
                                    <img src={prom1} className="img72" alt="..." />
                                    <div className="card-body">
                                        <p className="card-text">Healcare</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6 mb-2">
                                <div className="card hover-shadow center" >
                                    <img src={prom2} className="img72" alt="..." />
                                    <div className="card-body">
                                        <p className="card-text">Make an Appointment</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6 mb-2">
                                <div className="card hover-shadow center" >
                                    <img src={prom4} className="img72" alt="..." />
                                    <div className="card-body">
                                        <p className="card-text">Medical Services</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6 mb-2">
                                <div className="card hover-shadow center" >
                                    <img src={prom3} className="img72" alt="..." />
                                    <div className="card-body">
                                        <p className="card-text">Ask Us A Question</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container padding mt-5">
                <div className="row p-3">
                    <div className="col-12">
                        {/* <h2 className="headd1">TODAY'S TOP STORIES</h2> */}
                        <h2 className="headd1">Today's top stories</h2>
                        <hr />
                    </div>
                    <div className="col-lg-12 mb-4">
                        <a href="#" className="text-decoration-none text-dark">
                            <div className="card hover-shadow">
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img
                                            style={{ maxWidth: "100%" }}
                                            src='https://tse3.mm.bing.net/th/id/OIP.mPgnNcMG0Wr3pR_h3gJKbwHaE2?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3' loading="lazy"
                                            alt="Avatar"
                                        />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h3 className="card-title">Card title</h3>
                                            <p className="card-text">
                                                Our international, high-quality healthcare facilities and services, such as Example International Hospital and Example General Hospital serve the healthcare and wellness needs of the communities in our industrial parks and townships.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="row p-3">
                    {banners.slice(0, visibleCount).map((img, index) => (
                        <div className="col-lg-3 col-sm-6 mb-3" key={index}>
                            <a href="#" className="text-decoration-none text-dark">
                                <div className="card h-100 hover-shadow">
                                    <img
                                        src={img}
                                        className="card-img-top"
                                        alt={`Banner ${index + 1}`}
                                        loading="lazy"
                                    />
                                    <div className="card-body">
                                        <div className="d-flex flex-column mb-2">
                                            <time dateTime="2003-01-01" className="text-muted small date-with-icon">
                                                1/1/2003
                                            </time>
                                        </div>
                                        <div>
                                            <p className="card-text">
                                                New's title
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}

                    {showToggleBtn && (
                        <div className="text-center mb-3">
                            <button
                                className="btn btn-outline-primary"
                                onClick={handleToggle}
                            >
                                {visibleCount === (isMobile ? 2 : 4) ? "Show More" : "Show Less"}
                            </button>
                        </div>
                    )}
                </div>
                <div className="d-flex justify-content-center align-items-center mt-5 mb-5">
                    <div className="row text-center">
                        <div className="col-lg-12">
                            <h2 className='headd1'>Already a member?</h2>
                            <p>Go to the member site to sign in or register for an account</p>
                            <a href="/login">Member sign in</a>
                        </div>
                    </div>
                </div>
                {/*here */}
                <Introduce />
                {/* <HospitalServices /> */}
            </div >
        </>
    );
}
