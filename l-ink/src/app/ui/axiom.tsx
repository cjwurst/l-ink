'use client';

type AxiomProps = {
    axiom:string
    setAxiom:(a:string) => void
}

export default function Axiom({axiom, setAxiom}: AxiomProps) {
    function handleChange(term: string) {
        if (term) {
            setAxiom(term);
        } else {
            setAxiom("");
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
