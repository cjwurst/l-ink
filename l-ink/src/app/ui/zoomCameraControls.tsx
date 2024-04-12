import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import normalizeWheel from 'normalize-wheel';

type ZoomCameraControlsProps = {
    canvas: HTMLCanvasElement
}

export default function ZoomCameraControls({canvas}: ZoomCameraControlsProps) {
    const camera = useThree((state) => state.camera);

    function scrollToZoom(scroll: number): number {
        return Math.pow(Math.E, scroll/10.0);
    }

    function zoomToScroll(zoom: number): number {
        return 10.0*Math.log(zoom);
    }

    function handleWheel(e: WheelEvent) {
        e.stopPropagation();
        const scroll = -normalizeWheel(e).spinY;
        if (!canvas) return;
        camera.zoom = scrollToZoom(zoomToScroll(camera.zoom) + scroll);
        camera.updateProjectionMatrix();
        console.log(`zoomed by ${scroll} to ${camera.zoom}.`);
    }

    useEffect(() => {
        canvas?.addEventListener('wheel', handleWheel);
        return () => {
            canvas?.removeEventListener('wheel', handleWheel);
        }
    }, [canvas]);
    return <></>
}