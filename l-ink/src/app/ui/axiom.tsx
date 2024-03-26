'use client';

import ConfigInput from "./configInput";

type AxiomProps = {
    axiom:string
    onChange:(a:string) => void
}

export default function Axiom({axiom, onChange}: AxiomProps) {
    return <ConfigInput 
        onChange={onChange}
        name="Axiom"
        value={axiom}
    />;
}
