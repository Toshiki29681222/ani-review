import axios from "axios";

const token = "cljRxVyvChSYFWps3os8GVe0gmuajpKZ7bGb18lZ9Yk";
const workId = 6000; // 例: 「モブサイコ２期」の ID

async function fetchEpisodes() {
  try {
    console.log(token);
    const res = await axios.get("https://api.annict.com/v1/episodes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        filter_work_id: workId,
        per_page: 50,
      },
    });

    const episodes = res.data.episodes;
    episodes.forEach((ep) => {
      console.log(
        `#${ep.number} ${ep.title} (${ep.id})\n${ep.summary || "No summary"}\n`
      );
    });

    console.log(episodes);
  } catch (error) {
    console.error("APIエラー:", error.response?.data || error.message);
  }
}

fetchEpisodes();
