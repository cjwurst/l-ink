"use client"

import { iterateSystem } from "@/app/lib/lSystemHelpers";
import DrawInstruction from "@/app/lib/drawInstruction";
import { useState } from "react";
import Alphabet from '@/app/ui/alphabet';
import Axiom from '@/app/ui/axiom';
import Ruleset from '@/app/ui/ruleset';
import ConfigButton from '@/app/ui/configButton';
import { encodeDrawInstruction } from "@/app/lib/drawInstruction";
import URLCharacter from "@/app/lib/urlCharacter";
import LSystemCanvas from "./lSystemCanvas";

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
        <div className="flex h-full">
            <div className="w-1/4 h-full pr-4 pl-4 flex flex-col gap-4 overflow-scroll border border-blue-500 border-2">
                <div className="overflow-scroll text-sm">{lWord}</div>
                <ConfigButton onClick={handleIterate}>Iterate</ConfigButton>
                <ConfigButton onClick={handleReset}>Reset</ConfigButton>
                <ConfigButton onClick={handleCopyLink}>Copy Link</ConfigButton>
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
            </div>
            <div className="w-3/4 h-full">
                <LSystemCanvas 
                    lWord = {lWord} 
                    drawRules = {drawRules}
                />
            </div>
        </div> 
    );
}