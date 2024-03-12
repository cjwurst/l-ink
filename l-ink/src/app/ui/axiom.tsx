'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Axiom() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleAxiom(term: string) {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('axiom', term);
        } else {
            params.delete('axiom');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="relative flex pt-5 flex-grow">
            <div className="w-24">
                <label htmlFor="axiom"> Axiom: </label>
            </div>
            <input 
                id="axiom" 
                className="peer block outline-2 w-full border border-slate-500 bg-slate-200 text-black" 
                onChange={ (e) => { handleAxiom(e.target.value); }}
                defaultValue = {searchParams.get('axiom')?.toString()}
            />
        </div>
    );
}
