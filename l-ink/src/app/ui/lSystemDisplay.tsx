"use client";

import { useState } from 'react';
import { useThree } from '@react-three/fiber'
import DrawInstruction from '@/app/lib/drawInstruction';
import { Line } from '@react-three/drei';
import { useMediaQuery } from 'react-responsive';

type LSystemDisplayProps = {
    origin: [number, number, number]
    lWord: string
    drawRules: Map<string, DrawInstruction>
}

export default function LSystemDisplay({ origin, lWord, drawRules }: LSystemDisplayProps) {
    const cameraControls = useThree((state) => state.controls);
    const [isDark, setIsDark] = useState(true);
    useMediaQuery(
        {
            query: "(prefers-color-scheme: dark)",
        },
        undefined,
        (isSystemDark) => setIsDark(isSystemDark)
    );

    let points:[number, number, number][] = [origin];
    let angle:number = 0;
    let position = origin;
    const drawDistance = 0.2;
    for (let i = 0; i < lWord.length; i++) {
        switch (drawRules.get(lWord[i]) || DrawInstruction.FORWARD) {
            case DrawInstruction.FORWARD:
                position = [
                    position[0] + drawDistance*Math.cos(angle), 
                    position[1] + drawDistance*Math.sin(angle), 
                    0
                ];
                points.push(position);
                break;
            case DrawInstruction.TURN_LEFT:
                angle += Math.PI/2;
                break;
            case DrawInstruction.TURN_RIGHT:
                angle -= Math.PI/2;
                break;
            default:
                throw new Error(`Draw rule not found for ${lWord[i]}`);
        }
    }
    console.log(`rendering word: ${lWord} at points ${points}`);

    return (
        <Line 
            points={points}
            color={isDark? "white" : "black"}
            lineWidth={2}
        />
    );
}