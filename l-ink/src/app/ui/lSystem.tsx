"use client"

import { iterateSystem } from "@/app/lib/lSystemHelpers";
import DrawInstruction from "@/app/lib/drawInstruction";
import { useState } from "react";
import Alphabet from '@/app/ui/alphabet';
import Axiom from '@/app/ui/axiom';
import Origin from '@/app/ui/origin';
import Ruleset from '@/app/ui/ruleset';
import ConfigButton from '@/app/ui/configButton';
import { encodeDrawInstruction } from "@/app/lib/drawInstruction";
import URLCharacter from "@/app/lib/urlCharacter";
import LSystemCanvas from "./lSystemCanvas";
import ConfigInput from "./configInput";

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
    const [iterationCount, setIterationCount] = useState(0);
    const [axiom, setAxiom] = useState(defaultAxiom);
    const [alphabet, setAlphabet] = useState(defaultAlphabet);
    const [iterateRules, setIterateRules] = useState(defaultIterateRules);
    const [drawRules, setDrawRules] = useState(defaultDrawRules);
    const [lWord, setLWord] = useState(defaultAxiom);
    const [initialAngle, setInitialAngle] = useState(0);
    const [angleIncrement, setAngleIncrement] = useState(45);
    const [origin, setOrigin] = useState([0, 0, 0] as [number, number, number]);
    const [drawDistance, setDrawDistance] = useState(1);

    function handleIterationCount(term: string) {
        let count = Number(term);
        let word = lWord;
        let start = iterationCount;
        if(Number.isNaN(count)) {
            setLWord(axiom);
            setIterationCount(0);
            return;
        } 
        count = Math.max(0, Math.round(count));
        if(count < iterationCount) {
            word = axiom;
            start = 0;
        }
        for (let i = start; i < count; i++) {
            word = iterateSystem(word, iterateRules);
        }
        setLWord(word);
        setIterationCount(count);
    }

    function handleAxiom(term?: string) {
        term = term || "";
        setAxiom(term);
        setLWord(term);
    }

    function handleAlphabet(term?: string) {
        term = term || "";
        setAlphabet(term);
    }
    
    function handleInitialAngle(term: string) {
        const angle = Number(term);
        if(!Number.isNaN(angle))
            setInitialAngle(angle);
    }

    function handleAngleIncrement(term: string) {
        const angle = Number(term);
        if(!Number.isNaN(angle))
            setAngleIncrement(angle);
    }

    function handleOrigin(position:[number, number, number]) {
        setOrigin(position);
    }

    function handleDrawDistance(term: string) {
        const distance = Number(term);
        if(!Number.isNaN(distance))
            setDrawDistance(distance);
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
            <div className="w-1/4 h-full pr-4 pl-4 flex flex-col gap-4 overflow-scroll">
                {/* <div className="overflow-scroll text-sm grow-0">{lWord}</div> */}
                <ConfigButton onClick={handleReset}>Reset</ConfigButton>
                <ConfigButton onClick={handleCopyLink}>Copy Link</ConfigButton>
                <ConfigInput 
                    onChange={handleIterationCount}
                    value={iterationCount}
                    name="Number of Iterations"
                    type="number"
                />
                <Alphabet 
                    alphabet={alphabet}
                    onChange={handleAlphabet}
                />
                <Axiom 
                    axiom={axiom}
                    onChange={handleAxiom}
                />
                <ConfigInput
                    onChange={handleInitialAngle}
                    value={initialAngle}
                    name="Initial Angle"
                    type="number"
                />
                <ConfigInput
                    onChange={handleAngleIncrement}
                    value={angleIncrement}
                    name="Turn Angle"
                    type="number"
                />
                <Origin 
                    onChange={handleOrigin}
                    origin={origin}
                />
                <ConfigInput
                    onChange={handleDrawDistance}
                    value={drawDistance}
                    name="Draw Distance"
                    type="number"
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
                    initialAngle={initialAngle}
                    angleIncrement={angleIncrement}
                    origin={origin}
                    drawDistance={drawDistance}
                    lWord = {lWord} 
                    drawRules = {drawRules}
                />
            </div>
        </div> 
    );
}