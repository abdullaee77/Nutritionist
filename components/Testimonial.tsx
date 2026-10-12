import Reveal from "./Reveal";

const quote =
  "My experience with NAFLAR has been very good. I trusted the process, and I’m really happy with the results. My weight reduced from 68.5 kg to around 57–58 kg, and after losing weight I feel better, less stressed, and more relaxed. I have been dealing with PCOS since 2017, and over the last three years my weight kept increasing. I didn’t understand why it was happening or what I needed to change. I consulted NAFLAR on 4 February 2026, and by June my weight had come down to around 58 kg. The best part was that I didn’t have to stop eating everything I enjoyed. With a balanced diet, healthy eating habits, exercise, and NAFLAR’s support, the journey felt manageable. The guidance, including duas and spiritual encouragement, also helped me feel supported throughout the process.";

export default function Testimonial() {
  return (
    <section className="section tint">
      <div className="container">
        <Reveal className="center">
          <span className="eyebrow">Patient Testimonial</span>
          <h2>Real results, gently reached.</h2>
        </Reveal>

        <Reveal className="zoom">
          <div className="testi-card">
            <span className="qmark" aria-hidden="true">“</span>
            <div>
              <blockquote>{quote}</blockquote>
              <div className="who">
                <span className="avatar">N</span>
                <div>
                  <b>Naflar client</b>
                  <small>Patient testimonial</small>
                </div>
              </div>
            </div>

            <div className="result">
              <small className="tag">Weight journey</small>
              <div className="bar-row">
                <span>Feb 2026</span>
                <div className="track"><i style={{ ["--w" as string]: "100%" } as React.CSSProperties} /></div>
                <b>68.5 kg</b>
              </div>
              <div className="bar-row after">
                <span>Jun 2026</span>
                <div className="track"><i style={{ ["--w" as string]: "85%" } as React.CSSProperties} /></div>
                <b>~58 kg</b>
              </div>
              <div className="result-chips">
                <span>10+ kg down</span>
                <span>Less stressed</span>
                <span>Sustainable</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}