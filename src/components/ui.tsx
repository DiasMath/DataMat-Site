import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`container ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="eyebrow">
      <span className="eyebrow-mark" />
      {children}
    </span>
  );
}

export function Button({
  to,
  children,
  variant = "dark",
  className = "",
}: {
  to: string;
  children: React.ReactNode;
  variant?: "dark" | "orange";
  className?: string;
}) {
  return (
    <Link to={to} className={`button button-${variant} ${className}`}>
      {children}
      <ArrowUpRight size={18} strokeWidth={1.8} />
    </Link>
  );
}

export function SectionIntro({
  index,
  kicker,
  title,
  body,
}: {
  index?: string;
  kicker: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="section-intro" data-reveal>
      <div className="section-label">
        {index && <span>{index} / </span>}
        {kicker}
      </div>
      <div>
        <h2>{title}</h2>
        {body && <p>{body}</p>}
      </div>
    </div>
  );
}
