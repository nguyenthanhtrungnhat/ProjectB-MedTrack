import SidebarLogin from "../SidebarLogin";

export default function DoctorScreen() {
    return (
        <div className="container-fluid mainBg pt-5 mt-5 h-100">
            <div className="row">
                <div className="col-lg-9 col-sm-12 order-2 order-lg-1">
        
                </div>
                <div className="col-lg-3 order-1 order-lg-2 col-sm-12">
                    <SidebarLogin />
                </div>
            </div>

        </div>
    )
}