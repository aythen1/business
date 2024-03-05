chrome.runtime.onInstalled.addListener(function() {
    console.log('Extensión instalada o actualizada');
    iniciarLecturaNFC();
  });
  
  function iniciarLecturaNFC() {
    if ('NDEFReader' in window) {
      const nfcReader = new NDEFReader();
  
      nfcReader.addEventListener('reading', handleNFCReading);
  
      nfcReader
        .scan()
        .then(() => {
          console.log('Esperando la lectura de una tarjeta NFC...');
        })
        .catch((error) => {
          console.error('Error al iniciar la lectura NFC:', error);
        });
    } else {
      console.error('La API Web NFC no está soportada en este navegador.');
    }
  }
  
  function handleNFCReading(event) {
    try {
      const message = event.message;
      // Puedes procesar el mensaje de la tarjeta NFC aquí
  
      // Mostrar un alert cuando se detecta una tarjeta NFC
      alert('¡Tarjeta NFC detectada!');
    } catch (error) {
      console.error('Error al leer datos NFC:', error);
    }
  }