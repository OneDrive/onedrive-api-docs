# Thumbnail Descriptor
Describes the characteristics of a thumbnail

##### Grammar (ABNF)
```
Descriptor: Default / Custom

Default: "Default"

Custom: Width "x" Height *("_" Option);

Width: UInt32;

Height: UInt32;

Option: Crop | TopCrop;

Crop: "Crop";

TopCrop: "TopCrop";
```

Rule | Description
--- | ---
Crop | Indicates the crop should be centered.
Default | Requests the default thumbnail.
Height | The height of the thumbnail, in pixels.
TopCrop | Indicates that the crop should be from the top.
Width | The width of the thumbnail, in pixels.

##### Examples
Descriptor | Meaning
--- | ---
Default | Equivalent to not providing a descriptor. OneDrive will return a thumbnail with a size of its choosing.
21x21 | A thumbnail with a width of 21 pixels, a height of 21 pixels, and other parameters defaulted.
640x480_Crop | A thumbnail with a width of 640 pixels, a height of 480 pixels, and cropped from the center.
