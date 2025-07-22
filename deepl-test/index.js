import * as deepl from "deepl-node";

const authKey = "d956f80b-17b5-4d1c-8a84-5e673f2be750:fx"; // DeepL APIの認証キー
const translator = new deepl.Translator(authKey);

async function translateToJapanese(text) {
  try {
    const result = await translator.translateText(text, null, "JA");
    console.log(result.text); // 翻訳結果
  } catch (error) {
    console.error("翻訳エラー:", error);
  }
}

translateToJapanese(
  "Teekyuu is based on a sports comedy manga of the same name featuring four high school girls who belong to a tennis club. "
);
