interface ComponentProps {
  title: string;
  children: any;
}

const ContextMenu = ({ title, children }: ComponentProps): JSX.Element => {
  return (
    <div className="flex flex-column h-screen">
      <div className="flex align-items-end h-4rem px-5 mb-5">
        <div className="text-3xl font-bold text-primary uppercase">{title}</div>
      </div>

      <div className="flex flex-column flex-1 overflow-y-auto px-5 pt-1">
        {children}
      </div>
    </div>
  );
};

export default ContextMenu;
