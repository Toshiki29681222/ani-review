"use client";

import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    console.log("Login attempt:", { email });

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful");
        alert("ログインが成功しました！");

        // TODO: 適切なページにリダイレクト
        // 一時的にトークンをコンソールに表示（実際のアプリでは使用しない）
        console.log("Auth token:", data.token);
        console.log("User info:", data.user);

        // 例: ダッシュボードにリダイレクト
        // window.location.href = '/dashboard'
      } else {
        console.error("Login failed:", data);
        alert(`ログインエラー: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert(`ネットワークエラー: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}>
      <h1>ログイン</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="email"
            style={{ display: "block", marginBottom: "5px" }}
          >
            メールアドレス
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "16px",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="password"
            style={{ display: "block", marginBottom: "5px" }}
          >
            パスワード
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "16px",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: isLoading ? "#ccc" : "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? "ログイン中..." : "ログイン"}
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "20px" }}>
        アカウントをお持ちでない方は{" "}
        <a
          href="/auth/signup"
          style={{ color: "#007cba", textDecoration: "none" }}
        >
          新規登録
        </a>
      </p>
    </div>
  );
}
