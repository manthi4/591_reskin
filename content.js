/**
 * 591 Reskin - Content Script
 * This script performs DOM manipulation on 591.com.tw to modify the UI
 */

(function() {
  'use strict';

  // Configuration object for UI modifications
  const config = {
    enabled: true,
    hideAds: true,
    enhanceLayout: true,
    customStyles: true
  };

  /**
   * Initialize the extension
   */
  function init() {
    // Load saved settings from storage
    loadSettings().then(() => {
      if (config.enabled) {
        applyModifications();
      }
    });

    // Listen for messages from popup
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'toggleExtension') {
        config.enabled = request.enabled;
        if (config.enabled) {
          applyModifications();
        } else {
          removeModifications();
        }
        sendResponse({ success: true });
      } else if (request.action === 'getStatus') {
        sendResponse({ enabled: config.enabled });
      } else if (request.action === 'updateSettings') {
        Object.assign(config, request.settings);
        saveSettings();
        applyModifications();
        sendResponse({ success: true });
      }
      return true;
    });
  }

  /**
   * Load settings from Chrome storage
   */
  async function loadSettings() {
    return new Promise((resolve) => {
      chrome.storage.sync.get(['reskinConfig'], (result) => {
        if (result.reskinConfig) {
          Object.assign(config, result.reskinConfig);
        }
        resolve();
      });
    });
  }

  /**
   * Save settings to Chrome storage
   */
  function saveSettings() {
    chrome.storage.sync.set({ reskinConfig: config });
  }

  /**
   * Apply all UI modifications
   */
  function applyModifications() {
    if (config.hideAds) {
      hideAdvertisements();
    }
    if (config.enhanceLayout) {
      enhanceLayout();
    }
    if (config.customStyles) {
      applyCustomStyles();
    }
    
    // Mark body to indicate extension is active
    document.body.classList.add('reskin-active');
  }

  /**
   * Remove all UI modifications
   */
  function removeModifications() {
    document.body.classList.remove('reskin-active');
    
    // Remove injected elements
    const injectedElements = document.querySelectorAll('.reskin-injected');
    injectedElements.forEach(el => el.remove());
    
    // Remove custom styles
    const customStyleSheet = document.getElementById('reskin-custom-styles');
    if (customStyleSheet) {
      customStyleSheet.remove();
    }
  }

  /**
   * Hide advertisement elements
   */
  function hideAdvertisements() {
    const adSelectors = [
      '.ad-container',
      '.advertisement',
      '.banner-ad',
      '[class*="ad-"]',
      '[id*="google_ads"]',
      '.sponsored'
    ];

    adSelectors.forEach(selector => {
      const ads = document.querySelectorAll(selector);
      ads.forEach(ad => {
        ad.style.display = 'none';
      });
    });
  }

  /**
   * Enhance the page layout
   */
  function enhanceLayout() {
    // Improve readability by adjusting container widths
    const mainContent = document.querySelector('.main-content, #main, main');
    if (mainContent) {
      mainContent.style.maxWidth = '1200px';
      mainContent.style.margin = '0 auto';
    }

    // Enhance listing items
    const listingItems = document.querySelectorAll('.listing-item, .property-item, .item');
    listingItems.forEach(item => {
      item.style.borderRadius = '8px';
      item.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
      item.style.marginBottom = '16px';
      item.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
    });

    // Add hover effects
    addHoverEffects();
  }

  /**
   * Add hover effects to interactive elements
   */
  function addHoverEffects() {
    // Remove existing hover styles to prevent duplicates
    const existingStyles = document.getElementById('reskin-hover-styles');
    if (existingStyles) {
      existingStyles.remove();
    }

    const style = document.createElement('style');
    style.id = 'reskin-hover-styles';
    style.classList.add('reskin-injected');
    style.textContent = `
      .reskin-active .listing-item:hover,
      .reskin-active .property-item:hover,
      .reskin-active .item:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Apply custom styles for visual improvements
   */
  function applyCustomStyles() {
    // Remove existing custom styles to prevent duplicates
    const existingStyles = document.getElementById('reskin-custom-styles');
    if (existingStyles) {
      existingStyles.remove();
    }

    const customStyles = document.createElement('style');
    customStyles.id = 'reskin-custom-styles';
    customStyles.classList.add('reskin-injected');
    customStyles.textContent = `
      /* General improvements */
      .reskin-active {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      }

      /* Button improvements */
      .reskin-active button,
      .reskin-active .btn {
        border-radius: 6px;
        transition: all 0.2s ease;
      }

      /* Link improvements */
      .reskin-active a {
        transition: color 0.2s ease;
      }

      /* Image improvements */
      .reskin-active img {
        border-radius: 4px;
      }

      /* Card-like elements */
      .reskin-active .card,
      .reskin-active .box,
      .reskin-active .panel {
        border-radius: 8px;
        overflow: hidden;
      }
    `;
    document.head.appendChild(customStyles);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
