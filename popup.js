/**
 * 591 Reskin - Popup Script
 * Controls the extension popup UI and communicates with content script
 */

document.addEventListener('DOMContentLoaded', () => {
  const enableExtensionCheckbox = document.getElementById('enableExtension');
  const hideAdsCheckbox = document.getElementById('hideAds');
  const enhanceLayoutCheckbox = document.getElementById('enhanceLayout');
  const customStylesCheckbox = document.getElementById('customStyles');
  const statusIndicator = document.getElementById('statusIndicator');
  const statusText = statusIndicator.querySelector('.status-text');
  const refreshBtn = document.getElementById('refreshBtn');

  // Load saved settings
  loadSettings();

  // Event listeners for toggles
  enableExtensionCheckbox.addEventListener('change', () => {
    updateSettings();
    updateStatusIndicator();
  });

  hideAdsCheckbox.addEventListener('change', updateSettings);
  enhanceLayoutCheckbox.addEventListener('change', updateSettings);
  customStylesCheckbox.addEventListener('change', updateSettings);

  // Refresh button
  refreshBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.reload(tabs[0].id);
        window.close();
      }
    });
  });

  /**
   * Load settings from Chrome storage
   */
  function loadSettings() {
    chrome.storage.sync.get(['reskinConfig'], (result) => {
      if (result.reskinConfig) {
        const config = result.reskinConfig;
        enableExtensionCheckbox.checked = config.enabled !== false;
        hideAdsCheckbox.checked = config.hideAds !== false;
        enhanceLayoutCheckbox.checked = config.enhanceLayout !== false;
        customStylesCheckbox.checked = config.customStyles !== false;
      }
      updateStatusIndicator();
    });
  }

  /**
   * Update settings and save to storage
   */
  function updateSettings() {
    const settings = {
      enabled: enableExtensionCheckbox.checked,
      hideAds: hideAdsCheckbox.checked,
      enhanceLayout: enhanceLayoutCheckbox.checked,
      customStyles: customStylesCheckbox.checked
    };

    chrome.storage.sync.set({ reskinConfig: settings });

    // Send message to content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'updateSettings',
          settings: settings
        }).catch((error) => {
          // Content script might not be loaded on this page
          console.debug('Content script not available:', error.message);
        });
      }
    });
  }

  /**
   * Update the status indicator UI
   */
  function updateStatusIndicator() {
    if (enableExtensionCheckbox.checked) {
      statusIndicator.classList.remove('inactive');
      statusText.textContent = 'Active';
    } else {
      statusIndicator.classList.add('inactive');
      statusText.textContent = 'Inactive';
    }
  }
});
