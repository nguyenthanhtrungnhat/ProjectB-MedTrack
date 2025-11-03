import banner1 from './images/banner1.webp';
import banner2 from './images/banner2.webp';
import banner3 from './images/banner3.webp';
import prom1 from './images/Asset-1.webp';

export default function HomePage() {
    return (
        <>
            <div className="container-fluid pt-5 p-0 h-100 padding mt-5">
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
            <div className="container-fluid papdding mt-5">
                <div className="row p-3">
                    <div className="col-12">
                        <h2 className="headd1">EASY STEPS FOR YOUR CARE</h2>
                        <hr />

                        <div className="row">
                            <div className="col-lg-3 col-sm-6 mb-2">
                                <div className="card hover-shadow" >
                                    <img src={prom1} className="img72" alt="..." />
                                    <div className="card-body">
                                        <p className="card-text">Healcare</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6 mb-2">
                                <div className="card hover-shadow" >
                                    <img src={prom1} className="img72" alt="..." />
                                    <div className="card-body">
                                        <p className="card-text">Make an Appointment</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6 mb-2">
                                <div className="card hover-shadow" >
                                    <img src={prom1} className="img72" alt="..." />
                                    <div className="card-body">
                                        <p className="card-text">Healthcare</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6 mb-2">
                                <div className="card hover-shadow" >
                                    <img src={prom1} className="img72" alt="..." />
                                    <div className="card-body">
                                        <p className="card-text">Ask Us A Question</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid padding mt-5">
                <div className="row p-3">
                    <div className="col-12">
                        <h2 className="headd1">TODAY'S TOP STORIES</h2>
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
                    {[banner1, banner2, banner3, banner3].map((img, index) => (
                        <div className="col-lg-3 col-sm-6 mb-3" key={index}>
                            <a href="#" className="text-decoration-none text-dark">
                                <div className="card h-100 hover-shadow">
                                    <img src={img} className="card-img-top" alt={`Banner ${index + 1}`} loading="lazy" />
                                    <div className="card-body">
                                        <p className="card-text">
                                            Some quick example text to build on the card title and make up the bulk of the card's content.
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
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

            </div>


            <footer className="text-center text-lg-start bg-body-tertiary text-muted mt-5 ">
                <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom whiteText blueBg">
                    <div className="me-5 d-none d-lg-block">
                        <span>Get connected with us on social networks:</span>
                    </div>
                    <div>
                        <a href="" className="me-4 text-reset">
                            <i className="fa-brands fa-facebook"></i>
                        </a>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-google"></i>
                        </a>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-github"></i>
                        </a>
                    </div>
                </section>
                <section className="">
                    <div className="container-fluid p-4 m-0 text-center text-md-start blueBg whiteText">
                        <div className="row">
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    <i className="fas fa-gem me-3"></i>Company name
                                </h6>
                                <p>
                                    Here you can use rows and columns to organize your footer content. Lorem ipsum
                                    dolor sit amet, consectetur adipisicing elit.
                                </p>
                            </div>
                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                                <div className="row row-cols-sm-4 row-cols-md-1 g-2">
                                    <div className="col">
                                        <a href="#!" className="text-reset">Angular</a>
                                    </div>
                                    <div className="col">
                                        <a href="#!" className="text-reset">React</a>
                                    </div>
                                    <div className="col">
                                        <a href="#!" className="text-reset">Vue</a>
                                    </div>
                                    <div className="col">
                                        <a href="#!" className="text-reset">Laravel</a>
                                    </div>
                                </div>
                            </div>


                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Useful links
                                </h6>
                                <div className="row row-cols-sm-4 row-cols-md-1 g-2">
                                    <div className="col"><a href="#!" className="text-reset">Pricing</a></div>
                                    <div className="col"><a href="#!" className="text-reset">Settings</a></div>
                                    <div className="col"><a href="#!" className="text-reset">Orders</a></div>
                                    <div className="col"><a href="#!" className="text-reset">Help</a></div>
                                </div>
                            </div>

                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 ">
                                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                                <p><i className="fas fa-home me-3"></i> New York, NY 10012, US</p>
                                <p>
                                    <i className="fas fa-envelope me-3"></i>
                                    info@example.com
                                </p>
                                <p><i className="fas fa-phone me-3"></i> + 01 234 567 88</p>
                                <p><i className="fas fa-print me-3"></i> + 01 234 567 89</p>
                            </div>
                        </div>
                    </div>
                </section>
                <hr className="m-0" />
                <div className="text-center p-4 blueBg whiteText">
                    © 2021 Copyright:{" "}
                    <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
                        MDBootstrap.com
                    </a>
                </div>
            </footer>
        </>
    );
}
