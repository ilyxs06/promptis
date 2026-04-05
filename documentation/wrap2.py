import shutil
import re

filepath = 'c:\\wamp64\\www\\Stage\\documentation\\RAPPORT_DE_STAGE.md'
backup_filepath = 'c:\\wamp64\\www\\Stage\\documentation\\RAPPORT_DE_STAGE_BACKUP.md'

shutil.copy2(backup_filepath, filepath)

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

pages = content.split('<div style="page-break-after: always;"></div>')

def wrap_page(page_text, page_num, total_pages):
    page_text = page_text.strip()
    return f'''<div style="border: 2px solid #0055A4; padding: 4px; margin-bottom: 40px; border-radius: 4px; background-color: white;">
<div style="border: 1px solid #0055A4; padding: 40px; padding-bottom: 80px; position: relative; min-height: 1000px; border-radius: 2px;">

<div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0055A4; padding-bottom: 15px; margin-bottom: 30px;">
<img src="file:///C:/Users/HP/Documents/OFPPT.png" height="50" alt="OFPPT"/>
<img src="file:///C:/Users/HP/Documents/Logo-promptis.webp" height="50" alt="PROMPTIS"/>
</div>

{page_text}

<div style="position: absolute; bottom: 30px; left: 40px; right: 40px; border-top: 2px solid #0055A4; padding-top: 15px; display: flex; justify-content: center; align-items: center; color: #555; font-family: sans-serif; font-size: 13px;">
<span style="background: white; padding: 0 15px;">P a g e {page_num} | {total_pages}</span>
</div>

</div>
</div>'''

total = len(pages)
new_pages = [wrap_page(p, i+1, total) for i, p in enumerate(pages)]
new_content = '\n\n<div style="page-break-after: always;"></div>\n\n'.join(new_pages)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)

print('File successfully wrapped with local images.')
