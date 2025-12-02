# 591 Reskin

A Chrome extension for modifying the UI of 591.com.tw through direct DOM manipulation.

## Features

- **Hide Advertisements**: Remove ad containers and sponsored content
- **Enhance Layout**: Improve page layout with better spacing and card styles
- **Custom Styles**: Apply modern styling to buttons, inputs, and interactive elements
- **Toggle Controls**: Easy popup interface to enable/disable features

## Installation

### Developer Mode (Recommended for Development)

1. Clone this repository:
   ```bash
   git clone https://github.com/manthi4/591_reskin.git
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" in the top right corner

4. Click "Load unpacked" and select the cloned repository folder

5. The extension icon should appear in your toolbar

### From Chrome Web Store (Coming Soon)

The extension will be available on the Chrome Web Store in a future release.

## Usage

1. Click the extension icon in your Chrome toolbar to open the popup
2. Toggle features on/off as desired:
   - **Enable Extension**: Master toggle for all features
   - **Hide Advertisements**: Remove ads from the page
   - **Enhance Layout**: Apply layout improvements
   - **Custom Styles**: Apply modern styling
3. Click "Refresh Page" to apply changes if needed

## Project Structure

```
591_reskin/
├── manifest.json      # Extension manifest (v3)
├── content.js         # Content script for DOM manipulation
├── styles.css         # Injected styles for the target website
├── popup.html         # Extension popup UI
├── popup.css          # Popup styling
├── popup.js           # Popup logic and settings management
├── icons/             # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md          # This file
```

## How It Works

The extension uses Chrome's content scripts to inject JavaScript and CSS into pages matching `*.591.com.tw/*`. The content script:

1. Loads user settings from Chrome storage
2. Applies DOM modifications based on enabled features
3. Listens for messages from the popup to update settings in real-time

## Development

### Prerequisites

- Google Chrome or Chromium-based browser
- Basic knowledge of Chrome extension development

### Making Changes

1. Edit the source files as needed
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Reload the target website to see changes

### Debugging

- Open Chrome DevTools on the target website to debug content scripts
- Right-click the extension icon and select "Inspect popup" to debug the popup

## Permissions

- `activeTab`: Required to interact with the current tab
- `storage`: Required to save user settings

## License

MIT License

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request