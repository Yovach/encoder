export class BufferData {
  buffer: ArrayBuffer;
  view: DataView; 

  lastInsertedData: number | null;
  cursor: number = 0;

  constructor(fromBuffer?: ArrayBuffer) {
    this.buffer = fromBuffer ?? new ArrayBuffer(2048);
    this.view = new DataView(this.buffer);
  }

  readType() {

  }

  usedBuffer() {
    return this.buffer.slice(0, this.cursor);
  }

  bool(value: boolean) {
    this.view.setUint8(this.cursor++, value ? 1 : 0);
  }

  str(value: string) {
    for (let i = 0; i < value.length; i++) {
      this.view.setUint8(this.cursor++, value.charCodeAt(0));
    }
    this.view.setUint8(this.cursor++, 0);
  }

  uint8(value: number) {
    this.view.setUint8(this.cursor++, value);
  }

  fromJSON(data: Record<string, number | boolean | string | object> | object) {
    for (const [_, value] of Object.entries(data)) {
      if (typeof value === 'string') {
        this.str(value);
      } else if (typeof value === 'boolean') {
        this.bool(value);
      } else if (typeof value === 'number') {
        this.uint8(value);
      } else if (typeof value === 'object') {
        // On veut re-parcourir l'objet récupéré
        this.fromJSON(value);  
      }
    }
    return this;
  }
  
}
