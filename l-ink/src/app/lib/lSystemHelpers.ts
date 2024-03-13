/**
 * @params s - The current iteration of an L-system
 * @params ruleset - Per-character iteration rules given as a map
 * @returns The next iteration of the given L-system
 */
export function iterateSystem(s:string, ruleset: Map<string, string>): string {
    return Array.from(s).map((c) => ruleset.get(c) ?? c).join('');
}

/**
 * @params s - An L-system ruleset as a bar-separated string of rules where each rule is a colon-seperated pair of strings
 * @returns The given ruleset as a map
 */
export function ruleStringToMap(s:string): Map<string, string> {
    const keyValuePairs = s.split("|").map((ruleWord) => {
        const rule = ruleWord.split(":");
        if (rule.length != 2) throw new Error("Rule string must contain exactly one colon")
        const ruleTuple: readonly [string, string] = [rule[0], rule[1]];
        if (!ruleTuple[0]) throw new Error("Rule keys must be non-empty");
        return ruleTuple;
    });
    return new Map(keyValuePairs);
}

/**
 * @params s - An L-system ruleset as a map 
 * @returns The given ruleset as a bar-separated string of rules where each rule is a colon-seperated pair of strings
 */
export function ruleMapToString(ruleSet:Map<string, string>): string {
    return Array.from(ruleSet).map((pair => pair.join(":"))).join("|");
}