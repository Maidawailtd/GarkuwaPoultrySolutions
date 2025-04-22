export default function Map() {
  return (
    <section className="h-96 bg-gray-200">
      <div className="h-full w-full">
        <div className="h-full w-full flex items-center justify-center bg-gray-300">
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#2D5E2E] mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-lg">Visit us at Km 15, Kaduna-Zaria Highway, Kaduna State, Nigeria</p>
            <p className="text-sm mt-2">
              Our farm is easily accessible from the main highway. Look for the "Garkuwa Farm" sign.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
