const Filter = (props) => {
  const { filter, setFilter } = props;
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          filter show with:{' '}
          <input value={filter} onChange={(e) => setFilter(e.target.value)} />
        </div>
      </form>
    </>
  );
};

export default Filter;
