"use client";

import LSystem from "@/app/ui/lSystem";
import { useSearchParams } from "next/navigation";
import DrawInstruction from "../lib/drawInstruction";
import { decodeDrawInstruction } from "../lib/drawInstruction";
import URLCharacter from "../lib/urlCharacter";

export default function Page() {
    const searchParams = useSearchParams();

    function getAxiom(): string {
        return searchParams.get("axiom")?.toString() || "";
    }

    function getAlphabet(): string {
        return searchParams.get("alphabet")?.toString() || "";
    }

    function getIterateRules(): Map<string, string> {
        let result: Map<string, string> = new Map();
        const rules = (searchParams.get("iterate")?.toString() || "").split(URLCharacter.LIST_BREAK);
        for (let i = 0; i < rules.length; i++) {
            const rule = rules[i].split(URLCharacter.TUPLE_BREAK);
            result.set(rule[0], rule[1]);
        }
        return result;
    }

    function getDrawRules(): Map<string, DrawInstruction> {
        let result: Map<string, DrawInstruction> = new Map();
        const rules = (searchParams.get("draw")?.toString() || "").split(URLCharacter.LIST_BREAK);
        for (let i = 0; i < rules.length; i++) {
            const rule = rules[i].split(URLCharacter.TUPLE_BREAK);
            result.set(rule[0], decodeDrawInstruction(rule[1]) ?? DrawInstruction.FORWARD);
        }
        console.log(result);
        return result;
    }
    
    return (
        <div className="h-screen bg-slate-800">
            <LSystem 
                defaultAxiom={getAxiom()}
                defaultAlphabet={getAlphabet()}
                defaultIterateRules={getIterateRules()}
                defaultDrawRules={getDrawRules()}
            />
        </div>
    );
}