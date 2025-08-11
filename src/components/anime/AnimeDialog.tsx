"use client";

import React from "react";

interface Props {
  onClose: () => void;
  onSubmit: (title: string) => Promise<void>;
}

export default function AnimeDialog({ onClose, onSubmit }: Props) {
  const [title, setTitle] = React.useState("");

  return (
    <div>
      <h3>アニメ新規登録</h3>
      <form>
        <div>
          <label>タイトル</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="アニメのタイトルを入力"
          ></input>
        </div>
        <div>
          <button type="button" onClick={onClose}>
            キャンセル
          </button>
          <button type="submit" onClick={() => onSubmit(title)}>
            登録
          </button>
        </div>
      </form>
    </div>
  );
}
