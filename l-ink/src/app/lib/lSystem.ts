export default function iterateSystem(s:string, rules: Map<string, string>): string {
    return Array.from(s).map((c) => rules.get(c) ?? c).join('');
}