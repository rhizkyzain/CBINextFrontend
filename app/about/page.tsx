export default function About() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <h1 className="text-4xl font-bold text-blue-600 mb-4 text-center">
          About This App
        </h1>
        <p className="text-gray-600 text-center mb-8">
         This app created for Test Purposes
        </p>

        {/* Content Sections */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Next JS Simple Website</h2>
          <p className="text-gray-700 leading-relaxed">
             This app is for CBI Takehome Test for Simple Next JS and Golang Crud Website
          </p>
        </section>
       
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Contact</h2>
          <p className="text-gray-700 leading-relaxed">
            You can reach me via email at <span className="text-blue-600 font-medium">rhizky.subiyantara@gmail.com</span>.
          </p>
        </section>
      </div>
    </main>
  );
}
