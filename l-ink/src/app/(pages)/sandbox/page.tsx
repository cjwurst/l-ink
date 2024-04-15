"use client";

import LSystem from "@/app/ui/lSystem";
import { useSearchParams } from "next/navigation";
import urlParamsToProps from "@/app/lib/urlParamReader";

export default function Page() {
    const searchParams = useSearchParams();

    return (
        <div className="h-screen">
            <LSystem {...urlParamsToProps(searchParams)} enableZoom enablePan/>
        </div>
    );
}