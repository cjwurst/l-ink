'use client';

import LSystemDisplay from "@/app/ui/lSystemDisplay";
import DrawInstruction from "@/app/lib/drawInstruction";

export default function Page() {
    const positions = new Float32Array([
        1, 0, 0,
        0, 1, 0,
        -1, 0, 0,
        0, -1, 0
    ])
    const normals = new Float32Array([
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
    ])
    const colors = new Float32Array([
        1, 1, 1, 1,
        1, 1, 1, 1,
        1, 1, 1, 1,
        0, 1, 0, 1,
    ])
    const indices = new Uint16Array([
        0, 1, 3,
        2, 3, 1,
    ])
    const vertexCount = positions.length/3;

    return (
        <LSystemDisplay 
            lString = "a" 
            drawRules = { new Map([["a", DrawInstruction.FORWARD]]) }
        />
    )
}