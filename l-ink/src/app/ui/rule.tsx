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
        <div className="grid gap-1">
            <div className="text-gray-900 text-nowrap dark:text-white dark:border-gray">
                {preimage} ↦
            </div>
            <input 
                className = "text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => onChangeImage(e.target.value)}
                value={image}
            />
            <select 
                className = "text-black dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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