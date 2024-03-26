type ConfigInputProps = {
    onChange: (s:string) => void
    value: string
    name?: string
}

export default function ConfigInput({onChange, value, name}:ConfigInputProps) {
    return (
        <div>
            {name && 
                <label 
                    htmlFor={name}
                    className="block mb-2 text-sm font-medium"
                > 
                    {name}: 
                </label>
            }
            <input 
                type="text"
                id={name} 
                className="block w-full p-2.5 outline-2 border border-slate-500 bg-slate-200 text-black text-sm rounded-lg focus:ring-blue-500 focus: border-blue-500" 
                onChange={(e) => { onChange(e.target.value || "");}}
                value = {value}
            />
        </div>
    );
}