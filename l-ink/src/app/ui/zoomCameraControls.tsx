import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import normalizeWheel from 'normalize-wheel';

type ZoomCameraControlsProps = {
    canvas: HTMLCanvasElement
    loop?: [number, number]
}

export default function ZoomCameraControls({canvas, loop}: ZoomCameraControlsProps) {
    const camera = useThree((state) => state.camera);

    /**
     * When loop is disabled, scroll is mapped to zoom exponentially (function f) 
     * to preserve smoothness at high zoom. When loop is enabled, scroll is mapped 
     * to zoom linearly, matching the value and slope of f at loop[0].
     */
    const zoomCoeff = 10.0;
    const _loop = loop || [1, 1];
    const scrollInitial = zoomToScrollNoLoop(_loop[0]); 
    const slope = (1/zoomCoeff)*Math.pow(Math.E, scrollInitial);

    function scrollToZoomNoLoop(scroll: number): number {
        return Math.pow(Math.E, scroll/zoomCoeff);
    }
    function scrollToZoom(scroll: number): number {
        if (!loop) return scrollToZoomNoLoop(scroll)

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
        return zoomDiff/slope + scrollInitial;
    }

    function handleWheel(e: WheelEvent) {
        e.stopPropagation();
        const scroll = -normalizeWheel(e).spinY;
        if (!canvas) return;
        camera.zoom = scrollToZoom(zoomToScroll(camera.zoom) + scroll);
        camera.updateProjectionMatrix();
    }

    useEffect(() => {
        canvas?.addEventListener('wheel', handleWheel);
        return () => {
            canvas?.removeEventListener('wheel', handleWheel);
        }
    }, [canvas]);
    return <></>
}