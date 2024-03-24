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
        <div className="flex gap-1">
            <div className="text-nowrap">
                {preimage} ↦
            </div>
            <input 
                className = "border border-slate-500 bg-slate-200 text-black"
                onChange={(e) => onChangeImage(e.target.value)}
                value={image}
            />
            <select 
                className = "text-black"
                onChange={(e)=> onChangeDrawRule(e.target.value as DrawInstruction)}
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