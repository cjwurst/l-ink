'use client';

import DrawInstruction from '@/app/lib/drawInstruction'

type RuleProps = {
    preimage: string
    defaultImage: string
    defaultDrawRule: DrawInstruction
    handleChangeImage: (image: string) => void
    handleChangeDrawRule: (drawRule: DrawInstruction) => void
}

export default function Rule({preimage, defaultImage, defaultDrawRule, handleChangeImage, handleChangeDrawRule}: RuleProps) {
    return (
        <div className="flex flex-row mt-4">
            <div className="w-8 flex-grow">
                {preimage} ↦
            </div>
            <input 
                className = "flex-grow mr-4 border border-slate-500 bg-slate-200 text-black"
                onChange={(e) => handleChangeImage(e.target.value)}
                defaultValue={defaultImage}
            />
            <select 
                className = "text-black"
                onChange={(e)=> handleChangeDrawRule(DrawInstruction[e.target.value as keyof typeof DrawInstruction])}
                defaultValue={defaultDrawRule}
            >
                {Object.keys(DrawInstruction).map((k) => {
                    const instruction = DrawInstruction[k as keyof typeof DrawInstruction];
                    return <option key={k} value={instruction}>{instruction}</option>;
                })}
            </select>
        </div>
    );
}