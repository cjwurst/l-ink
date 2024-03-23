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
        <div className="flex gap-1">
            <label htmlFor="axiom"> Axiom: </label>
            <input 
                id="axiom" 
                className="outline-2 border border-slate-500 bg-slate-200 text-black" 
                onChange={ (e) => { handleChange(e.target.value); }}
                value = {axiom}
            />
        </div>
    );
}
