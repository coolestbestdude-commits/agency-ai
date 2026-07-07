export default function Pricing() {
  return (
    <div className="min-h-screen bg-gray-100 py-16 px-6">
      <h1 className="text-4xl font-bold text-center mb-12">Pricing Plans</h1>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* BASIC */}
        <div className="bg-white shadow-lg rounded-xl p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Basic</h2>
          <p className="text-gray-600 mb-6">Perfect for individuals</p>
          <p className="text-4xl font-bold mb-6">$19</p>
          <ul className="text-gray-700 space-y-2 mb-6">
            <li>✔ 1 Appointment per day</li>
            <li>✔ Email support</li>
            <li>✔ Basic analytics</li>
          </ul>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Choose Basic
          </button>
        </div>

        {/* PRO */}
        <div className="bg-white shadow-lg rounded-xl p-8 text-center border-2 border-blue-600">
          <h2 className="text-2xl font-semibold mb-4">Pro</h2>
          <p className="text-gray-600 mb-6">Best for small businesses</p>
          <p className="text-4xl font-bold mb-6">$49</p>
          <ul className="text-gray-700 space-y-2 mb-6">
            <li>✔ Unlimited appointments</li>
            <li>✔ Priority support</li>
            <li>✔ Advanced analytics</li>
            <li>✔ Custom branding</li>
          </ul>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Choose Pro
          </button>
        </div>

        {/* ENTERPRISE */}
        <div className="bg-white shadow-lg rounded-xl p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Enterprise</h2>
          <p className="text-gray-600 mb-6">For large organizations</p>
          <p className="text-4xl font-bold mb-6">$199</p>
          <ul className="text-gray-700 space-y-2 mb-6">
            <li>✔ Unlimited everything</li>
            <li>✔ Dedicated account manager</li>
            <li>✔ Custom integrations</li>
            <li>✔ SLA uptime guarantee</li>
          </ul>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Choose Enterprise
          </button>
        </div>

      </div>
    </div>
  );
}
