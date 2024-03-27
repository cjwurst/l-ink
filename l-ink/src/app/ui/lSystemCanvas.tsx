"use client"

import { Canvas } from "@react-three/fiber"
import { Bounds, CameraControls, OrbitControls, OrthographicCamera } from "@react-three/drei";
import DrawInstruction from '@/app/lib/drawInstruction';
import LSystemDisplay from "./lSystemDisplay";

type LSystemCanvasProps = {
    lWord: string
    drawRules: Map<string, DrawInstruction>
}

export default function LSystemCanvas({lWord, drawRules}: LSystemCanvasProps) {
    return (
        <div className="w-full h-full border border-2 border-red-500">
            <Canvas>
                <OrbitControls enableRotate={false}/>
                <LSystemDisplay 
                    origin = {[0, 0, 0]}
                    lWord = {lWord} 
                    drawRules = {drawRules}
                />
            </Canvas>
        </div>
    );
}