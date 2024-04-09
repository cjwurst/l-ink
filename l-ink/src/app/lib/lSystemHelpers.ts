import DrawInstruction from "./drawInstruction";

export function iterateSystem(s:string, ruleset: Map<string, string>): string {
    return Array.from(s).map((c) => ruleset.get(c) ?? c).join('');
}

export function drawSystem(
    lWord: string,
    drawRules: Map<string, DrawInstruction>,
    origin: [number, number, number], 
    drawDistance: number,
    initialAngle: number,
    angleIncrement: number
): [[number, number], [number, number], [number, number, number][][]]{
    let angle:number = initialAngle;
    let position = origin;
    let points:[number, number, number][] = [origin];
    const state: [[number, number, number], number][] = [[position, angle]];
    const lines: [number, number, number][][] = [points];
    let xBounds: [number, number] = [origin[0], origin[0]];
    let yBounds: [number, number] = [origin[1], origin[1]];
    for (let i = 0; i < lWord.length; i++) {
        switch (drawRules.get(lWord[i]) || DrawInstruction.FORWARD) {
            case DrawInstruction.NONE:
                break;
            case DrawInstruction.FORWARD:
                const radians = 2*Math.PI*angle/360.0;
                position = [
                    position[0] + drawDistance*Math.cos(radians), 
                    position[1] + drawDistance*Math.sin(radians), 
                    0
                ];
                xBounds[0] = Math.min(position[0], xBounds[0]);
                xBounds[1] = Math.max(position[0], xBounds[1]);
                yBounds[0] = Math.min(position[1], yBounds[0]);
                yBounds[1] = Math.max(position[1], yBounds[1]);
                points.push(position);
                break;
            case DrawInstruction.TURN_LEFT:
                angle += angleIncrement;
                break;
            case DrawInstruction.TURN_RIGHT:
                angle -= angleIncrement;
                break;
            case DrawInstruction.SAVE:
                state.push([position, angle])
                break;
            case DrawInstruction.LOAD:
                const oldState = state.pop() || [origin, 0];
                [position, angle] = oldState;
                points = [position];
                lines.push(points);
                break;
            default:
                throw new Error(`Draw rule not found for ${lWord[i]}.`);
        }
    }
    return [xBounds, yBounds, lines];
}