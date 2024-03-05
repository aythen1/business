document.getElementById('readButton').addEventListener('click', async function() {
    try {
      const port = await navigator.serial.requestPort();
  
      await port.open({ baudRate: 9600, bufferSize: 255 });
  
      const reader = port.readable.getReader();
  
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
  
        // Procesar datos leídos aquí (value es un Uint8Array)
        console.log('Datos leídos desde USB:', value);
      }
    } catch (error) {
      console.error('Error al leer desde USB:', error);
    }
  });