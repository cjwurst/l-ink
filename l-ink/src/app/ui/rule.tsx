'use client';

import DrawInstruction from '@/app/lib/drawInstruction'

type RuleProps = {
    preimage: string
    image: string
    drawRule: DrawInstruction
    onChangeImage: (image: string) => void
    onChangeDrawRule: (drawRule: DrawInstruction) => void
}

export default function Rule({preimage, image, drawRule, onChangeImage, onChangeDrawRule}: RuleProps) {
    return (
        <div className="flex flex-row mt-4">
            <div className="w-8 flex-grow">
                {preimage} ↦
            </div>
            <input 
                className = "flex-grow mr-4 border border-slate-500 bg-slate-200 text-black"
                onChange={(e) => onChangeImage(e.target.value)}
                value={image}
            />
            <select 
                className = "text-black"
                onChange={(e)=> onChangeDrawRule(DrawInstruction[e.target.value as keyof typeof DrawInstruction])}
                value={drawRule}
            >
                {Object.keys(DrawInstruction).map((k) => {
                    const instruction = DrawInstruction[k as keyof typeof DrawInstruction];
                    return <option key={k} value={instruction}>{instruction}</option>;
                })}
            </select>
        </div>
    );
}