// @ts-ignore
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { flags } from '@/constants';

type Option = {
  flag?: string;
  label: string;
  value: string;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Dropdown({
  options,
  value,
  onclick,
}: {
  options: Option[];
  value: 'es' | 'en';
  onclick: any;
}) {
  const result = flags[value];
  return (
    <Menu as="div" className="relative inline-block text-right">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-2 py-1 text-2xl font-semibold tracking-widest text-white-light hover:text-neon-green ring-1 ring-inset ring-white hover:ring-neon-green">
          {result}
          <ChevronDownIcon className="-mr-1 h-5 w-5 mt-1" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 z-10 mt-2 w-16 origin-top-left rounded-md focus:outline-none">
          <div className="py-1">
            {options.map(({ label, value, flag }) => (
              <Menu.Item
                as="button"
                key={value}
                className="flex"
                onClick={() => onclick(value)}
              >
                {() => (
                  <div className="flex items-center hover:bg-neon-green rounded-md space-x-2 p-1 group">
                    <p className="cursor-pointer text-sm group-hover:text-neutro text-white">
                      {label}
                    </p>
                    <p className="cursor-pointer text-3xl">{flag}</p>
                  </div>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
