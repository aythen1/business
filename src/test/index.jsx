import React, { useState, useEffect } from 'react';

const NFCReaderWriter = () => {
  const [nfcData, setNfcData] = useState(null);

  useEffect(() => {
    const handleNFCReading = async (event) => {
      try {
        const message = event.message;

        // Procesar datos de la etiqueta NFC
        const records = message.records.map((record) => {
          return {
            recordType: record.recordType,
            data: record.data ? record.data.text() : null,
          };
        });

        setNfcData(records);
      } catch (error) {
        console.error('Error al leer datos NFC:', error);
      }
    };

    if ('NDEFReader' in window) {
      const nfcReader = new NDEFReader();

      nfcReader.addEventListener('reading', handleNFCReading);

      nfcReader
        .scan()
        .then(() => {
          console.log('Esperando la lectura de una etiqueta NFC...');
        })
        .catch((error) => {
          console.error('Error al iniciar la lectura NFC:', error);
        });

      return () => {
        nfcReader.removeEventListener('reading', handleNFCReading);
      };
    } else {
      console.error('La API Web NFC no está soportada en este navegador.');
    }
  }, []);

  const handleNFCWrite = async () => {
    try {
      const writer = new NDEFWriter();
      const message = new NDEFMessage([
        new NDEFRecord('text/plain', new TextEncoder().encode('Datos para escribir')),
      ]);

      await writer.write(message);

      console.log('Datos escritos en la etiqueta NFC.');
    } catch (error) {
      console.error('Error al escribir datos NFC:', error);
    }
  };

  return (
    <div>
      <h2>Lectura y Escritura NFC</h2>

      <div>
        <h3>Datos NFC Leídos:</h3>
        {nfcData ? (
          <pre>{JSON.stringify(nfcData, null, 2)}</pre>
        ) : (
          <p>Esperando la lectura de una etiqueta NFC...</p>
        )}
      </div>

      <button onClick={handleNFCWrite}>Escribir en la Etiqueta NFC</button>
    </div>
  );
};

export default NFCReaderWriter;
