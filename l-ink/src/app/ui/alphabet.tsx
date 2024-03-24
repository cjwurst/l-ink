'use client';

import URLCharacter from "@/app/lib/urlCharacter";

type AlphabetProps = {
    alphabet: string
    onChange: (s:string) => void
}

export default function Alphabet({alphabet, onChange}: AlphabetProps) {
    const reservedChars:string[] = Object.values(URLCharacter);

    function handleChange(term: string) {
        const chars = Array.from(term);
        const alphabet = chars.filter((c, i) => { 
            return chars.indexOf(c) === i &&            // remove duplicates
                reservedChars.indexOf(c) === -1         // remove reserved characters
        }).join("");        
        if (term) {
            onChange(alphabet);
        } else {
            onChange("");
        }
    }

    return (
        <div className="flex gap-1">
            <label htmlFor="alphabet"> Alphabet: </label>
            <input 
                id="alphabet" 
                className="outline-2 border border-slate-500 bg-slate-200 text-black" 
                onChange={(e) => { handleChange(e.target.value);}}
                value = {alphabet}
            />
        </div>
    );
}