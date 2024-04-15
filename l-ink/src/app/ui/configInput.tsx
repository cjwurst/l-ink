type ConfigInputProps = {
    onChange: (s:string) => void
    value: string | number
    name?: string
    type?: "text" | "number"
    step?: number
    id?: string
}

export default function ConfigInput({onChange, value, name="", type="text", step=1, id=""}:ConfigInputProps) {
    return (
        <div>
            {name && 
                <label 
                    htmlFor={name || id}
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                > 
                    {name}: 
                </label>
            }
            <input 
                step={step}
                type={type}
                id={name || id} 
                className="block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                onChange={(e) => { onChange(e.target.value || "");}}
                onWheel={(e) => {
                    if (e.target instanceof HTMLElement) e.target.blur();
                }}
                value = {value}
            />
        </div>
    );
}