import React from "react";

/**
 * 要素を画面中央に表示するコンポーネント
 */
export const HorizontallyVerticallyCentered = ({
  children,
}: {
  readonly children: React.ReactNode;
}) => (
  <div
    style={{
      display: "grid",
      placeItems: "center",
      height: "100%",
    }}
  >
    {children}
  </div>
);
