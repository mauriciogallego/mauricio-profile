import Dropdown from '../common/dropdown/dropdown';

export default function SelectorLanguage({ value }: { value: 'es' | 'en' }) {
  return (
    <Dropdown
      onclick={(language: string) => {
        const path = window.location.pathname.replaceAll('/es', '');
        const base = window.location.origin;
        window.location.replace(`${base}${language}${path}`);
      }}
      value={value}
      options={[
        { label: 'EN', flag: '🇬🇧', value: '' },
        { label: 'ES', flag: '🇨🇴', value: '/es' },
      ]}
    />
  );
}
