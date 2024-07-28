"use client";

import LSystem from "@/app/ui/lSystem";
import { useSearchParams } from "next/navigation";
import urlParamsToProps from "@/app/lib/urlParamReader";
import { Suspense } from "react";

export default function Page() {
    return (
        <Suspense>
            <SuspenseBoundary />
        </Suspense>
    )
}

function SuspenseBoundary() {
    const searchParams = useSearchParams();

    return (
        <div className="h-screen">
            <LSystem {...urlParamsToProps(searchParams)} enableZoom enablePan/>
        </div>
    );
}