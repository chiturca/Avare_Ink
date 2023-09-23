const Card = ({ title, description }) => {
  return (
    <div
      className="cursor-default m-2 group rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex flex-col justify-center">
        <h2 className="mb-3 text-2xl font-semibold">
          {title}
        </h2>
        <div className="flex justify-center">
          <p className="m-0 max-w-[30ch] text-sm opacity-50 text-center">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
