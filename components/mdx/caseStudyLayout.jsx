// components/mdx/caseLayout.jsx

const columnClassMap = {
  1: "grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
};

export const CaseSection = ({ children, className }) => {
  const classNames = className && className.trim().length > 0 ? className : "m-0 py-14";
  return <section className={classNames}>{children}</section>;
};

export const CaseColumns = ({ cols = 1, children, className }) => {
  const colsClass = columnClassMap[cols] ?? columnClassMap[1];
  return <div className={`grid gap-6 ${colsClass} ${className}`}>{children}</div>;
};

// Media and Text Component
export const CaseText = ({ children, className }) => {
  const classNames = className && className.trim().length > 0 ? className : "text-neutral-300";
  return <div className={classNames}>{children}</div>;
};

export const CaseMedia = ({ children, className }) => {
  return <div className={`overflow-hidden bg-neutral-900/40 ${className}`}>{children}</div>;
};

export const CaseVideo = ({ src, className = "", autoPlay = true, loop = true, muted = true, controls = false }) => {
  return (
    <video src={src} autoPlay={autoPlay} loop={loop} muted={muted} controls={controls} playsInline className={`w-full rounded-xl ${className}`} />
  );
};
