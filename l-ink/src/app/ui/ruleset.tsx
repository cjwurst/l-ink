'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

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
    setRules(ruleString);       // This ensures our rules end with "|" when this page is first rendered

    function getRuleString(): string {
        return searchParams.get("ruleset")?.toString() || "";
    }

    function getRuleArray(): string[] {
        return getRuleString().split("|");
    }

    function handleRuleChange(term: string, i: number) {
        let rules = getRuleArray();
        if (term) {
            rules[i] = term;
        } else {
            rules.splice(i, 1);
        }
        setRules(rules.join("|"));
    }

    return (
        <div className="relative flex flex-col pt-5 flex-grow">
            <div className="w-24"> Rules: </div>
            {getRuleArray().map((rule, i) => {
                return (
                    <input 
                        id="ruleset" 
                        className="peer mt-5 block outline-2 w-full border border-slate-500 bg-slate-200 text-black"  
                        onChange={ (e) => { handleRuleChange(e.target.value, i); }}
                        defaultValue = { rule }
                    />
                )}
            )}
        </div>
    );
}
