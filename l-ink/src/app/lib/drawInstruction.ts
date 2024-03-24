enum DrawInstruction {
    FORWARD = "Forward",
    TURN_LEFT = "Turn Left",
    TURN_RIGHT = "Turn Right",
}

export default DrawInstruction;

//characters representing each instruction in copied URL
const encode = new Map([
    [DrawInstruction.FORWARD, "a"],
    [DrawInstruction.TURN_LEFT, "b"],
    [DrawInstruction.TURN_RIGHT, "c"]
]);
const decode = new Map(Array.from(encode).map(([k, v]) => [v, k]));

export const encodeDrawInstruction = (d:DrawInstruction) => encode.get(d);
export const decodeDrawInstruction = (c:string) => decode.get(c);