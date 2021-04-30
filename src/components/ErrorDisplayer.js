export default ({ error, message }) => {
  return (
    <>
      <span className="d-block mt-2 small text-danger">
        {"\u00A0"}
        {error && message}
      </span>
    </>
  );
};
