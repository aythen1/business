const canvasSize = require("canvas-size");

/**
 * @typedef {Object} CanvasMaxSize
 * @property {number} maxWidth
 * @property {number} maxHeight
 * @property {number} maxArea
 */

/** @type {Promise<CanvasMaxSize> | null} */
let maxSizePromise = null;

/**
 * @returns {Promise<CanvasMaxSize>}
 */
function getBrowserCanvasMaxSize() {
  if (!maxSizePromise) {
    maxSizePromise = calculateBrowserCanvasMaxSize();
  }

  return maxSizePromise;
}

/**
 * @returns {Promise<CanvasMaxSize>}
 */
async function calculateBrowserCanvasMaxSize() {
  var e = await canvasSize.default
  console.log('jefnuerufuref', e)
  const maxWidth = e.maxWidth({ usePromise: true });
  const maxHeight = e.maxHeight({ usePromise: true });
  const maxArea = e.maxArea({ usePromise: true });

  return {
    maxWidth: maxWidth.width,
    maxHeight: maxHeight.height,
    maxArea: maxArea.width * maxArea.height,
  };
}

module.exports = { getBrowserCanvasMaxSize };