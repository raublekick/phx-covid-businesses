# phx-covid-businesses

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### .ENV configuration
```
VUE_APP_CENTER_LAT=33.4515
VUE_APP_CENTER_LNG=-112.07 // central phoenix
VUE_APP_MAPBOX_KEY=/your key here/
```
---

# Components
## Reusable component descriptions

### Notification Icon
| Name | Type | Description|Values
|------|------|------------|-----|
|Icon|String|The material icon to display|&lt;any material icon name&gt;|
|Message|String|Message is displayed in a tooltip when the user hovers the icon|&lt;any&gt;|
|Level|String|The [Bulma color](https://bulma.io/documentation/overview/modifiers/) for the icon|"info", "warning", "error", "success", "primary", "link"|
