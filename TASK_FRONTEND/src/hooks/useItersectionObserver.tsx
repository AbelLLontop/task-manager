import { RefObject, useEffect, useState } from "react";

export const useIntersectionObserver = (
  containerRef: RefObject<HTMLDivElement>
) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: 0.9,
    };
    const observer = new IntersectionObserver(callbackFunction, options);
    if (containerRef.current) observer.observe(containerRef.current);

    const cleanUp = () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };

    return cleanUp;
  }, [containerRef]);

  const callbackFunction: IntersectionObserverCallback = (
    entries: IntersectionObserverEntry[]
  ) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  return [isVisible];
};
