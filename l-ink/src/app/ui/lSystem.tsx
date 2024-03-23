"use client"

import LSystemDisplay from "@/app/ui/lSystemDisplay";
import DrawInstruction from "@/app/lib/drawInstruction";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState } from "react";
import Alphabet from '@/app/ui/alphabet';
import Axiom from '@/app/ui/axiom';
import Ruleset from '@/app/ui/ruleset';
import IterateButton from '@/app/ui/renderButton';

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

    //TODO: generate sandbox URL
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const ruleString = getRuleString();

    function setRules(ruleString: string) {
        const params = new URLSearchParams(searchParams);
        if (!ruleString.endsWith("|")) {
            ruleString += "|"; 
        }
        params.set('ruleset', ruleString);
        replace(`${pathname}?${params.toString()}`);
    }

    function getRuleString(): string {
        return searchParams.get("ruleset")?.toString() || "";
    }

    function getRuleArray(): string[] {
        return getRuleString().split("|");
    }

    function getAlphabetArray(): string[] {
        return Array.from(searchParams.get("alphabet")?.toString() || "")
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