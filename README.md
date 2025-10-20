# @keithclark/pixeldataview Documentation

## ChunkyPixelDataView Class

`ChunkyPixelDataView` exposes a low-level interface for reading and writing individual pixel values in chunky-encoded image data, stored in an `ArrayBuffer`. 

### Example

```js
import { ChunkyPixelDataView } from '@keithclark/pixeldataview';

const imageData = new ImageData(16, 16);
const pixelView = new ChunkyPixelDataView(imageData.data.buffer, 16, 16);

// Set pixel at 7, 7 to orange
pixelView.setColor(7, 7, 0xffcc00ff);

// Get the pixel color at 7, 7
let color = pixelView.getColor(7, 7);
```

### Constructor

#### `ChunkyPixelDataView()`

Creates a new `ChunkyPixelDataView` instance. 

##### Syntax

```js
instance = new ChunkyPixelDataView(buffer, width, height)
instance = new ChunkyPixelDataView(buffer, width, height, byteOffset)
```

##### Arguments


Name | Type | Description
-|-|-
`buffer` | ArrayBuffer or SharedArrayBuffer | An existing buffer containing the image data.  
`width` | number | The width of the image data in bytes.  
`height` | number | The height of the image data in scanlines.  
`byteOffset` (Optional) | number | An optional offset, in bytes, to the first byte in the buffer containing the image data. Defaults to `0`.  

### Instance Methods

#### `ChunkyPixelDataView.getColorAt()`

Gets the color of a pixel at the given coordinates.  

##### Syntax

```js
result = myChunkyPixelDataView.getColorAt(x, y)
```

##### Arguments


Name | Type | Description
-|-|-
`x` | number | Horizontal position (x coordinate) of the pixel to check.  
`y` | number | Vertical position (y coordinate) of the pixel to check.  

##### Returns

A number.  The color of the pixel as a unsigned 32-bit integer.  

#### `ChunkyPixelDataView.setColor()`

Set the color of a pixel at the given coordinates.  

##### Syntax

```js
myChunkyPixelDataView.setColor(x, y, color)
```

##### Arguments


Name | Type | Description
-|-|-
`x` | number | Horizontal position (x coordinate) of the pixel to set.  
`y` | number | Vertical position (y coordinate) of the pixel to set.  
`color` | number | The new color for the pixel as a unsigned 32-bit integer.  

## PlanarPixelDataView Class

`PlanarPixelDataView` exposes a low-level interface for reading and writing individual pixel values in planar-encoded image data, stored in an `ArrayBuffer`. Three planar encoding formats are supported: line-interleaved, word-interleaved and contiguous. 

### Constructor

#### `PlanarPixelDataView()`

Creates a new `PlanarPixelDataView` instance. 

##### Syntax

```js
instance = new PlanarPixelDataView(buffer, width, height, planes)
instance = new PlanarPixelDataView(buffer, width, height, planes, interleave)
instance = new PlanarPixelDataView(buffer, width, height, planes, interleave, byteOffset)
```

##### Arguments


Name | Type | Description
-|-|-
`buffer` | ArrayBuffer or SharedArrayBuffer | An existing buffer containing the image data.  
`width` | number | The width of the image data, in pixels.  
`height` | number | The height of the image data, in pixels.  
`planes` | number | The number of bitplanes in the image data.  
`interleave` (Optional) | string | The bitplane interleave format the data is stored in.  Allowed values: `"contiguous"`, `"line"` or `"word"`.  
`byteOffset` (Optional) | number | An optional offset, in bytes, to the first byte in the buffer containing the image data. Defaults to `0`.  

### Instance Methods

#### `PlanarPixelDataView.getColor()`

Returns the color index of a pixel at the given coordinates.  

##### Syntax

```js
result = myPlanarPixelDataView.getColor(x, y)
```

##### Arguments


Name | Type | Description
-|-|-
`x` | number | Horizontal position (x coordinate) of the pixel to check.  
`y` | number | Vertical position (y coordinate) of the pixel to check.  

##### Returns

A number.  The index of the pixel color.  

#### `PlanarPixelDataView.setColor()`

Set the color index of a pixel at the given coordinates.  

##### Syntax

```js
myPlanarPixelDataView.setColor(x, y, color)
```

##### Arguments


Name | Type | Description
-|-|-
`x` | number | Horizontal position (x coordinate) of the pixel to set.  
`y` | number | Vertical position (y coordinate) of the pixel to set.  
`color` | number | Index of the new color.
