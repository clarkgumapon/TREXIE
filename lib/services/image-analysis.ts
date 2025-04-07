// Color dictionary for simple color matching
export const colorDictionary: Record<string, string[]> = {
  'Red': ['red', 'maroon', 'burgundy', 'crimson', 'ruby', 'scarlet'],
  'Blue': ['blue', 'navy', 'aqua', 'teal', 'turquoise', 'indigo', 'ocean'],
  'Green': ['green', 'olive', 'lime', 'mint', 'forest', 'sage'],
  'Black': ['black', 'onyx', 'ebony'],
  'White': ['white', 'ivory', 'cream', 'pearl', 'ecru', 'champagne', 'blush'],
  'Gray': ['gray', 'silver', 'slate', 'charcoal', 'grey'],
  'Brown': ['brown', 'tan', 'khaki', 'beige', 'natural', 'earth'],
  'Yellow': ['yellow', 'gold', 'amber', 'mustard'],
  'Orange': ['orange', 'coral', 'peach'],
  'Purple': ['purple', 'lavender', 'violet', 'plum', 'mauve'],
  'Pink': ['pink', 'rose', 'fuchsia', 'magenta', 'blush'],
  'Multi': []
}

// Color map for RGB values
export const colorMap: Record<string, [number, number, number]> = {
  'Red': [255, 0, 0],
  'Blue': [0, 0, 255],
  'Green': [0, 128, 0],
  'Black': [0, 0, 0],
  'White': [255, 255, 255],
  'Gray': [128, 128, 128],
  'Brown': [165, 42, 42],
  'Yellow': [255, 255, 0],
  'Orange': [255, 165, 0],
  'Purple': [128, 0, 128],
  'Pink': [255, 192, 203],
  'Multi': [128, 128, 128], // Default for multi-color
}

// Extract dominant colors from image
export const extractDominantColors = async (
  imageUrl: string, 
  maxColors: number = 2
): Promise<string[]> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    
    img.onload = () => {
      // Create canvas
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) {
        resolve(['Multi']);
        return;
      }
      
      // Set canvas dimensions (resize large images for better performance)
      const maxSize = 300;
      const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      
      // Draw image on canvas
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Get image data
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      
      // Sample pixels (sample every 10th pixel for performance)
      const colorCounts: Record<string, number> = {};
      
      for (let i = 0; i < pixels.length; i += 40) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        
        // Skip almost white or almost black
        if ((r > 240 && g > 240 && b > 240) || (r < 20 && g < 20 && b < 20)) {
          continue;
        }
        
        // Find closest color
        let closestColor = 'Multi';
        let minDistance = Infinity;
        
        for (const [color, [cr, cg, cb]] of Object.entries(colorMap)) {
          // Calculate color distance (Euclidean distance in RGB space)
          const distance = Math.sqrt(
            Math.pow(r - cr, 2) + 
            Math.pow(g - cg, 2) + 
            Math.pow(b - cb, 2)
          );
          
          if (distance < minDistance) {
            minDistance = distance;
            closestColor = color;
          }
        }
        
        // Add to counts
        colorCounts[closestColor] = (colorCounts[closestColor] || 0) + 1;
      }
      
      // Get top colors
      const sortedColors = Object.entries(colorCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([color]) => color)
        .slice(0, maxColors);
        
      resolve(sortedColors.length > 0 ? sortedColors : ['Multi']);
    };
    
    img.onerror = () => {
      resolve(['Multi']);
    };
    
    img.src = imageUrl;
  });
};

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  colors: string[];
  [key: string]: any;
}

// Find products with similar colors
export const findSimilarProductsByColor = (
  products: Product[],
  dominantColors: string[],
  limit: number = 6
): Product[] => {
  
  if (!dominantColors.length) return [];
  
  // Search by color matching
  const colorMatches = products.filter(product => {
    // Check if any product colors match our extracted dominant colors
    if (!product.colors) return false;
    
    // Flatten color dictionary entries to check against product colors
    const matchingColors = dominantColors.flatMap(dominantColor => {
      // Direct match with product color
      if (product.colors.some(color => 
        color.toLowerCase() === dominantColor.toLowerCase()
      )) {
        return true;
      }
      
      // Check dictionary for color synonyms
      const synonyms = colorDictionary[dominantColor] || [];
      return product.colors.some(color => 
        synonyms.some(synonym => color.toLowerCase().includes(synonym))
      );
    });
    
    return matchingColors.includes(true);
  });
  
  return colorMatches.slice(0, limit);
};

// Find products in the same category
export const findSimilarProductsByCategory = (
  products: Product[],
  category: string,
  limit: number = 6
): Product[] => {
  
  if (!category) return [];
  
  const categoryMatches = products.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
  
  return categoryMatches.slice(0, limit);
};

// Analyze image content for category recognition (simplified simulation)
export const analyzeImageContent = (imageUrl: string, searchQuery: string = ''): string => {
  // In a real implementation, this would use image recognition AI
  // For demo, we'll use the search query or image URL to guess category
  
  const combined = (imageUrl + ' ' + searchQuery).toLowerCase();
  
  if (combined.includes('dress') || combined.includes('gown')) return 'Dresses';
  if (combined.includes('bag') || combined.includes('tote') || combined.includes('purse')) return 'Bags';
  if (combined.includes('shoe') || combined.includes('sandal') || combined.includes('footwear')) return 'Shoes';
  if (combined.includes('jacket') || combined.includes('coat')) return 'Outerwear';
  if (combined.includes('necklace') || combined.includes('earring') || combined.includes('jewelry')) return 'Accessories';
  
  return '';
};

// Main function to find visually similar products
export const findVisualSimilarProducts = async (
  imageUrl: string, 
  products: Product[],
  searchQuery: string = '',
  limit: number = 6
): Promise<Product[]> => {
  
  try {
    // 1. Extract colors from the image
    const dominantColors = await extractDominantColors(imageUrl);
    
    // 2. Find products with similar colors
    let results = findSimilarProductsByColor(products, dominantColors, limit);
    
    // 3. If not enough color matches, try category matching
    if (results.length < 2) {
      const category = analyzeImageContent(imageUrl, searchQuery);
      const categoryResults = findSimilarProductsByCategory(products, category, limit);
      
      // Combine and deduplicate results
      const combinedResults = [...results, ...categoryResults];
      results = Array.from(new Map(combinedResults.map(item => [item.id, item])).values()).slice(0, limit);
    }
    
    // 4. If still not enough, return random products
    if (results.length < 2) {
      results = [...products]
        .sort(() => Math.random() - 0.5)
        .slice(0, limit);
    }
    
    return results;
  } catch (error) {
    console.error('Error finding similar products:', error);
    return [];
  }
}; 