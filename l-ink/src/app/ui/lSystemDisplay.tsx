"use client";

import { Canvas } from '@react-three/fiber'
import DrawInstruction from '@/app/lib/drawInstruction';
import { Line } from '@react-three/drei';

type LSystemProps = {
    origin: [number, number, number]
    lWord: string
    drawRules: Map<string, DrawInstruction>
}

export default function LSystemDisplay({ origin, lWord, drawRules }: LSystemProps) {
    let points:[number, number, number][] = [origin];
    let angle:number = 0;
    let position = origin;
    for (let i = 0; i < lWord.length; i++) {
        switch (drawRules.get(lWord[i])) {
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