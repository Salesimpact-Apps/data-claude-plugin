import { deflateSync } from "zlib";
import { writeFileSync } from "fs";

function crc32(buf) {
  let crc = ~0;
  for (const byte of buf) {
    crc ^= byte;
    for (let i = 0; i < 8; i += 1) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return ~crc >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type);
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([len, typeBuf, data, crc]);
}

function pngSquare(size) {
  const navy = [0, 38, 75];
  const magenta = [255, 0, 131];
  const pixels = Buffer.alloc((size * 3 + 1) * size);
  const cx = (size - 1) / 2;
  const r = size * 0.22;
  const corner = Math.max(2, Math.round(size * 0.16));
  for (let y = 0; y < size; y += 1) {
    const row = y * (size * 3 + 1);
    pixels[row] = 0;
    for (let x = 0; x < size; x += 1) {
      const i = row + 1 + x * 3;
      const inDot = (x - cx) ** 2 + (y - cx) ** 2 <= r ** 2;
      const inset =
        x >= corner && x < size - corner && y >= 0 && y < size
          ? true
          : y >= corner && y < size - corner && x >= 0 && x < size
            ? true
            : (x < corner && y < corner && (x - corner) ** 2 + (y - corner) ** 2 <= corner ** 2) ||
              (x >= size - corner && y < corner && (x - (size - 1 - corner)) ** 2 + (y - corner) ** 2 <= corner ** 2) ||
              (x < corner && y >= size - corner && (x - corner) ** 2 + (y - (size - 1 - corner)) ** 2 <= corner ** 2) ||
              (x >= size - corner &&
                y >= size - corner &&
                (x - (size - 1 - corner)) ** 2 + (y - (size - 1 - corner)) ** 2 <= corner ** 2);
      const color = inDot ? magenta : inset ? navy : [255, 255, 255];
      pixels[i] = color[0];
      pixels[i + 1] = color[1];
      pixels[i + 2] = color[2];
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(pixels)),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

function icoFromPng(png) {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  header[6] = 32;
  header[7] = 32;
  header[8] = 0;
  header[9] = 0;
  header.writeUInt16LE(1, 10);
  header.writeUInt16LE(32, 12);
  header.writeUInt32LE(png.length, 14);
  header.writeUInt32LE(22, 18);
  return Buffer.concat([header, png]);
}

const png32 = pngSquare(32);
const png64 = pngSquare(64);
writeFileSync("favicon.png", png64);
writeFileSync("favicon.ico", icoFromPng(png32));
console.log("wrote favicon.png", png64.length, "favicon.ico", 22 + png32.length);
