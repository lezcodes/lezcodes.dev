import os from "node:os";
import { spawn } from "bun";

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "localhost";
}

const localIP = getLocalIP();
const port = process.env.PORT || 3000;

console.log(`\n➜ Network: http://${localIP}:${port}/\n`);

spawn(["next", "dev", "-H", "0.0.0.0", "--turbopack"], {
  stdio: ["inherit", "inherit", "inherit"],
});
