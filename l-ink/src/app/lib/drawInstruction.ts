enum DrawInstruction {
    NONE = "None",
    FORWARD = "Forward",
    TURN_LEFT = "Turn Left",
    TURN_RIGHT = "Turn Right",
    SAVE = "Save State",
    LOAD = "Load State"
}

export default DrawInstruction;

//characters representing each instruction in copied URL
const encode = new Map([
    [DrawInstruction.FORWARD, "f"],
    [DrawInstruction.TURN_LEFT, "l"],
    [DrawInstruction.TURN_RIGHT, "r"],
    [DrawInstruction.SAVE, "s"],
    [DrawInstruction.LOAD, "o"]
]);
const decode = new Map(Array.from(encode).map(([k, v]) => [v, k]));

export const encodeDrawInstruction = (d:DrawInstruction) => encode.get(d);
export const decodeDrawInstruction = (c:string) => decode.get(c);
