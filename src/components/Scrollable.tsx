/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { cx } from "@emotion/css";
import { jsx } from "@emotion/react";
import { MutableRefObject, ReactNode, useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

import { LAYOUT_CONTENT_PADDING_X } from "../utils/constants";

const classes = {
  root: {
    width: `calc(100vw - ${LAYOUT_CONTENT_PADDING_X}px)`
  },
  /**
   *
   * @param columnsCount total number of column
   * @param columnWidth width of each column
   * @returns
   */
  scrollableContent: (columnsCount: number, columnWidth: number) => ({
    width: `${columnsCount * columnWidth + LAYOUT_CONTENT_PADDING_X / 2}vw`
  }),
  scrollableTable: (tableWidth: number = 1130) => ({
    minWidth: tableWidth
  })
};

type IDirection = "horizontal" | "vertical";
// scroll classname
type IScrollClassName = "scrollX" | "scrollY" | "scroll";
const getScrollClassName = (direction: IDirection): IScrollClassName => {
  switch (direction) {
    case "horizontal":
      return "scrollX";
    case "vertical":
      return "scrollY";
    default:
      return "scroll";
  }
};

type Props = {
  children: ReactNode;
  className?: string;
  columnsCount?: number;
  columnWidth?: number;
  tableWidth?: number;
  direction?: IDirection;
  type?: "card" | "table";
};

const Scrollable = ({
  children,
  className,
  tableWidth,
  columnsCount = 0,
  columnWidth = 90,
  direction = "horizontal",
  type = "card"
}: Props) => {
  const containerRef = useRef<HTMLDivElement>() as MutableRefObject<
    HTMLInputElement
  >;
  const { events } = useDraggable(containerRef, {
    applyRubberBandEffect: true
  });

  return (
    <div
      {...events}
      className={cx(
        className,
        getScrollClassName(direction),
        "hideScrollbar flex1 flexColumn"
      )}
      css={classes.root}
      ref={containerRef}
    >
      <div
        css={
          type === "card"
            ? classes.scrollableContent(columnsCount, columnWidth)
            : classes.scrollableTable(tableWidth)
        }
        className={cx(
          "flexRow stretchSelf flex1 hideScrollbar",
          getScrollClassName(direction)
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Scrollable;
