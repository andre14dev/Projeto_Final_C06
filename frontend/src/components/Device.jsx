import { useState } from "react";
import axios from "axios";

function Device() {
  const [inputSerial, setInputSerial] = useState("");
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [error, setError] = useState("");

  const handleDevice = async (e) => {
    e.preventDefault();
    setError("");
    setDeviceInfo(null);

    try {
      const response = await axios.get("http://localhost:3001/device", {
        params: {
          serialNumber: inputSerial,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      setDeviceInfo(response.data);
      setError("APROVADO");
    } catch (error) {
      const data = error.response?.data;

      if (typeof data === "string") {
        setError(data);
        setDeviceInfo(null);
      } else if (typeof data === "object") {
        setDeviceInfo(data);
        setError("REPROVADO");
      } else {
        setError("Erro desconhecido");
        setDeviceInfo(null);
      }
    }
    e.target.reset();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Insira o número de série
      </h1>
      <form onSubmit={(e) => handleDevice(e)} className="space-y-4">
        <input
          type="text"
          name="serialNumber"
          placeholder="Número de Série"
          onChange={(e) => setInputSerial(e.target.value)}
          required
          autoFocus
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Buscar
        </button>
      </form>
      {error != "APROVADO" && (
        <p className="text-red-500 text-md font-semibold mt-4 text-center">
          {error}
        </p>
      )}
      {error === "APROVADO" && (
        <p className="text-green-500 text-md font-semibold mt-4 text-center">
          {error}
        </p>
      )}
      {deviceInfo && (
        <div
          className={`mt-6 p-4 bg-gray-100 border border-gray-200 rounded-lg"${
            error === "APROVADO"
              ? "mt-6 p-4 bg-green-200 border border-gray-200 rounded-lg"
              : "mt-6 p-4 bg-red-100 border border-gray-200 rounded-lg"
          }`}
        >
          <p className="mb-2">
            <strong className="text-gray-600">Serial:</strong>{" "}
            {!deviceInfo.serialNumber ? (
              <span className="text-red-500">{"Serial não encontrado"}</span>
            ) : (
              deviceInfo.serialNumber
            )}
          </p>
          <p className="mb-2">
            <strong className="text-gray-600">ICCID:</strong>{" "}
            {deviceInfo.iccid === "ICCID não encontrado" ? (
              <span className="text-red-500">{deviceInfo.iccid}</span>
            ) : (
              deviceInfo.iccid
            )}
          </p>
          <p className="mb-2">
            <strong className="text-gray-600">Última atualização:</strong>{" "}
            {deviceInfo.lastMessageTimestamp === " Sem última atualização" ? (
              <span className="text-red-500">
                {deviceInfo.lastMessageTimestamp}
              </span>
            ) : (
              deviceInfo.lastMessageTimestamp
            )}
          </p>
        </div>
      )}
    </div>
  );
}

export default Device;
