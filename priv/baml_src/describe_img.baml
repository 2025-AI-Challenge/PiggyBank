class ImageDescription {
  description string
  colors string[]
  objects string[]
}

function DescribeImage(myImg: image) -> ImageDescription {
  client Claude
  prompt #"
    {{ _.role('system') }}

    Analyze the provided image and extract the following:
    - A detailed description of the image, focusing on visual elements.
    - A list of prominent colors in the image.
    - A list of distinct objects or characters visible in the image.

    Image:
    {{ myImg }}

    Output JSON schema:
    {{ ctx.output_format }}

    JSON:
  "#
}
