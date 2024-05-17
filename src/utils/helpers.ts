import { Buffer } from "buffer";

/**
 * @description Source:  https://github.com/MTKruto/MTKruto/blob/d4123f1d4ba18fb08d285a8964e1586d59a9d93b/tl/0_tl_raw_writer.ts#L24
 */
export class BufferWriter {
  private _buffer: Uint8Array = new Uint8Array();

  constructor() {}

  write(buffer: Uint8Array | Buffer): BufferWriter {
    this._buffer = Buffer.concat([this._buffer, buffer]);
    return this;
  }

  get buffer(): Uint8Array {
    return this._buffer;
  }
}

export const base64Encode = (data: Buffer | Uint8Array, urlSafe = false, shouldTrim = false): string => {
  const b64EncodedString = data.toString("base64");
  if (!urlSafe) return b64EncodedString;
  const urlSafeString = b64EncodedString.replaceAll("+", "-").replaceAll("/", "_");
  return shouldTrim ? urlSafeString.replace(/=*$/, "") : urlSafeString;
};

export const bigintToByteArray = (num: bigint | number | bigint, byteCount: number): Uint8Array => {
  const hex = num.toString(16).padStart(byteCount * 2, "0");
  return Uint8Array.from(hex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)));
};

export const writeInt16 = (value: number, writer: BufferWriter, signed: boolean): void => {
  writer.write(new Uint8Array(2));
  const dataView = new DataView(writer.buffer.buffer);
  if (signed) dataView.setInt16(writer.buffer.length - 2, value);
  else dataView.setUint16(writer.buffer.length - 2, value);
};
