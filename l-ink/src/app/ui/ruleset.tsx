'use client';

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
        <div className="flex flex-col gap-4">
            <div className="block text-sm font-medium text-gray-900 dark:text-white"> Rules: </div>
            {getAlphabetArray().map((preimage) => (
                <div className="grid grid-cols-[repeat(3,auto)] gap-4 w-full pl-4">
                    <select 
                        className = "text-sm font-medium rounded-lg bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e)=> handleChangeDrawRule(preimage, e.target.value as DrawInstruction)}
                        value={drawRules.get(preimage) || DrawInstruction.FORWARD}
                    >
                        {Object.keys(DrawInstruction).map((k) => {
                            const instruction = DrawInstruction[k as keyof typeof DrawInstruction];
                            return <option key={k} value={instruction}>{instruction}</option>;
                        })}
                    </select>
                    <div className="flex items-center text-sm font-medium text-gray-900 text-nowrap dark:text-white dark:border-gray">
                        {preimage} ↦
                    </div>
                    <input 
                        className = "block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => handleChangeImage(preimage, e.target.value)}
                        value={iterateRules.get(preimage) || ""}
                    />
                </div>
                // <Rule
                //     key={preimage}
                //     preimage={preimage}
                //     image={iterateRules.get(preimage) || ""}
                //     drawRule={drawRules.get(preimage) || DrawInstruction.FORWARD}
                //     onChangeImage={(image: string) => handleChangeImage(preimage, image)}
                //     onChangeDrawRule={(drawRule: DrawInstruction) => handleChangeDrawRule(preimage, drawRule)}
                // />
            ))}
        </div>
    );
}
