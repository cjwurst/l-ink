'use client';

import { usePathname } from 'next/navigation';
import Rule from '@/app/ui/rule';
import DrawInstruction from '../lib/drawInstruction';

type RulesetProps = {
    alphabet: string
    defaultIterateRules: Map<string, string>
    defaultDrawRules: Map<string, DrawInstruction>
}

export default function Ruleset({alphabet, defaultIterateRules, defaultDrawRules}: RulesetProps) {
    const pathname = usePathname();
    const ruleString = getRuleString();

    //TODO
    function getRuleString(): string {
        return "";
    }

    function getAlphabetArray(): string[] {
        return Array.from(alphabet);
    }

    //TODO
    function handleChangeImage(preimage: string, image: string) {
        
    }

    //TODO
    function handleChangeDrawRule(preimage: string, drawRule: DrawInstruction) {

    }

    return (
        <div className="flex flex-col pt-5">
            <div> Rules: </div>
            {getAlphabetArray().map((p) => {
                return(
                    <Rule
                        key={p}
                        preimage={p}
                        defaultImage={""}
                        defaultDrawRule={DrawInstruction.FORWARD}
                        handleChangeImage={(image: string) => handleChangeImage(p, image)}
                        handleChangeDrawRule={(drawRule: DrawInstruction) => handleChangeDrawRule(p, drawRule)}
                    />
                );
            })}
        </div>
    );
}
