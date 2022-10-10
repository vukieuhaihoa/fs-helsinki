const Filter = (props) => {
  const { filter, setFilter } = props;
  return (
    <div>
      filter show with:{' '}
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
    </div>
  );
};

export default Filter;
