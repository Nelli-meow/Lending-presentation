export const About = () => (
    <section className="section" id="about" aria-labelledby="about-title">
        <div className="container">
            <h2 className="section__title" id="about-title">
                Обо мне
            </h2>

            <div className="grid grid--3">
                <article className="card">
                    <h3>Стек</h3>

                    <p>
                        React, TypeScript, JavaScript, HTML, CSS, Node.js, Nest.js,
                        PostgreSQL, MongoDB, REST API, Git, shadcn/ui, Recharts.
                    </p>
                </article>

                <article className="card">
                    <h3>Опыт</h3>

                    <p>
                        Frontend-разработчик в Quadrant. Работала с production-приложениями на React + TypeScript,
                        разрабатывала UI-компоненты, интеграции с API и интерактивные
                        интерфейсы.
                    </p>
                </article>

                <article className="card">
                    <h3>Направления</h3>

                    <p>
                        Frontend-разработка, UI/UX интерфейсы, REST API интеграции,
                        дашборды и AI-инструменты для ускорения разработки и автоматизации
                        задач.
                    </p>
                </article>
            </div>
        </div>
    </section>
);