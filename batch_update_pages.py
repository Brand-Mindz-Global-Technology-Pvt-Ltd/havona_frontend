#!/usr/bin/env python3
"""
Batch script to update remaining HTML pages with header/footer placeholders.
This script replaces static header and footer HTML with dynamic JS-based components.
"""

import re
from pathlib import Path

# Define pages to update with their respective configurations
PAGES = [
    {
        'path': 'd:/Project/Havona/Havona_Front-End/blog/blog.html',
        'active': 'blog',
        'root': '../',
        'position': 'absolute'
    },
    {
        'path': 'd:/Project/Havona/Havona_Front-End/blog/blogdetail.html',
        'active': 'blog',
        'root': '../',
        'position': 'absolute'
    },
    {
        'path': 'd:/Project/Havona/Havona_Front-End/contact/contact.html',
        'active': 'contact',
        'root': '../',
        'position': 'absolute'
    },
    {
        'path': 'd:/Project/Havona/Havona_Front-End/PolicyPages/terms.html',
        'active': None,  # Policy pages don't have active nav
        'root': '../',
        'position': 'fixed'  # Sticky header for policy pages
    },
    {
        'path': 'd:/Project/Havona/Havona_Front-End/PolicyPages/privacy.html',
        'active': None,
        'root': '../',
        'position': 'fixed'
    },
    {
        'path': 'd:/Project/Havona/Havona_Front-End/PolicyPages/cookies.html',
        'active': None,
        'root': '../',
        'position': 'fixed'
    }
]

def replace_header(content, config):
    """Replace static header with placeholder."""
    # Pattern to match header element
    header_pattern = r'<header class="[^"]*"\s+id="main-header">.*?</header>'
    
    # Create replacement
    active_attr = f' data-active="{config["active"]}"' if config['active'] else ''
    replacement = f'''    <!-- Header -->
    <div id="main-header-placeholder" data-root="{config['root']}"{active_attr} data-position="{config['position']}"></div>'''
    
    # Replace
    result = re.sub(header_pattern, replacement, content, flags=re.DOTALL)
    return result if result != content else None

def replace_footer(content, config):
    """Replace static footer with placeholder."""
    # Pattern to match footer element
    footer_pattern = r'<footer class="bg-\[#0B0B0B\][^>]*>.*?</footer>'
    
    # Create replacement
    replacement = f'''    <!-- Footer -->
    <div id="main-footer-placeholder" data-root="{config['root']}"></div>
    <script src="{config['root']}js/home/footer.js"></script>'''
    
    # Replace
    result = re.sub(footer_pattern, replacement, content, flags=re.DOTALL)
    return result if result != content else None

def process_file(page_config):
    """Process a single HTML file."""
    path = Path(page_config['path'])
    
    if not path.exists():
        return {'status': 'error', 'message': f'File not found: {path}'}
    
    try:
        # Read file
        content = path.read_text(encoding='utf-8')
        original_content = content
        
        # Replace header
        header_result = replace_header(content, page_config)
        if header_result:
            content = header_result
            header_status = 'replaced'
        else:
            header_status = 'not_found_or_already_replaced'
        
        # Replace footer
        footer_result = replace_footer(content, page_config)
        if footer_result:
            content = footer_result
            footer_status = 'replaced'
        else:
            footer_status = 'not_found_or_already_replaced'
        
        # Write back if changes were made
        if content != original_content:
            path.write_text(content, encoding='utf-8')
            return {
                'status': 'success',
                'header': header_status,
                'footer': footer_status
            }
        else:
            return {
                'status': 'no_changes',
                'header': header_status,
                'footer': footer_status
            }
            
    except Exception as e:
        return {'status': 'error', 'message': str(e)}

def main():
    """Process all pages."""
    results = {}
    
    for page in PAGES:
        filename = Path(page['path']).name
        print(f"Processing {filename}...")
        result = process_file(page)
        results[filename] = result
        print(f"  Result: {result}")
    
    # Print summary
    print("\n=== SUMMARY ===")
    for filename, result in results.items():
        status = result.get('status', 'unknown')
        print(f"{filename}: {status}")

if __name__ == '__main__':
    main()
