interface WidgetItemProps {
  children: React.ReactNode;
  title: string;
}

export const WidgetItem = ({ children, title }: WidgetItemProps) => {
  return (
    <div className="md:col-span-2 lg:col-span-1">
      <div className="h-full py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-col">
          <h5 className="text-xl text-gray-600 text-center">{title}</h5>

          <div className="flex flex-col items-center justify-center gap-4 mt-2">{children}</div>
        </div>
      </div>
    </div>
  );
};
