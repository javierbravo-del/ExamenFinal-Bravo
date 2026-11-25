import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import {api} from "../api";
import { FormField } from "../components/FormField";

interface Mentors{id:number; name:string; specialty:string; modality:string; availableSlots:number}

export default function Dashboard(){
    const[mentor,setMentors] = useState<Mentors[]>([]);
    const[page, setPages] = useState(1);
    const[totalpages, setTotalPages] = useState(0);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState("");

    async function load() {
        setLoading(true); setError("");
        try{
            const{data}= await api.get("/dashboard", {params:{page,size:5}});
            setMentors(data.mentors);setTotalPages(data.totalpages);
        }catch {setError("No se pudo cargar");}
        finally{setLoading(false);}
        }
        useEffect(()=>{load();},[page]);
    }
    return(
        <div className="max-w-2xl mx-auto p-6">
            {loading && <p>Cargando...</p>}
            {error && <div><p className="text-red-600">{error}</p><button onClick={load} className="underline">Reintentar</button></div>}
            {!loading && !error && Mentors.length === 0 && <p>No hay resultados</p>}
            {Mentors.map((mentor)=>(
                <Link Key={mentor.id} to={`/mentors/${mentor.id}`}className="block border rounded p-3 mb-2">
                    {mentor.name} - {mentor.specialty} - {mentor.modality} - Cupos:{mentor.availableSlots}
                </Link>
            ))}
            <Pagination page={page} totalPages={totalPages} onChange={setPage}/>
        </div>
    );
}