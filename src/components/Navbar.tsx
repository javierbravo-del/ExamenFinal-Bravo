import { Link, useNavigate} from "react-router-dom";

export function Navbar(){
    const navigate = useNavigate();
    return(
        <nav className="flex gap-4 p-4 bg-gray-100">
        <Link to ="/dashboard">Inicio</Link>
            <button className="ml-auto text-red-600"
                onClick={()=>{localStorage.removeItem("token");navigate("/login");}}>Cerrar Sesión</button>
        </nav>
    );
}
