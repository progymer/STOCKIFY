export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600" />
    </div>
  );
}
