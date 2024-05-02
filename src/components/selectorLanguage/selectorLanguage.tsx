import Dropdown from '../common/dropdown/dropdown';

export default function SelectorLanguage({ value }: { value: string }) {
  return (
    <Dropdown
      onclick={(language: string) => {
        const path = window.location.pathname.replaceAll('/en', '');
        const base = window.location.origin;
        window.location.replace(`${base}${language}${path}`);
      }}
      value={value}
      options={[
        { label: 'en', value: '/en' },
        { label: 'es', value: '' },
      ]}
    />
  );
}
