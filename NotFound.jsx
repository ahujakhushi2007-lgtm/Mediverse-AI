import Icon from "../components/Icon";

export default function NotFound({ nav }) {
  return (
    <section className="section wrap center" style={{ minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div className="eyebrow" style={{ margin: "0 auto 18px" }}>Error 404</div>
      <h1 style={{ fontSize: "clamp(32px,6vw,56px)", marginBottom: 14 }}>We couldn't find that page.</h1>
      <p className="muted" style={{ maxWidth: 480, margin: "0 auto 26px" }}>
        The page you're looking for may have moved. Let's get you back to somewhere useful.
      </p>
      <div className="flex gap-12" style={{ justifyContent: "center" }}>
        <button onClick={() => nav.navigate("landing")} className="btn btn-primary">
          Back to Home <Icon name="arrowRight" size={16} />
        </button>
        <button onClick={() => nav.navigate("specialists")} className="btn btn-outline">Find a Specialist</button>
      </div>
    </section>
  );
}
