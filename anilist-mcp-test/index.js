import { spawn } from "child_process";
import { naturalToFilter } from "./naturalToFilter.js";

const proc = spawn("bun", ["run", "start"], {
  cwd: "./anilist-mcp",
  stdio: ["pipe", "pipe", "inherit"],
});

proc.stdout.on("data", (data) => {
  const text = data.toString().trim();
  if (!text.startsWith("{")) return;
  try {
    const response = JSON.parse(text);
    const contentText = response.result?.content?.[0]?.text;
    if (contentText) {
      const parsed = JSON.parse(contentText);
      console.log("=== Search Results ===");
      parsed.media.forEach((m) =>
        console.log(`${m.id}: ${m.title.userPreferred}`)
      );
    }
    proc.kill();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    console.error("Parse error:", text);
  }
});

function sendRpc(method, params = {}) {
  const message =
    JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }) + "\n";
  proc.stdin.write(message);
}

async function searchNatural(query) {
  const { term, filter } = await naturalToFilter(query);
  console.log("AI converted to:", { term, filter });
  sendRpc("tools/call", {
    name: "search_anime",
    arguments: { filter, amount: 10 }, // term削除
  });
  //   console.log(query);
  //   const filter = {
  //     genre: "Sports",
  //     tag: null,
  //     // seasonYear: 2020, // 必要なら年も指定
  //     // tag: "Baseball",     // 必要ならタグも追加
  //     // startDate_greater: 20200101, // 2020年以降ならこちら
  //   };

  //   console.log("Direct filter:", filter);

  //   sendRpc("tools/call", {
  //     name: "search_anime",
  //     arguments: { filter, amount: 10 },
  //   });
}

await searchNatural("2020年以降のアニメ");
