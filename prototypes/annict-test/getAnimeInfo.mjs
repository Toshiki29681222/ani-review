import axios from "axios";

const token = "cljRxVyvChSYFWps3os8GVe0gmuajpKZ7bGb18lZ9Yk";
const workId = 4168; // 例: 「しろばこ」の ID アニメ情報の中には制作会社が入っていないので、別の外部APIを使う必要がある

async function fetchEpisodes() {
  try {
    console.log(token);
    const res = await axios.get("https://api.annict.com/v1/works", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        filter_ids: workId,
      },
    });

    console.log(res.data.works);
  } catch (error) {
    console.error("APIエラー:", error.response?.data || error.message);
  }
}

fetchEpisodes();
