const CaseCard = ({title, description,}: { title: string; description: string; }) => (
    <article className="card">
        <h3>{title}</h3>
        <p>{description}</p>
    </article>
);

export const Cases = () => (
    <section className="section" id="cases" aria-labelledby="cases-title">
        <div className="container">
            <h2 className="section__title" id="cases-title">
                Кейсы
            </h2>

            <div className="grid grid--3">
                <CaseCard
                    title="Quadrant - Production React-приложения"
                    description="Разработка и поддержка приложений на React + TypeScript, создание UI-компонентов на shadcn/ui, дашборды и графики на Recharts, работа с REST API и участие в code review."
                />

                <CaseCard
                    title="IT Attractor - учебный командный проект"
                    description="Разработка интернет-магазина зоотоваров с нуля. Работа с React, Node.js, NestJS, интеграция с REST API, базы данных PostgreSQL и MongoDB, командная разработка по ТЗ."
                />

                <CaseCard
                    title="Frontend практика и pet-проекты"
                    description="Учебные и личные проекты: UI-компоненты, формы, работа с API, адаптивная верстка и улучшение навыков работы с React и TypeScript."
                />
            </div>
        </div>
    </section>
);