import { Features } from './Features';
import { useMenuLinks } from '../../hooks/useMenuLinks';
import { Reviews } from './Reviews';

export const MainPage = () => {
  const links = useMenuLinks();

  return (
    <>
      <section className="hero">
        <header>
          <div className="logo_container">
            <div className="logo">Лого</div>
          </div>
          <ul className="menu_link_list" links={links}>
            {links.map(({ label }) => {
              return <li className="menu_link_item">{label}</li>;
            })}
          </ul>
        </header>
        <div className="hero_content">
          <div className="hero_content_text">
            Вся жизнь — <span className="text_accent">путешествие!</span>
          </div>
          <div className="find_tickets_widget"></div>
        </div>
      </section>
      <section className="about">
        <h3 className="section_header about_header">О нас</h3>
        <div className="about_content">
          <p>
            Мы рады видеть вас! Мы рботаем для Вас с 2003 года. 14 лет мы
            наблюдаем, как с каждым днем все больше людей заказывают жд билеты
            через интернет.
          </p>

          <p>
            Сегодня можно заказать железнодорожные билеты онлайн всего в 2
            клика, но стоит ли это делать? Мы расскажем о преимуществах заказа
            через интернет.
          </p>

          <p className="text_accent">
            Покупать жд билеты дешево можно за 90 суток до отправления поезда.
            Благодаря динамическому ценообразованию цена на билеты в это время
            самая низкая.
          </p>
        </div>
      </section>
      <Features />
      <Reviews />
    </>
  );
};
