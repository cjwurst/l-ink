import { useThree } from "@react-three/fiber"
import { useMemo } from "react";
import { Vector3 } from "three";

type FitCameraControlsProps = {
    xBounds: [number, number],
    yBounds: [number, number]
}

export default function FitCameraControls({xBounds, yBounds}: FitCameraControlsProps) {
    const camera = useThree((state) => state.camera);
    const canvasSize = useThree((state) => state.size);
    
    useMemo(() => {
        const margin = 0.1;
        const center = [(xBounds[0]+xBounds[1])/2, (yBounds[0]+yBounds[1])/2];
        const direction = new Vector3();
        const meshSize = [xBounds[1]-xBounds[0], yBounds[1]-yBounds[0]];
        camera.zoom = (1-margin)*Math.min(
            canvasSize.width/(meshSize[0]), 
            canvasSize.height/(meshSize[1])
        );
        camera.position.set(center[0], center[1], 10);
        camera.lookAt(center[0], center[1], 0);
        camera.updateProjectionMatrix();
        camera.getWorldDirection(direction);
    }, [camera, canvasSize, xBounds, yBounds]);

    return <></>
}