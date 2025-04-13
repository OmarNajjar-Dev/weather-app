import "../index.css";

export default function Search() {
  return (
    <header className="fixed w-full bg-[#7c9ed5]">
      <div className="container md:max-width-4xl mx-auto flex gap-8 py-3">
      <input type="text" id="search" placeholder="Type in a city name" className="outline-none focus:border-b border-solid border-[#5d7ac1] text-white" />
      <button className="bg-[#5d7ac1] text-blue-900 p-3">FIND WEATHER</button>
      </div>
    </header>
  );
}
