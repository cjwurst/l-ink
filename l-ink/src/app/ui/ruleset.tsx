'use client';

import Rule from '@/app/ui/rule';
import DrawInstruction from '../lib/drawInstruction';

type RulesetProps = {
    alphabet: string
    iterateRules: Map<string, string>
    setIterateRules: (r:Map<string, string>) => void
    drawRules: Map<string, DrawInstruction>
    setDrawRules: (r:Map<string, DrawInstruction>) => void
}

export default function Ruleset({alphabet, iterateRules, setIterateRules, drawRules, setDrawRules}: RulesetProps) {
    function getAlphabetArray(): string[] {
        return Array.from(alphabet);
    }

    function getIterateRule(preimage: string): string {
        return "";
    }

    function getDrawRule(preimage: string): DrawInstruction {
        return DrawInstruction.FORWARD;
    }

    function handleChangeImage(preimage: string, image: string) {
        
    }

    function handleChangeDrawRule(preimage: string, drawRule: DrawInstruction) {

    }

    return (
        <div className="flex flex-col pt-5">
            <div> Rules: </div>
            {getAlphabetArray().map((preimage) => {
                return(
                    <Rule
                        key={preimage}
                        preimage={preimage}
                        image={getIterateRule(preimage)}
                        drawRule={getDrawRule(preimage)}
                        onChangeImage={(image: string) => handleChangeImage(preimage, image)}
                        onChangeDrawRule={(drawRule: DrawInstruction) => handleChangeDrawRule(preimage, drawRule)}
                    />
                );
            })}
        </div>
    );
}
