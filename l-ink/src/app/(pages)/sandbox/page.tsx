"use client";

import LSystem from "@/app/ui/lSystem";
import { useSearchParams } from "next/navigation";
import DrawInstruction from "../../lib/drawInstruction";
import { decodeDrawInstruction } from "../../lib/drawInstruction";
import URLCharacter from "../../lib/urlCharacter";
import URLParamName from "@/app/lib/urlParamNames";
import urlParamsToProps from "@/app/lib/urlParamReader";
import { CameraControls, OrbitControls } from "@react-three/drei";
import { MOUSE } from "three";
import KochCameraControls from "@/app/ui/kochCameraControls";

export default function Page() {
    const searchParams = useSearchParams();

    return (
        <div className="h-screen">
            <LSystem {...urlParamsToProps(searchParams)} />
        </div>
    );
}