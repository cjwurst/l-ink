import { ruleStringToMap, ruleMapToString } from "@/app/lib/lSystemHelpers";

export default function Home() {
    const ruleString = "a:aa|b:ab|c:a";
    return (
        <div className="flex flex-col h-screen bg-gray-800 text-slate-100 justify-center items-center text-xl">
            <div>Rulestring: {`${ruleString}`}</div>
            <div>Map: {`${ruleStringToMap(ruleString)}`}</div>
            <div>Back to string: {`${ruleMapToString(ruleStringToMap(ruleString))}`}</div>
        </div>
    );
}
