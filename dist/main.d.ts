declare module "@keithclark/pixeldataview" {
  /**
   * `ChunkyPixelDataView` exposes a low-level interface for reading and
   * writing individual pixel values in chunky-encoded image data, stored in an
   * `ArrayBuffer`.
   */
  export class ChunkyPixelDataView {
    /**
     * Creates a new `ChunkyPixelDataView` instance.
     * @param buffer An existing buffer containing the image data
     * @param width The width of the image data in bytes
     * @param height The height of the image data in scanlines
     * @param byteOffset An optional offset, in bytes, to the first byte in the
     * buffer containing the image data.
     */
    constructor(buffer: ArrayBuffer|SharedArrayBuffer, width: number, height: number, byteOffset?: number=0);
    /**
     * Gets the color of a pixel at the given coordinates
     * @param x Horizontal position (x coordinate) of the pixel to check
     * @param y Vertical position (y coordinate) of the pixel to check
     */
    getColorAt(x: number, y: number): number;
    /**
     * Set the color of a pixel at the given coordinates
     * @param x Horizontal position (x coordinate) of the pixel to set
     * @param y Vertical position (y coordinate) of the pixel to set
     * @param color The new color for the pixel as a unsigned 32-bit integer
     */
    setColor(x: number, y: number, color: number): void;
  }
  
  /**
   * `PlanarPixelDataView` exposes a low-level interface for reading and
   * writing individual pixel values in planar-encoded image data, stored in an
   * `ArrayBuffer`. Three planar encoding formats are supported:
   * line-interleaved, word-interleaved and contiguous.
   */
  export class PlanarPixelDataView {
    /**
     * Creates a new `PlanarPixelDataView` instance.
     * @param buffer An existing buffer containing the image data
     * @param width The width of the image data, in pixels
     * @param height The height of the image data, in pixels
     * @param planes The number of bitplanes in the image data
     * @param interleave The bitplane interleave format the data is stored in
     * @param byteOffset An optional offset, in bytes, to the first byte in the
     * buffer containing the image data.
     */
    constructor(buffer: ArrayBuffer|SharedArrayBuffer, width: number, height: number, planes: number, interleave?: "contiguous"|"line"|"word", byteOffset?: number=0);
    /**
     * Returns the color index of a pixel at the given coordinates
     * @param x Horizontal position (x coordinate) of the pixel to check
     * @param y Vertical position (y coordinate) of the pixel to check
     */
    getColor(x: number, y: number): number;
    /**
     * Set the color index of a pixel at the given coordinates
     * @param x Horizontal position (x coordinate) of the pixel to set
     * @param y Vertical position (y coordinate) of the pixel to set
     * @param color Index of the new color
     */
    setColor(x: number, y: number, color: number): void;
  }
  
}
