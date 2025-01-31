document.addEventListener('astro:page-load', () => {
  const classNameMenu =
    'absolute z-50 md:translate-x-0 right-0 shadow-left bg-neutro pr-2 mt-[66px] md:mt-0 h-[100vh] md:h-fit space-y-5 md:space-y-0 transition-transform md:relative flex flex-col md:flex-row md:items-center items-end';
  const id = Math.random().toString(36).substring(7);
  const buttonAction = () => {
    const menu = document.getElementById('menu');
    if (menu) {
      const hide = menu.getAttribute('aria-checked') === 'false';

      menu.className = `${classNameMenu} ${
        hide ? 'translate-x-0' : 'translate-x-36'
      }`;
      menu.setAttribute('aria-checked', hide.toString());
    }
  };

  const button = document.querySelector('[data-burger-menu]');
  if (!button) {
    console.error('Button not found');
    return;
  }
  button.addEventListener('click', buttonAction);

  const options = document.querySelectorAll('[data-menu-option]');
  options.forEach((option) => {
    option.addEventListener('click', buttonAction);
  });

  document.addEventListener('astro:after-swap', () => {
    button.removeEventListener('click', buttonAction);

    options.forEach((option) => {
      option.removeEventListener('click', buttonAction);
    });
  });
});
