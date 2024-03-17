import ay from "./assets/icons/LAMBDA.svg";

import AI from "./assets/icons/AI";
import AVI from "./assets/icons/AVI";
import BMP from "./assets/icons/BMP";
import CRD from "./assets/icons/CRD";
import CSV from "./assets/icons/CSV";
import DLL from "./assets/icons/DLL";
import DOC from "./assets/icons/DOC";
import DOCX from "./assets/icons/DOCX";
import DWG from "./assets/icons/DWG";
import EPS from "./assets/icons/EPS";
import EXE from "./assets/icons/EXE";
import FLV from "./assets/icons/FLV";
import GIF from "./assets/icons/GIF";
import HTML from "./assets/icons/HTML";
import ISO from "./assets/icons/ISO";
import JAVS from "./assets/icons/JAVS";
import JPEG from "./assets/icons/JPEG";
import MDB from "./assets/icons/MDB";
import MID from "./assets/icons/MID";
import MOV from "./assets/icons/MOV";
import MP3 from "./assets/icons/MP3";
import MP4 from "./assets/icons/MP4";
import mp4 from "./assets/icons/MP4";
import MPEG from "./assets/icons/MPEG";
import PDF from "./assets/icons/PDF";
import PNG from "./assets/icons/PNG";
import PPT from "./assets/icons/PPT";
import PS from "./assets/icons/PS";
import PSD from "./assets/icons/PSD";
import PUB from "./assets/icons/PUB";
import RAR from "./assets/icons/RAR";
import RAW from "./assets/icons/RAW";
import RSS from "./assets/icons/RSS";
import SVG from "./assets/icons/SVG";
import TIFF from "./assets/icons/TIFF";
import TXT from "./assets/icons/TXT";
// import txt from "./assets/icons/TXT.svg";
import WAV from "./assets/icons/WAV";
import WMA from "./assets/icons/WMA";
import XML from "./assets/icons/XML";
import XSL from "./assets/icons/XSL";
import ZIP from "./assets/icons/ZIP";

export function convertToMegabytes(valueInKilobytes) {
  if (valueInKilobytes < 0.5) {
    return valueInKilobytes + " KB";
  } else {
    const valueInMegabytes = valueInKilobytes / 1024;
    return valueInMegabytes.toFixed(1) + " MB";
  }
}

export const calculateFolderSize = (directory, directoriesData) => {
  // Filtrar archivos y carpetas dentro del directorio actual
  directoriesData.forEach((item) => {});
  const itemsInDirectory = directoriesData.filter(
    (item) => item.Key.startsWith(directory) && item.Key !== directory
  );

  // Sumar tamaños de archivos y llamar recursivamente para carpetas
  return itemsInDirectory.reduce((totalSize, item) => {
    if (item.Size) {
      // Si es un archivo, sumar su tamaño
      return totalSize + item.Size;
    } else {
      // Si es una carpeta, llamar recursivamente
      return totalSize + calculateFolderSize(item.Key, directoriesData);
    }
  }, 0);
};

export const deleteItemsInDirectory = (
  directory,
  callback,
  directoriesData
) => {
  // Filtrar archivos y carpetas dentro del directorio actual
  const itemsInDirectory = directoriesData.filter(
    (item) => item.Key.startsWith(directory) && item.Key !== directory
  );

  // Eliminar archivos y carpetas y llamar recursivamente para carpetas
  itemsInDirectory.forEach((item) => {
    if (item.Size) {
      // Si es un archivo, eliminarlo
      callback(item.Key);
    } else {
      // Si es una carpeta, llamar recursivamente
      deleteItemsInDirectory(item.Key, callback, directoriesData);
    }
  });
};
export const iterateElementsToCopy = (
  directory,
  copyElement,
  directoriesData,
  newPath,
  createFolder,
  folderNameCopied
) => {
  // Filtrar archivos y carpetas dentro del directorio actual
  const itemsInDirectory = directoriesData.filter((item) =>
    item.Key.startsWith(directory)
  );

  // copiar archivos y carpetas y llamar recursivamente para carpetas
  itemsInDirectory.forEach((item) => {
    const relativePath = item.Key.substring(directory.length);

    let destinationKey = `${newPath}${folderNameCopied}/${relativePath}`;
    if (destinationKey.endsWith("/")) {
      destinationKey = destinationKey.slice(0, -1);
    }
    if (regexExtensiones.test(item.Key)) {
      // Si es un archivo, copiarlo
      copyElement(item.Key, destinationKey, item);
    } else {
      // Si es una carpeta, crear la nueva carpeta y llamar recursivamente
      createFolder(destinationKey);
    }
  });
};
export const iterateElementsToDuplicates = (
  directory,
  copyElement,
  directoriesData,
  newPath,
  createFolder,
  folderNameCopied
) => {
  // Filtrar archivos y carpetas dentro del directorio actual
  const itemsInDirectory = directoriesData.filter((item) =>
    item.Key.startsWith(directory)
  );

  // copiar archivos y carpetas y llamar recursivamente para carpetas
  itemsInDirectory.forEach((item) => {
    const relativePath = item.Key.substring(directory.length);

    let destinationKey = `${newPath}${folderNameCopied}/${relativePath}`;
    if (destinationKey.endsWith("/")) {
      destinationKey = destinationKey.slice(0, -1);
    }
    if (regexExtensiones.test(item.Key)) {
      // Si es un archivo, copiarlo
      console.log({ Key: item.Key, destinationKey, item });
      // copyElement(item.Key, destinationKey, item);
    } else {
      console.log({ destinationKey });
      // Si es una carpeta, crear la nueva carpeta y llamar recursivamente
      // createFolder(destinationKey);
    }
  });
};
export const iterateElementsToDuplicate = (
  directory,
  copyElement,
  directoriesData,
  newPath,
  createFolder,
  folderNameCopied
) => {
  const itemsInDirectory = directoriesData.filter((item) =>
    item.Key.startsWith(directory)
  );

  itemsInDirectory.forEach((item) => {
    const relativePath = item.Key.substring(directory.length);

    // Aquí aseguramos que solo agregamos "-copy" al nivel de la carpeta principal que estamos duplicando
    // y mantenemos la estructura de carpetas internas intacta para los subelementos.
    let destinationKey;
    if (directory === newPath) {
      // Solo para el nivel más alto
      destinationKey = `${newPath}`;
    } else {
      destinationKey = `${newPath}/${relativePath}`;
    }

    if (destinationKey.endsWith("/")) {
      destinationKey = destinationKey.slice(0, -1);
    }

    if (regexExtensiones.test(item.Key)) {
      // Si es un archivo, copiarlo
      copyElement(item.Key, destinationKey, item);
    } else {
      // Si es una carpeta, crear la nueva carpeta y llamar recursivamente
      createFolder(destinationKey);
    }
  });
};
export const iterateElementsToCut = (
  directory,
  moveFile,
  directoriesData,
  newPath,
  createFolder,
  folderNameCopied,
  handleDeleteDirectory
) => {
  // Filtrar archivos y carpetas dentro del directorio actual
  const itemsInDirectory = directoriesData.filter((item) =>
    item.Key.startsWith(directory)
  );
  console.log({ directory, itemsInDirectory });

  // copiar archivos y carpetas y llamar recursivamente para carpetas

  itemsInDirectory.forEach((item) => {
    const relativePath = item.Key.substring(directory.length);
    let destinationKey = `${newPath}${folderNameCopied}/${relativePath}`;
    console.log({ relativePath, destinationKey });
    if (destinationKey.endsWith("/")) {
      destinationKey = destinationKey.slice(0, -1);
    }
    const newItem = { ...item, Key: destinationKey };
    if (regexExtensiones.test(item.Key)) {
      // Si es un archivo, copiarlo
      moveFile(item.Key, destinationKey, newItem, item.VersionId);
    } else {
      // Si es una carpeta, crear la nueva carpeta y llamar recursivamente
      createFolder(destinationKey);
      handleDeleteDirectory(item.Key);
    }
  });
};

export function getFilesInDescendingOrder(directoriesData) {
  // Filtrar elementos que son archivos (Size !== 6)
  const files = directoriesData.filter((item) => item.Size !== 0);

  // Ordenar los archivos en orden cronológico descendente
  const filesInDescendingOrder = files.sort((a, b) => {
    const dateA = new Date(a.LastModified);
    const dateB = new Date(b.LastModified);
    return dateB - dateA;
  });
  return filesInDescendingOrder;
}
export function getCurrentDateFormatted() {
  // Obtener la fecha y hora actuales
  const now = new Date();

  // Formatear según lo requiere formatLastModified
  // En este caso, simplemente devolvemos el valor de la fecha actual en milisegundos desde la época Unix
  // ya que formatLastModified espera un timestamp o una cadena que pueda ser convertida a fecha
  return now.getTime();
}

export function formatLastModified(lastModified) {
  const now = new Date();
  const modifiedDate = new Date(lastModified);
  const diffMinutes = Math.floor((now - modifiedDate) / (1000 * 60));
  const diffDays = Math.floor(diffMinutes / (60 * 24));

  if (diffMinutes < 1) return "less than a minute";
  if (diffMinutes < 5) return "5min";
  if (diffMinutes < 15) return "15min";
  if (diffMinutes < 30) return "30min";
  if (diffMinutes < 60) return "1h";
  if (diffDays < 1 && now.getDate() === modifiedDate.getDate()) return "today";
  if (diffDays === 1) return "1 day";
  if (diffDays === 2) return "2 days";
  if (diffDays === 3) return "3 days";
  if (diffDays === 4) return "4 days";
  if (diffDays > 4 && diffDays < 8) return "last week";
  if (diffDays >= 8 && diffDays < 15) return "2 weeks";
  if (diffDays >= 15 && diffDays < 23) return "3 weeks";
  if (diffDays >= 23 && diffDays < 32) return "1 month";
  if (diffDays >= 32 && diffDays < 60) return "2 month";
  if (diffDays >= 60 && diffDays < 90) return "3 month";

  return modifiedDate.toLocaleDateString(); // esto va a devolver la fecha en formato local
}

export const icons = {
  json: ay,
  ay,
  ai: <AI />,
  avi: <AVI />,
  bmp: <BMP />,
  crd: <CRD />,
  csv: <CSV />,
  dll: <DLL />,
  doc: <DOC />,
  docx: <DOCX />,
  dwg: <DWG />,
  eps: <EPS />,
  exe: <EXE />,
  flv: <FLV />,
  gif: <GIF />,
  html: <HTML />,
  iso: <ISO />,
  javs: <JAVS />,
  jpeg: <JPEG />,
  jpg: <JPEG />,
  mdb: <MDB />,
  mid: <MID />,
  mov: <MOV />,
  mp3: <MP3 />,
  mp4: <MP4 />,
  mpeg: <MPEG />,
  pdf: <PDF />,
  png: <PNG />,
  ppt: <PPT />,
  ps: <PS />,
  psd: <PSD />,
  pub: <PUB />,
  rar: <RAR />,
  raw: <RAW />,
  rss: <RSS />,
  svg: <SVG />,
  tiff: <TIFF />,
  txt: <TXT />,
  wav: <WAV />,
  wma: <WMA />,
  xml: <XML />,
  xsl: <XSL />,
  zip: <ZIP />,
};

const extensions = Object.keys(icons);
export const regexExtensiones = new RegExp(`\.(${extensions.join("|")})$`, "i");

export const categoryTitles = {
  document: "Documentos",
  glaciar: "Glaciar",
  recent: "Recientes",
  trash: "Papelera",
  featured: "Destacados",
  addon: "Addons",
  dashboard: "Dashboard",
  priority: "Prioritarios",
  shared: "Compartidos",
};
