'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Ruleset() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleRuleset(term: string) {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('ruleset', term);
        } else {
            params.delete('ruleset');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="relative flex pt-5 flex-grow">
            <div className="w-24">
                <label htmlFor="ruleset"> Rules: </label>
            </div>
            <input 
                id="ruleset" 
                className="peer block outline-2 w-full border border-gray-200 text-black" 
                onChange={ (e) => { handleRuleset(e.target.value); }}
                defaultValue = {searchParams.get('ruleset')?.toString()}
            />
        </div>
    );
}
