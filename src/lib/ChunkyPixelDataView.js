import { assertBetween, assertInstance, assertType } from "./assert.js";

/**
 * `ChunkyPixelDataView` exposes a low-level interface for reading and writing 
 * individual pixel values in chunky-encoded image data, stored in an 
 * `ArrayBuffer`.
 * 
 * @example
 * import { ChunkyPixelDataView } from '@keithclark/pixeldataview';
 * 
 * const imageData = new ImageData(16, 16);
 * const pixelView = new ChunkyPixelDataView(imageData.data.buffer, 16, 16);
 * 
 * // Set pixel at 7, 7 to orange
 * pixelView.setColor(7, 7, 0xffcc00ff);
 * 
 * // Get the pixel color at 7, 7
 * let color = pixelView.getColor(7, 7);
 */
export default class ChunkyPixelDataView {

  /** @type {DataView} */
  #view;
 
  /** @type {number} */
  #width;

  /** @type {number} */
  #height;

  /**
   * Creates a new `ChunkyPixelDataView` instance.
   * 
   * @param {ArrayBuffer|SharedArrayBuffer} buffer An existing buffer containing the image data
   * @param {number} width The width of the image data in bytes
   * @param {number} height The height of the image data in scanlines
   * @param {number} [byteOffset] An optional offset, in bytes, to the first byte in the buffer containing the image data.
   */
  constructor(buffer, width, height, byteOffset=0) {
    assertBetween(arguments.length, 3, 4, 'argument count');
    if ('SharedArrayBuffer' in globalThis) {
      assertInstance(buffer, [ArrayBuffer, SharedArrayBuffer]);
    } else {
      assertInstance(buffer, [ArrayBuffer]);
    }
    assertType(width, ['number'], 'width');
    assertType(height, ['number'], 'height');
    this.#view = new DataView(buffer, byteOffset, width * height * 4);
    this.#width = width;
    this.#height = height;
  }


  /**
   * Gets the color of a pixel at the given coordinates
   * 
   * @param {number} x Horizontal position (x coordinate) of the pixel to check
   * @param {number} y Vertical position (y coordinate) of the pixel to check
   * @returns {number} The color of the pixel as a unsigned 32-bit integer
   * @throws {RangeError} if `x` or `y` are outside the image bounds
   */
  getColorAt(x, y) {
    assertBetween(x, 0, this.#width, 'x');
    assertBetween(y, 0, this.#height, 'y');
    return this.#view.getUint32((y * this.#width + x) << 2);
  }


  /**
   * Set the color of a pixel at the given coordinates
   * 
   * @param {number} x Horizontal position (x coordinate) of the pixel to set
   * @param {number} y Vertical position (y coordinate) of the pixel to set
   * @param {number} color The new color for the pixel as a unsigned 32-bit integer
   * @throws {RangeError} if `x` or `y` are outside the image bounds, or if `color` isn't suitable for the number of planes
   */
  setColor(x, y, color) {
    assertBetween(x, 0, this.#width, 'x');
    assertBetween(y, 0, this.#height, 'y');
    this.#view.setUint32((y * this.#width + x) << 2, color);
  }

}
