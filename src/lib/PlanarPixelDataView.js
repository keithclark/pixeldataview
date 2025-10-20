import { assertBetween, assertInstance, assertOneOf, assertType } from "./assert.js";

const INTERLEAVE_FORMAT_WORD = 'word';

const INTERLEAVE_FORMAT_LINE = 'line';

const INTERLEAVE_FORMAT_CONTIGUOUS = 'contiguous';


/**
 * `PlanarPixelDataView` exposes a low-level interface for reading and writing 
 * individual pixel values in planar-encoded image data, stored in an 
 * `ArrayBuffer`. Three planar encoding formats are supported: line-interleaved,
 * word-interleaved and contiguous.
 */
export default class PlanarPixelDataView {

  /** @type {Uint8Array} */
  #view;
 
  /** @type {number} */
  #width;

  /** @type {number} */
  #height;

  /** @type {number} */
  #planes;

  /** @type {(x: number, y: number) => number} */
  #coordinatesToOffset;

  /** @type {number} */
  #planeStep;

  /** @type {number} */
  #maxColors;

  /**
   * Creates a new `PlanarPixelDataView` instance.
   *  
   * @param {ArrayBuffer|SharedArrayBuffer} buffer An existing buffer containing the image data
   * @param {number} width The width of the image data, in pixels
   * @param {number} height The height of the image data, in pixels
   * @param {number} planes The number of bitplanes in the image data
   * @param {'contiguous'|'line'|'word'} interleave The bitplane interleave format the data is stored in
   * @param {number} [byteOffset] An optional offset, in bytes, to the first byte in the buffer containing the image data.
   */
  constructor(buffer, width, height, planes, interleave=INTERLEAVE_FORMAT_WORD, byteOffset=0) {
    assertBetween(arguments.length, 4, 6, 'argument count');
    if ('SharedArrayBuffer' in globalThis) {
      assertInstance(buffer, [ArrayBuffer, SharedArrayBuffer]);
    } else {
      assertInstance(buffer, [ArrayBuffer]);
    }
    assertType(width, ['number'], 'width');
    assertType(height, ['number'], 'height');
    assertType(planes, ['number'], 'plane count');
    assertOneOf(interleave, [
      INTERLEAVE_FORMAT_CONTIGUOUS,
      INTERLEAVE_FORMAT_LINE,
      INTERLEAVE_FORMAT_WORD
    ], 'interleave format');

    let bytesPerLine;

    if (interleave === INTERLEAVE_FORMAT_WORD) {
      bytesPerLine = Math.ceil(width / 16) * 2;
      this.#planeStep = 2;
      this.#coordinatesToOffset = (x, y) => y * bytesPerLine * planes + planes * 2 * (x >> 4) + (x % 16 < 8 ? 0 : 1);
    } else if (interleave === INTERLEAVE_FORMAT_LINE) {
      bytesPerLine = Math.ceil(width / 8);
      this.#planeStep = bytesPerLine;
      this.#coordinatesToOffset = (x, y) => y * bytesPerLine * planes + (x >> 3);
    } else if (interleave === INTERLEAVE_FORMAT_CONTIGUOUS) {
      bytesPerLine = Math.ceil(width / 8);
      this.#planeStep = bytesPerLine * height;
      this.#coordinatesToOffset = (x, y) => y * bytesPerLine + (x >> 3);
    }
    this.#view = new Uint8Array(buffer, byteOffset, bytesPerLine * height * planes);
    this.#width = width;
    this.#height = height;
    this.#planes = planes;
    this.#maxColors = 1 << planes;
  }


  /**
   * Returns the color index of a pixel at the given coordinates
   * 
   * @param {number} x Horizontal position (x coordinate) of the pixel to check
   * @param {number} y Vertical position (y coordinate) of the pixel to check
   * @returns {number} the index of the pixel color
   * @throws {RangeError} if `x` or `y` are outside the image bounds
   */
  getColor(x, y) {
    assertBetween(x, 0, this.#width, 'x');
    assertBetween(y, 0, this.#height, 'y');
    const bitOffset = 0x7 - (x & 0x7);
    const mask = 1 << bitOffset;
    let offset = this.#coordinatesToOffset(x, y);

    let color = 0;
    for (let plane = 0; plane < this.#planes; plane++) {
      color |= this.#view[offset] & mask ? 1 << plane : 0;
      offset += this.#planeStep;
    }
    return color;
  }


  /**
   * Set the color index of a pixel at the given coordinates
   * 
   * @param {number} x Horizontal position (x coordinate) of the pixel to set
   * @param {number} y Vertical position (y coordinate) of the pixel to set
   * @param {number} color Index of the new color
   * @throws {RangeError} if `x` or `y` are outside the image bounds, or if `color` isn't suitable for the number of planes
   */
  setColor(x, y, color) {
    assertBetween(x, 0, this.#width, 'x');
    assertBetween(y, 0, this.#height, 'y');
    assertBetween(color, 0, this.#maxColors - 1, 'color');

    const bitOffset = 0x7 - (x & 0x7);
    const mask = 1 << bitOffset;
    let offset = this.#coordinatesToOffset(x, y);

    for (let c = 0; c < this.#planes; c++) {
      if (color & 1) {
        this.#view[offset] |= mask;
      } else {
        this.#view[offset] &= ~mask;
      }
      offset += this.#planeStep;
      color >>= 1;
    }
  }
}


