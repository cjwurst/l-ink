'use client';

type AxiomProps = {
    axiom:string
    onChange:(a:string) => void
}

export default function Axiom({axiom, onChange}: AxiomProps) {
    function handleChange(term: string) {
        if (term) {
            onChange(term);
        } else {
            onChange("");
        }
    }

    return (
        <div className="relative flex pt-5 flex-grow">
            <div className="w-24">
                <label htmlFor="axiom"> Axiom: </label>
            </div>
            <input 
                id="axiom" 
                className="peer block outline-2 w-full border border-slate-500 bg-slate-200 text-black" 
                onChange={ (e) => { handleChange(e.target.value); }}
                value = {axiom}
            />
        </div>
    );
}
