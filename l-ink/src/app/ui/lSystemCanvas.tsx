"use client"

import { Canvas, RootState } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import FitCameraControls from "./fitCameraControls";
import DrawInstruction from '@/app/lib/drawInstruction';
import { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { drawSystem } from "@/app/lib/lSystemHelpers";
import { Line } from "@react-three/drei";
import { Color } from "three";
import ZoomCameraControls from "./zoomCameraControls";
import PanCameraControls from "./panCameraControls";

type LSystemCanvasProps = {
    lWord: string
    drawRules: Map<string, DrawInstruction>
    initialAngle: number
    angleIncrement: number
    origin: [number, number, number]
    drawDistance: number
    fitCameraToMesh: boolean
    enableZoom: boolean
    enablePan: boolean
    children?: React.ReactElement
}

export default function LSystemCanvas({
    lWord, 
    drawRules, 
    initialAngle, 
    angleIncrement, 
    origin, 
    drawDistance,
    fitCameraToMesh,
    enableZoom,
    enablePan,
    children
}: LSystemCanvasProps) {
    const margin = 0.1;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canvas, setCanvas] = useState<HTMLCanvasElement>();
    const [isDark, setIsDark] = useState(false);
    useMediaQuery(
        {
            query: "(prefers-color-scheme: dark)",
        },
        undefined,
        (isSystemDark) => setIsDark(isSystemDark)
    );
    const [xBounds, yBounds, lines] = drawSystem(
        lWord, 
        drawRules, 
        origin, 
        drawDistance, 
        initialAngle, 
        angleIncrement
    );

    function handleCanvasCreated(state: RootState) {
        state.gl.setClearColor(new Color("white"), 0);
        if (canvasRef.current) setCanvas(canvasRef.current);
    }

    return (
        <div className={`w-full h-full bg-${isDark? "black": "white"}`}>
            <Canvas
                ref={canvasRef}
                onCreated={handleCanvasCreated}
            >
                {children}
                {fitCameraToMesh && <FitCameraControls
                    xBounds={xBounds}
                    yBounds={yBounds}
                    margin={margin}
                />}
                {enableZoom && <ZoomCameraControls 
                    canvas={canvas as HTMLCanvasElement}
                />}
                {enablePan && <PanCameraControls 
                    canvas={canvas as HTMLCanvasElement}
                />}
                <OrthographicCamera 
                    makeDefault 
                    position={[0, 0, 10]} 
                    zoom={1000} 
                />
                {lines.map((line, i) => 
                    <Line 
                        key={`line${i}`}
                        points={line}
                        color={isDark? "white": "gray"}
                        lineWidth={2}
                    />
                )}
            </Canvas>
        </div>
    );
}