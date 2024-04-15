"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector2 } from "three";

type PanCameraControlsProps = {
    canvas: HTMLCanvasElement
}

export default function PanCameraControls({canvas}: PanCameraControlsProps) {
    const isPanningRef = useRef(false);
    const oldPointerRef = useRef(new Vector2(0, 0));

    useFrame((state) => {
        if (isPanningRef.current) {
            const camera = state.camera;
            const diff = new Vector2(
                oldPointerRef.current.x - state.pointer.x, 
                oldPointerRef.current.y - state.pointer.y
            );
            const panCoeff = 200/camera.zoom;
            const target = new Vector2(camera.position.x, camera.position.y);
            target.add(diff.multiplyScalar(panCoeff));
            
            camera.position.set(target.x, target.y, 10);
            camera.lookAt(target.x, target.y, 0);
            camera.updateProjectionMatrix();
        }
        oldPointerRef.current = new Vector2(state.pointer.x, state.pointer.y);
    });

    useEffect(() => {
        function handleStart(e: PointerEvent) {
            //e.stopPropagation();
            isPanningRef.current = true;
            console.log("pointer down");
        }
    
        function handleEnd(e: PointerEvent) {
            //e.stopPropagation();
            isPanningRef.current = false;
            console.log("pointer up");
        }
    
        function handleCancel(e: PointerEvent) {
            //e.stopPropagation();
            isPanningRef.current = false;
            console.log("pointer cancelled");
        }

        function handleLeave(e: PointerEvent) {
            //e.stopPropagation();
            isPanningRef.current = false;
            console.log("pointer leave");
        }

        canvas?.addEventListener('pointerdown', handleStart);
        canvas?.addEventListener('pointerup', handleEnd);
        canvas?.addEventListener('pointercancel', handleCancel);
        canvas?.addEventListener('pointerleave', handleLeave);
        return () => {
            canvas?.removeEventListener('pointerdown', handleStart);
            canvas?.removeEventListener('pointerup', handleEnd);
            canvas?.removeEventListener('pointercancel', handleCancel);
            canvas?.removeEventListener('pointerleave', handleLeave);
        }
    }, [canvas]);
    return <></>
}