import https from "https";
import crypto from "crypto";
import { URL } from "url";
import * as C from "./constants";

const log = false;

export async function makeRequest(method: any, urlPath: any, body: any) {
  try {
    const salt = generateRandomString(8);
    const idempotency = new Date().getTime().toString();
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = sign(method, urlPath, salt, timestamp, body);

    const options = {
      hostname: C.RAPYD_URL,
      port: 443,
      path: urlPath,
      method: method,
      headers: {
        "Content-Type": "application/json",
        salt: salt,
        timestamp: timestamp,
        signature: signature,
        access_key: process.env.RAPYD_ACCESS_KEY,
        idempotency: idempotency,
      },
    };
    console.log(options);
    return await httpRequest(options, body);
  } catch (error) {
    console.error("Error generating request options");
    throw error;
  }
}

export function getHexKey(data: any[]) {
  return data.sort().join();
}

function sign(
  method: string,
  urlPath: any,
  salt: string,
  timestamp: number,
  body: null
) {
  const accessKey = process.env.RAPYD_ACCESS_KEY;
  const secretKey: string | undefined = process.env.RAPYD_SECRET_KEY;

  try {
    let bodyString = "";
    if (body) {
      bodyString = JSON.stringify(body);
      bodyString = bodyString == "{}" ? "" : bodyString;
    }

    let toSign =
      method.toLowerCase() +
      urlPath +
      salt +
      timestamp +
      accessKey +
      secretKey +
      bodyString;
    log && console.log(`toSign: ${toSign}`);

    let hash = crypto.createHmac("sha256", secretKey as crypto.BinaryLike);
    hash.update(toSign);
    const signature = Buffer.from(hash.digest("hex")).toString("base64");
    log && console.log(`signature: ${signature}`);

    return signature;
  } catch (error) {
    console.error("Error generating signature");
    throw error;
  }
}

function generateRandomString(size: number) {
  try {
    return crypto.randomBytes(size).toString("hex");
  } catch (error) {
    console.error("Error generating salt");
    throw error;
  }
}

async function httpRequest(
  options: string | https.RequestOptions | URL,
  body: null
) {
  return new Promise((resolve, reject) => {
    try {
      let bodyString = "";
      if (body) {
        bodyString = JSON.stringify(body);
        bodyString = bodyString == "{}" ? "" : bodyString;
      }

      log && console.log(`httpRequest options: ${JSON.stringify(options)}`);
      const req = https.request(options, (res) => {
        let response = {
          statusCode: res.statusCode,
          headers: res.headers,
          body: "",
        };

        res.on("data", (data) => {
          response.body += data;
        });

        res.on("end", () => {
          response.body = response.body ? JSON.parse(response.body) : {};
          log &&
            console.log(`httpRequest response: ${JSON.stringify(response)}`);

          if (response.statusCode !== 200) {
            return reject(response);
          }

          return resolve(response);
        });
      });

      req.on("error", (error) => {
        return reject(error);
      });

      req.write(bodyString);
      req.end();
    } catch (err) {
      return reject(err);
    }
  });
}
