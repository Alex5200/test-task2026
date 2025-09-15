const fs = require('fs');
const path = require('path');
const { optimize } = require('svgo');

const svgDir = path.join(__dirname, 'public', 'img_svg');

// SVGO configuration
const svgoConfig = {
  multipass: true,
  plugins: [
    'preset-default',
    'removeXMLNS',
    'removeDimensions',
    'sortAttrs',
    'removeStyleElement',
    'removeScriptElement',
    'removeUselessDefs',
    'removeEditorsNSData',
    'removeEmptyAttrs',
    'removeEmptyText',
    'removeViewBox',
    'removeEmptyContainers',
    'cleanupIDs',
    'convertStyleToAttrs',
    'convertColors',
    'convertPathData',
    'convertTransform',
    'removeUnknownsAndDefaults',
    'removeNonInheritableGroupAttrs',
    'removeUselessStrokeAndFill',
    'removeUnusedNS',
    'cleanupNumericValues',
    'moveElemsAttrsToGroup',
    'moveGroupAttrsToElems',
    'collapseGroups',
    'removeRasterImages',
    'mergePaths',
    'convertShapeToPath',
    'sortDefsChildren'
  ]
};

// Function to optimize a single SVG file
async function optimizeSvg(filePath) {
  try {
    const data = await fs.promises.readFile(filePath, 'utf8');
    const result = optimize(data, { ...svgoConfig, path: filePath });
    
    if (result.error) {
      console.error(`Error optimizing ${filePath}:`, result.error);
      return;
    }
    
    await fs.promises.writeFile(filePath, result.data, 'utf8');
    console.log(`Optimized: ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

// Process all SVG files in the directory
async function processSvgFiles() {
  try {
    const files = await fs.promises.readdir(svgDir);
    const svgFiles = files.filter(file => file.endsWith('.svg'));
    
    console.log(`Found ${svgFiles.length} SVG files to optimize`);
    
    for (const file of svgFiles) {
      const filePath = path.join(svgDir, file);
      await optimizeSvg(filePath);
    }
    
    console.log('SVG optimization complete!');
  } catch (error) {
    console.error('Error reading SVG directory:', error);
  }
}

// Run the optimization
processSvgFiles();
