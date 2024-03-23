import { BufferData } from "./buffer.ts";

export class BufferDataRegistry {
  registry: object[] = [];
  nextId = 0;

  register(item: object) {
    this.registry.push({
      ...item,
      id: this.nextId++,
    });
  }

  fromPacket(buffer: ArrayBuffer) {
    const bd = new BufferData(buffer);
    const type = bd.readType();

    const matchedBinaryClass = this.registry.find((item) => item.id === type);
    if (!matchedBinaryClass) return null;

    return matchedBinaryClass.decode(buffer);
  }

}
