import Header from "./Header";
import banner1 from './images/banner1.jpg';
import banner2 from './images/banner2.jpg';
import banner3 from './images/banner3.jpg';
import avtRandom from './images/male-avatar-maker-2a7919.png';

export default function HomePage() {
    return (
        <>
            <div className="container-fluid main-content h-100 padding mt-5 pt-4">
                <h1 className="blueText padding">Healthcare</h1>

                <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={banner1} className="d-block w-100 bannerImg" loading="lazy" alt="Slide 1" />
                        </div>
                        <div className="carousel-item">
                            <img src={banner2} className="d-block w-100 bannerImg" loading="lazy" alt="Slide 2" />
                        </div>
                        <div className="carousel-item">
                            <img src={banner3} className="d-block w-100 bannerImg" loading="lazy" alt="Slide 3" />
                        </div>
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

            <div className="container main-content mt-4">
                <div className="row">
                    <div className="col-12 padding">
                        <p className="color505F63">
                            Our international, high-quality healthcare facilities and services, such as Example International Hospital and Example General Hospital serve the healthcare and wellness needs of the communities in our industrial parks and townships.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container-fluid main-content padding mt-4">
                <div className="row">
                    <div className="col-md-5 mb-3">
                        <div className="card">
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img style={{ maxWidth: "100%" }} src={avtRandom} loading="lazy" alt="Avatar" />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5>
                                        <p className="card-text">
                                            This is a wider card with supporting text below as a natural lead-in to additional content.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-7">
                        <div className="row">
                            {[banner1, banner2, banner3].map((img, index) => (
                                <div className="col-12 col-md-4 mb-3" key={index}>
                                    <div className="card h-100">
                                        <img src={img} className="card-img-top" alt={`Banner ${index + 1}`} loading="lazy" />
                                        <div className="card-body">
                                            <p className="card-text">
                                                Some quick example text to build on the card title and make up the bulk of the card's content.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
