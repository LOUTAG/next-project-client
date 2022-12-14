const Spinner = () => {
    return (
      <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 h-20 w-20 rounded-full z-10">
        <div className="h-20 w-20 border-8 border-transparent border-b-slate-500 border-l-slate-500 rounded-full animate-spin">
        </div>
      </div>
    );
  };
  export default Spinner;
  