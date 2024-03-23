'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Alphabet() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const reservedChars:string[] = ["|", ":"];

    function handleChange(term: string) {
        const params = new URLSearchParams(searchParams);
        const chars = Array.from(term);
        console.log(chars);
        const alphabet = chars.filter((c, i) => { 
            return chars.indexOf(c) === i &&           // remove duplicates
            reservedChars.indexOf(c) === -1     // remove reserved characters
        }).join("");        
        console.log(alphabet);
        if (term) {
            params.set('alphabet', alphabet);
        } else {
            params.delete('alphabet');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="relative flex flex-grow">
            <div className="w-24">
                <label htmlFor="alphabet"> Alphabet: </label>
            </div>
            <input 
                id="alphabet" 
                className="peer block outline-2 w-full border border-slate-500 bg-slate-200 text-black" 
                onChange={ (e) => { handleChange(e.target.value); }}
                defaultValue = {searchParams.get('alphabet')?.toString()}
            />
        </div>
    );
}