export const useMenuLinks = () => {
  // const history = useHistory()
  // const { pathname } = useLocation()

  const menuLinks = [
    {
      label: 'О нас',
      href: '/rent',
    },
    {
      label: 'Как это работает',
      href: '/sale',
    },
    {
      label: 'Отзывы',
      href: '/sale',
    },
    {
      label: 'Контакты',
      href: '/sale',
    },
  ];

  return menuLinks;
};
