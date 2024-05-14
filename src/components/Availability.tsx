export default function Availability(isAvailable: boolean) {
  return isAvailable ? (
    <div className="flex max-w-96 items-center">
      <span className="relative flex size-3">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-600/80 opacity-75"></span>
        <span className="relative inline-flex size-3 scale-90 rounded-full bg-green-500/80"></span>
      </span>
      <span className="ml-2 text-sm font-medium text-green-500/80">
        Available for new opportunities
      </span>
    </div>
  ) : (
    ""
  );
}
