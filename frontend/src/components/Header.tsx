export const Header = () => (
  <header className="header">
    <div className="container header__inner">
      <a className="logo" href="#top">
        Lending-presentation
      </a>
      <nav className="nav" aria-label="Навигация">
        <ul className="nav__list">
          <li>
            <a href="#about">Обо мне</a>
          </li>
          <li>
            <a href="#workflow">Как работаю</a>
          </li>
          <li>
            <a href="#cases">Кейсы</a>
          </li>
          <li>
            <a href="#contact">Контакты</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);
