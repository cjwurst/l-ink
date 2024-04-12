import { useThree } from "@react-three/fiber";
import { RefObject, useEffect } from "react";

type ZoomCameraControlsProps = {
    canvas: HTMLCanvasElement
}

export default function ZoomCameraControls({canvas}: ZoomCameraControlsProps) {
    const camera = useThree((state) => state.camera);
    const zoomFactor = 0.1;

    function handleWheel(e: WheelEvent) {
        e.stopPropagation();
        if (!canvas) return;
        camera.zoom *= 1.0 + (-zoomFactor*e.deltaY);
        camera.updateProjectionMatrix();
        console.log(`zoomed by ${e.deltaY} to ${camera.zoom}.`);
    }

    useEffect(() => {
        canvas?.addEventListener('wheel', handleWheel);
        return () => {
            canvas?.removeEventListener('wheel', handleWheel);
        }
    }, [canvas]);
    return <></>
}