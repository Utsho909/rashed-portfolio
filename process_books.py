import os
import fitz  # PyMuPDF
import json
import shutil
import re

raw_dirs = [
    r"c:\Users\UTSHO\Desktop\rashed\raw_books",
    r"c:\Users\UTSHO\Desktop\rashed\Rashed Report"
]
public_docs_dir = r"c:\Users\UTSHO\Desktop\rashed\public\docs"
covers_dir = os.path.join(public_docs_dir, "covers")
pdfs_dir = os.path.join(public_docs_dir, "books")

os.makedirs(covers_dir, exist_ok=True)
os.makedirs(pdfs_dir, exist_ok=True)

books_data = []
book_id = 1

def clean_title(text):
    text = re.sub(r'[^a-zA-Z0-9\s.,-]', '', text)
    text = " ".join(text.split())
    if len(text) > 60:
        text = text[:60] + "..."
    if not text.strip():
        return "Untitled Report"
    return text.strip()

for raw_dir in raw_dirs:
    if not os.path.exists(raw_dir):
        print(f"Skipping {raw_dir} as it does not exist.")
        continue
    for file_name in os.listdir(raw_dir):
        if file_name.lower().endswith('.pdf'):
            pdf_path = os.path.join(raw_dir, file_name)
            
            # Copy raw pdf to public/docs/books
            safe_name = file_name.replace(" ", "_")
            dest_pdf_path = os.path.join(pdfs_dir, safe_name)
            shutil.copy2(pdf_path, dest_pdf_path)
            
            try:
                doc = fitz.open(pdf_path)
                
                # Extract Cover Image
                page = doc.load_page(0)  # first page
                pix = page.get_pixmap(dpi=150)
                cover_name = safe_name.replace('.pdf', '.png')
                cover_path = os.path.join(covers_dir, cover_name)
                pix.save(cover_path)
                
                # Extract Text for Title
                metadata = doc.metadata
                title = metadata.get("title", "")
                if not title or title.strip() == "":
                    text = page.get_text("text")
                    lines = [l.strip() for l in text.split("\n") if l.strip()]
                    # find first line with reasonable length
                    for line in lines:
                        if len(line) > 5:
                            title = line
                            break
                    if not title:
                         title = file_name.replace('.pdf', '')
                
                title = clean_title(title)
                
                books_data.append({
                    "id": book_id,
                    "title": title,
                    "year": "2024", # default
                    "publisher": "Professional Report",
                    "cover": f"/docs/covers/{cover_name}",
                    "pdfUrl": f"/docs/books/{safe_name}",
                    "pages": [
                        f"A detailed professional report containing essential research and findings. Originally documented as {file_name}.",
                        "Click to open and read the full document in the interactive viewer."
                    ]
                })
                book_id += 1
                doc.close()
            except Exception as e:
                print(f"Error processing {file_name}: {e}")

# save to json
with open("extracted_books.json", "w", encoding="utf-8") as f:
    json.dump(books_data, f, indent=4)

print("Done processing. Extracted", len(books_data), "books.")
