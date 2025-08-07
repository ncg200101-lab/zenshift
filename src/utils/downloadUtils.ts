/**
 * Utility functions for handling file downloads
 */

export interface DownloadOptions {
  filename?: string;
  showNotification?: boolean;
}

/**
 * Gets the appropriate PDF URL based on product information
 * @param product - The product object containing category and other details
 * @returns The URL of the PDF to download
 */
export const getPDFUrl = (product: any): string => {
  // Default PDF for now - this can be expanded based on product category
  // In the future, you could map different products to different PDFs
  const defaultPDF = '/assets/ZenShift_5D_Home_Starter_Pack_Final_Printable.pdf';
  
  // You can add logic here to map different product categories to different PDFs
  // For example:
  // if (product.category === 'books-journals') return '/assets/journal-template.pdf';
  // if (product.category === 'frequency-drops') return '/assets/frequency-guide.pdf';
  
  return defaultPDF;
};

/**
 * Downloads a PDF file from the given URL
 * @param url - The URL of the PDF to download
 * @param options - Download options including filename and notification preferences
 */
export const downloadPDF = (url: string, options: DownloadOptions = {}): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // Check if the browser supports the download attribute
      if (!supportsAutoDownload()) {
        // Fallback: open in new tab
        window.open(url, '_blank');
        if (options.showNotification !== false) {
          alert('Your browser doesn\'t support automatic downloads. The PDF has been opened in a new tab.');
        }
        resolve();
        return;
      }

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
      link.download = options.filename || 'download.pdf';
      link.target = '_blank'; // Open in new tab as fallback
      
      // Append to DOM, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Show notification if enabled
      if (options.showNotification !== false) {
        // Try to use browser notifications if available
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('Download Started', {
            body: 'Your digital product is downloading...',
            icon: '/assets/logo.png'
          });
        } else {
          // Fallback to alert
          alert('Your digital product is downloading! You will be redirected to the confirmation page.');
        }
      }
      
      resolve();
    } catch (error) {
      console.error('Error downloading PDF:', error);
      
      // Fallback: try to open in new tab
      try {
        window.open(url, '_blank');
        if (options.showNotification !== false) {
          alert('Download failed, but the PDF has been opened in a new tab. You can save it manually.');
        }
        resolve();
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
        reject(error);
      }
    }
  });
};

/**
 * Checks if the browser supports automatic downloads
 */
export const supportsAutoDownload = (): boolean => {
  return 'download' in document.createElement('a');
};

/**
 * Gets the appropriate PDF filename based on product name
 * @param productName - The name of the product
 * @returns A sanitized filename for the PDF
 */
export const getPDFFilename = (productName: string): string => {
  // Remove special characters and replace spaces with underscores
  const sanitizedName = productName
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s+/g, '_')
    .trim();
  
  return `${sanitizedName || 'ZenShift_Product'}.pdf`;
};
