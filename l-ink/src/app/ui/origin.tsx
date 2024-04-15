'use client';

import ConfigInput from "./configInput";

type OriginProps = {
    origin:[number, number, number]
    onChange:(p: [number, number, number]) => void
}

export default function Origin({origin, onChange}: OriginProps) {
    function handleChange(i: number, term: string) {
        const num = Number(term);
        if (Number.isNaN(num))
            return;
        const result = [...origin]
        result[i] = num;
        onChange(result as [number, number, number]);
    }
    
    return(
        <div className="flex flex-row w-full items-end gap-4">
            <ConfigInput 
                onChange={(term) => handleChange(0 , term)}
                name="Origin"
                value={origin[0]}
                type="number"
                id="origin-x"
            />
            <ConfigInput 
                onChange={(term) => handleChange(1 , term)}
                value={origin[1]}
                type="number"
                id="origin-y"
            />
        </div>
    );
}