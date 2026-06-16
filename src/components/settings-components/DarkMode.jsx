import { useState, useEffect } from "react";
export default function DarkMode() {
    const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);
    return(
        <div className="p-6 bg-white rounded-2xl">
            <button
        onClick={() => setDark(!dark)}
        className="p-2 border rounded"
      >
        Toggle Theme
      </button>
        </div>
    )
}