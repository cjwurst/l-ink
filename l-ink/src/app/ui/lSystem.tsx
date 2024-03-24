"use client"

import LSystemDisplay from "@/app/ui/lSystemDisplay";
import DrawInstruction from "@/app/lib/drawInstruction";
import { useState } from "react";
import Alphabet from '@/app/ui/alphabet';
import Axiom from '@/app/ui/axiom';
import Ruleset from '@/app/ui/ruleset';
import IterateButton from '@/app/ui/renderButton';
import { encodeDrawInstruction } from "@/app/lib/drawInstruction";

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
    const [drawRules, setDrawRules] = useState(new Map());
    const [iterateRules, setIterateRules] = useState(new Map());
    const [lWord, setLWord] = useState("");

    /*function getIterateRulesString(): string {
        let result = "";
        for(let i = 0; i < )
        return result;
    }

    function getRuleArray(): string[] {
        return getRuleString().split("|");
    }

    function getAlphabetArray(): string[] {
        return Array.from(searchParams.get("alphabet")?.toString() || "")
    }*/

    function handleReset() {
        setAxiom(defaultAxiom);
        setAlphabet(defaultAlphabet);
        setDrawRules(defaultDrawRules);
        setIterateRules(defaultIterateRules);
        setLWord("");
    }

    function handleCopyLink() {
        const params = new URLSearchParams();

        params.set("alphabet", alphabet);

        params.set("axiom", axiom);
        
        const iterateParam = Array.from(iterateRules.entries()).map((pair) => pair.join(":")).join("|");
        params.set("iterate", iterateParam);

        const drawParam = Array.from(drawRules.entries()).map((pair) => {
            pair[1] = encodeDrawInstruction(pair[1]);
            return pair.join(":");
        }).join("|");
        params.set("draw", drawParam);

        let href = window.location.href;
        href = href.split("?")[0];
        navigator.clipboard.writeText(`${href}?${params}`);
    }

    return (
        <div className="flex-row">
            <div className="flex gap-8 p-8 h-screen w-1/4 flex-col items-center justify-start text-slate-300 border-slate-500 border-2">
                <Alphabet 
                    alphabet={alphabet}
                    onChange={(a:string) => setAlphabet(a)}
                />
                <Axiom 
                    axiom={axiom}
                    onChange={(a:string) => setAxiom(a)}
                />
                <Ruleset 
                    alphabet={alphabet}
                    iterateRules={iterateRules}
                    onChangeIterateRules={(r:Map<string, string>) => setIterateRules(r)}
                    drawRules={drawRules}
                    onChangeDrawRules={(r:Map<string, DrawInstruction>) => setDrawRules(r)}
                />
                <div className="w-full items-center bg-slate-200 border-slate-500 border-2 text-slate-900">
                    <IterateButton />
                </div>
                <button onClick={handleReset}>Reset</button>
                <button onClick={handleCopyLink}>Copy Link</button>
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