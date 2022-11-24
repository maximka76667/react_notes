import { SetStateAction, useEffect, useState } from "react";

export function useLocalStorage<T extends any[]>(
  key: string,
  initialValue: T | (() => T)
) {
  const [value, setValue] = useState<T>(() => {
    const itemValue = localStorage.getItem(key);

    if (itemValue != null) {
      return JSON.parse(itemValue);
    }

    if (typeof initialValue === "function") {
      return initialValue();
    }

    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem("key", JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as [T, React.Dispatch<SetStateAction<T>>];
}
