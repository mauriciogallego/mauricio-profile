const classNameMenu =
  'absolute z-50 right-0 shadow-left bg-neutro pr-2 mt-[66px] md:mt-0 h-[100vh] md:h-fit space-y-5 md:space-y-0 transition-transform md:relative flex flex-col md:flex-row md:items-center items-end';

const buttonAction = () => {
  const menu = document.getElementById('menu');
  if (menu) {
    const hide = menu?.getAttribute('aria-checked') === 'false';

    menu.className = `${classNameMenu} ${
      hide ? 'translate-x-0' : 'translate-x-36'
    }`;

    menu?.setAttribute('aria-checked', hide.toString());
  }
};
const buttons = document.querySelectorAll('[data-burger-menu]');

buttons.forEach((button) => {
  button.addEventListener('click', buttonAction);
});

const options = document.querySelectorAll('[data-menu-option]');

options.forEach((option) => {
  option.addEventListener('click', buttonAction);
});
