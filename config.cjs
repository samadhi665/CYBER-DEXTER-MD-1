const fs = require("fs");
require("dotenv").config();

const parseBoolean = (value, defaultValue) => {
  if (value === undefined) return defaultValue;
  return value.toLowerCase() === "true";
};

const config = {
  // Session Configuration
  SESSION_ID: process.env.SESSION_ID || "CYBER-DEXTER-MD [KILL]>>>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaU92eExvQm5ONy9lRnpoYXlMYktMdVlaUGN4Qk9EU200eHFCSjVtdE1HOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQnVVTWthSjhPeDVkRWNBenlsY1N3bXkvK25PSTRLYllMMmpaK0ZFMkdqMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrTzRzTHpPRFZZSGs2MTEzZzhpM3ZTNFlOM1ZKOElQdUVCaEIxdVZmMm1RPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5Wnlwa3hDUkhoVFhxblJ2a2NFNVo4UnI5VXhVMG1CWnB4R3RycktHeEhJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdNZWxpcnRpakFRWlR4dXJlOE8rdEpteXdGVTlianZZeDZTbEJKWi92SEk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImRDRjh5UUJocE8xRWFaVXZhb0xqT2tYMkpoQVRrTDBDUmpQZVBwVFFOUmc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0FDM3Z2cFpLL0hsd0JUajFNM0FCNkdRZi9SVVlCMUp6Q05UVmZBOXNWMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiN0R4QzUydU1rQXpjQ251Q2pRTm9kVE9Kb09uQ09Bd2QvTk91Vjk0NzRBUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkF5N293WTBZcGdnZElja3NHb2pFVVdBVkJXNC9lM0UzK3YydktWZmpwdUtUY3NSd2hiY2ZNWWI0OFA5UE1Va3FmWi9oVnZ2TnNtVkxobVhrc0VTZ2l3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjI1LCJhZHZTZWNyZXRLZXkiOiJSUlJFZldHeEhhalNGaTFOMTZoVmFCK056WmVHOXFxVEZYazRHMG9CbHFJPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJsN3RVRjVHaVNOV1pTYjR1VG00LTFnIiwicGhvbmVJZCI6IjYzN2ExZjFjLWE0YTAtNGExMy04OTA4LWQwZmFkOGNlNDBhYiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJyWS92c21vZG9ZamdXYllmSFdWRUF1UUQ3NkE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQk4yTDdydCtMYzVIeGcxWGw3SHZvT0ZSKzc4PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlJEWTRSRVQ2IiwibWUiOnsiaWQiOiI5NDcyMjMwMjA3OTo1N0BzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJAIH4gXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4uXG4gUktDIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLN01nOHdGRU82OXM3OEdHQVFnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJLWHlNUjJROGRrZ1kyY1QxN2wrTHRhQWVnand2Wm5vSURPL1VqQWxSOFRnPSIsImFjY291bnRTaWduYXR1cmUiOiJKazZ0NGdMNjd4TmEyT2NhY2Y3bklKWXhjL1IzQjA4SDhDR0ZRL2NCT0lyRDNsb3NEQXBlcGRBMTVBVDhhaDl5RFZ0TDVweCtFRGNhc25ic1NCUmdBQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiK3IvL0JjZUNxNE5DSktaMXFyelVFMHF2L040c2VFNnQ1TTlqTUNUWGRCQ2FMOVFLOUx2UGZ2MlBmR2tseEtmSUhKa2REdTEwS0tSNDg4ejdwaUtCaFE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5NDcyMjMwMjA3OTo1N0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJTbDhqRWRrUEhaSUdObkU5ZTVmaTdXZ0hvSThMMlo2Q0F6djFJd0pVZkU0In19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQzNTc2ODI2LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUJXcyJ9",
  PREFIX: process.env.PREFIX || ".",
  
  // Auto Features
  AUTO_STATUS_SEEN: parseBoolean(process.env.AUTO_STATUS_SEEN, true),
  AUTO_STATUS_REACT: parseBoolean(process.env.AUTO_STATUS_REACT, true),
  AUTO_STATUS_REPLY: parseBoolean(process.env.AUTO_STATUS_REPLY, false),
  AUTO_STATUS_REPLY_VOICE: parseBoolean(process.env.AUTO_STATUS_REPLY_VOICE, false),
  AUTO_STATUS_REPLY_VOICE_MULTI: parseBoolean(process.env.AUTO_STATUS_REPLY_VOICE_MULTI, false),
  STATUS_READ_MSG: process.env.STATUS_READ_MSG || "*📍 Auto Status Seen Bot By CYBER-DEXTER-MD*",

  AUTO_DL: parseBoolean(process.env.AUTO_DL, false),
  AUTO_READ: parseBoolean(process.env.AUTO_READ, false),
  AUTO_TYPING: parseBoolean(process.env.AUTO_TYPING, true),
  AUTO_RECORDING: parseBoolean(process.env.AUTO_RECORDING, false),
  AUTO_STATUS_REACT: parseBoolean(process.env.AUTO_STATUS_REACT, true),
  ALWAYS_ONLINE: parseBoolean(process.env.ALWAYS_ONLINE, true),

  // Call Settings
  REJECT_CALL: parseBoolean(process.env.REJECT_CALL, false),

  // General Settings
  NOT_ALLOW: parseBoolean(process.env.NOT_ALLOW, true),
  MODE: process.env.MODE || "public",
  OWNER_NAME: process.env.OWNER_NAME || "✪⏤CYBER-DEXTER",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "94785274495",

  // API Keys
  GEMINI_KEY: process.env.GEMINI_KEY || "AIzaSyCUPaxfIdZawsKZKqCqJcC-GWiQPCXKTDc",

  // Features
  WELCOME: parseBoolean(process.env.WELCOME, true),

  // Trigger Words
  triggerWords: [
    "ඔනි", "send", "එවන්න", "sent", "giv", "gib", "upload",
    "send me", "sent me", "znt", "snt", "ayak", "do", "mee", "autoread"
  ],
};

module.exports = config;
