import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation

const PayFine = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [finePaid, setFinePaid] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchFineHistory = async () => {
      try {
        const response = await fetch("http://localhost:3030/transactions/fine/history", {
          method: "GET",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (!response.ok) throw new Error("Failed to fetch fine history");

        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching fine history:", error);
      }
    };

    fetchFineHistory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (selectedTransaction?.fine > 0 && !finePaid) {
      setErrorMessage("You must mark the fine as paid before proceeding.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3030/transactions/fine/pay/${selectedTransaction._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ finePaid, remarks }),
      });

      if (!response.ok) throw new Error("Failed to process fine payment");

      alert("✅ Fine payment successful!");
      window.location.reload();
    } catch (error) {
      console.error("Error processing fine payment:", error);
      alert("❌ Failed to process fine payment.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-300 to-blue-500 p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:text-blue-800 font-semibold mb-4 flex items-center"
        >
          🔙 Back
        </button>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">💰 Pay Fine</h2>

        {errorMessage && <p className="text-red-600 text-center mb-4">{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          {/* Select Transaction */}
          <div className="mb-4">
            <label className="block font-medium">📚 Select Transaction</label>
            <select
              onChange={(e) => setSelectedTransaction(transactions.find((t) => t._id === e.target.value))}
              className="p-3 border rounded-lg w-full focus:ring focus:ring-purple-300"
              required
            >
              <option value="">-- Select a Book --</option>
              {transactions.map((transaction) => (
                <option key={transaction._id} value={transaction._id}>
                  {transaction.bookTitle} - {transaction.author} (Fine: ₹{transaction.fine})
                </option>
              ))}
            </select>
          </div>

          {/* Display Selected Transaction Details */}
          {selectedTransaction && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium">📖 Book Name</label>
                  <input
                    type="text"
                    value={selectedTransaction.bookTitle}
                    disabled
                    className="p-2 border rounded w-full bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block font-medium">✍️ Author</label>
                  <input
                    type="text"
                    value={selectedTransaction.author}
                    disabled
                    className="p-2 border rounded w-full bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block font-medium">🔢 Serial No</label>
                  <input
                    type="text"
                    value={selectedTransaction.serialNo}
                    disabled
                    className="p-2 border rounded w-full bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block font-medium">📅 Issue Date</label>
                  <input
                    type="text"
                    value={new Date(selectedTransaction.issueDate).toDateString()}
                    disabled
                    className="p-2 border rounded w-full bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block font-medium">📅 Return Date</label>
                  <input
                    type="text"
                    value={new Date(selectedTransaction.returnDate).toDateString()}
                    disabled
                    className="p-2 border rounded w-full bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block font-medium">📅 Actual Return Date</label>
                  <input
                    type="text"
                    value={selectedTransaction.actualReturnDate ? new Date(selectedTransaction.actualReturnDate).toDateString() : "❌ Not Returned"}
                    disabled
                    className="p-2 border rounded w-full bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block font-medium">💵 Fine Amount</label>
                  <input
                    type="text"
                    value={`₹${selectedTransaction.fine}`}
                    disabled
                    className="p-2 border rounded w-full bg-gray-100"
                  />
                </div>
              </div>

              {/* Fine Payment Checkbox */}
              <div className="mt-4 flex items-center">
                <input
                  type="checkbox"
                  checked={finePaid}
                  onChange={() => setFinePaid(!finePaid)}
                  disabled={selectedTransaction.fine === 0}
                  className="w-5 h-5 text-blue-600"
                />
                <label className="ml-2 font-medium">
                  {selectedTransaction.fine === 0 ? "✅ No fine required" : "💰 Mark as paid"}
                </label>
              </div>

              {/* Remarks Section */}
              <div className="mt-4">
                <label className="block font-medium">📝 Remarks</label>
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="p-3 border rounded w-full focus:ring focus:ring-purple-300"
                  placeholder="Enter any remarks (optional)"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full py-2 mt-4 rounded-lg font-semibold transition-all duration-300 ${
                  selectedTransaction.fine > 0 && !finePaid
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
                disabled={selectedTransaction.fine > 0 && !finePaid}
              >
                ✅ Confirm Payment
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default PayFine;
