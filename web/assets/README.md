# Assets Directory

This directory contains downloadable assets for the Veritas BS website.

## PDF Files

### THEREALITYCHECK.pdf
- **Purpose**: Main Reality Check Methodology Guide
- **Size**: 2.1MB
- **Last Updated**: January 2025
- **Download URL**: `/assets/THEREALITYCHECK.pdf`
- **User-facing filename**: `Reality-Check-Methodology-Guide.pdf`

## Directory Structure

```
web/assets/
├── README.md              # This file - asset documentation
└── THEREALITYCHECK.pdf    # Main downloadable guide
```

## Usage

- PDFs are served directly via Netlify's static file hosting
- Download links are generated in the download-guide function
- All assets are publicly accessible for download
- File paths are relative to the web directory

## Adding New Assets

1. Place new files in this directory
2. Update this README with file details
3. Update any download functions to reference new paths
4. Test downloads to ensure proper functionality

## Notes

- This directory is specifically for downloadable assets
- CSS, JS, and other web files are in the main web directory
- Favicons and logos are in their respective subdirectories 