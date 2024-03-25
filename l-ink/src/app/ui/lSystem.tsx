"use client"

import { iterateSystem } from "@/app/lib/lSystemHelpers";
import LSystemDisplay from "@/app/ui/lSystemDisplay";
import DrawInstruction from "@/app/lib/drawInstruction";
import { useState } from "react";
import Alphabet from '@/app/ui/alphabet';
import Axiom from '@/app/ui/axiom';
import Ruleset from '@/app/ui/ruleset';
import Button from '@/app/ui/button';
import { encodeDrawInstruction } from "@/app/lib/drawInstruction";
import URLCharacter from "@/app/lib/urlCharacter";

type LSystemProps = {
    defaultAxiom: string
    defaultAlphabet: string
    defaultIterateRules: Map<string, string>
    defaultDrawRules: Map<string, DrawInstruction>
}

export default function LSystem({
    defaultAxiom, 
    defaultAlphabet, 
    defaultIterateRules, 
    defaultDrawRules
}: LSystemProps) {
    const [axiom, setAxiom] = useState(defaultAxiom);
    const [alphabet, setAlphabet] = useState(defaultAlphabet);
    const [iterateRules, setIterateRules] = useState(defaultIterateRules);
    const [drawRules, setDrawRules] = useState(defaultDrawRules);
    const [lWord, setLWord] = useState(defaultAxiom);

    function handleAxiom(term?: string) {
        term = term || "";
        setAxiom(term);
        setLWord(term);
    }

    function handleAlphabet(term?: string) {
        term = term || "";
        setAlphabet(term);
    }

    function handleIterate() {
        setLWord(iterateSystem(lWord, iterateRules));
    }

    function handleReset() {
        setAxiom(defaultAxiom);
        setAlphabet(defaultAlphabet);
        setDrawRules(defaultDrawRules);
        setIterateRules(defaultIterateRules);
        setLWord(defaultAxiom);
    }

    function handleCopyLink() {
        const params = new URLSearchParams();

        params.set("alphabet", alphabet);

        params.set("axiom", axiom);
        
        const iterateParam = Array.from(iterateRules.entries()).map((pair) => 
            pair.join(URLCharacter.TUPLE_BREAK)).join(URLCharacter.LIST_BREAK);
        params.set("iterate", iterateParam);

        const drawParam = Array.from(drawRules.entries()).map((pair) => {
            pair[1] = encodeDrawInstruction(pair[1]) as DrawInstruction;
            return pair.join(URLCharacter.TUPLE_BREAK);
        }).join(URLCharacter.LIST_BREAK);
        params.set("draw", drawParam);

        let href = window.location.href;
        href = href.split("?")[0];
        navigator.clipboard.writeText(`${href}?${params.toString()}`);
    }

    return (
        <div className="flex-row">
            <div className="flex gap-6 p-8 h-screen w-1/4 flex-col items-center justify-start text-slate-300 border-slate-500 border-2">
                <Alphabet 
                    alphabet={alphabet}
                    onChange={handleAlphabet}
                />
                <Axiom 
                    axiom={axiom}
                    onChange={handleAxiom}
                />
                <Ruleset 
                    alphabet={alphabet}
                    iterateRules={iterateRules}
                    onChangeIterateRules={(r:Map<string, string>) => setIterateRules(r)}
                    drawRules={drawRules}
                    onChangeDrawRules={(r:Map<string, DrawInstruction>) => setDrawRules(r)}
                />
                <Button onClick={handleIterate}>Iterate</Button>
                <Button onClick={handleReset}>Reset</Button>
                <Button onClick={handleCopyLink}>Copy Link</Button>
                {lWord}
            </div>
            <LSystemDisplay 
                origin = {[0, 0, 0]}
                lWord = {lWord} 
                drawRules = {drawRules}
            />
        </div> 
    );
}