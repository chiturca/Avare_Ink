const Card = ({ title, description, onClick, className }) => {
  return (
    <div
      className="cursor-pointer group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
    >
      <div className={className}>
        <div className="flex flex-col justify-center">
          <h2>{title}</h2>
          <div className="flex justify-center">
            <p className="m-0 max-w-[30ch] text-sm opacity-50 text-center">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
