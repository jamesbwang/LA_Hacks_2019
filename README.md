# Garb

Garb is a waste management tool for groceries. By scanning their receipts each week, Garb users can cut down on their food waste and contribute to a sustainable, socially accountable future.

### Features

Garb was built with React Native for both iOS and Android devices. It uses Optical Character Recognition (OCR) APIs to read text from images. To annotate food items, basic Natural Language Processing (NLP) tools were conceived and built into an API. Garb uses React Native's Async Storage systems to store data in between uses. Finally, Garb takes advantage of both user input and expiration date datasets to record waste usage, and display food waste amounts to the user.

### Development with Garb

Garb requires [Node 10.15.3](https://nodejs.org/en/download/current/), and an API key for [Google Cloud Vision](https://cloud.google.com/vision/). After cloning the repository into the working directly, use the following _npm_ commands:

```
>npm install
>npm start
```

The development server should kick off with no problems.



### Further Improvements

Garb represents images using a base-64 encoded string, and as such, the API takes a long time to process this data. Compression of this base-64 data into a more condensed format would speed up runtime considerably. Also, integration of the Natural Language Processing API into the system itself would speed up software further.

### Credits

Garb was developed by [Gideon Tong](https://github.com/gideontong), [Daisy Chen](https://github.com/Justawayx), [Nora Zhou](https://github.com/Nonus99), and [James Wang](https://github.com/jamesbwang) for LA Hacks 2019. Garb was submitted for the best sustainability hack, and the best use of the Google Cloud API.
