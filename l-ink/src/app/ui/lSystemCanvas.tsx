"use client"

import { Canvas } from "@react-three/fiber"
import { Bounds, CameraControls, OrbitControls, OrthographicCamera } from "@react-three/drei";
import DrawInstruction from '@/app/lib/drawInstruction';
import LSystemDisplay from "./lSystemDisplay";
import { MOUSE } from "three";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

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
    const [isDark, setIsDark] = useState(false);
    useMediaQuery(
        {
            query: "(prefers-color-scheme: dark)",
        },
        undefined,
        (isSystemDark) => setIsDark(isSystemDark)
    );

    return (
        <div className={`w-full h-full bg-${isDark? "black": "white"}`}>
            <Canvas>
                <OrthographicCamera makeDefault position={[0, 0, 10]}/>
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
                    lineColor={isDark? "white": "black"}
                />
            </Canvas>
        </div>
    );
}