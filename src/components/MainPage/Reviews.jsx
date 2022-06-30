const zahlushka = [
  {
    title: 'Екатерина Вальнова',
    content:
      'Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.',
    img: require('assets/person1.jpg'),
  },
  {
    title: 'Евгений Стрыкало',
    content:
      'СМС-сопровождение до посадки Сразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке.',
    img: require('assets/person2.jpg'),
  },
];

export const Reviews = () => {
  return (
    <section className="reviews" id="reviews">
      <h3 className="header_size_m">Отзывы</h3>
      <ul className="reviews__list">
        {zahlushka.map((review) => (
          <ReviewItem {...review} />
        ))}
      </ul>
      <div className="reviews__carousel">КАРУСЕЛЬ</div>
    </section>
  );
};

const ReviewItem = ({ title, content, img }) => {
  return (
    <li className="reviews__item">
      <div className="review__image_wrapper">
        <img className="review__image" src={img} />
      </div>
      <div className="review__content">
        <h5 className="review__header header_size_xs">{title}</h5>
        <div className="review__text">{content}</div>
      </div>
    </li>
  );
};
