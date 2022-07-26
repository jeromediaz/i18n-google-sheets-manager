# i18n-google-sheets-importer

Export translation files from Google Docs spreadsheets.




Prop | Description | Type | Default
------ | ------ | ------ | ------
**`credentials`** | Array of items to loop on | Array | **Required**
**`docID`** | Takes an item from data and renders it into the list. The function receives one argument `{item, index}` (see [Usage](https://github.com/meliorence/react-native-snap-carousel#usage)) and must return a React element. | Function | **Required**
**`outputs`** | Width in pixels of carousel's items, **must be the same for all of them** | Number | **Required for **horizontal** carousel**



Prop | Description | Type | Default
------ | ------ | ------ | ------
**`credentials`** | Array of items to loop on | Array | **Required**
**`docID`** | Takes an item from data and renders it into the list. The function receives one argument `{item, index}` (see [Usage](https://github.com/meliorence/react-native-snap-carousel#usage)) and must return a React element. | Function | **Required**
**`outputs`** | Width in pixels of carousel's items, **must be the same for all of them** | Number | **Required for**horizontal**carousel**
**`sliderWidth`** | Width in pixels of the carousel itself | Number | **Required for**horizontal**carousel**
**`itemHeight`** | Height in pixels of carousel's items, **must be the same for all of them** | Number | **Required for**vertical**carousel**
**`sliderHeight`** | Height in pixels of the carousel itself | Number | **Required for**vertical**carousel**



Prop | Description | Type | Default
------ | ------ | ------ | ------
**`sheetIndex`** | Array of items to loop on | Array | **Required**
**`keyPathSeparator`** | Takes an item from data and renders it into the list. The function receives one argument `{item, index}` (see [Usage](https://github.com/meliorence/react-native-snap-carousel#usage)) and must return a React element. | Function | **Required**
**`method`** | 'json' or 'yaml' | string | **Required for**horizontal**carousel**
**`outputDir`** | Width in pixels of the carousel itself | Number | **Required for**horizontal**carousel**
**`fileName`** | Height in pixels of carousel's items, **must be the same for all of them** | Number | **Required for**vertical**carousel**
