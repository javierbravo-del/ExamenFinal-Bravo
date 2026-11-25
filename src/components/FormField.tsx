
interface FormFieldProps{id:string; label:string; value:string; onChange:(value:string)=>void;type?:string; error?:string}

export function FormField({id, label, value, onChange, type="text",error}:FormFieldProps){
    return(
        <div className="mb-3">
            <label htmlFor={id} className="block text-sm font-medium">{label}</label>
            <input id={id} type={type} value={value} onChange={(event)=> onChange(event.target.value)}
            className="w-full border rounded px-3 py-2"/>
            {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
    );
}
