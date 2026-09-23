import os
from PIL import Image, ImageDraw

def generate_icons():
    source_icon = r"c:\Users\DELL\OneDrive\Desktop\CashALL\CASHALL\photos\CashALL_app_icon.png"
    res_dir = r"c:\Users\DELL\OneDrive\Desktop\CashALL\android-customer-app\app\src\main\res"
    
    img = Image.open(source_icon).convert("RGBA")
    
    densities = {
        "mipmap-mdpi": 48,
        "mipmap-hdpi": 72,
        "mipmap-xhdpi": 96,
        "mipmap-xxhdpi": 144,
        "mipmap-xxxhdpi": 192
    }
    
    for folder, size in densities.items():
        out_folder = os.path.join(res_dir, folder)
        os.makedirs(out_folder, exist_ok=True)
        
        # Standard square/rounded icon
        resized = img.resize((size, size), Image.Resampling.LANCZOS)
        square_path = os.path.join(out_folder, "ic_launcher.png")
        resized.save(square_path, "PNG")
        
        # Round icon with circular mask
        mask = Image.new("L", (size, size), 0)
        draw = ImageDraw.Draw(mask)
        draw.ellipse((0, 0, size, size), fill=255)
        
        round_img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        round_img.paste(resized, (0, 0), mask=mask)
        round_path = os.path.join(out_folder, "ic_launcher_round.png")
        round_img.save(round_path, "PNG")
        
        print(f"Generated {size}x{size} icons in {folder}")

if __name__ == "__main__":
    generate_icons()
