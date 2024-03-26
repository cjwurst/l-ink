'use client';

import URLCharacter from "@/app/lib/urlCharacter";
import ConfigInput from "./configInput";

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

    return <ConfigInput 
        onChange={handleChange}
        name="Alphabet"
        value={alphabet}
    />;
}