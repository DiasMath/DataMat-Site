import { Check } from "lucide-react";
import { Container, SectionIntro } from "./ui";

export function Comparison({
  eyebrow,
  title,
  leftTitle,
  rightTitle,
  left,
  right,
}: {
  eyebrow: string;
  title: string;
  leftTitle: string;
  rightTitle: string;
  left: string[];
  right: string[];
}) {
  return (
    <section className="comparison-section">
      <Container>
        <SectionIntro kicker={eyebrow} title={title} />
        <div className="comparison-grid">
          <div className="comparison-before">
            <span>ANTES / {leftTitle}</span>
            {left.map((x, i) => (
              <div key={x}>
                <small>{String(i + 1).padStart(2, "0")}</small>
                {x}
              </div>
            ))}
          </div>
          <div className="comparison-after">
            <span>DEPOIS / {rightTitle}</span>
            {right.map((x) => (
              <div key={x}>
                <Check size={18} />
                {x}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
