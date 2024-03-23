import { BufferData } from "../lib/buffer.ts";

type MessagePacketData = {
  userId: number; 
  username: string; 
}

export default class MessagePacket {

  static encode(data: MessagePacketData) {
    const bd = new BufferData();
    bd.uint8(data.userId);
    bd.str(data.username);
    return bd.usedBuffer();
  }

  static decode(buffer: ArrayBuffer): MessagePacketData {
    const data = { username: '', userId: 0, } satisfies MessagePacketData;

    const bd = new BufferData(buffer);
    data.userId = bd.readUint8();
    data.username = bd.readString();
    return data; 
  }
}


