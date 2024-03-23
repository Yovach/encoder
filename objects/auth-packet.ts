import { BufferData } from "../lib/buffer";

type AuthPacketData = {
  userId: number; 
  username: string; 
}

export class AuthPacket {
  static encode(data: AuthPacketData) {
    const bd = new BufferData();
    bd.uint8(data.userId);
    bd.str(data.username);
    return bd.usedBuffer();
  }

  static decode(buffer: ArrayBuffer): AuthPacketData {
    const data = { username: '', userId: 0, } satisfies AuthPacketData;

    const bd = new BufferData(buffer);
    data.userId = bd.readUint8();
    data.username = bd.readString();
    return data; 
  }
}

