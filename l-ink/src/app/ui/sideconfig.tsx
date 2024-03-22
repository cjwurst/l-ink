import Alphabet from '@/app/ui/alphabet';
import Axiom from '@/app/ui/axiom';
import Ruleset from '@/app/ui/ruleset';
import IterateButton from '@/app/ui/renderButton';
import DrawInstruction from '@/app/lib/drawInstruction';

type SideConfigProps = {
    setLWord: (w:string) => void
    setDrawRules: (r:Map<string, DrawInstruction>) => void
}

export default function SideConfig({setLWord, setDrawRules}: SideConfigProps) {
    return (
        <div className="h-full flex-col items-center justify-start text-slate-300">
            <div className="pl-5">
                <Alphabet />
                <Axiom />
                <Ruleset />
                <div className="mt-5 flex flex-col items-center bg-slate-800">
                    <IterateButton />
                </div>
            </div>
        </div>
    )
}