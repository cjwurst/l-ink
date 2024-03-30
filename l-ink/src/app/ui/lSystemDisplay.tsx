"use client";

import { useState } from 'react';
import { useThree } from '@react-three/fiber'
import DrawInstruction from '@/app/lib/drawInstruction';
import { Line } from '@react-three/drei';
import { useMediaQuery } from 'react-responsive';

type LSystemDisplayProps = {
    initialAngle: number
    angleIncrement: number
    origin: [number, number, number]
    drawDistance: number
    lWord: string
    drawRules: Map<string, DrawInstruction>
}

export default function LSystemDisplay({ 
    initialAngle, 
    angleIncrement, 
    origin, 
    drawDistance, 
    lWord, 
    drawRules 
}: LSystemDisplayProps) {
    const cameraControls = useThree((state) => state.controls);
    const [isDark, setIsDark] = useState(true);
    useMediaQuery(
        {
            query: "(prefers-color-scheme: dark)",
        },
        undefined,
        (isSystemDark) => setIsDark(isSystemDark)
    );

    let angle:number = initialAngle;
    let position = origin;
    let points:[number, number, number][] = [origin];
    const state: [[number, number, number], number][] = [[position, angle]]
    const lines: [number, number, number][][] = [points]
    for (let i = 0; i < lWord.length; i++) {
        switch (drawRules.get(lWord[i]) || DrawInstruction.FORWARD) {
            case DrawInstruction.FORWARD:
                const radians = 2*Math.PI*angle/360.0;
                position = [
                    position[0] + drawDistance*0.1*Math.cos(radians), 
                    position[1] + drawDistance*0.1*Math.sin(radians), 
                    0
                ];
                points.push(position);
                break;
            case DrawInstruction.TURN_LEFT:
                angle += angleIncrement;
                break;
            case DrawInstruction.TURN_RIGHT:
                angle -= angleIncrement;
                break;
            case DrawInstruction.SAVE:
                state.push([position, angle])
                break;
            case DrawInstruction.LOAD:
                const oldState = state.pop() || [origin, 0];
                [position, angle] = oldState;
                points = [position];
                lines.push(points);
                break;
            default:
                throw new Error(`Draw rule not found for ${lWord[i]}.`);
        }
    }

    return (<>
        {lines.map((line, i) => 
            <Line 
                key={`line${i}`}
                points={line}
                color={isDark? "white" : "black"}
                lineWidth={2}
            />
        )}
    </>);
        
}