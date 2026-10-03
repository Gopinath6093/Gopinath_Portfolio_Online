export const SCROLL_ROOT_ID = "scroll-root";

export const MOBILE_LAYOUT_QUERY =
  "(pointer: coarse) and (hover: none), (max-width: 767px), (max-width: 1200px) and (max-height: 500px)";

/**
 * On mobile the page scrolls inside a fixed container so the browser toolbar never collapses
 * and the viewport (and everything fixed to it) stays constant. On desktop the container is
 * `display: contents` and the window scrolls as usual.
 */
export function getScrollY() {
  const root = document.getElementById(SCROLL_ROOT_ID);
  return Math.max(window.scrollY, root?.scrollTop ?? 0);
}
