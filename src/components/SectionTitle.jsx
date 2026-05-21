import { Fragment } from 'react';

export default function SectionTitle({ icon: Icon, title, subtitle, right }) {
  return (
    <div className="w-full flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        {Icon ? <Icon className="w-5 h-5 text-indigo-400 flex-shrink-0" /> : null}
        <div className="flex flex-col">
          <h3 className="text-lg font-black text-slate-100 leading-tight">{title}</h3>
          {subtitle ? (
            <p className="text-xs font-semibold text-slate-500 mt-0.5">{subtitle}</p>
          ) : null}
        </div>
      </div>
      {right ? <div className="flex items-center">{right}</div> : <Fragment />}
    </div>
  );
}

