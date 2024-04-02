"use client";

import LSystem from "@/app/ui/lSystem";
import { useSearchParams } from "next/navigation";
import DrawInstruction from "../../lib/drawInstruction";
import { decodeDrawInstruction } from "../../lib/drawInstruction";
import URLCharacter from "../../lib/urlCharacter";
import URLParamName from "@/app/lib/urlParamNames";
import urlParamsToProps from "@/app/lib/urlParamReader";

export default function Page() {
    const searchParams = useSearchParams();

    return (
        <div className="h-screen">
            <LSystem {...urlParamsToProps(searchParams)}/>
            {/* <LSystem 
                defaultIterationCount={getNumberParam(URLParamName.ITERATION_COUNT)}
                defaultAxiom={getStringParam(URLParamName.AXIOM)}
                defaultAlphabet={getStringParam(URLParamName.ALPHABET)}
                defaultIterateRules={getIterateRules()}
                defaultDrawRules={getDrawRules()}
                defaultAngle={getNumberParam(URLParamName.INITIAL_ANGLE)}
                defaultAngleIncrement={getNumberParam(URLParamName.ANGLE_INCREMENT, 45)}
                defaultOrigin={getOrigin()}
                defaultDrawDistance={getNumberParam(URLParamName.DRAW_DISTANCE, 1)}
            /> */}
        </div>
    );
}