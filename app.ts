import { BufferData } from "./lib/buffer.ts";

const data = {
  type: 1,
  data: {
    user: {
      username: 'twitch',
      id: 1011010,
    },

    rotation: 0,
    is_jumping: true, // boolean
    is_sneaking: false, // boolean

    x: 25,
    y: 54,
    z: 12,
  },
}

const bd = new BufferData();
const binary = bd.fromJSON(data);

console.log(JSON.stringify(data).length, binary.usedBuffer())
