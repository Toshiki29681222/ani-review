import { useState } from "react";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";

export default function FavoriteButton() {
  const [favorited, setFavorited] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // 🔴 これで親への伝播を止める
    setFavorited(!favorited);
  };

  return (
    <button
      onClick={handleClick}
      //   className="p-1 bg-white bg-opacity-80 rounded-full shadow-md hover:bg-opacity-100 transition"
      aria-label="お気に入り"
    >
      {favorited ? (
        <SolidHeart className="w-5 h-5 text-red-500" />
      ) : (
        <OutlineHeart className="w-5 h-5 text-gray-700" />
      )}
    </button>
  );
}
