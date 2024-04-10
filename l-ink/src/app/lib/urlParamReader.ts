import { URLSearchParams } from "url";
import URLParamName from "@/app/lib/urlParamNames";
import URLCharacter from "@/app/lib/urlCharacter";
import DrawInstruction from "@/app/lib/drawInstruction";
import { decodeDrawInstruction } from "@/app/lib/drawInstruction";
import { LSystemProps } from "@/app/ui/lSystem";

export default function urlParamsToProps(searchParams: URLSearchParams): LSystemProps {
    function getNumberParam(name: string, fallback: number = 0) {
        const result = Number(searchParams.get(name) || fallback);
        if(Number.isNaN(result)) return fallback;
        return result;
    }

    function getStringParam(name: string) {
        return searchParams.get(name)?.toString() || "";
    }

    function getIterateRules(): Map<string, string> {
        let result: Map<string, string> = new Map();
        const rules = (searchParams.get(URLParamName.ITERATION_RULES)?.toString() || "")
            .split(URLCharacter.LIST_BREAK);
        for (let i = 0; i < rules.length; i++) {
            const rule = rules[i].split(URLCharacter.TUPLE_BREAK);
            result.set(rule[0], rule[1]);
        }
        return result;
    }

    function getDrawRules(): Map<string, DrawInstruction> {
        let result: Map<string, DrawInstruction> = new Map();
        const rules = (searchParams.get(URLParamName.DRAW_RULES)?.toString() || "")
            .split(URLCharacter.LIST_BREAK);
        for (let i = 0; i < rules.length; i++) {
            const rule = rules[i].split(URLCharacter.TUPLE_BREAK);
            result.set(rule[0], decodeDrawInstruction(rule[1]) ?? DrawInstruction.NONE);
        }
        return result;
    }

    function getOrigin(): [number, number, number] {
        const result = searchParams.get(URLParamName.ORIGIN)
            ?.split(URLCharacter.TUPLE_BREAK)
            .map((s) => Number(s)) as [number, number, number];
        return result || [0, 0, 0];
    }

    const result: LSystemProps = {
        defaultIterationCount: getNumberParam(URLParamName.ITERATION_COUNT),
        defaultAxiom: getStringParam(URLParamName.AXIOM),
        defaultAlphabet: getStringParam(URLParamName.ALPHABET),
        defaultIterateRules: getIterateRules(),
        defaultDrawRules: getDrawRules(),
        defaultAngle: getNumberParam(URLParamName.INITIAL_ANGLE),
        defaultAngleIncrement: getNumberParam(URLParamName.ANGLE_INCREMENT, 45),
        defaultOrigin: getOrigin(),
        defaultDrawDistance: getNumberParam(URLParamName.DRAW_DISTANCE, 1)
    };
    return result;
}