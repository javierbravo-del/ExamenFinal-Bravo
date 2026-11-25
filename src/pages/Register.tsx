import { FormEvent, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import {api} from "../api";
import { FormField } from "../components/FormField";

export default function Register(){
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<any>({});
    const [apiError, setApiError] = useState("");

    async function submit(event:FormEvent){
        event.preventDefault();
        const newErrors:any = {};
        if (!name.trim() || name.length >100) newErrors.name = "Nombre obligatorio (máx. 100 caracteres)";
        if (!/^\S+@\S+\$/.test(email)) newErrors.email = "Correo inválido";
        if (password.length <8 || password.length>72) newErrors.password ="Contraseña entre 8 a 72 caracteres";
        setErrors(newErrors);
        if(Object.keys(newErrors).length)return;
        try{
            await api.post("auth/register",{name, email, password});
            navigate("/login");
        } catch (error:any) {setApiError(error.response?.data?.message??"No se pudo registrar");}
    }
    return(
        <form onSubmit={submit}className="max-w-sm mx-auto p-6">
            <h1 className="text-2xl mb-4">Registro</h1>
            <FormField id ="name" label="Nombre" value={name} onChange={setName} error={errors.name}/>
            <FormField id ="email" label="Correo"  type="email" value={email} onChange={setEmail} error={errors.email}/>
            <FormField id ="password" label="Contraseña"  type="password" value={password} onChange={setPassword} error={errors.password}/>
            {apiError && <p className="text-red-600">{apiError}</p>}
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Registrarme</button>
            <p className="mt-3"><Link to="/login" className="text-blue-600">Ir al login</Link></p>
        </form>
    );
}


