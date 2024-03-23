'use client';

type AlphabetProps = {
    alphabet: string
    onChange: (s:string) => void
}

export default function Alphabet({alphabet, onChange}: AlphabetProps) {
    const reservedChars:string[] = ["|", ":"];

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
        <div className="relative flex flex-grow">
            <div className="w-24">
                <label htmlFor="alphabet"> Alphabet: </label>
            </div>
            <input 
                id="alphabet" 
                className="peer block outline-2 w-full border border-slate-500 bg-slate-200 text-black" 
                onChange={(e) => { handleChange(e.target.value);}}
                value = {alphabet}
            />
        </div>
    );
}