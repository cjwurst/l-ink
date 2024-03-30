"use client"

import { Canvas } from "@react-three/fiber"
import { Bounds, CameraControls, OrbitControls, OrthographicCamera } from "@react-three/drei";
import DrawInstruction from '@/app/lib/drawInstruction';
import LSystemDisplay from "./lSystemDisplay";
import { MOUSE } from "three";

type LSystemCanvasProps = {
    lWord: string
    drawRules: Map<string, DrawInstruction>
    initialAngle: number
    angleIncrement: number
    origin: [number, number, number]
    drawDistance: number
}

export default function LSystemCanvas({
    lWord, 
    drawRules, 
    initialAngle, 
    angleIncrement, 
    origin, 
    drawDistance
}: LSystemCanvasProps) {
    return (
        <div className="w-full h-full">
            <Canvas>
                <OrbitControls 
                    mouseButtons={{LEFT: MOUSE.PAN}}
                    enableRotate={false}
                />
                <LSystemDisplay 
                    initialAngle={initialAngle}
                    angleIncrement={angleIncrement}
                    origin={origin}
                    drawDistance={drawDistance}
                    lWord={lWord} 
                    drawRules={drawRules}
                />
            </Canvas>
        </div>
    );
}