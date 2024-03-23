import { readdir } from "node:fs/promises";

import { BufferDataRegistry } from "./lib/buffer-data-registry.ts";
import { AuthPacket } from "./objects/auth-packet.ts";

// X-bits ID registry
// Y-bits pour le ID packet

// 8-bits 255 packets 
// 8-bits 255 sous-packets 

const registry = new BufferDataRegistry();
readdir("./objects/", {recursive: true}).then(async (directories) => {
  for (const file of directories) {
    const importedObjectData = await import('./objects/' + file);
    registry.register(importedObjectData);
  }
  console.log(registry)
});

// registry.register(AuthPacket);
