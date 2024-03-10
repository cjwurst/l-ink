'use client';

import { useParams, useRouter, usePathname } from 'next/navigation';
import Axiom from '@/app/ui/axiom';
import Ruleset from '@/app/ui/ruleset';

export default function SideConfig() {
    return (
        <div className="h-full flex-col items-center justify-start">
            <div className="pl-5">
                <Axiom />
                <Ruleset />
            </div>
        </div>
    )
}