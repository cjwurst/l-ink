import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import normalizeWheel from 'normalize-wheel';

type ZoomCameraControlsProps = {
    canvas: HTMLCanvasElement
    loop?: [number, number]
}

export default function ZoomCameraControls({canvas, loop}: ZoomCameraControlsProps) {
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
        let targetZoom = scrollToZoom(zoomToScroll(camera.zoom) + scroll);
        if (loop) {
            console.log(`target zoom before: ${targetZoom}`);
            const modulus = loop[1] - loop[0]
            let residue = (targetZoom - loop[0]) % modulus;
            if (residue < 0) residue += modulus;
            targetZoom = residue + loop[0];
            console.log(`target zoom after: ${targetZoom}`);
        }
        camera.zoom = targetZoom;
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