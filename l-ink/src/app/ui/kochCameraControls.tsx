'use client';

import { useThree } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";

export default function KochCameraControls() {
    const camera = useThree((state) => state.camera);
    if (!(camera instanceof OrthographicCamera))
        throw new Error("KochCameraControls requires a default orthographic camera.");

    return <></>;
}