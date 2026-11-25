import { FormEvent, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import {api} from "../api";
import { FormField } from "../components/FormField";

export default function Login(){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function submit(event:FormEvent) {
        event.preventDefault();
        try{
            const{data}= await api.post("auth/login",{email, password});
            localStorage.setItem("token",data.token);
        navigate("/dashboard");
        } catch {setError("Credenciales incorrectas");}        
    }
    return(
        <form onSubmit={submit}className="max-w-sm mx-auto p-6">
            <h1 className="text-2xl mb-4">Iniciar Sesión</h1>
            <FormField id ="email" label="Correo"  type="email" value={email} onChange={setEmail}/>
            <FormField id ="password" label="Contraseña"  type="password" value={password} onChange={setPassword}/>
            {error && <p className="text-red-600">{error}</p>}
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Ingresar</button>
            <p className="mt-3"><Link to="/register" className="text-blue-600">Ir al registro</Link></p>
        </form>
    );
}