import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { Copy } from "lucide-react";

// 固定のジャンル一覧
const GENRES = [
  "ビジネススキル",
  "コミュニケーション",
  "自己啓発",
  "タイムマネジメント",
  "リーダーシップ",
  "プレゼンテーション",
  "問題解決",
  "マーケティング",
] as const;

const RandomWords = () => {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [words, setWords] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [wordContent, setWordContent] = useState<string[]>([]);
  const { toast } = useToast();

  // 選択されたジャンルの単語を取得
  const fetchRandomWords = async (genre: string) => {
    setIsLoading(true);
    // 結果表示をクリア
    setSelectedWord(null);
    setWordContent([]);
    try {
      const response = await fetch(
        "https://apiwalk.tacarz.workers.dev/api/deepseek/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [
              {
                role: "user",
                content: `${genre}に関連する動詞を10個、カンマ区切りで出力してください。説明は不要です。`,
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const wordList = data.choices[0].message.content
        .split(",")
        .map((word: string) => word.trim());
      setWords(wordList);
      toast({
        title: "更新完了",
        description: "新しい単語を取得しました",
      });
    } catch (error) {
      toast({
        title: "エラーが発生しました",
        description: "単語の取得に失敗しました。",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ジャンルが選択された時の処理
  const handleGenreClick = async (genre: string) => {
    setSelectedGenre(genre);
    await fetchRandomWords(genre);
  };

  // 単語クリック時の処理
  const handleWordClick = async (word: string) => {
    setSelectedWord(word);
    setWordContent([]); // 新しい単語がクリックされたときに前の結果を消す
    await fetchWordContent(word);
  };

  // 単語の内容を取得する関数を追加
  const fetchWordContent = async (word: string) => {
    setIsLoading(true);
    try {
      // まず既存のデータを検索
      const searchResponse = await fetch(
        "https://apiwalk.tacarz.workers.dev/api/words/search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            word: word,
          }),
        }
      );

      const searchData = await searchResponse.json();

      // 既存のデータがある場合はそれを使用
      if (searchData.success && searchData.data) {
        const content = searchData.data.meaning
          .split("\n")
          .filter(
            (line: string) =>
              line.length > 0 &&
              !line.startsWith("**") &&
              !line.includes("以下は") &&
              !line.includes("まとめた") &&
              !line.includes("以下に")
          )
          .slice(0, 7);
        setWordContent(content);
      } else {
        // 既存のデータがない場合は新しく生成して登録
        const response = await fetch(
          "https://apiwalk.tacarz.workers.dev/api/deepseek/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              messages: [
                {
                  role: "user",
                  content: `「${word}」の実践手順を3〜7個、箇条書きで出力してください。`,
                },
              ],
            }),
          }
        );

        const data = await response.json();
        const content = data.choices[0].message.content
          .split("\n")
          .map((line: string) => line.replace(/^[0-9-\.\s]+/, "").trim())
          .filter(
            (line: string) =>
              line.length > 0 &&
              !line.startsWith("**") &&
              !line.includes("以下は") &&
              !line.includes("まとめた") &&
              !line.includes("以下に")
          )
          .slice(0, 7);

        // 生成したコンテンツを保存
        await fetch("https://apiwalk.tacarz.workers.dev/api/words", {
          method: "POST",
          headers: {
            Authorization: "Bearer dev-token",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            word: word,
            meaning: content.join("\n"),
          }),
        });

        setWordContent(content);
      }
    } catch (error) {
      toast({
        title: "エラーが発生しました",
        description: "内容の取得に失敗しました。もう一度お試しください。",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      // 選択された単語を最初の行に追加
      const textToCopy = `${selectedWord}\n${wordContent.join("\n")}`;
      await navigator.clipboard.writeText(textToCopy);
      toast({
        title: "コピーしました",
        description: "クリップボードにコピーしました",
      });
    } catch (err) {
      toast({
        title: "エラー",
        description: "コピーに失敗しました",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
          {selectedGenre || "ジャンルを選択"}
        </h2>

        {/* ジャンル一覧 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {GENRES.map((genre, index) => (
            <div
              key={index}
              className={`
                relative overflow-hidden rounded-lg p-2
                backdrop-blur-sm transition-colors
                cursor-pointer border border-primary/10
                hover:border-primary/30
                ${
                  selectedGenre === genre
                    ? "bg-primary/10 border-primary/30"
                    : "bg-background/60"
                }
              `}
              onClick={() => handleGenreClick(genre)}
            >
              <div className="text-center font-medium text-sm">{genre}</div>
            </div>
          ))}
        </div>

        {/* 単語一覧 */}
        {selectedGenre && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
              {words.map((word, index) => (
                <div
                  key={index}
                  className={`
                    relative overflow-hidden rounded-lg p-2
                    backdrop-blur-sm transition-colors
                    cursor-pointer border border-primary/10
                    hover:border-primary/30
                    ${
                      selectedWord === word
                        ? "bg-primary/10 border-primary/30"
                        : "bg-background/60"
                    }
                  `}
                  onClick={() => handleWordClick(word)}
                >
                  <div className="text-center font-medium text-sm">{word}</div>
                </div>
              ))}
            </div>

            <div className="text-center mb-8">
              <Button
                onClick={async () => {
                  setSelectedWord(null);
                  setWordContent([]);
                  await fetchRandomWords(selectedGenre);
                }}
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg text-sm transition-colors"
                size="default"
              >
                {isLoading ? "読み込み中..." : "新しい単語を取得"}
              </Button>
            </div>
          </>
        )}

        {/* 単語の詳細コンテンツ */}
        {selectedWord && (
          <>
            <h2 className="text-xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              {selectedWord}
            </h2>
            <section className="kekka">
              {wordContent.length > 0 && (
                <div className="space-y-2 text-center max-w-2xl mx-auto">
                  {wordContent.map((content, index) => (
                    <React.Fragment key={index}>
                      <div className="text-sm font-medium p-2 rounded-lg bg-background/80 shadow-sm">
                        {content}
                      </div>
                      {index < wordContent.length - 1 && (
                        <div className="text-lg text-primary/60">↓</div>
                      )}
                    </React.Fragment>
                  ))}

                  <div
                    onClick={handleCopy}
                    className="text-sm font-medium mt-4 p-2 rounded-lg bg-primary/5 border border-primary/20 cursor-pointer hover:bg-primary/10 transition-colors flex items-center justify-center gap-2 group"
                  >
                    <span>この流れは覚えておきたい😇</span>
                    <Copy className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default RandomWords;
