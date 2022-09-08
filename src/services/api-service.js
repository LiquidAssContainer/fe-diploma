/**cities
 * @title Netology TrainBooking API
 * @version 0.0.1
 * @baseUrl https://netology-trainbooking.herokuapp.com
 */
export class Api extends HttpClient {
  routes = {
    /**
     * @description  Поиск городов среди возможных направлений (для подсказок в процессе ввода города на главном экране). Выдаёт первые 10 результатов.
     *
     * @tags Города
     * @name CitiesList
     * @request GET:/routes/cities
     */
    citiesList: (query, params = {}) =>
      fetch({
        path: `/routes/cities`,
        method: "GET",
        query: query,
        ...params,
      }),
    /**
     * @description Поиск направлений
     *
     * @tags Направления
     * @name RoutesList
     * @request GET:/routes
     */
    routesList: (query, params = {}) =>
      fetch({
        path: `/routes`,
        method: "GET",
        query: query,
        ...params,
      }),
    /**
     * @description Возвращает последние 5 направлений
     *
     * @tags Направления
     * @name LastList
     * @request GET:/routes/last
     */
    lastList: (params = {}) =>
      fetch({
        path: `/routes/last`,
        method: "GET",
        ...params,
      }),
    /**
     * @description  Информация о посадочных местах определённого направления. Параметры поиска позволят отфильтровать только нужные вагоны в составе
     *
     * @tags Направления
     * @name SeatsDetail
     * @request GET:/routes/{id}/seats
     */
    seatsDetail: (id, query, params = {}) =>
      fetch({
        path: `/routes/${id}/seats`,
        method: "GET",
        query: query,
        ...params,
      }),
  };
  order = {
    /**
     * @description Оформление заказа выбранного направления
     *
     * @tags Оформление заказа
     * @name OrderCreate
     * @request POST:/order
     */
    orderCreate: (data, params = {}) =>
      fetch({
        path: `/order`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  subscribe = {
    /**
     * @description Подписка на почтовые уведомления
     *
     * @tags Подписка
     * @name SubscribeCreate
     * @request POST:/subscribe
     */
    subscribeCreate: (query, params = {}) =>
      fetch({
        path: `/subscribe`,
        method: "POST",
        query: query,
        ...params,
      }),
  };
}
