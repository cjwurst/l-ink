import { ReactNode } from "react"

type ButtonProps = {
    onClick: () => void
    children?: ReactNode
}

export default function Button({onClick, children}:ButtonProps) {
    return <button 
        className="w-full items-center bg-slate-200 border-slate-500 border-2 text-slate-900"
        onClick={onClick}
    >
        {children}
    </button>
}