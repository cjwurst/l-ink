"use client"

import LSystemDisplay from "@/app/ui/lSystemDisplay";
import DrawInstruction from "@/app/lib/drawInstruction";
import SideConfig from "@/app/ui/sideconfig";
import { useState } from "react";

export default function LSystem() {
    const [drawRules, setDrawRules] = useState(new Map());
    const [lWord, setLWord] = useState("");

    return (
        <div>
            <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
                <div className="w-full flex-none md:w-1/4">
                    <SideConfig
                        setLWord = {setLWord}
                        setDrawRules = {setDrawRules}
                    />
                </div>
            </div>
            <LSystemDisplay 
                origin = {[0, 0, 0]}
                lWord = {lWord} 
                drawRules = {drawRules}
            />
        </div> 
    );
}