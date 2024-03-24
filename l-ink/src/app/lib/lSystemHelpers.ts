export function iterateSystem(s:string, ruleset: Map<string, string>): string {
    return Array.from(s).map((c) => ruleset.get(c) ?? c).join('');
}