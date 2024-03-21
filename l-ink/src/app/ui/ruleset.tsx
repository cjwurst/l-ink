'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Rule from '@/app/ui/rule';
import DrawInstruction from '../lib/drawInstruction';

export default function Ruleset() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const ruleString = getRuleString();

    function setRules(ruleString: string) {
        const params = new URLSearchParams(searchParams);
        if (!ruleString.endsWith("|")) {
            ruleString += "|"; 
        }
        params.set('ruleset', ruleString);
        replace(`${pathname}?${params.toString()}`);
    }

    // TODO: use effect to call this outside rendering
    //setRules(ruleString);       // This ensures our rules end with "|" when this page is first rendered

    function getRuleString(): string {
        return searchParams.get("ruleset")?.toString() || "";
    }

    function getRuleArray(): string[] {
        return getRuleString().split("|");
    }

    function getAlphabetArray(): string[] {
        return Array.from(searchParams.get("alphabet")?.toString() || "")
    }

    function handleChangeImage(preimage: string, image: string) {
        let rules = getRuleArray();
        const i = rules.findIndex((rule) => rule.startsWith(preimage))
        if (image) {
            rules[i] = image;
        } else {
            rules.splice(i, 1);
        }
        setRules(rules.join("|"));
    }

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
