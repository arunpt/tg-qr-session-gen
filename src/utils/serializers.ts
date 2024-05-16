import { Buffer } from "buffer";
import { BufferWriter, base64Encode, bigintToByteArray, writeInt16 } from "./helpers";
import { parse } from "ipaddr.js";

/**
 * @description Source:  https://github.com/grammyjs/telegram.tools/blob/2a9ff1d347bfc5973fca52ad508547f3d8a5e7f8/lib/session_string.ts
 */
export class SessionSerializer {
  constructor() {}

  pyrogram(
    dcId: number,
    apiId: number,
    authKey: Uint8Array | Buffer,
    userId: BigInt | bigint,
    testMode: boolean,
    isBot: boolean
  ): string {
    const writer = new BufferWriter();
    writer.write(new Uint8Array([dcId]));
    writer.write(bigintToByteArray(apiId, 32 / 8));
    writer.write(new Uint8Array([testMode ? 1 : 0]));
    writer.write(authKey);
    writer.write(bigintToByteArray(userId, 64 / 8));
    writer.write(new Uint8Array([isBot ? 1 : 0]));
    return base64Encode(writer.buffer, true, true);
  }

  telethon(dcId: number, ip: string, port: number, authKey: Uint8Array): string {
    const writer = new BufferWriter();
    writer.write(new Uint8Array([dcId, ...parse(ip).toByteArray()]));
    writeInt16(port, writer, false);
    writer.write(authKey);
    return "1" + base64Encode(writer.buffer, true);
  }

  gramjs(dcId: number, ip: string, port: number, authKey: Uint8Array): string {
    const writer = new BufferWriter();
    writer.write(new Uint8Array([dcId]));
    const ipBytes = parse(ip).toByteArray();
    writeInt16(ipBytes.length, writer, true);
    writer.write(new Uint8Array(ipBytes));
    writeInt16(port, writer, true);
    writer.write(authKey);
    return "1" + base64Encode(writer.buffer);
  }
}
