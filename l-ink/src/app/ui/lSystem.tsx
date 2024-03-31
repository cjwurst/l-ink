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
import URLParamName from "@/app/lib/urlParamNames";
import LSystemCanvas from "./lSystemCanvas";
import ConfigInput from "./configInput";

type LSystemProps = {
    defaultIterationCount: number
    defaultAxiom: string
    defaultAlphabet: string
    defaultIterateRules: Map<string, string>
    defaultDrawRules: Map<string, DrawInstruction>
    defaultAngle: number
    defaultAngleIncrement: number
    defaultOrigin: [number, number, number]
    defaultDrawDistance: number
}

export default function LSystem({
    defaultIterationCount,
    defaultAxiom, 
    defaultAlphabet, 
    defaultIterateRules, 
    defaultDrawRules,
    defaultAngle,
    defaultAngleIncrement,
    defaultOrigin,
    defaultDrawDistance
}: LSystemProps) {
    const [iterationCount, setIterationCount] = useState(defaultIterationCount);
    const [axiom, setAxiom] = useState(defaultAxiom);
    const [alphabet, setAlphabet] = useState(defaultAlphabet);
    const [iterateRules, setIterateRules] = useState(defaultIterateRules);
    const [drawRules, setDrawRules] = useState(defaultDrawRules);
    const [lWord, setLWord] = useState(findLWord(defaultAxiom, 0, defaultIterationCount));
    const [initialAngle, setInitialAngle] = useState(defaultAngle);
    const [angleIncrement, setAngleIncrement] = useState(defaultAngleIncrement);
    const [origin, setOrigin] = useState(defaultOrigin);
    const [drawDistance, setDrawDistance] = useState(defaultDrawDistance);

    function findLWord(word: string, start: number, count: number): string {
        count = Math.max(0, Math.round(count));
        if(count < start) {
            word = axiom;
            start = 0;
        }
        for (let i = start; i < count; i++) {
            word = iterateSystem(word, iterateRules);
        }
        return word;
    }

    function handleIterationCount(term: string) {
        let count = Number(term);
        let word = lWord;
        let start = iterationCount;
        if(Number.isNaN(count)) {
            setLWord(axiom);
            setIterationCount(0);
            return;
        } 
        setLWord(findLWord(word, start, count));
        setIterationCount(count);
    }

    function handleAxiom(term?: string) {
        term = term || "";
        setAxiom(term);
        setLWord(findLWord(term, 0, iterationCount));
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

        params.set(URLParamName.ITERATION_COUNT, iterationCount.toString());

        params.set(URLParamName.ALPHABET, alphabet);

        params.set(URLParamName.AXIOM, axiom);
        
        const iterateParam = Array.from(iterateRules.entries()).map((pair) => 
            pair.join(URLCharacter.TUPLE_BREAK)).join(URLCharacter.LIST_BREAK);
        params.set(URLParamName.ITERATION_RULES, iterateParam);

        const drawParam = Array.from(drawRules.entries()).map((pair) => {
            pair[1] = encodeDrawInstruction(pair[1]) as DrawInstruction;
            return pair.join(URLCharacter.TUPLE_BREAK);
        }).join(URLCharacter.LIST_BREAK);
        params.set(URLParamName.DRAW_RULES, drawParam);

        params.set(URLParamName.INITIAL_ANGLE, initialAngle.toString());

        params.set(URLParamName.ANGLE_INCREMENT, angleIncrement.toString());

        params.set(URLParamName.ORIGIN, origin.map((n) => n.toString())
            .join(URLCharacter.TUPLE_BREAK));

        params.set(URLParamName.DRAW_DISTANCE, drawDistance.toString());

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