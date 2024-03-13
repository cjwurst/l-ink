"use client";

import { Canvas } from '@react-three/fiber'
import DrawInstruction from '@/app/lib/drawInstruction';
import { ReactNode } from 'react';

type LSystemProps = {
    lString: string
    drawRules: Map<string, DrawInstruction>
}

export default function LSystemDisplay({ lString, drawRules }: LSystemProps) {
    let lines:ReactNode[] = [];
    for (let i = 0; i < lString.length; i++) {
        lines.push(
            <mesh>

            </mesh>
        );
    }

    return (
        <Canvas>
            <ambientLight />
            <mesh>
                <bufferGeometry>
                    {/* <bufferAttribute
                        attach='attributes-position'
                        array = {positions}
                        count={vertexCount}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach='attributes-normals'
                        array = {normals}
                        count={vertexCount}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach='attributes-color'
                        array = {colors}
                        count={vertexCount}
                        itemSize={4}
                    />
                    <bufferAttribute
                        attach='index'
                        array = {indices}
                        count={indices.length}
                        itemSize={1}
                    /> */}
                </bufferGeometry>
                <meshStandardMaterial 
                    vertexColors
                />
            </mesh>
        </Canvas>
    );
}