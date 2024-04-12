"use client"

import { iterateSystem } from "@/app/lib/lSystemHelpers";
import DrawInstruction from "@/app/lib/drawInstruction";
import React, { useState } from "react";
import Alphabet from '@/app/ui/alphabet';
import Origin from '@/app/ui/origin';
import Ruleset from '@/app/ui/ruleset';
import ConfigButton from '@/app/ui/configButton';
import { encodeDrawInstruction } from "@/app/lib/drawInstruction";
import URLCharacter from "@/app/lib/urlCharacter";
import URLParamName from "@/app/lib/urlParamNames";
import LSystemCanvas from "@/app/ui/lSystemCanvas";
import ConfigInput from "@/app/ui/configInput";

export type LSystemProps = {
    defaultIterationCount: number
    defaultAxiom: string
    defaultAlphabet: string
    defaultIterateRules: Map<string, string>
    defaultDrawRules: Map<string, DrawInstruction>
    defaultAngle: number
    defaultAngleIncrement: number
    defaultOrigin: [number, number, number]
    defaultDrawDistance: number
    enableControls?: boolean
    fitCameraToMesh?: boolean
    enableZoom?: boolean
    children?: React.ReactElement
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
    defaultDrawDistance,
    enableControls = true,
    fitCameraToMesh = true,
    enableZoom = false,
    children
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

    function filterByWord(term: string, word: string) {
        term = term || "";
        return Array.from(term).filter((c) => word.includes(c)).join("");
    }

    function findLWord(word: string, start: number, count: number, rules?: Map<string, string>): string {
        rules = rules || iterateRules;
        count = Math.max(0, Math.round(count));
        if(count < start) {
            word = axiom;
            start = 0;
        }
        for (let i = start; i < count; i++) {
            word = iterateSystem(word, rules);
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
        setAxiom(filterByWord(term, alphabet));
        setLWord(findLWord(term, 0, iterationCount));
    }

    // TODO: determine if useMemo would be better to cache changes to lWord
    function handleAlphabet(term?: string) {
        const _alphabet = term || "";
        setAlphabet(_alphabet);

        let lWordIsDirty = false;
        const filteredAxiom = filterByWord(axiom, _alphabet);
        if(filteredAxiom.length != axiom.length) lWordIsDirty = true;
        setAxiom(filteredAxiom);
        
        const filteredIterateRules: Map<string, string> = new Map();
        iterateRules.forEach((image, preimage) => {
            if (!_alphabet.includes(preimage)) {
                lWordIsDirty = true;
                return;
            }
            const filteredImage = filterByWord(image, _alphabet);
            if(filteredImage.length != (image || "").length) lWordIsDirty = true;
            filteredIterateRules.set(preimage, filteredImage);
        });
        setIterateRules(filteredIterateRules);
        if(lWordIsDirty) setLWord(findLWord(filteredAxiom, 0, iterationCount));
    }

    function handleIterateRules(rules: Map<string, string>) {
        setLWord(findLWord(axiom, 0, iterationCount, rules));
        setIterateRules(rules);
    }

    function handleDrawRules(rules: Map<string, DrawInstruction>) {
        setDrawRules(rules);
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
            { enableControls && <div className="w-1/4 h-full pr-4 pl-4 flex flex-col gap-4 overflow-scroll">
                {/* <div className="overflow-scroll text-sm grow-0">{lWord}</div> */}
                <div />
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
                <ConfigInput 
                    onChange={handleAxiom}
                    name="Axiom"
                    value={axiom}
                    type="text"
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
                    onChangeIterateRules={handleIterateRules}
                    drawRules={drawRules}
                    onChangeDrawRules={handleDrawRules}
                />
            </div>}
            <div className={`w-${enableControls? "full": "3/4"} h-full`}>
                <LSystemCanvas 
                    initialAngle={initialAngle}
                    angleIncrement={angleIncrement}
                    origin={origin}
                    drawDistance={drawDistance}
                    lWord = {lWord} 
                    drawRules = {drawRules}
                    fitCameraToMesh={fitCameraToMesh}
                    enableZoom={enableZoom}
                >
                    {children}
                </LSystemCanvas>
            </div>
        </div> 
    );
}