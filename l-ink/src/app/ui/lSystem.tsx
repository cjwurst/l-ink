"use client"

import LSystemDisplay from "@/app/ui/lSystemDisplay";
import DrawInstruction from "@/app/lib/drawInstruction";
import SideConfig from "@/app/ui/sideconfig";
import { useState } from "react";

export default function LSystem() {
    const [ruleset, setRuleset] = useState(new Map());

    return (
        <div>
            <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
                <div className="w-full flex-none md:w-1/4">
                    <SideConfig />
                </div>
            </div>
            <LSystemDisplay 
                origin = {[0, 0, 0]}
                lString = "a-aa-a-aa" 
                drawRules = { new Map([
                    ["a", DrawInstruction.FORWARD],
                    ["+", DrawInstruction.TURN_LEFT],
                    ["-", DrawInstruction.TURN_RIGHT]
                ]) }
            />
        </div> 
    );
}