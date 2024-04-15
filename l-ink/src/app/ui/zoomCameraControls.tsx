import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import normalizeWheel from 'normalize-wheel';

type ZoomCameraControlsProps = {
    canvas: HTMLCanvasElement
    loop?: [number, number]
}

export default function ZoomCameraControls({canvas, loop}: ZoomCameraControlsProps) {
    const camera = useThree((state) => state.camera);
    const zoomCoeff = 10.0;

    /**
     * When loop is disabled, scroll is mapped to zoom exponentially (function f) 
     * to preserve smoothness at high zoom. When loop is enabled, scroll is mapped 
     * to zoom linearly, matching the value and slope of f at loop[0].
     */

    function scrollToZoomNoLoop(scroll: number): number {
        return Math.pow(Math.E, scroll/zoomCoeff);
    }
    function scrollToZoom(scroll: number): number {
        if (!loop) return scrollToZoomNoLoop(scroll)

        const scrollInitial = zoomToScrollNoLoop(loop[0]); 
        const slope = (1/zoomCoeff)*Math.pow(Math.E, scrollInitial);
        let zoom = loop[0] + (scroll - scrollInitial)*slope;

        // bound the result to loop
        const modulus = loop[1] - loop[0];
        let residue = (zoom - loop[0]) % modulus;
        if (residue < 0) residue += modulus;
        zoom = residue + loop[0];

        return zoom;
    }

    function zoomToScrollNoLoop(zoom: number): number {
        return zoomCoeff*Math.log(zoom);
    }
    function zoomToScroll(zoom: number): number {
        if (!loop) return zoomToScrollNoLoop(zoom);

        const zoomDiff = zoom - loop[0];
        const scrollInitial = zoomToScrollNoLoop(loop[0]);
        const slope = (1/zoomCoeff)*Math.pow(Math.E, scrollInitial);
        return zoomDiff/slope + scrollInitial;
    }

    function handleWheel(e: WheelEvent) {
        e.stopPropagation();
        const scroll = -normalizeWheel(e).spinY;
        if (!canvas) return;
        let targetZoom = scrollToZoom(zoomToScroll(camera.zoom) + scroll);
        if (loop) {
            console.log(`target zoom before: ${targetZoom}`);
            
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