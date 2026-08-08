export default function SearchBar({ handleSubmit, inputValue, setInputValue }) {
  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-input"
        placeholder="Search books..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className="search-button" type="submit">
        Search
      </button>
    </form>
  );
}
