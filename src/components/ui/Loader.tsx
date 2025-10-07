export const Loader = () => {
  return (
    <div className="flex space-x-2 ">
      {Array(3)
        .fill(null)
        .map((_, i) => (
          <div
            key={i}
            className="w-4 h-4 bg-blue-800 rounded-full animate-dim-pulse "
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: "1s",
            }}
          />
        ))}
    </div>
  );
};
