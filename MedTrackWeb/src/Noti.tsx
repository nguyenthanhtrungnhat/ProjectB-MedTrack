export default function Noti() {
    return (
        <>
            <li className="nav-item dropdown">
                <span
                    className="nav-link dropdown-toggle whiteText position-relative no-caret d-flex align-items-center"
                    role="button"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                    aria-expanded="false"
                >
                    <span className="inboxText m-0 hasInboxIcon">Inbox</span>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        99+
                        <span className="visually-hidden">unread messages</span>
                    </span>
                </span>

                <ul className="dropdown-menu inbox-dropdown shadow-lg">
                    <li><h5 className="p-3">Notifications</h5></li>
                    <hr className="m-2" />

                    <li>
                        <span className="dropdown-item tdec0">
                            <div className="alert alert-success" role="alert">
                                ✅ A simple success alert with{" "}
                                <a href="/home" className="alert-link">
                                    an example link
                                </a>.
                            </div>
                        </span>
                    </li>

                    <li>
                        <span className="dropdown-item tdec0">
                            <div className="alert alert-danger" role="alert">
                                ⚠️ A simple danger alert with{" "}
                                <a href="/home" className="alert-link">
                                    an example link
                                </a>.
                            </div>
                        </span>
                    </li>
                </ul>
            </li>
        </>
    )
}