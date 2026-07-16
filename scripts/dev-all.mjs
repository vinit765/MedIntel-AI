import { existsSync } from "node:fs";
import { copyFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join, resolve } from "node:path";
import { spawn } from "node:child_process";

const rootDir = resolve(fileURLToPath(new URL("..", import.meta.url)));
const isWindows = process.platform === "win32";
const npmCommand = isWindows ? "npm.cmd" : "npm";
const pythonCommand = isWindows ? "python" : "python3";

const services = [];

async function ensureFile(source, target) {
  if (!existsSync(target) && existsSync(source)) {
    await copyFile(source, target);
    console.log(`[setup] Created ${target.replace(rootDir, ".")}`);
  }
}

async function prepareLocalEnvironment() {
  await mkdir(join(rootDir, "storage", "uploads"), { recursive: true });
  await ensureFile(join(rootDir, ".env.example"), join(rootDir, ".env"));
  await ensureFile(join(rootDir, "backend", ".env.example"), join(rootDir, "backend", ".env"));
  await ensureFile(join(rootDir, "frontend", ".env.example"), join(rootDir, "frontend", ".env.local"));
}

function startService(name, command, args, options = {}) {
  console.log(`[${name}] starting: ${command} ${args.join(" ")}`);
  const child = spawn(command, args, {
    cwd: options.cwd ?? rootDir,
    env: {
      ...process.env,
      ...options.env
    },
    shell: false,
    stdio: "inherit"
  });

  child.on("exit", (code, signal) => {
    if (signal) {
      console.log(`[${name}] stopped with signal ${signal}`);
      return;
    }

    if (code && code !== 0) {
      console.error(`[${name}] exited with code ${code}`);
      stopAll(code);
    }
  });

  services.push(child);
}

function stopAll(exitCode = 0) {
  for (const service of services) {
    if (!service.killed) {
      service.kill("SIGINT");
    }
  }

  setTimeout(() => process.exit(exitCode), 250);
}

function startOptionalOllama() {
  if (process.env.DEV_WITH_OLLAMA !== "1") {
    console.log("[ollama] skipped. Set DEV_WITH_OLLAMA=1 to start Ollama with dev:all.");
    return;
  }

  const ollamaCommand = isWindows ? "ollama.exe" : "ollama";
  startService("ollama", ollamaCommand, ["serve"]);
}

process.on("SIGINT", () => stopAll(0));
process.on("SIGTERM", () => stopAll(0));

await prepareLocalEnvironment();

console.log("[setup] SQLite is initialized automatically by the FastAPI app in development.");
console.log("[setup] Backend API: http://127.0.0.1:8000/api/v1/health");
console.log("[setup] Frontend: http://127.0.0.1:3000");

startService("backend", pythonCommand, ["-m", "uvicorn", "app.main:app", "--reload", "--host", "127.0.0.1", "--port", "8000"], {
  cwd: join(rootDir, "backend"),
  env: {
    PYTHONPATH: join(rootDir, "backend")
  }
});

startService("frontend", npmCommand, ["run", "dev", "--", "--hostname", "127.0.0.1", "--port", "3000"], {
  cwd: join(rootDir, "frontend")
});

startOptionalOllama();
