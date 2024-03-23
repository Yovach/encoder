export class BufferData {
  buffer = new ArrayBuffer(2048);
  view = new DataView(this.buffer);

  lastInsertedData: number | null;
  position: number = 0;

  usedBuffer() {
    return this.buffer.slice(0, this.position);
  }

  bool(value: boolean) {
    this.view.setUint8(this.position++, value ? 1 : 0);
  }

  str(value: string) {
    for (let i = 0; i < value.length; i++) {
      this.view.setUint8(this.position++, value.charCodeAt(0));
    }
    this.view.setUint8(this.position++, 0);
  }

  uint8(value: number) {
    this.view.setUint8(this.position++, value);
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
