"use client";

import { Canvas } from '@react-three/fiber'
import DrawInstruction from '@/app/lib/drawInstruction';
import { ReactNode } from 'react';
import { Line } from '@react-three/drei';

type LSystemProps = {
    origin: [number, number, number]
    lString: string
    drawRules: Map<string, DrawInstruction>
}

export default function LSystemDisplay({ origin, lString, drawRules }: LSystemProps) {
    let points:[number, number, number][] = [origin];
    let angle:number = 0;
    let position = origin;
    for (let i = 0; i < lString.length; i++) {
        console.log(`position: ${position}`);
        console.log(`angle: ${angle/Math.PI}*PI`);
        switch (drawRules.get(lString[i])) {
            case DrawInstruction.FORWARD:
                position = [
                    position[0] + Math.cos(angle), 
                    position[1] + Math.sin(angle), 
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
        }
    }
    console.log(points);

    return (
        <Canvas>
            <ambientLight />
            <Line 
                points = {points}
                color = "white"
            />
        </Canvas>
    );
}