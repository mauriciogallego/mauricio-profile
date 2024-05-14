import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Each } from '../common/each/each';
import clsx from 'clsx';
import works from '@/data/works.json';

export default () => {
  const [tab, setTab] = useState(0);
  /* @ts-ignore */
  const { t } = useTranslation('translation');

  const setClassName = (index: number) =>
    clsx({
      'px-6 py-2 md:px-9 md:py-5 text-slate tracking-widest text-xs text-left border-b-2 md:border-l-2 md:border-b-0 border-neutro-dark font-thin':
        true,
      'hover:bg-navy-light': index !== tab,
      '!text-neon-green ease-in duration-150 !border-neon-green': index === tab,
    });

  return (
    <div className="flex flex-col md:flex-row mt-10 space-x-2 w-full md:w-11/12">
      <div className="flex md:flex-col">
        <Each
          of={works}
          render={(item, index) => (
            <button
              className={setClassName(index)}
              onClick={() => setTab(index)}
            >
              {item.name}
            </button>
          )}
        />
      </div>
      <div className="md:w-3/4 mt-6 md:mt-0 md:min-h-[400px] space-y-8">
        <div className="space-y">
          <h3 className="text-xl font-bold text-white-light tracking-wider">
            {works[tab].position}
          </h3>
          <p className="text-white-dark tracking-widest text-sm">
            {works[tab].dates}
          </p>
        </div>
        <div className="md:w-4/5 space-y-2">
          <Each
            of={works[tab].items}
            render={(item) => (
              <li className="flex font-thin items-center justify-start text-white-dark before:text-neon-green before:content-['▹'] before:text-[8px] before:m-3">
                {t(item)}
              </li>
            )}
          />
        </div>
      </div>
    </div>
  );
};
