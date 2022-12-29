export default function Divider({ text }: { text: any }) {
  return (
    <div className="relative my-5">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-500 " />
      </div>
      <div className="relative flex justify-center drop-shadow-[0_0_1px_rgba(0,0,0,0.30)]">
        <span className="select-none px-3 bg-gray-900 text-white dark:bg-white rounded-md text-lg font-medium dark:text-gray-900">
          {text}
        </span>
      </div>
    </div>
  );
}
