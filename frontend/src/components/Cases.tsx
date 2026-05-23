const CaseCard = () => (
  <article className="card">
    <h3></h3>
    <div className="placeholder"></div>
  </article>
);

export const Cases = () => (
  <section className="section" id="cases" aria-labelledby="cases-title">
    <div className="container">
      <h2 className="section__title" id="cases-title">
        Кейсы
      </h2>
      <div className="grid grid--3">
        <CaseCard />
        <CaseCard />
        <CaseCard />
      </div>
    </div>
  </section>
);
