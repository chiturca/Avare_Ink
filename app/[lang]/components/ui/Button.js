export default function Button({ name, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-7 py-2.5 bg-sky-200 text-sky-900 font-medium text-xl text-shadow-[0 0 50px #bae6fd] 
             rounded-full shadow-md ease-in duration-300 hover:bg-sky-900 hover:text-sky-200 hover:shadow-lg hover:scale-110"
    >
      {name}
    </button>
  );
}
