import { useState } from 'react';
import { Each } from '../common/each/each';
import clsx from 'clsx';
import works from '@/data/works.json';

export default () => {
  const [tab, setTab] = useState(0);

  const setClassName = (index: number) =>
    clsx({
      'px-8 py-3 text-slate tracking-widest text-sm text-left border-l-2 border-neutro-dark font-thin':
        true,
      'hover:bg-navy-light': index !== tab,
      '!text-neon-green ease-in duration-150 !border-neon-green': index === tab,
    });

  return (
    <div className="flex mt-10 space-x-2">
      <div className="flex flex-col">
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
      <div className="min-w-[500px] min-h-[400px] space-y-4">
        <div className="space-y">
          <h3 className="text-xl font-bold text-white-light tracking-wider">
            {works[tab].position}
          </h3>
          <p className="text-white-dark tracking-widest text-sm">
            {works[tab].dates}
          </p>
        </div>
        <div className="w-4/5 space-x-1">
          <Each
            of={works[tab].items}
            render={(item) => (
              <li className="flex font-thin items-center justify-start text-white-dark before:text-neon-green before:content-['▹'] before:text-[8px] before:m-3">
                {item}
              </li>
            )}
          />
        </div>
      </div>
    </div>
  );
};
