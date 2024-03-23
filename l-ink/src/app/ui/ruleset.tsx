'use client';

import Rule from '@/app/ui/rule';
import DrawInstruction from '../lib/drawInstruction';

type RulesetProps = {
    alphabet: string
    iterateRules: Map<string, string>
    onChangeIterateRules: (r:Map<string, string>) => void
    drawRules: Map<string, DrawInstruction>
    onChangeDrawRules: (r:Map<string, DrawInstruction>) => void
}

export default function Ruleset({alphabet, iterateRules, onChangeIterateRules, drawRules, onChangeDrawRules}: RulesetProps) {
    function getAlphabetArray(): string[] {
        return Array.from(alphabet);
    }

    //TODO
    function getIterateRule(preimage: string): string {
        return "";
    }

    //TODO
    function getDrawRule(preimage: string): DrawInstruction {
        return DrawInstruction.FORWARD;
    }

    function handleChangeImage(preimage: string, image: string) {
        let result = new Map(iterateRules);
        result.set(preimage, image);
        onChangeIterateRules(result);
    }

    function handleChangeDrawRule(preimage: string, drawRule: DrawInstruction) {
        let result = new Map(drawRules);
        result.set(preimage, drawRule);
        onChangeDrawRules(result);
    }

    return (
        <div className="flex flex-col w-full gap-4">
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
