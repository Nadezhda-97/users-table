import { useState, useCallback } from "react";

export const useColumnResize = (
  columnCount,
  initialWidth = null,
  minWidth = 50
) => {

  const [columnWidths, setColumnWidths] = useState(
    initialWidth
      ? Array(columnCount).fill(initialWidth)
      : Array(columnCount).fill(null)
  );

  const handleMouseDown = useCallback((index, e) => {
    const startX = e.clientX;

    setColumnWidths(prevWidths => {
      const startWidth =
        prevWidths[index] ?? e.target.parentElement.offsetWidth;

      const onMouseMove = (moveEvent) => {
        const newWidth = Math.max(
          minWidth,
          startWidth + (moveEvent.clientX - startX)
        );

        setColumnWidths(prev => {
          const updated = [...prev];
          updated[index] = newWidth;
          return updated;
        });
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);

      return prevWidths;
    });
  }, [minWidth]);

  return { columnWidths, handleMouseDown };
};
