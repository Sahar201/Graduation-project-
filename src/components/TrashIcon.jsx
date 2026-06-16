/**
 * Inline SVG trash icon — renders reliably even if the icon font fails to load.
 * Color is controlled by CSS `color` (fill: currentColor).
 */
const TrashIcon = ({ size = 16 }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M9 3a1 1 0 0 0-1 1v1H4.5a1 1 0 0 0 0 2H5v12a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V7h.5a1 1 0 1 0 0-2H16V4a1 1 0 0 0-1-1H9zm1 2h4v-.001L10 5zm-3 2h10v12a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V7zm3 2a1 1 0 0 0-1 1v7a1 1 0 1 0 2 0v-7a1 1 0 0 0-1-1zm4 0a1 1 0 0 0-1 1v7a1 1 0 1 0 2 0v-7a1 1 0 0 0-1-1z" />
  </svg>
);

export default TrashIcon;
