'use client';

import { Canvas } from "@react-three/fiber"
import { DoubleSide } from "three";

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
        <Canvas>
            <ambientLight />
            <mesh>
                <bufferGeometry>
                    <bufferAttribute
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
                    />
                </bufferGeometry>
                <meshStandardMaterial 
                    vertexColors
                />
            </mesh>
            {/* <mesh>
                <boxGeometry />
            </mesh> */}
        </Canvas>
    )
}