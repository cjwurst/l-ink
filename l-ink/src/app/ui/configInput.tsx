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
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                > 
                    {name}: 
                </label>
            }
            <input 
                type="text"
                id={name} 
                className="block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                onChange={(e) => { onChange(e.target.value || "");}}
                value = {value}
            />
        </div>
    );
}