const { BufferData } = require("./lib/buffer");

const packet = {
  type: 1,
  data: {
    rotation: 0,
    is_jumping: true, // boolean
    is_sneaking: false, // boolean

    x: 0,
    y: 0,
    z: 0,
  },
};

let total = 0;
for (let i = 0; i < 30; i++) {
  total += JSON.stringify(packet).length;
}

const x = new BufferData();
x.bool(true);

console.log(JSON.stringify(packet).length, total);

// ROTATION|IS_JUMPING|IS_SNEAKING|X|Y|Z

