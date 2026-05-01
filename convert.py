import os
from PIL import Image
from pillow_heif import register_heif_opener

register_heif_opener()

new_folder = "new"
gallery_folder = "public/docs/gallery"

os.makedirs(gallery_folder, exist_ok=True)

heic_files = [f for f in os.listdir(new_folder) if f.lower().endswith(".heic")]

for index, filename in enumerate(heic_files):
    filepath = os.path.join(new_folder, filename)
    image = Image.open(filepath)
    # The current gallery images are named 1.jpeg, 2.jpeg, 3.jpeg... etc., or other_X.jpeg
    # Let's see what the highest number in gallery is to avoid overwriting.
    existing = os.listdir(gallery_folder)
    # Just name them newly_added_1.jpeg, newly_added_2.jpeg, etc. to avoid conflict.
    new_name = f"newly_added_{index+1}.jpeg"
    outpath = os.path.join(gallery_folder, new_name)
    image.save(outpath, "JPEG")
    print(f"Converted {filename} to {new_name}")
